// ===== DOM Referenzen =====
const apiKeyInput      = document.getElementById('apiKey');
const toggleKeyBtn     = document.getElementById('toggleKey');
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

// ===== API Key Toggle =====
toggleKeyBtn.addEventListener('click', () => {
  const isPassword = apiKeyInput.type === 'password';
  apiKeyInput.type = isPassword ? 'text' : 'password';
  toggleKeyBtn.textContent = isPassword ? '🙈' : '👁';
});

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
  updateAnalyzeBtn();
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

// ===== Button aktivieren wenn Bild + Key vorhanden =====
function updateAnalyzeBtn() {
  analyzeBtn.disabled = !(currentFile && apiKeyInput.value.trim().startsWith('sk-'));
}

apiKeyInput.addEventListener('input', updateAnalyzeBtn);

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
  const apiKey = apiKeyInput.value.trim();
  if (!apiKey.startsWith('sk-')) {
    alert('Bitte einen gültigen OpenAI API-Key eingeben (beginnt mit sk-).');
    return;
  }

  analyzeBtn.disabled = true;
  resultSection.hidden = true;
  showStatus('Schritt 1/2: Text wird erkannt (OCR)…');

  try {
    // ── Schritt 1: OCR mit Tesseract.js ──
    const ocrText = await runOCR(currentFile);

    if (!ocrText || ocrText.trim().length < 5) {
      throw new Error('Der Text konnte nicht erkannt werden. Bitte ein klareres Foto verwenden.');
    }

    originalTextEl.textContent = ocrText;

    // ── Schritt 2: KI-Analyse mit OpenAI ──
    showStatus('Schritt 2/2: KI analysiert Fehler…');
    const analysisResult = await analyzeWithOpenAI(ocrText, apiKey);

    // ── Ergebnis anzeigen ──
    renderResult(ocrText, analysisResult);

  } catch (err) {
    console.error(err);
    alert('Fehler: ' + err.message);
  } finally {
    hideStatus();
    analyzeBtn.disabled = false;
    updateAnalyzeBtn();
  }
});

// ===== OCR mit Tesseract.js =====
async function runOCR(file) {
  const worker = await Tesseract.createWorker('deu', 1, {
    logger: m => {
      if (m.status === 'recognizing text') {
        const pct = Math.round(m.progress * 100);
        showStatus(`Schritt 1/2: Text wird erkannt… ${pct}%`);
      }
    }
  });

  const { data: { text } } = await worker.recognize(file);
  await worker.terminate();
  return text;
}

// ===== OpenAI GPT-4o Fehleranalyse =====
async function analyzeWithOpenAI(text, apiKey) {
  const systemPrompt = `Du bist ein Deutschlehrer und Korrekturexperte.
Analysiere den folgenden Text auf Fehler und gib das Ergebnis als JSON zurück.

Kategorien:
- "spelling": Rechtschreibfehler
- "grammar": Grammatikfehler
- "punctuation": Zeichensetzungsfehler
- "other": Sonstige Fehler (z.B. Groß-/Kleinschreibung, Ausdruck)

Antworte NUR mit einem JSON-Objekt in diesem Format:
{
  "errors": [
    {
      "wrong": "das falsche Wort/die falsche Phrase exakt wie im Text",
      "correct": "die korrekte Version",
      "type": "spelling|grammar|punctuation|other",
      "explanation": "kurze Erklärung auf Deutsch"
    }
  ]
}

Wichtig:
- "wrong" muss exakt so sein wie im Originaltext (Groß-/Kleinschreibung beachten)
- Finde alle Fehler, auch kleine
- Wenn kein Fehler vorhanden: { "errors": [] }`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analysiere diesen Text:\n\n${text}` }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || `HTTP ${response.status}`;
    throw new Error(`OpenAI API Fehler: ${msg}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch {
    throw new Error('Die KI-Antwort konnte nicht verarbeitet werden.');
  }
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

  // ── Tabs zurücksetzen auf ersten Tab ──
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

  // Alle Vorkommen jedes Fehlers im Text finden
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

  // Nach Position sortieren, längere Treffer bei Gleichstand zuerst
  matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));

  // Überlappungen entfernen (erste Markierung gewinnt)
  const filtered = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }

  // HTML aufbauen
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
