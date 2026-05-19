// ===================================================
//  Einfache deutsche Fehler-KI (regelbasiert)
//  Läuft komplett im Browser, kein API-Key nötig
// ===================================================

const FehlerKI = (() => {

  // ── 1. Rechtschreibwörterbuch (falsch → richtig) ──
  const rechtschreibung = {
    // ß-Fehler
    'hies': 'hieß', 'hiess': 'hieß', 'strasse': 'Straße', 'grossen': 'großen',
    'grosse': 'große', 'grosser': 'größer', 'grosses': 'großes', 'groses': 'großes',
    'grosen': 'großen', 'suses': 'süßes', 'suss': 'süß', 'suse': 'süße',
    'heissen': 'heißen', 'heisst': 'heißt', 'weiss': 'weiß', 'fleissig': 'fleißig',
    'muss': 'muss', 'musste': 'musste',

    // ie/ih Fehler
    'viel': 'viel', 'spiel': 'Spiel', 'lied': 'Lied',

    // Häufige Tippfehler
    'nichtmehr': 'nicht mehr', 'auchmal': 'auch mal', 'sogut': 'so gut',
    'zuhause': 'zu Hause', 'aufwiedersehen': 'Auf Wiedersehen',
    'tschüss': 'tschüss', 'tschüs': 'tschüss',

    // ei/ie Verwechslung
    'bleib': 'bleib', 'schreib': 'schreib',

    // Doppelkonsonanten
    'kommt': 'kommt', 'rennt': 'rennt',

    // Häufige Fehler
    'leckerly': 'Leckerli', 'leckerli': 'Leckerli',
    'belle': 'bellte', 'kaufte': 'kaufte',
    'villeicht': 'vielleicht', 'vielleicht': 'vielleicht',
    'warscheinlich': 'wahrscheinlich', 'wahrscheinlich': 'wahrscheinlich',
    'eigendlich': 'eigentlich', 'eigentlich': 'eigentlich',
    'nämlich': 'nämlich', 'nemlich': 'nämlich', 'nehmlich': 'nämlich',
    'natürlich': 'natürlich', 'natürlich': 'natürlich',
    'plötzlich': 'plötzlich', 'plötzlich': 'plötzlich',
    'freundlich': 'freundlich',
    'unterschied': 'Unterschied',
    'geschichte': 'Geschichte',
    'mädchen': 'Mädchen',
    'hündchen': 'Hündchen',
    'schwanz': 'Schwanz',
    'garten': 'Garten',
    'morgen': 'Morgen',
    'abend': 'Abend',
    'nacht': 'Nacht',
    'tag': 'Tag',
    'tages': 'Tages',
    'haus': 'Haus',
    'dorf': 'Dorf',
    'hund': 'Hund',
    'katze': 'Katze',
    'schule': 'Schule',
    'lehrer': 'Lehrer',
    'kind': 'Kind',
    'kinder': 'Kinder',
    'mutter': 'Mutter',
    'vater': 'Vater',
    'bruder': 'Bruder',
    'schwester': 'Schwester',
    'freund': 'Freund',
    'freunde': 'Freunde',
    'wasser': 'Wasser',
    'brot': 'Brot',
    'milch': 'Milch',
    'apfel': 'Apfel',
    'baum': 'Baum',
    'blume': 'Blume',
    'sonne': 'Sonne',
    'mond': 'Mond',
    'stern': 'Stern',
    'himmel': 'Himmel',
    'erde': 'Erde',
    'welt': 'Welt',
    'land': 'Land',
    'stadt': 'Stadt',
    'straße': 'Straße',
    'weg': 'Weg',
    'brücke': 'Brücke',
    'fluss': 'Fluss',
    'berg': 'Berg',
    'tal': 'Tal',
    'wald': 'Wald',
    'wiese': 'Wiese',
    'meer': 'Meer',
    'see': 'See',
  };

  // ── 2. das/dass Regel ──
  // "das" als Konjunktion (vor Verb) → "dass"
  // Vereinfachte Erkennung: "das" gefolgt von Subjekt+Verb-Muster
  const dassDassRegeln = [
    {
      // "ich glaube das er" → "ich glaube, dass er"
      muster: /\b(glaube|denke|meine|sage|weiß|weiss|hoffe|finde|sehe|höre|hore|merke|zeige|erkläre|erklare|verstehe|vergesse|vergiss|erinnere|freue|ärgere|argere|wundere|zweifle)\s+das\s+/gi,
      typ: 'grammar',
      erklaerung: '"das" als Konjunktion → "dass"'
    }
  ];

  // ── 3. Doppelte Wörter ──
  function findeWiederholungen(text) {
    const fehler = [];
    const woerter = text.split(/\s+/);
    for (let i = 0; i < woerter.length - 1; i++) {
      const w1 = woerter[i].toLowerCase().replace(/[.,!?;:]/g, '');
      const w2 = woerter[i + 1].toLowerCase().replace(/[.,!?;:]/g, '');
      if (w1 === w2 && w1.length > 1) {
        fehler.push({
          wrong: woerter[i] + ' ' + woerter[i + 1],
          correct: woerter[i],
          type: 'other',
          explanation: 'Doppeltes Wort – eines davon löschen'
        });
      }
    }
    return fehler;
  }

  // ── 4. Großschreibung nach Satzende ──
  function findeKleinschreibungNachPunkt(text) {
    const fehler = [];
    // Nach . ! ? muss Großbuchstabe kommen (außer Abkürzungen)
    const muster = /[.!?]\s+([a-zäöü][a-zäöüA-ZÄÖÜ]*)/g;
    let treffer;
    while ((treffer = muster.exec(text)) !== null) {
      const wort = treffer[1];
      // Abkürzungen ignorieren (sehr kurze Wörter)
      if (wort.length <= 2) continue;
      // Bekannte Kleinwörter die nach Punkt ok sind ignorieren
      const ausnahmen = ['bzw', 'usw', 'etc', 'ca', 'vs', 'dr', 'prof'];
      if (ausnahmen.includes(wort.toLowerCase())) continue;

      fehler.push({
        wrong: wort,
        correct: wort.charAt(0).toUpperCase() + wort.slice(1),
        type: 'spelling',
        explanation: 'Nach einem Satzende muss das nächste Wort großgeschrieben werden'
      });
    }
    return fehler;
  }

  // ── 5. Komma vor "und/oder/aber/denn/sondern" bei Nebensatz ──
  function findeKommaFehler(text) {
    const fehler = [];
    // Fehlendes Komma vor "dass", "weil", "obwohl", "wenn", "damit", "obwohl"
    const konjunktionen = ['dass', 'weil', 'obwohl', 'damit', 'sodass', 'nachdem', 'bevor', 'während', 'wahrend'];
    for (const konj of konjunktionen) {
      const muster = new RegExp(`(?<![,])\\s+(${konj})\\s`, 'gi');
      let treffer;
      while ((treffer = muster.exec(text)) !== null) {
        // Prüfe ob davor kein Komma ist
        const vorher = text.slice(Math.max(0, treffer.index - 1), treffer.index + 1);
        if (!vorher.includes(',')) {
          fehler.push({
            wrong: treffer[0].trim(),
            correct: ', ' + treffer[1],
            type: 'punctuation',
            explanation: `Vor "${konj}" fehlt ein Komma`
          });
        }
      }
    }
    return fehler;
  }

  // ── 6. Hauptanalyse ──
  function analysiere(text) {
    const fehler = [];
    const gefundenePositionen = new Set();

    // Rechtschreibung prüfen (Wort für Wort)
    const wortMuster = /\b[\wäöüÄÖÜß]+\b/g;
    let treffer;
    while ((treffer = wortMuster.exec(text)) !== null) {
      const wort = treffer[0];
      const wortKlein = wort.toLowerCase();
      const pos = treffer.index;

      if (rechtschreibung[wortKlein] !== undefined) {
        const korrekt = rechtschreibung[wortKlein];
        // Nur melden wenn das Wort wirklich falsch ist (nicht nur Großschreibung bei Nomen)
        if (wort !== korrekt && wortKlein !== korrekt.toLowerCase()) {
          if (!gefundenePositionen.has(pos)) {
            gefundenePositionen.add(pos);
            fehler.push({
              wrong: wort,
              correct: korrekt,
              type: 'spelling',
              explanation: `Rechtschreibfehler: "${wort}" → "${korrekt}"`
            });
          }
        }
      }
    }

    // Doppelte Wörter
    const wiederholungen = findeWiederholungen(text);
    fehler.push(...wiederholungen);

    // Kleinschreibung nach Punkt
    const grossFehler = findeKleinschreibungNachPunkt(text);
    fehler.push(...grossFehler);

    // Komma-Fehler
    const kommaFehler = findeKommaFehler(text);
    fehler.push(...kommaFehler);

    // Duplikate entfernen (gleiche "wrong"-Werte)
    const eindeutig = [];
    const gesehen = new Set();
    for (const f of fehler) {
      if (!gesehen.has(f.wrong)) {
        gesehen.add(f.wrong);
        eindeutig.push(f);
      }
    }

    return { errors: eindeutig };
  }

  return { analysiere };
})();
