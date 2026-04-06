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

  // // ── Moyenne pondérée ──
  // {
  //   id: "stat_008", theme: "stats",
  //   niveau: ["specifique", "specialite"], cols: 4,
  //   variables: { v1: { min: 8, max: 14 }, n1: { min: 2, max: 5 }, v2: { min: 15, max: 20 }, n2: { min: 2, max: 5 } },
  //   enonce: (v) => `Moyenne pondérée : $${v.v1}$ obtenu $${v.n1}$ fois, $${v.v2}$ obtenu $${v.n2}$ fois`,
  //   bonneReponse: (v) => `$${((v.v1 * v.n1 + v.v2 * v.n2) / (v.n1 + v.n2)).toFixed(1)}$`,
  //   distracteurs: (v) => [
  //     `$${((v.v1 + v.v2) / 2).toFixed(1)}$`,
  //     `$${(v.v1 * v.n1 + v.v2 * v.n2).toFixed(0)}$`,
  //     `$${((v.v1 * v.n1 + v.v2 * v.n2) / (v.n1 + v.n2) + 1).toFixed(1)}$`
  //   ]
  // },
];
