// ═══════════════════════════════════════════════════════
//  THÈME : Statistiques
//  BO 2025 — session 2027
// ═══════════════════════════════════════════════════════

const QUESTIONS_STATS = [

  // ── Calculer une moyenne ──
  {
    id: "stat_001", theme: "stats",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 9 }, b: { min: 2, max: 9 }, c: { min: 2, max: 9 }, d: { min: 2, max: 9 } },
    enonce: (v) => `Moyenne de la série $${v.a} ; ${v.b} ; ${v.c} ; ${v.d}$`,
    bonneReponse: (v) => `$${((v.a + v.b + v.c + v.d) / 4)}$`,
    distracteurs: (v) => [
      `$${v.a + v.b + v.c + v.d}$`,
      `$${Math.max(v.a, v.b, v.c, v.d)}$`,
      `$${((v.a + v.b + v.c + v.d) / 4 + 1)}$`
    ]
  },

  // ── Médiane d'une série paire ──
  {
    id: "stat_002", theme: "stats", groupe : "mediane",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 5 }, b: { min: 6, max: 9 }, c: { min: 10, max: 14 }, d: { min: 15, max: 20 } },
    enonce: (v) => `Médiane de la série $${v.a} ; ${v.b} ; ${v.c} ; ${v.d}$`,
    bonneReponse: (v) => `$${(v.b + v.c) / 2}$`,
    distracteurs: (v) => [
      `$${v.b}$`,
      `$${v.c}$`,
      `$${(v.a + v.d) / 2}$`
    ]
  },

  // ── Médiane d'une série impaire ──
  {
    id: "stat_003", theme: "stats", groupe : "mediane",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 1, max: 4 }, b: { min: 5, max: 9 }, c: { min: 10, max: 15 }, d: { min: 16, max: 21 }, e: { min: 22, max: 28 } },
    enonce: (v) => `Médiane de la série $${v.a} ; ${v.b} ; ${v.c} ; ${v.d} ; ${v.e}$`,
    bonneReponse: (v) => `$${v.c}$`,
    distracteurs: (v) => [
      `$${v.b}$`,
      `$${v.d}$`,
      `$${(v.b + v.d) / 2}$`
    ]
  },

  // ── Premier quartile Q1 ──
  {
    id: "stat_004", theme: "stats",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 1, max: 4 }, b: { min: 5, max: 8 }, c: { min: 9, max: 13 }, d: { min: 14, max: 18 }, e: { min: 19, max: 24 }, f: { min: 25, max: 30 } },
    enonce: (v) => `Série : $${v.a};${v.b};${v.c};${v.d};${v.e};${v.f}$. \n \\\\ Quel est $Q_1$ le premier quartile ?`,
    bonneReponse: (v) => `$${(v.b + v.c) / 2}$`,
    distracteurs: (v) => [
      `$${v.b}$`,
      `$${v.a}$`,
      `$${(v.d + v.e) / 2}$`
    ]
  },

  // ── Fréquence relative ──
  {
    id: "stat_005", theme: "stats",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { n: { min: 20, max: 80, step:20 }, k: { min: 10, max: 90, step:10 } },
    enonce: (v) => `Dans un groupe de $${v.n}$ personnes, $${v.n*v.k/100}$ portent des lunettes.\\\\ Quelle est la fréquence en $\\%$ des personnes portant des lunettes ?`,
    bonneReponse: (v) => `$${(v.k)}\\%$`,
    distracteurs: (v) => [
      `$${100-v.k}\\%$`,
      `$${((10000/v.k)%90).toFixed(0)}\\%$`,
      `$${(100-(10000/v.k)%90).toFixed(0)}\\%$`
    ]
  },

 
  // ── Étendue d'une série ──
  {
    id: "stat_007", theme: "stats",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 6 }, b: { min: 7, max: 11 }, c: { min: 12, max: 16 }, d: { min: 17, max: 22 } },
    enonce: (v) => `Série $${v.a};${v.b};${v.c};${v.d}$. Quelle est l'étendue de la série ?`,
    bonneReponse: (v) => `$${v.d - v.a}$`,
    distracteurs: (v) => [
      `$${v.b + v.c}$`,
      `$${v.d}$`,
      `$${v.d + v.a}$`
    ]
  },

  // ── Moyenne pondérée ──
  {
    id: "stat_008", theme: "stats",
    niveau: ["specifique", "specialite"], cols: 4,
    variables: { n1 :{min:1,max:3},n2 :{min:2,max:3}},
    enonce: function(v) {
      v.n3=(10-v.n1-v.n2)
      
      return 'On considère le tableau ci-contre regroupant les notes sur $20$ d\'un élève.\\\\'
    + ' $$ \\def\\arraystretch{1.5}\\begin{array}{|l|c|c|c|}'
    + '\\hline'
    + '\\text{Notes}&8&12&16 \\\\ \\hline'
    + '\\text{Effectifs}&'+ v.n1 +'&'+ v.n3 +'&'+ v.n2+'\\\\ \\hline'
    + '\\end{array} $$' + 'Quelle est sa moyenne ?'},
    bonneReponse: (v) => `$${Math.round(((8*v.n1+v.n3*12 + v.n2*16) / (v.n1 + v.n2 +v.n3))*100)/100}$`,
    distracteurs: (v) => [
      `$${Math.round(((8*v.n1+v.n3*12 + v.n2*16) / (v.n1 + v.n2 +v.n3)+v.n3/10)*100)/100}$`,
      `$${Math.round(((8*v.n1+v.n3*12 + v.n2*16) / (v.n1 + v.n2 +v.n3)-v.n1/10)*100)/100}$`,
      `$${Math.round(((8+12 +16) / (3))*100)/100}$`
    ]
  },

  {
  id: 'stat_camembert_001', theme: 'stats',
  groupe: 'lecture_camembert',
  niveau: ['techno', 'specifique', 'specialite'], cols: 4,
  variables: {
    s: { values: [0,1,2,3] },
    n:{values:[60,120,180]} 
  },

  aux: function(a,b){
    var c = (100 - a - b);
    
    var svg = Fig.svg(0, 3, 0, 3).camembert([
      { val: a, color: 'blue'},
      { val: b, color: 'red'},
      { val: c, color: 'green'},
    ]).end();

    var tikz = Fig.latex(0, 1, 0, 1,.5).camembert([
      { val: a, color: 'black'},
      { val: b, color: 'red' },
      { val: c, color: 'green' },
    ]).end();
    return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
  },

  enonce: function(v) {
    v.situation=[{A:50,B:20},{A:100/3,B:100/3},{A:50,B:25},{A:30,B:10}]
    sit= v.situation[v.s]

    if (v._deduping) return '';
    return 'Sur '+v.n+' personnes présentes à une exposition, on distingue trois groupes : \\\\'
+ ' $\\bullet$ groupe A : '+ (sit.A*v.n/100).toFixed(0) +' personnes\\\\'
+ ' $\\bullet$ groupe B : '+ (sit.B*v.n/100).toFixed(0)+' personnes\\\\'
+ ' $\\bullet$ groupe C : les autres.\\\\' 
+ 'Quelle représentation décrit la situation ?';
  },
  bonneReponse: function(v) { return this.aux(v.situation[v.s].A,v.situation[v.s].B); },
  distracteurs: function(v) {
    return [
      this.aux(v.situation[(v.s+1)%4].A,v.situation[(v.s+1)%4].B),
      this.aux(v.situation[(v.s+2)%4].A,v.situation[(v.s+2)%4].B),
      this.aux(v.situation[(v.s+3)%4].A,v.situation[(v.s+3)%4].B),
      
    ];
  }
},
];
