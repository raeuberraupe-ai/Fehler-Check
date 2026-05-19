// ===== DOM Referenzen =====
const dropZone         = document.getElementById('dropZone');
const fileInput        = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage     = document.getElementById('previewImage');
const removeImageBtn   = document.getElementById('removeImage');
const analyzeBtn       = document.getElementById('analyzeBtn');
const statusBar        = document.getElementById('statusBar');
const statusText       = document.getElementById('statusText');
const resultSection    = document.getElementById('resultSection');
const markedTextEl     = document.getElementById('markedText');
const originalTextEl   = document.getElementById('originalText');
const summaryBoxEl     = document.getElementById('summaryBox');
const tabs             = document.querySelectorAll('.tab');

let currentFile = null;

// ===== Drag & Drop =====
dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    loadImage(file);
  } else {
    alert('Bitte nur Bilddateien hochladen (JPG, PNG, etc.)');
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) loadImage(fileInput.files[0]);
});

// ===== Bild laden =====
function loadImage(file) {
  currentFile = file;
  const url = URL.createObjectURL(file);
  previewImage.src = url;
  dropZone.hidden = true;
  previewContainer.hidden = false;
  analyzeBtn.disabled = false;
  resultSection.hidden = true;
  statusBar.hidden = true;
}

removeImageBtn.addEventListener('click', () => {
  currentFile = null;
  previewImage.src = '';
  previewContainer.hidden = true;
  dropZone.hidden = false;
  fileInput.value = '';
  analyzeBtn.disabled = true;
  resultSection.hidden = true;
  statusBar.hidden = true;
});

// ===== Tabs =====
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(c => c.hidden = true);
    document.getElementById('tab-' + tab.dataset.tab).hidden = false;
  });
});

// ===== Hauptfunktion: Analysieren =====
analyzeBtn.addEventListener('click', async () => {
  if (!currentFile) return;

  analyzeBtn.disabled = true;
  resultSection.hidden = true;
  showStatus('Text wird erkannt (OCR)…');

  try {
    // ── OCR mit Tesseract.js ──
    const ocrText = await runOCR(currentFile);

    if (!ocrText || ocrText.trim().length < 5) {
      throw new Error('Der Text konnte nicht erkannt werden. Bitte ein klareres Foto verwenden.');
    }

    originalTextEl.textContent = ocrText;

    // ── Eigene KI analysiert ──
    showStatus('KI analysiert Fehler…');
    const analysisResult = FehlerKI.analysiere(ocrText);

    // ── Ergebnis anzeigen ──
    renderResult(ocrText, analysisResult);

  } catch (err) {
    console.error(err);
    alert('Fehler: ' + err.message);
  } finally {
    hideStatus();
    analyzeBtn.disabled = false;
  }
});

// ===== Bild vorverarbeiten (Kontrast erhöhen für bessere OCR) =====
async function bildVorverarbeiten(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // Bild skalieren falls zu klein (bessere OCR)
      const minBreite = 1200;
      const scale = img.width < minBreite ? minBreite / img.width : 1;
      canvas.width  = img.width  * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Kontrast & Helligkeit erhöhen für bessere Lesbarkeit
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Graustufen
        const grau = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
        // Kontrast erhöhen: Werte unter 128 dunkler, über 128 heller
        const kontrast = grau < 128 ? Math.max(0, grau - 30) : Math.min(255, grau + 30);
        data[i] = data[i+1] = data[i+2] = kontrast;
      }
      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob(blob => {
        URL.revokeObjectURL(url);
        resolve(blob);
      }, 'image/png');
    };
    img.src = url;
  });
}

// ===== OCR-Qualität prüfen =====
function pruefeOCRQualitaet(text) {
  const woerter = text.trim().split(/\s+/).filter(w => w.length > 1);
  const gesamtZeichen = text.replace(/\s/g, '').length;

  // Anteil unlesbarer Zeichen (Sonderzeichen die kein Deutsch sind)
  const unlesbareZeichen = (text.match(/[^a-zA-ZäöüÄÖÜß0-9\s.,!?;:()\-"']/g) || []).length;
  const unlesbareQuote = unlesbareZeichen / Math.max(gesamtZeichen, 1);

  // Anteil sehr kurzer "Wörter" (OCR-Fehler)
  const kurzeWoerter = woerter.filter(w => w.length === 1).length;
  const kurzeQuote = kurzeWoerter / Math.max(woerter.length, 1);

  if (woerter.length < 3) {
    return {
      ok: false,
      hinweis: '⚠️ Sehr wenig Text erkannt. Tipps für bessere Ergebnisse:\n• Foto gerade und nah aufnehmen\n• Gutes Licht verwenden\n• Arbeitsblatt flach hinlegen\n• Kein Schatten auf dem Text'
    };
  }
  if (unlesbareQuote > 0.15) {
    return {
      ok: false,
      hinweis: '⚠️ Der Text wurde nicht gut erkannt (viele unleserliche Zeichen).\n\nTipps:\n• Bessere Beleuchtung\n• Foto gerader aufnehmen\n• Näher ans Blatt heran\n• Kein Verwackeln'
    };
  }
  if (kurzeQuote > 0.4) {
    return {
      ok: false,
      hinweis: '⚠️ Die Schrift wurde schwer erkannt. Bei Handschrift:\n• Deutlicher und größer schreiben\n• Druckschrift wird besser erkannt als Schreibschrift\n• Foto mit mehr Licht aufnehmen'
    };
  }
  return { ok: true, hinweis: null };
}

// ===== OCR mit Tesseract.js =====
async function runOCR(file) {
  // Bild vorverarbeiten für bessere OCR
  showStatus('Bild wird vorbereitet…');
  const verarbeitetesBlob = await bildVorverarbeiten(file);

  const worker = await Tesseract.createWorker('deu', 1, {
    logger: m => {
      if (m.status === 'recognizing text') {
        const pct = Math.round(m.progress * 100);
        showStatus(`Text wird erkannt… ${pct}%`);
      }
    }
  });

  // Optimierte Parameter für Handschrift & gedruckten Text
  await worker.setParameters({
    tessedit_pageseg_mode: '6',      // Einheitlicher Textblock
    preserve_interword_spaces: '1',  // Wortabstände erhalten
  });

  const { data: { text } } = await worker.recognize(verarbeitetesBlob);
  await worker.terminate();

  // Qualität prüfen
  const qualitaet = pruefeOCRQualitaet(text);
  if (!qualitaet.ok) {
    // Warnung anzeigen aber trotzdem weitermachen
    const weiter = confirm(qualitaet.hinweis + '\n\nTrotzdem analysieren?');
    if (!weiter) throw new Error('Analyse abgebrochen. Bitte ein besseres Foto aufnehmen.');
  }

  return text;
}

// ===== Ergebnis rendern =====
function renderResult(originalText, analysis) {
  const errors = analysis.errors || [];

  // ── Markierten Text erstellen ──
  markedTextEl.innerHTML = buildMarkedHtml(originalText, errors);

  // ── Zusammenfassung ──
  const counts = { spelling: 0, grammar: 0, punctuation: 0, other: 0 };
  errors.forEach(e => {
    if (counts[e.type] !== undefined) counts[e.type]++;
    else counts.other++;
  });
  const total = errors.length;

  summaryBoxEl.innerHTML = `
    <div class="summary-stat total">
      <span class="count">${total}</span>
      <span class="label">Fehler insgesamt</span>
    </div>
    <div class="summary-stat spelling">
      <span class="count">${counts.spelling}</span>
      <span class="label">Rechtschreibfehler</span>
    </div>
    <div class="summary-stat grammar">
      <span class="count">${counts.grammar}</span>
      <span class="label">Grammatikfehler</span>
    </div>
    <div class="summary-stat punctuation">
      <span class="count">${counts.punctuation}</span>
      <span class="label">Zeichensetzungsfehler</span>
    </div>
    <div class="summary-stat other">
      <span class="count">${counts.other}</span>
      <span class="label">Sonstige Fehler</span>
    </div>
  `;

  // ── Tabs zurücksetzen ──
  tabs.forEach(t => t.classList.remove('active'));
  tabs[0].classList.add('active');
  document.querySelectorAll('.tab-content').forEach(c => c.hidden = true);
  document.getElementById('tab-marked').hidden = false;

  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== Fehler im Text markieren =====
function buildMarkedHtml(text, errors) {
  if (errors.length === 0) {
    return escapeHtml(text) + '\n\n<em style="color:#38a169;font-style:normal;">✅ Keine Fehler gefunden!</em>';
  }

  const matches = [];
  for (const error of errors) {
    const wrong = error.wrong;
    if (!wrong) continue;
    let searchFrom = 0;
    while (searchFrom < text.length) {
      const idx = text.indexOf(wrong, searchFrom);
      if (idx === -1) break;
      matches.push({ start: idx, end: idx + wrong.length, error });
      searchFrom = idx + 1;
    }
  }

  matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

  const filtered = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }

  let html = '';
  let cursor = 0;
  for (const m of filtered) {
    html += escapeHtml(text.slice(cursor, m.start));
    const cssClass = 'err-' + (m.error.type || 'other');
    const tooltip = escapeAttr(`✏️ ${m.error.correct}  –  ${m.error.explanation}`);
    html += `<mark class="${cssClass}" title="${tooltip}">${escapeHtml(text.slice(m.start, m.end))}</mark>`;
    cursor = m.end;
  }
  html += escapeHtml(text.slice(cursor));
  return html;
}

// ===== Hilfsfunktionen =====
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showStatus(msg) {
  statusText.textContent = msg;
  statusBar.hidden = false;
}

function hideStatus() {
  statusBar.hidden = true;
}
