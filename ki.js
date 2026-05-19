// Deutsche Fehler-KI
const FehlerKI = (() => {
  const wb = {
    'hies':'hieß','hiess':'hieß','heissen':'heißen','heisst':'heißt',
    'weiss':'weiß','weisse':'weiße','weissen':'weißen',
    'grossen':'großen','grosse':'große','grosser':'größer','grosses':'großes','grosen':'großen',
    'suses':'süßes','suss':'süß','suse':'süße','süsser':'süßer',
    'fleissig':'fleißig','fleisig':'fleißig',
    'strasse':'Straße','strase':'Straße','strassen':'Straßen',
    'draussen':'draußen','drausen':'draußen',
    'spass':'Spaß','spas':'Spaß',
    'fuss':'Fuß','fusse':'Füße',
    'grüssen':'grüßen','grüsen':'grüßen','grüsst':'grüßt',
    'schliesslich':'schließlich','schlieslich':'schließlich',
    'ausserdem':'außerdem',
    'villeicht':'vielleicht','vileicht':'vielleicht','vieleicht':'vielleicht',
    'warscheinlich':'wahrscheinlich',
    'eigendlich':'eigentlich','eigendtlich':'eigentlich','eigentich':'eigentlich',
    'nemlich':'nämlich','nehmlich':'nämlich','nähmlich':'nämlich',
    'tschüs':'tschüss','tschüß':'tschüss',
    'nochmal':'noch mal','nichtmehr':'nicht mehr','auchmal':'auch mal',
    'sowiso':'sowieso',
    'ungefär':'ungefähr',
    'plötzich':'plötzlich','plözlich':'plötzlich',
    'zuhause':'zu Hause','nachhause':'nach Hause',
    'aufwiedersehen':'Auf Wiedersehen',
    'leckerly':'Leckerli',
    'belle':'bellte',
    'spagetti':'Spaghetti','spagheti':'Spaghetti',
    'interesant':'interessant','interessannt':'interessant','interressant':'interessant',
    'fantastich':'fantastisch','fantasisch':'fantastisch',
    'computor':'Computer','komputer':'Computer',
    'telephon':'Telefon',
    'photografie':'Fotografie',
    'musick':'Musik',
    'teater':'Theater',
    'bibliotheck':'Bibliothek',
    'gimnasium':'Gymnasium',
    'matematik':'Mathematik','mathmatik':'Mathematik',
    'füsik':'Physik',
    'chemi':'Chemie',
    'biologi':'Biologie',
    'filosophie':'Philosophie',
    'psichologie':'Psychologie',
    'repuplik':'Republik',
    'president':'Präsident',
    'ministter':'Minister',
    'professer':'Professor',
    'dokter':'Doktor',
    'direkter':'Direktor',
    'sogut':'so gut','sooft':'so oft','soweit':'so weit','soviel':'so viel',
    'wieviel':'wie viel',
    'wahrend':'während','warend':'während',
    'dreissig':'dreißig','zwolf':'zwölf',
    'tages':'Tages',
    'aufgabe':'Aufgabe','hausaufgabe':'Hausaufgabe','prüfung':'Prüfung',
    'klassenarbeit':'Klassenarbeit','klausur':'Klausur','abitur':'Abitur',
    'zeugnis':'Zeugnis',
    'schulhof':'Schulhof','turnhalle':'Turnhalle',
    'lehrerzimmer':'Lehrerzimmer',
    'aufsatz':'Aufsatz','erörterung':'Erörterung',
    'inhaltsangabe':'Inhaltsangabe',
    'zeichensetzung':'Zeichensetzung',
  };

  const nomen = new Set([
    'hund','katze','haus','garten','schule','lehrer','lehrerin','kind','kinder',
    'mutter','vater','bruder','schwester','freund','freundin','freunde',
    'wasser','brot','milch','apfel','baum','blume','sonne','mond','stern',
    'himmel','erde','welt','land','stadt','straße','weg','brücke','fluss',
    'berg','tal','wald','wiese','meer','see','tag','nacht','morgen','abend',
    'woche','monat','jahr','stunde','minute','sekunde','uhr',
    'tisch','stuhl','bett','fenster','tür','boden','wand','decke','dach',
    'auto','bus','zug','fahrrad','flugzeug','schiff','boot',
    'buch','heft','stift','tasche','jacke','schuhe','kleid','hemd','hose',
    'ball','spiel','musik','film','bild','foto','brief','wort','satz','text',
    'farbe','form','größe','gewicht','preis','zahl','nummer','name',
    'tier','vogel','fisch','pferd','kuh','schwein','schaf','huhn',
    'blatt','gras','stein','sand','luft','feuer',
    'mensch','frau','mann','junge','mädchen','baby','familie',
    'dorf','markt','platz','park','feld',
    'winter','sommer','herbst','frühling',
    'montag','dienstag','mittwoch','donnerstag','freitag','samstag','sonntag',
    'januar','februar','märz','april','juni','juli','august',
    'september','oktober','november','dezember',
    'schüler','schülerin','unterricht','pause','klasse',
    'aufgabe','hausaufgabe','prüfung','test','note','zeugnis',
    'geschichte','mathematik','deutsch','englisch','sport','kunst',
    'fehler','antwort','frage','lösung','ergebnis','beispiel',
    'schwanz','pfote','schnauze','fell','flügel','schnabel',
    'hündchen','kätzchen','vögelchen',
    'lampe','sofa','küche','bad','schlafzimmer','wohnzimmer',
    'gabel','löffel','messer','teller','tasse','glas','flasche','topf',
    'schrank','regal','spiegel','teppich','kissen',
    'computer','handy','tablet','fernseher','radio','kamera',
    'zeitung','zeitschrift','magazin',
    'arzt','ärztin','krankenhaus','apotheke','medizin',
    'polizei','feuerwehr','rathaus','kirche',
    'supermarkt','bäckerei','bibliothek',
    'restaurant','café','hotel','kino','theater','museum','zoo',
    'bahnhof','flughafen','hafen',
    'regen','schnee','eis','frost','hitze','kälte','wind','sturm','gewitter',
    'wolke','nebel','hagel','blitz','donner',
    'hügel','küste','insel','kontinent',
    'bach','teich','ozean','welle','strand',
    'rose','tulpe','sonnenblume','lilie',
    'eiche','buche','fichte','kiefer','birke','linde',
    'birne','pflaume','kirsche','erdbeere','himbeere',
    'karotte','kartoffel','tomate','gurke','salat','spinat','zwiebel',
    'hase','fuchs','wolf','bär','hirsch','reh','igel','maus','ratte',
    'adler','eule','schwalbe','amsel','meise',
    'forelle','lachs','hai','delfin','wal',
    'schmetterling','biene','wespe','ameise','käfer','spinne',
    'schlange','frosch','kröte',
    'gedicht','roman','erzählung','märchen','fabel',
    'strophe','vers','reim','metapher',
    'held','heldin','erzähler','autor','autorin',
    'handlung','konflikt','höhepunkt','wendepunkt',
    'thema','motiv','symbol','ironie','satire',
    'hauptsatz','nebensatz',
    'subjekt','prädikat','objekt','adverbial','attribut',
    'nominativ','genitiv','dativ','akkusativ',
    'präsens','präteritum','perfekt','plusquamperfekt','futur',
  ]);

  // Perfekt mit SEIN
  const seinVerben = [
    'gegangen','gelaufen','gefahren','geflogen','geschwommen','geklettert',
    'gesprungen','gerannt','gekrochen','geritten','gesegelt','gewandert',
    'gekommen','angekommen','aufgestanden','eingeschlafen','aufgewacht',
    'geworden','geblieben','gewesen','gestorben','gestürzt','gefallen',
    'gesunken','gestiegen','erschienen','verschwunden','passiert','geschehen',
    'entstanden','gewachsen','erkrankt','genesen','abgereist',
  ];

  const zeitformenRegeln = [
    ...seinVerben.map(v => ({
      muster: new RegExp(`\\b(ich|er|sie|es|man)\\s+ha(be|t|ben|bt)\\s+(\\w+\\s+)?${v}\\b`, 'gi'),
      correct: `bin/ist ${v}`,
      type: 'grammar',
      explanation: `Perfekt mit "sein": "bin/ist ${v}", nicht "habe/hat ${v}"`
    })),
    { muster: /\b(ich|er|sie|es)\s+gehte\b/gi, correct:'ging', type:'grammar', explanation:'Präteritum von "gehen" → "ging"' },
    { muster: /\b(ich|er|sie|es)\s+komte\b/gi, correct:'kam', type:'grammar', explanation:'Präteritum von "kommen" → "kam"' },
    { muster: /\b(ich|er|sie|es)\s+fahrete\b/gi, correct:'fuhr', type:'grammar', explanation:'Präteritum von "fahren" → "fuhr"' },
    { muster: /\b(ich|er|sie|es)\s+laufte\b/gi, correct:'lief', type:'grammar', explanation:'Präteritum von "laufen" → "lief"' },
    { muster: /\b(ich|er|sie|es)\s+schreibte\b/gi, correct:'schrieb', type:'grammar', explanation:'Präteritum von "schreiben" → "schrieb"' },
    { muster: /\b(ich|er|sie|es)\s+leste\b/gi, correct:'las', type:'grammar', explanation:'Präteritum von "lesen" → "las"' },
    { muster: /\b(ich|er|sie|es)\s+sehte\b/gi, correct:'sah', type:'grammar', explanation:'Präteritum von "sehen" → "sah"' },
    { muster: /\b(ich|er|sie|es)\s+gebte\b/gi, correct:'gab', type:'grammar', explanation:'Präteritum von "geben" → "gab"' },
    { muster: /\b(ich|er|sie|es)\s+trinkete\b/gi, correct:'trank', type:'grammar', explanation:'Präteritum von "trinken" → "trank"' },
    { muster: /\b(ich|er|sie|es)\s+esste\b/gi, correct:'aß', type:'grammar', explanation:'Präteritum von "essen" → "aß"' },
    { muster: /\b(ich|er|sie|es)\s+singte\b/gi, correct:'sang', type:'grammar', explanation:'Präteritum von "singen" → "sang"' },
    { muster: /\b(ich|er|sie|es)\s+springte\b/gi, correct:'sprang', type:'grammar', explanation:'Präteritum von "springen" → "sprang"' },
    { muster: /\b(ich|er|sie|es)\s+stehte\b/gi, correct:'stand', type:'grammar', explanation:'Präteritum von "stehen" → "stand"' },
    { muster: /\b(ich|er|sie|es)\s+trüge\b/gi, correct:'trug', type:'grammar', explanation:'Präteritum von "tragen" → "trug"' },
    { muster: /\b(ich|er|sie|es)\s+schlüge\b/gi, correct:'schlug', type:'grammar', explanation:'Präteritum von "schlagen" → "schlug"' },
    { muster: /\b(ich|er|sie|es)\s+wüsche\b/gi, correct:'wusch', type:'grammar', explanation:'Präteritum von "waschen" → "wusch"' },
    { muster: /\b(ich|er|sie|es)\s+hatte\s+gegangen\b/gi, correct:'war gegangen', type:'grammar', explanation:'Plusquamperfekt "gehen" → "war gegangen"' },
    { muster: /\b(ich|er|sie|es)\s+hatte\s+gekommen\b/gi, correct:'war gekommen', type:'grammar', explanation:'Plusquamperfekt "kommen" → "war gekommen"' },
    { muster: /\b(ich|er|sie|es)\s+hatte\s+gefahren\b/gi, correct:'war gefahren', type:'grammar', explanation:'Plusquamperfekt "fahren" → "war gefahren"' },
    { muster: /\b(ich|er|sie|es)\s+hatte\s+geworden\b/gi, correct:'war geworden', type:'grammar', explanation:'Plusquamperfekt "werden" → "war geworden"' },
    { muster: /\b(ich|er|sie|es)\s+werde\s+(ge\w+)\b/gi, correct:'werde + Infinitiv', type:'grammar', explanation:'Futur I: Infinitiv verwenden, nicht Partizip II' },
    { muster: /\b(ich|er|sie|es)\s+würde\s+\w+te\b/gi, correct:'würde + Infinitiv', type:'grammar', explanation:'Konjunktiv II: "würde + Infinitiv", nicht Präteritum' },
  ];

  const verwechslungen = [
    { muster: /\b(glaube|denke|meine|sage|weiß|hoffe|finde|sehe|höre|merke|erkläre|verstehe|vergesse|freue|ärgere|wundere|zweifle|wünsche|befürchte|vermute|spüre|fühle)\s+das\s+(?!heißt|ist|war|wird|wäre|hier|dort|da\b)/gi,
      wrong:'das', correct:'dass', type:'grammar', explanation:'"dass" (Konjunktion) statt "das" (Artikel)' },
    { muster: /\bseit\b(?=\s+(ihr\b|wir\b|alle\b|beide\b))/gi,
      wrong:'seit', correct:'seid', type:'grammar', explanation:'"seid" (Verb) statt "seit" (Zeitangabe)' },
    { muster: /\bwider\s+(kommen|gehen|sehen|holen|finden|mal|einmal)\b/gi,
      wrong:'wider', correct:'wieder', type:'spelling', explanation:'"wieder" (nochmal) statt "wider" (gegen)' },
    { muster: /\bals wie\b/gi,
      wrong:'als wie', correct:'als', type:'grammar', explanation:'Bei Vergleichen nur "als", nicht "als wie"' },
    { muster: /\bmehr\s+(besser|größer|schneller|schöner|länger|kürzer)\b/gi,
      wrong:'mehr ...er', correct:'nur Komparativ', type:'grammar', explanation:'Doppelter Komparativ: "mehr" + "-er" ist falsch' },
    { muster: /\bnicht\s+kein\b/gi,
      wrong:'nicht kein', correct:'nicht / kein', type:'grammar', explanation:'Doppelte Verneinung: nur "nicht" oder "kein"' },
    { muster: /\bkein\s+nicht\b/gi,
      wrong:'kein nicht', correct:'kein / nicht', type:'grammar', explanation:'Doppelte Verneinung: nur "kein" oder "nicht"' },
    { muster: /\bfür\s+ich\b/gi,
      wrong:'für ich', correct:'für mich', type:'grammar', explanation:'Akkusativ: "für mich", nicht "für ich"' },
    { muster: /\bfür\s+er\b/gi,
      wrong:'für er', correct:'für ihn', type:'grammar', explanation:'Akkusativ: "für ihn", nicht "für er"' },
    { muster: /\bmit\s+mich\b/gi,
      wrong:'mit mich', correct:'mit mir', type:'grammar', explanation:'Dativ: "mit mir", nicht "mit mich"' },
    { muster: /\bmit\s+dich\b/gi,
      wrong:'mit dich', correct:'mit dir', type:'grammar', explanation:'Dativ: "mit dir", nicht "mit dich"' },
    { muster: /\bwegen\s+(dem|den)\s+[A-ZÄÖÜ]/g,
      wrong:'wegen dem/den', correct:'wegen des/der', type:'grammar', explanation:'"wegen" steht mit Genitiv: "wegen des/der"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+gegangen\b/gi,
      wrong:'hat gegangen', correct:'ist gegangen', type:'grammar', explanation:'"gehen" → Perfekt mit "sein"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+gekommen\b/gi,
      wrong:'hat gekommen', correct:'ist gekommen', type:'grammar', explanation:'"kommen" → Perfekt mit "sein"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+gefahren\b/gi,
      wrong:'hat gefahren', correct:'ist gefahren', type:'grammar', explanation:'"fahren" → Perfekt mit "sein"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+gelaufen\b/gi,
      wrong:'hat gelaufen', correct:'ist gelaufen', type:'grammar', explanation:'"laufen" → Perfekt mit "sein"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+geworden\b/gi,
      wrong:'hat geworden', correct:'ist geworden', type:'grammar', explanation:'"werden" → Perfekt mit "sein"' },
    { muster: /\bweil\s+\w+\s+(ist|hat|macht|geht|kommt|war|hatte|sagte)\b/gi,
      wrong:'weil ... Verb', correct:'weil ... Verb am Ende', type:'grammar', explanation:'Nach "weil" steht das Verb am Satzende' },
    { muster: /\bobwohl\s+\w+\s+(ist|hat|macht|geht|kommt|war|hatte)\b/gi,
      wrong:'obwohl ... Verb', correct:'obwohl ... Verb am Ende', type:'grammar', explanation:'Nach "obwohl" steht das Verb am Satzende' },
  ];

  function findeWiederholungen(text) {
    const fehler = [];
    const woerter = text.split(/\s+/);
    for (let i = 0; i < woerter.length - 1; i++) {
      const w1 = woerter[i].toLowerCase().replace(/[.,!?;:"""]/g, '');
      const w2 = woerter[i+1].toLowerCase().replace(/[.,!?;:"""]/g, '');
      if (w1 === w2 && w1.length > 1) {
        fehler.push({ wrong: woerter[i]+' '+woerter[i+1], correct: woerter[i],
          type:'other', explanation:'Doppeltes Wort – eines löschen' });
      }
    }
    return fehler;
  }

  function findeNomenKlein(text) {
    const fehler = [];
    const saetze = text.split(/(?<=[.!?])\s+/);
    for (const satz of saetze) {
      const woerter = satz.trim().split(/\s+/);
      for (let i = 1; i < woerter.length; i++) {
        const wort = woerter[i].replace(/[.,!?;:"„"]/g, '');
        if (wort.length > 2 && wort[0] === wort[0].toLowerCase() && nomen.has(wort.toLowerCase())) {
          fehler.push({ wrong: wort, correct: wort[0].toUpperCase()+wort.slice(1),
            type:'spelling', explanation:`Nomen großschreiben: "${wort}" → "${wort[0].toUpperCase()+wort.slice(1)}"` });
        }
      }
    }
    return fehler;
  }

  function findeKomma(text) {
    const fehler = [];
    const konj = ['dass','weil','obwohl','damit','sodass','nachdem','bevor',
                  'während','sofern','sobald','solange','weshalb','indem','falls','wenn'];
    for (const k of konj) {
      const m = new RegExp(`([^,!?.:;\\n])\\s+(${k})\\s`, 'gi');
      let t;
      while ((t = m.exec(text)) !== null) {
        fehler.push({ wrong: t[1].trim()+' '+t[2], correct: t[1].trim()+', '+t[2],
          type:'punctuation', explanation:`Vor "${k}" fehlt ein Komma` });
      }
    }
    return fehler;
  }

  function findeArtikel(text) {
    const fehler = [];
    let t;
    const r1 = /\b(in|an|auf|unter|über|vor|hinter|neben|zwischen)\s+einen\s+([A-ZÄÖÜ][a-zäöüß]+)/g;
    while ((t = r1.exec(text)) !== null)
      fehler.push({ wrong:t[0], correct:`${t[1]} einem ${t[2]}`, type:'grammar',
        explanation:`Nach "${t[1]}" Dativ: "einem" statt "einen"` });
    const r2 = /\b(von|mit|bei|nach|seit|aus|zu)\s+ein\s+([A-ZÄÖÜ][a-zäöüß]+)/g;
    while ((t = r2.exec(text)) !== null)
      fehler.push({ wrong:t[0], correct:`${t[1]} einem ${t[2]}`, type:'grammar',
        explanation:`Nach "${t[1]}" Dativ: "einem" statt "ein"` });
    return fehler;
  }

  function findeRegeln(text, regeln) {
    const fehler = [];
    const gesehen = new Set();
    for (const r of regeln) {
      const m = new RegExp(r.muster.source, r.muster.flags);
      let t;
      while ((t = m.exec(text)) !== null) {
        const key = t[0].trim().toLowerCase();
        if (!gesehen.has(key)) {
          gesehen.add(key);
          fehler.push({ wrong:t[0].trim(), correct:r.correct, type:r.type, explanation:r.explanation });
        }
      }
    }
    return fehler;
  }

  function analysiere(text) {
    const alleFehler = [];
    const gesehen = new Set();
    function add(liste) {
      for (const f of liste) {
        if (f.wrong && !gesehen.has(f.wrong.toLowerCase())) {
          gesehen.add(f.wrong.toLowerCase());
          alleFehler.push(f);
        }
      }
    }
    const wortRe = /\b[\wäöüÄÖÜß]+\b/g;
    let t;
    while ((t = wortRe.exec(text)) !== null) {
      const wort = t[0], klein = wort.toLowerCase();
      if (wb[klein] && wort !== wb[klein] && !gesehen.has(klein)) {
        gesehen.add(klein);
        alleFehler.push({ wrong:wort, correct:wb[klein], type:'spelling',
          explanation:`Rechtschreibfehler: "${wort}" → "${wb[klein]}"` });
      }
    }
    add(findeWiederholungen(text));
    add(findeNomenKlein(text));
    add(findeKomma(text));
    add(findeArtikel(text));
    add(findeRegeln(text, zeitformenRegeln));
    add(findeRegeln(text, verwechslungen));
    return { errors: alleFehler };
  }

  return { analysiere };
})();
