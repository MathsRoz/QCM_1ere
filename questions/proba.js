// ═══════════════════════════════════════════════════════
//  THÈME : Probabilités
//  BO 2025 — session 2027
// ═══════════════════════════════════════════════════════

const QUESTIONS_PROBA = [

  // ── Probabilité de l'événement contraire ──
  {
    id: "proba_001", theme: "proba", 
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { p: { min: 1, max: 9 } },
    enonce: (v) => `Si $P(A) = ${v.p / 10}$, alors $P(\\bar{A}) = ?$`,
    bonneReponse: (v) => `$${(1 - v.p / 10).toFixed(1)}$`,
    distracteurs: (v) => [
      `$${v.p / 10}$`,
      `$${(v.p / 10 - 1).toFixed(1)}$`,
      `$1$`
    ]
  },

  // ── Probabilité d'une issue sur un dé ──
  {
    id: "proba_002", theme: "proba", groupe:"de",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { n: { min: 2, max: 6 } },
    enonce: (v) => `On lance un dé à $6$ faces équilibré. Quelle est la probabilité d'obtenir $${v.n} ?$`,
    bonneReponse: (v) => `$\\dfrac{1}{6}$`,
    distracteurs: (v) => [
      `$\\dfrac{${v.n}}{6}$`,
      `$\\dfrac{1}{${v.n}}$`,
      `$\\dfrac{6}{${v.n}}$`
    ]
  },

  // ── Probabilité d'un multiple sur un dé ──
  {
    id: "proba_003", theme: "proba", groupe:"de",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { k: { min: 2, max: 5} },
    enonce: (v) => {
      const fav = [1, 2, 3, 4, 5, 6].filter(x => x % v.k === 0);
      return `On lance un dé à $6$ faces équilibré. Quelle est la probabilité d'obtenir un multiple de $${v.k} ?$`;
    },
    bonneReponse: (v) => {
      const fav = [1, 2, 3, 4, 5, 6].filter(x => x % v.k === 0);
      return `$\\dfrac{${fav.length}}{6}$`;
    },
    distracteurs: (v) => {
      const f = [1, 2, 3, 4, 5, 6].filter(x => x % v.k === 0).length;
      return [
        `$\\dfrac{${v.k}}{6}$`,
        (f===3) ? `$\\dfrac{1}{3}$` :`$\\dfrac{${6 - f}}{6}$`,
        `$\\dfrac{1}{${v.k}}$`
      ];
    }
  },


  // ── Probabilité d'une issue sur un dé ──
  {
    id: "proba_003b", theme: "proba", groupe:"de",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { n: { min: 2, max: 5 } },
    enonce: (v) => `On lance un dé à $6$ faces équilibré. Quelle est la probabilité d'obtenir un résultat supérieur ou égal à $${v.n} ?$`,
    bonneReponse: (v) => `$`+frac(7-v.n,6)+'$',
    distracteurs: (v) => [
      `$`+frac(6-v.n,6)+'$',
      `$`+frac(v.n+1,6)+'$',
      `$`+frac(v.n,6)+'$'
    ]
  },

  // ── Événements indépendants : P(A∩B) ──
  {
    id: "proba_004", theme: "proba",
    niveau: ["specifique", "specialite"], cols: 4,
    variables: { p: { min: 1, max: 4 }, q: { min: 1, max: 4 } },
    enonce: (v) => `$A$ et $B$ sont indépendants, $P(A) = \\dfrac{${v.p}}{10}$, $P(B) = \\dfrac{${v.q}}{10}$. Calculer $P(A \\cap B)$`,
    bonneReponse: (v) => `$\\dfrac{${v.p * v.q}}{100}$`,
    distracteurs: (v) => [
      `$\\dfrac{${v.p + v.q}}{10}$`,
      `$\\dfrac{${v.p * v.q}}{10}$`,
      `$\\dfrac{${Math.abs(v.p - v.q)}}{10}$`
    ]
  },

  // ── Tirage sans remise : bille colorée ──
  {
    id: "proba_005", theme: "proba",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 7 }, b: { min: 2, max: 7 }, c: { min: 2, max: 7 } },
    enonce: (v) => `Un sac contient $${v.a}$ billes rouges, $${v.b}$ bleues, $${v.c}$ vertes.  On tire une bille. \n \\\\ Quelle est la probabilité de tirer une boule rouge ?$`,
    bonneReponse: (v) => {
      const tot = v.a + v.b + v.c;
      return `$${frac(v.a,tot)}$`;
    },
    distracteurs: (v) => {
      const tot = v.a + v.b + v.c;
      return [
        `$${frac(v.b,tot)}$`,
        `$${frac(v.a,v.c+v.b)}$`,
        `$\\dfrac{1}{3}$`
      ];
    }
  },

  // ── Probabilité conditionnelle (tableau croisé) ──
  // {
  //   id: "proba_006", theme: "proba",
  //   niveau: ["specifique", "specialite"], cols: 2,
  //   variables: { ab: { min: 10, max: 30 }, anb: { min: 5, max: 20 }, nb: { min: 10, max: 25 }, nnb: { min: 5, max: 20 } },
  //   enonce: (v) => `Tableau croisé : parmi $${v.ab + v.anb}$ individus ayant $A$, $${v.ab}$ ont aussi $B$. Calculer $P_A(B)$ (au centième)`,
  //   bonneReponse: (v) => `$${(v.ab / (v.ab + v.anb)).toFixed(2)}$`,
  //   distracteurs: (v) => [
  //     `$${(v.anb / (v.ab + v.anb)).toFixed(2)}$`,
  //     `$${(v.ab / (v.ab + v.nb + v.anb + v.nnb)).toFixed(2)}$`,
  //     `$${(v.ab / (v.ab + v.nb)).toFixed(2)}$`
  //   ]
  // },

  // ── Distinguer P(A∩B), PA(B), PB(A) ──
  {
    id: "proba_007", theme: "proba",
    niveau: ["specifique", "specialite"], cols: 4,
    variables: { p: { min: 2, max: 8 } },
    enonce: (v) => `$P(A \\cap B) = \\dfrac{${v.p}}{100}$ et $P(B) = \\dfrac{${v.p * 4}}{100}$. Calculer $P_B(A)$`,
    bonneReponse: (v) => `$\\dfrac{1}{4}$`,
    distracteurs: (v) => [
      `$\\dfrac{${v.p}}{${v.p + v.p * 4}}$`,
      `$4$`,
      `$\\dfrac{${v.p}}{100}$`
    ]
  },

  // ── Probabilité somme des issues ──
  {
    id: "proba_008", theme: "proba",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { p1: { min: 1, max: 3 }, p2: { min: 1, max: 3 }, den: { min: 8, max: 12 } },
    enonce: (v) => `$P(A) = \\dfrac{${v.p1}}{${v.den}}$ et $P(B) = \\dfrac{${v.p2}}{${v.den}}$, $A$ et $B$ incompatibles. $P(A \\cup B) = ?$`,
    bonneReponse: (v) => `$${frac(v.p1 + v.p2, v.den)}$`,
    distracteurs: (v) => [
      `$\\dfrac{${v.p1 * v.p2}}{${v.den * v.den}}$`,
      `$\\dfrac{${v.p1 + v.p2}}{${v.den * 2}}$`,
      `$\\dfrac{${v.den - v.p1 - v.p2}}{${v.den}}$`
    ]
  },
];
