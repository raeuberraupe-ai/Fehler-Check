// ===================================================
//  Deutsche Fehler-KI – Duden-Niveau
// ===================================================
const FehlerKI = (() => {

  // ══════════════════════════════════════════════
  //  RECHTSCHREIBWÖRTERBUCH
  // ══════════════════════════════════════════════
  const wb = {
    // ── ß / ss ──
    'hies':'hieß','hiess':'hieß','heissen':'heißen','heisst':'heißt','heist':'heißt',
    'weiss':'weiß','weisse':'weiße','weissen':'weißen',
    'grossen':'großen','grosse':'große','grosser':'größer','grosses':'großes','groses':'großes','grosen':'großen',
    'suses':'süßes','suss':'süß','suse':'süße','sussen':'süßen',
    'fleissig':'fleißig','fleisig':'fleißig',
    'strasse':'Straße','strase':'Straße','strassen':'Straßen',
    'draussen':'draußen','drausen':'draußen',
    'spass':'Spaß','spas':'Spaß','spasse':'Späße',
    'fuss':'Fuß','fusse':'Füße','fussen':'Füßen',
    'grüssen':'grüßen','grüsen':'grüßen','grüsst':'grüßt',
    'schliesslich':'schließlich','schlieslich':'schließlich','schließich':'schließlich',
    'ausserdem':'außerdem','ausserdem':'außerdem',
    'muss':'muss','musste':'musste','müssen':'müssen',
    'lass':'lass','lassen':'lassen',

    // ── ie / ei Verwechslung ──
    'nein':'nein','kein':'kein','sein':'sein','mein':'mein',
    'bleibt':'bleibt','scheint':'scheint','heißt':'heißt',

    // ── Häufige Tippfehler ──
    'villeicht':'vielleicht','vileicht':'vielleicht','vieleicht':'vielleicht',
    'warscheinlich':'wahrscheinlich','warscheinlch':'wahrscheinlich','wahrscheinlch':'wahrscheinlich',
    'eigendlich':'eigentlich','eigendtlich':'eigentlich','eigentich':'eigentlich',
    'nemlich':'nämlich','nehmlich':'nämlich','nähmlich':'nämlich',
    'tschüs':'tschüss','tschüß':'tschüss',
    'nochmal':'noch mal','nichtmehr':'nicht mehr','auchmal':'auch mal',
    'sowiso':'sowieso','soweiso':'sowieso',
    'ungefär':'ungefähr','ungefähr':'ungefähr',
    'natürlich':'natürlich','natürlich':'natürlich',
    'plötzich':'plötzlich','plözlich':'plötzlich','plötzich':'plötzlich',
    'schliesslich':'schließlich',
    'zuhause':'zu Hause','nachhause':'nach Hause',
    'aufwiedersehen':'Auf Wiedersehen',
    'leckerly':'Leckerli','leckerlie':'Leckerli',
    'belle':'bellte',

    // ── Fremdwörter ──
    'spagetti':'Spaghetti','spagheti':'Spaghetti','spaghettti':'Spaghetti',
    'interesant':'interessant','interessannt':'interessant','interressant':'interessant',
    'fantastich':'fantastisch','fantasisch':'fantastisch',
    'computor':'Computer','komputer':'Computer',
    'telefon':'Telefon','telephon':'Telefon',
    'fotografie':'Fotografie','photografie':'Fotografie',
    'musik':'Musik','musick':'Musik',
    'theater':'Theater','teater':'Theater',
    'bibliothek':'Bibliothek','bibliotheck':'Bibliothek',
    'gymnasium':'Gymnasium','gimnasium':'Gymnasium',
    'mathematik':'Mathematik','matematik':'Mathematik','mathmatik':'Mathematik',
    'physik':'Physik','füsik':'Physik',
    'chemie':'Chemie','chemi':'Chemie',
    'biologie':'Biologie','biologi':'Biologie',
    'geographie':'Geographie','geografie':'Geografie',
    'philosophie':'Philosophie','filosophie':'Philosophie',
    'psychologie':'Psychologie','psichologie':'Psychologie',
    'technologie':'Technologie','technologi':'Technologie',
    'demokratie':'Demokratie','demokrati':'Demokratie',
    'republik':'Republik','repuplik':'Republik',
    'parlament':'Parlament','parlamente':'Parlamente',
    'präsident':'Präsident','president':'Präsident',
    'minister':'Minister','ministter':'Minister',
    'professor':'Professor','professer':'Professor',
    'doktor':'Doktor','dokter':'Doktor',
    'direktor':'Direktor','direkter':'Direktor',
    'sekretär':'Sekretär','sekretähr':'Sekretär',

    // ── Groß-/Kleinschreibung Nomen ──
    'tages':'Tages','morgens':'Morgens','abends':'Abends','nachts':'Nachts',
    'montags':'montags','dienstags':'dienstags','mittwochs':'mittwochs',

    // ── Zusammen-/Getrenntschreibung ──
    'sogut':'so gut','sooft':'so oft','soweit':'so weit','soviel':'so viel',
    'wieviel':'wie viel','wieweit':'wie weit','wieso':'wieso',
    'irgendwie':'irgendwie','irgendwo':'irgendwo','irgendwann':'irgendwann',
    'überall':'überall','nirgends':'nirgends','nirgendwo':'nirgendwo',
    'trotzdem':'trotzdem','dennoch':'dennoch','deshalb':'deshalb',
    'deswegen':'deswegen','weshalb':'weshalb','weswegen':'weswegen',
    'obwohl':'obwohl','obgleich':'obgleich','obschon':'obschon',
    'während':'während','wahrend':'während','warend':'während',
    'nachdem':'nachdem','bevor':'bevor','sobald':'sobald',
    'solange':'solange','sofern':'sofern','falls':'falls',

    // ── Verben häufig falsch ──
    'hat gesagt':'hat gesagt','haben gesagt':'haben gesagt',
    'ist gegangen':'ist gegangen','sind gegangen':'sind gegangen',
    'hat gemacht':'hat gemacht','haben gemacht':'haben gemacht',

    // ── Adjektive ──
    'schöen':'schönen','schöen':'schönen',
    'kleinen':'kleinen','kleine':'kleine','kleiner':'kleiner',
    'grossen':'großen','grosse':'große',
    'alten':'alten','alte':'alte','alter':'alter',
    'neuen':'neuen','neue':'neue','neuer':'neuer',
    'guten':'guten','gute':'gute','guter':'guter',
    'schlechten':'schlechten','schlechte':'schlechte',
    'langen':'langen','lange':'lange','langer':'langer',
    'kurzen':'kurzen','kurze':'kurze','kurzer':'kurzer',
    'hohen':'hohen','hohe':'hohe','hoher':'hoher',
    'tiefen':'tiefen','tiefe':'tiefe','tiefer':'tiefer',
    'breiten':'breiten','breite':'breite','breiter':'breiter',
    'schmalen':'schmalen','schmale':'schmale','schmaler':'schmaler',
    'schnellen':'schnellen','schnelle':'schnelle','schneller':'schneller',
    'langsamen':'langsamen','langsame':'langsame','langsamer':'langsamer',
    'starken':'starken','starke':'starke','starker':'stärker',
    'schwachen':'schwachen','schwache':'schwache','schwacher':'schwächer',
    'harten':'harten','harte':'harte','harter':'härter',
    'weichen':'weichen','weiche':'weiche','weicher':'weicher',
    'warmen':'warmen','warme':'warme','warmer':'wärmer',
    'kalten':'kalten','kalte':'kalte','kälter':'kälter',
    'hellen':'hellen','helle':'helle','heller':'heller',
    'dunklen':'dunklen','dunkle':'dunkle','dunkler':'dunkler',
    'lauten':'lauten','laute':'laute','lauter':'lauter',
    'leisen':'leisen','leise':'leise','leiser':'leiser',
    'süssen':'süßen','süsse':'süße','süsser':'süßer',
    'bitteren':'bitteren','bittere':'bittere','bitterer':'bitterer',
    'sauren':'sauren','saure':'saure','saurer':'saurer',
    'salzigen':'salzigen','salzige':'salzige','salziger':'salziger',

    // ── Pronomen ──
    'mir':'mir','mich':'mich','dir':'dir','dich':'dich',
    'ihm':'ihm','ihn':'ihn','ihr':'ihr','sie':'sie',
    'uns':'uns','euch':'euch','ihnen':'ihnen','Ihnen':'Ihnen',

    // ── Präpositionen ──
    'wegen':'wegen','trotz':'trotz','während':'während','innerhalb':'innerhalb',
    'außerhalb':'außerhalb','oberhalb':'oberhalb','unterhalb':'unterhalb',
    'diesseits':'diesseits','jenseits':'jenseits','anstatt':'anstatt',
    'statt':'statt','anstelle':'anstelle',

    // ── Konjunktionen ──
    'obwohl':'obwohl','obgleich':'obgleich','wenngleich':'wenngleich',
    'sofern':'sofern','insofern':'insofern','indem':'indem',
    'sodass':'sodass','so dass':'sodass',

    // ── Zahlen als Wörter ──
    'eins':'eins','zwei':'zwei','drei':'drei','vier':'vier','fünf':'fünf',
    'sechs':'sechs','sieben':'sieben','acht':'acht','neun':'neun','zehn':'zehn',
    'elf':'elf','zwölf':'zwölf','zwolf':'zwölf','zwölff':'zwölf',
    'dreizehn':'dreizehn','vierzehn':'vierzehn','fünfzehn':'fünfzehn',
    'sechzehn':'sechzehn','siebzehn':'siebzehn','achtzehn':'achtzehn','neunzehn':'neunzehn',
    'zwanzig':'zwanzig','dreißig':'dreißig','dreissig':'dreißig',
    'vierzig':'vierzig','fünfzig':'fünfzig','sechzig':'sechzig',
    'siebzig':'siebzig','achtzig':'achtzig','neunzig':'neunzig',
    'hundert':'hundert','tausend':'tausend','million':'Million','milliarde':'Milliarde',
    'erste':'erste','zweite':'zweite','dritte':'dritte','vierte':'vierte',
    'fünfte':'fünfte','sechste':'sechste','siebte':'siebte','achte':'achte',

    // ── Zeitwörter ──
    'gestern':'gestern','heute':'heute','morgen':'morgen','übermorgen':'übermorgen',
    'vorgestern':'vorgestern','jetzt':'jetzt','gleich':'gleich','bald':'bald',
    'später':'später','früher':'früher','immer':'immer','nie':'nie','niemals':'niemals',
    'manchmal':'manchmal','oft':'oft','selten':'selten','meistens':'meistens',
    'normalerweise':'normalerweise','gewöhnlich':'gewöhnlich','üblicherweise':'üblicherweise',

    // ── Schulwortschatz ──
    'aufgabe':'Aufgabe','hausaufgabe':'Hausaufgabe','prüfung':'Prüfung',
    'klassenarbeit':'Klassenarbeit','klausur':'Klausur','abitur':'Abitur',
    'zeugnis':'Zeugnis','note':'Note','benotung':'Benotung',
    'unterricht':'Unterricht','stunde':'Stunde','pause':'Pause',
    'schulhof':'Schulhof','turnhalle':'Turnhalle','mensa':'Mensa',
    'lehrerzimmer':'Lehrerzimmer','sekretariat':'Sekretariat',
    'schüler':'Schüler','schülerin':'Schülerin','lehrer':'Lehrer','lehrerin':'Lehrerin',
    'direktor':'Direktor','direktorin':'Direktorin','rektor':'Rektor',
    'klasse':'Klasse','jahrgang':'Jahrgang','semester':'Semester',
    'fach':'Fach','thema':'Thema','kapitel':'Kapitel','seite':'Seite',
    'absatz':'Absatz','überschrift':'Überschrift','einleitung':'Einleitung',
    'hauptteil':'Hauptteil','schluss':'Schluss','fazit':'Fazit',
    'zusammenfassung':'Zusammenfassung','inhaltsangabe':'Inhaltsangabe',
    'aufsatz':'Aufsatz','erörterung':'Erörterung','analyse':'Analyse',
    'interpretation':'Interpretation','kommentar':'Kommentar',
    'vokabeln':'Vokabeln','grammatik':'Grammatik','rechtschreibung':'Rechtschreibung',
    'zeichensetzung':'Zeichensetzung','satzbau':'Satzbau',
  };

  // ══════════════════════════════════════════════
  //  NOMENLISTE
  // ══════════════════════════════════════════════
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
    'januar','februar','märz','april','mai','juni','juli','august',
    'september','oktober','november','dezember',
    'deutschland','österreich','schweiz','berlin','wien','zürich',
    'schüler','schülerin','unterricht','pause','klasse',
    'aufgabe','hausaufgabe','prüfung','test','note','zeugnis',
    'geschichte','mathematik','deutsch','englisch','sport','kunst',
    'fehler','antwort','frage','lösung','ergebnis','beispiel',
    'schwanz','pfote','schnauze','fell','flügel','schnabel',
    'hündchen','kätzchen','vögelchen',
    'tisch','lampe','sofa','küche','bad','schlafzimmer','wohnzimmer',
    'gabel','löffel','messer','teller','tasse','glas','flasche','topf',
    'schrank','regal','spiegel','vorhang','teppich','kissen','decke',
    'computer','handy','tablet','fernseher','radio','kamera',
    'brief','paket','post','zeitung','zeitschrift','magazin',
    'arzt','ärztin','krankenhaus','apotheke','medizin',
    'polizei','feuerwehr','krankenhaus','rathaus','kirche','moschee',
    'supermarkt','bäckerei','metzgerei','buchhandlung','bibliothek',
    'restaurant','café','hotel','kino','theater','museum','zoo',
    'bahnhof','flughafen','hafen','bushaltestelle',
    'straße','allee','gasse','platz','brücke','tunnel','kreuzung',
    'dorf','stadt','gemeinde','bezirk','bundesland','hauptstadt',
    'europa','asien','afrika','amerika','australien',
    'sommer','winter','herbst','frühling','jahreszeit',
    'regen','schnee','eis','frost','hitze','kälte','wind','sturm','gewitter',
    'wolke','nebel','tau','hagel','blitz','donner',
    'hügel','ebene','küste','insel','halbinsel','kontinent',
    'fluss','bach','see','teich','ozean','meer','welle','strand',
    'stein','fels','sand','erde','lehm','ton','kies',
    'gold','silber','eisen','stahl','kupfer','aluminium','holz','glas','plastik',
    'rose','tulpe','sonnenblume','gänseblümchen','veilchen','lilie',
    'eiche','buche','fichte','kiefer','birke','linde','ahorn','weide',
    'apfel','birne','pflaume','kirsche','erdbeere','himbeere','blaubeere',
    'karotte','kartoffel','tomate','gurke','salat','spinat','zwiebel','knoblauch',
    'hase','fuchs','wolf','bär','hirsch','reh','wildschwein','igel','maus','ratte',
    'adler','eule','specht','schwalbe','amsel','drossel','meise','rotkehlchen',
    'forelle','lachs','hecht','karpfen','aal','hai','delfin','wal',
    'schmetterling','biene','wespe','ameise','käfer','fliege','mücke','spinne',
    'schlange','eidechse','frosch','kröte','salamander',
  ]);

  // ══════════════════════════════════════════════
  //  ZEITFORMEN-REGELN
  //  Präsens / Präteritum / Perfekt /
  //  Plusquamperfekt / Futur I & II
  // ══════════════════════════════════════════════

  // Verben die Perfekt mit SEIN bilden (Bewegung/Zustandsänderung)
  const seinVerben = [
    'gegangen','gelaufen','gefahren','geflogen','geschwommen','geklettert',
    'gesprungen','gerannt','gekrochen','geritten','gesegelt','gewandert',
    'gekommen','angekommen','weggegangen','zurückgekommen','aufgestanden',
    'eingeschlafen','aufgewacht','geworden','geblieben','gewesen',
    'gestorben','gestürzt','gefallen','gesunken','gestiegen','aufgestiegen',
    'eingestiegen','ausgestiegen','umgestiegen','abgefahren','abgereist',
    'erschienen','verschwunden','passiert','geschehen','entstanden',
    'gewachsen','gereift','gealtert','erkrankt','genesen',
  ];

  const zeitformenRegeln = [

    // ── PERFEKT: haben statt sein ──
    ...seinVerben.map(v => ({
      muster: new RegExp(`\\b(ich|er|sie|es|man)\\s+ha(be|t|ben|bt)\\s+(\\w+\\s+)?${v}\\b`, 'gi'),
      wrong: `habe/hat ${v}`, correct: `bin/ist ${v}`,
      type: 'grammar',
      explanation: `Perfekt mit "sein": "bin/ist ${v}", nicht "habe/hat ${v}"`
    })),

    // ── PERFEKT: sein statt haben (falsch) ──
    {
      muster: /\b(ich|er|sie|es)\s+bin\s+(\w+\s+)?(gemacht|gesagt|gegessen|getrunken|gelesen|geschrieben|gespielt|gekauft|gebracht|gedacht|gewusst|gehabt|gearbeitet|gelernt|gefragt|geantwortet|gehört|gesehen|gefunden|genommen|gegeben|gezeigt|erklärt|verstanden|vergessen|erinnert|gewartet|gesucht|gerufen|gelacht|geweint)\b/gi,
      wrong: 'bin gemacht/gesagt/...', correct: 'habe gemacht/gesagt/...',
      type: 'grammar',
      explanation: 'Dieses Verb bildet das Perfekt mit "haben", nicht "sein"'
    },

    // ── PRÄTERITUM häufige Fehler ──
    // "er hat gegangen" statt "er ging"
    { muster: /\b(er|sie|es|man)\s+hat\s+gegangen\b/gi,
      wrong: 'hat gegangen', correct: 'ging / ist gegangen',
      type: 'grammar', explanation: 'Präteritum: "ging" oder Perfekt: "ist gegangen"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+gekommen\b/gi,
      wrong: 'hat gekommen', correct: 'kam / ist gekommen',
      type: 'grammar', explanation: 'Präteritum: "kam" oder Perfekt: "ist gekommen"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+gefahren\b/gi,
      wrong: 'hat gefahren', correct: 'fuhr / ist gefahren',
      type: 'grammar', explanation: 'Präteritum: "fuhr" oder Perfekt: "ist gefahren"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+gelaufen\b/gi,
      wrong: 'hat gelaufen', correct: 'lief / ist gelaufen',
      type: 'grammar', explanation: 'Präteritum: "lief" oder Perfekt: "ist gelaufen"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+geworden\b/gi,
      wrong: 'hat geworden', correct: 'wurde / ist geworden',
      type: 'grammar', explanation: 'Präteritum: "wurde" oder Perfekt: "ist geworden"' },
    { muster: /\b(er|sie|es|man)\s+hat\s+geblieben\b/gi,
      wrong: 'hat geblieben', correct: 'blieb / ist geblieben',
      type: 'grammar', explanation: 'Präteritum: "blieb" oder Perfekt: "ist geblieben"' },

    // ── PRÄTERITUM starke Verben falsch gebildet ──
    { muster: /\b(ich|er|sie|es)\s+gehte\b/gi,
      wrong: 'gehte', correct: 'ging',
      type: 'grammar', explanation: 'Präteritum von "gehen" ist "ging", nicht "gehte"' },
    { muster: /\b(ich|er|sie|es)\s+komte\b/gi,
      wrong: 'komte', correct: 'kam',
      type: 'grammar', explanation: 'Präteritum von "kommen" ist "kam", nicht "komte"' },
    { muster: /\b(ich|er|sie|es)\s+fahrete\b/gi,
      wrong: 'fahrete', correct: 'fuhr',
      type: 'grammar', explanation: 'Präteritum von "fahren" ist "fuhr", nicht "fahrete"' },
    { muster: /\b(ich|er|sie|es)\s+laufte\b/gi,
      wrong: 'laufte', correct: 'lief',
      type: 'grammar', explanation: 'Präteritum von "laufen" ist "lief", nicht "laufte"' },
    { muster: /\b(ich|er|sie|es)\s+schreibte\b/gi,
      wrong: 'schreibte', correct: 'schrieb',
      type: 'grammar', explanation: 'Präteritum von "schreiben" ist "schrieb", nicht "schreibte"' },
    { muster: /\b(ich|er|sie|es)\s+leste\b/gi,
      wrong: 'leste', correct: 'las',
      type: 'grammar', explanation: 'Präteritum von "lesen" ist "las", nicht "leste"' },
    { muster: /\b(ich|er|sie|es)\s+sehte\b/gi,
      wrong: 'sehte', correct: 'sah',
      type: 'grammar', explanation: 'Präteritum von "sehen" ist "sah", nicht "sehte"' },
    { muster: /\b(ich|er|sie|es)\s+nehme\b/gi,
      wrong: 'nehme', correct: 'nahm',
      type: 'grammar', explanation: 'Präteritum von "nehmen" ist "nahm", nicht "nehme"' },
    { muster: /\b(ich|er|sie|es)\s+gebte\b/gi,
      wrong: 'gebte', correct: 'gab',
      type: 'grammar', explanation: 'Präteritum von "geben" ist "gab", nicht "gebte"' },
    { muster: /\b(ich|er|sie|es)\s+trinkete\b/gi,
      wrong: 'trinkete', correct: 'trank',
      type: 'grammar', explanation: 'Präteritum von "trinken" ist "trank", nicht "trinkete"' },
    { muster: /\b(ich|er|sie|es)\s+esste\b/gi,
      wrong: 'esste', correct: 'aß',
      type: 'grammar', explanation: 'Präteritum von "essen" ist "aß", nicht "esste"' },
    { muster: /\b(ich|er|sie|es)\s+singte\b/gi,
      wrong: 'singte', correct: 'sang',
      type: 'grammar', explanation: 'Präteritum von "singen" ist "sang", nicht "singte"' },
    { muster: /\b(ich|er|sie|es)\s+springte\b/gi,
      wrong: 'springte', correct: 'sprang',
      type: 'grammar', explanation: 'Präteritum von "springen" ist "sprang", nicht "springte"' },
    { muster: /\b(ich|er|sie|es)\s+finde\b/gi,
      wrong: 'finde', correct: 'fand',
      type: 'grammar', explanation: 'Präteritum von "finden" ist "fand", nicht "finde"' },
    { muster: /\b(ich|er|sie|es)\s+stehte\b/gi,
      wrong: 'stehte', correct: 'stand',
      type: 'grammar', explanation: 'Präteritum von "stehen" ist "stand", nicht "stehte"' },

    // ── PLUSQUAMPERFEKT Fehler ──
    { muster: /\b(ich|er|sie|es)\s+hatte\s+gegangen\b/gi,
      wrong: 'hatte gegangen', correct: 'war gegangen',
      type: 'grammar', explanation: 'Plusquamperfekt von "gehen": "war gegangen", nicht "hatte gegangen"' },
    { muster: /\b(ich|er|sie|es)\s+hatte\s+gekommen\b/gi,
      wrong: 'hatte gekommen', correct: 'war gekommen',
      type: 'grammar', explanation: 'Plusquamperfekt von "kommen": "war gekommen", nicht "hatte gekommen"' },
    { muster: /\b(ich|er|sie|es)\s+hatte\s+gefahren\b/gi,
      wrong: 'hatte gefahren', correct: 'war gefahren',
      type: 'grammar', explanation: 'Plusquamperfekt von "fahren": "war gefahren", nicht "hatte gefahren"' },
    { muster: /\b(ich|er|sie|es)\s+hatte\s+geworden\b/gi,
      wrong: 'hatte geworden', correct: 'war geworden',
      type: 'grammar', explanation: 'Plusquamperfekt von "werden": "war geworden", nicht "hatte geworden"' },

    // ── FUTUR I Fehler ──
    { muster: /\b(ich|er|sie|es)\s+werde\s+\w+en\s+haben\b/gi,
      wrong: 'werde ... haben', correct: 'werde ... (Futur I)',
      type: 'grammar', explanation: 'Futur I: "werde + Infinitiv" (ohne "haben")' },
    // Futur I mit falschem Partizip statt Infinitiv
    { muster: /\b(ich|er|sie|es)\s+werde\s+(ge\w+)\b/gi,
      wrong: 'werde ge...', correct: 'werde ... (Infinitiv)',
      type: 'grammar', explanation: 'Futur I braucht den Infinitiv, nicht das Partizip II (ge-)' },

    // ── FUTUR II Fehler ──
    { muster: /\b(ich|er|sie|es)\s+werde\s+\w+\s+gehabt\b/gi,
      wrong: 'werde gehabt', correct: 'werde ... haben (Futur II)',
      type: 'grammar', explanation: 'Futur II: "werde + Partizip II + haben/sein"' },

    // ── KONJUNKTIV II häufige Fehler ──
    { muster: /\bwenn\s+ich\s+du\s+wäre\b/gi,
      wrong: 'wenn ich du wäre', correct: 'wenn ich du wäre / an deiner Stelle wäre',
      type: 'grammar', explanation: 'Konjunktiv II: "wenn ich an deiner Stelle wäre"' },
    { muster: /\b(ich|er|sie|es)\s+würde\s+\w+te\b/gi,
      wrong: 'würde ...te', correct: 'würde + Infinitiv',
      type: 'grammar', explanation: 'Konjunktiv II: "würde + Infinitiv", nicht "würde + Präteritum"' },
  ];

  // ══════════════════════════════════════════════
  //  VERWECHSLUNGSPAARE
  // ══════════════════════════════════════════════
  const verwechslungen = [
    {
      muster: /\b(glaube|denke|meine|sage|weiß|weiss|hoffe|finde|sehe|höre|merke|zeige|erkläre|verstehe|vergesse|erinnere|freue|ärgere|wundere|zweifle|wünsche|befürchte|vermute|bemerke|stimmt|stimme|wissen|ahne|spüre|fühle)\s+das\s+(?!heißt|ist|war|wird|wäre|hier|dort|da\b)/gi,
      wrong: 'das', correct: 'dass', type: 'grammar',
      explanation: '"dass" (Konjunktion) statt "das" (Artikel/Pronomen)'
    },
    {
      muster: /\bseit\b(?=\s+(ihr\b|wir\b|sie alle|alle\b|beide\b))/gi,
      wrong: 'seit', correct: 'seid', type: 'grammar',
      explanation: '"seid" (Verb: ihr seid) statt "seit" (Zeitangabe: seit gestern)'
    },
    {
      muster: /\bwider\s+(kommen|gehen|sehen|holen|finden|mal|einmal|da\b)/gi,
      wrong: 'wider', correct: 'wieder', type: 'spelling',
      explanation: '"wieder" (nochmal) statt "wider" (gegen etwas)'
    },
    {
      muster: /\bals wie\b/gi,
      wrong: 'als wie', correct: 'als', type: 'grammar',
      explanation: 'Bei Vergleichen: nur "als", nicht "als wie"'
    },
    {
      muster: /\bam meisten\s+\w+sten\b/gi,
      wrong: 'am meisten', correct: '(Superlativ prüfen)', type: 'grammar',
      explanation: 'Doppelter Superlativ: entweder "am meisten" oder "-sten"'
    },
    {
      muster: /\bich\s+habe\s+\w+\s+geworden\b/gi,
      wrong: 'habe geworden', correct: 'bin geworden', type: 'grammar',
      explanation: '"werden" bildet das Perfekt mit "sein", nicht "haben"'
    },
    {
      muster: /\bich\s+habe\s+\w*\s*gegangen\b/gi,
      wrong: 'habe gegangen', correct: 'bin gegangen', type: 'grammar',
      explanation: '"gehen" bildet das Perfekt mit "sein", nicht "haben"'
    },
    {
      muster: /\bich\s+habe\s+\w*\s*gekommen\b/gi,
      wrong: 'habe gekommen', correct: 'bin gekommen', type: 'grammar',
      explanation: '"kommen" bildet das Perfekt mit "sein", nicht "haben"'
    },
    {
      muster: /\bich\s+habe\s+\w*\s*gefahren\b/gi,
      wrong: 'habe gefahren', correct: 'bin gefahren', type: 'grammar',
      explanation: '"fahren" bildet das Perfekt mit "sein", nicht "haben"'
    },
  ];

  // ══════════════════════════════════════════════
  //  HILFSFUNKTIONEN
  // ══════════════════════════════════════════════
  function findeWiederholungen(text) {
    const fehler = [];
    const woerter = text.split(/\s+/);
    for (let i = 0; i < woerter.length - 1; i++) {
      const w1 = woerter[i].toLowerCase().replace(/[.,!?;:"""]/g, '');
      const w2 = woerter[i+1].toLowerCase().replace(/[.,!?;:"""]/g, '');
      if (w1 === w2 && w1.length > 1) {
        fehler.push({
          wrong: woerter[i] + ' ' + woerter[i+1],
          correct: woerter[i],
          type: 'other',
          explanation: 'Doppeltes Wort – eines davon löschen'
        });
      }
    }
    return fehler;
  }

  function findeNomenKleingeschrieben(text) {
    const fehler = [];
    const saetze = text.split(/(?<=[.!?])\s+/);
    for (const satz of saetze) {
      const woerter = satz.trim().split(/\s+/);
      for (let i = 1; i < woerter.length; i++) {
        const wort = woerter[i].replace(/[.,!?;:"„"]/g, '');
        if (
          wort.length > 2 &&
          wort[0] === wort[0].toLowerCase() &&
          nomen.has(wort.toLowerCase())
        ) {
          fehler.push({
            wrong: wort,
            correct: wort.charAt(0).toUpperCase() + wort.slice(1),
            type: 'spelling',
            explanation: `Nomen müssen großgeschrieben werden: "${wort}" → "${wort.charAt(0).toUpperCase() + wort.slice(1)}"`
          });
        }
      }
    }
    return fehler;
  }

  function findeKommaFehler(text) {
    const fehler = [];
    const konjunktionen = ['dass','weil','obwohl','damit','sodass','nachdem',
                           'bevor','während','obgleich','sofern','sobald',
                           'solange','weshalb','weswegen','wodurch','indem',
                           'insofern','wenngleich','obschon','falls','wenn'];
    for (const konj of konjunktionen) {
      const muster = new RegExp(`([^,!?.:;\\n])\\s+(${konj})\\s`, 'gi');
      let treffer;
      while ((treffer = muster.exec(text)) !== null) {
        fehler.push({
          wrong: treffer[1].trim() + ' ' + treffer[2],
          correct: treffer[1].trim() + ', ' + treffer[2],
          type: 'punctuation',
          explanation: `Vor "${konj}" fehlt ein Komma`
        });
      }
    }
    return fehler;
  }

  function findeArtikelFehler(text) {
    const fehler = [];
    // Dativ-Fehler: "in/an/auf/... einen X" → "einem X"
    const dativPraep = /\b(in|an|auf|unter|über|vor|hinter|neben|zwischen)\s+einen\s+([A-ZÄÖÜ][a-zäöüß]+)/g;
    let t;
    while ((t = dativPraep.exec(text)) !== null) {
      fehler.push({ wrong: t[0], correct: `${t[1]} einem ${t[2]}`, type: 'grammar',
        explanation: `Nach "${t[1]}" steht Dativ: "einem" statt "einen"` });
    }
    // "von/mit/bei/... ein X" → "einem X"
    const dativPraep2 = /\b(von|mit|bei|nach|seit|aus|zu|gegenüber)\s+ein\s+([A-ZÄÖÜ][a-zäöüß]+)/g;
    while ((t = dativPraep2.exec(text)) !== null) {
      fehler.push({ wrong: t[0], correct: `${t[1]} einem ${t[2]}`, type: 'grammar',
        explanation: `Nach "${t[1]}" steht Dativ: "einem" statt "ein"` });
    }
    return fehler;
  }

  function findeZeitformenFehler(text) {
    const fehler = [];
    const gesehen = new Set();
    for (const regel of zeitformenRegeln) {
      const m = new RegExp(regel.muster.source, regel.muster.flags);
      let t;
      while ((t = m.exec(text)) !== null) {
        const key = t[0].trim().toLowerCase();
        if (!gesehen.has(key)) {
          gesehen.add(key);
          fehler.push({
            wrong: t[0].trim(),
            correct: regel.correct,
            type: regel.type,
            explanation: regel.explanation
          });
        }
      }
    }
    return fehler;
  }

  function findeVerwechslungen(text) {
    const fehler = [];
    for (const regel of verwechslungen) {
      const m = new RegExp(regel.muster.source, regel.muster.flags);
      let t;
      while ((t = m.exec(text)) !== null) {
        fehler.push({
          wrong: t[0].trim(),
          correct: t[0].trim().replace(new RegExp(regel.wrong, 'i'), regel.correct),
          type: regel.type,
          explanation: regel.explanation
        });
      }
    }
    return fehler;
  }

  // ══════════════════════════════════════════════
  //  HAUPTANALYSE
  // ══════════════════════════════════════════════
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

    // Wort-für-Wort Rechtschreibprüfung
    const wortRe = /\b[\wäöüÄÖÜß]+\b/g;
    let t;
    while ((t = wortRe.exec(text)) !== null) {
      const wort = t[0];
      const klein = wort.toLowerCase();
      if (wb[klein] && wb[klein] !== null && wort !== wb[klein] && !gesehen.has(klein)) {
        gesehen.add(klein);
        alleFehler.push({
          wrong: wort, correct: wb[klein], type: 'spelling',
          explanation: `Rechtschreibfehler: "${wort}" → "${wb[klein]}"`
        });
      }
    }

    add(findeWiederholungen(text));
    add(findeNomenKleingeschrieben(text));
    add(findeKommaFehler(text));
    add(findeArtikelFehler(text));
    add(findeZeitformenFehler(text));
    add(findeVerwechslungen(text));

    return { errors: alleFehler };
  }

  return { analysiere };
})();
