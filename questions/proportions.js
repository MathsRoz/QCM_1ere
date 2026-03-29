// ═══════════════════════════════════════════════════════
//  THÈME : Proportions et pourcentages
//  BO 2025 — session 2027
// ═══════════════════════════════════════════════════════

const QUESTIONS_PROPORTIONS = [

  // ── Calculer p% d'une valeur ──
  {
    id: "prop_001", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { total: { min: 20, max: 200 }, taux: { min: 5, max: 50 } },
    enonce: (v) => `Calculer $${v.taux}\\%$ de $${v.total}$`,
    bonneReponse: (v) => `$${v.total * v.taux / 100}$`,
    distracteurs: (v) => [
      `$${v.total + v.taux}$`,
      `$${(v.total / v.taux).toFixed(1)}$`,
      `$${(v.taux * 100 / v.total).toFixed(1)}$`
    ]
  },

  // ── Exprimer une fraction en pourcentage ──
  {
    id: "prop_002", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { partie: { min: 5, max: 40 }, total: { min: 50, max: 200 } },
    enonce: (v) => `Exprimer $\\dfrac{${v.partie}}{${v.total}}$ en pourcentage`,
    bonneReponse: (v) => `$${(v.partie / v.total * 100).toFixed(1)}\\%$`,
    distracteurs: (v) => [
      `$${(v.total / v.partie).toFixed(1)}\\%$`,
      `$${v.partie}\\%$`,
      `$${(v.partie * v.total / 100).toFixed(1)}\\%$`
    ]
  },

  // ── Trouver le tout connaissant la partie et le taux ──
  {
    id: "prop_003", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { partie: { min: 5, max: 30 }, taux: { min: 10, max: 50 } },
    enonce: (v) => `$${v.partie}$ représente $${v.taux}\\%$ d'un total. Quel est ce total ?`,
    bonneReponse: (v) => `$${v.partie * 100 / v.taux}$`,
    distracteurs: (v) => [
      `$${(v.partie * v.taux / 100).toFixed(1)}$`,
      `$${v.partie + v.taux}$`,
      `$${(v.partie / v.taux).toFixed(1)}$`
    ]
  },

  // ── Écriture décimale d'une fraction ──
  {
    id: "prop_004", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 1, max: 7 }, b: { min: 2, max: 9 } },
    enonce: (v) => `Écrire $\\dfrac{${v.a}}{${v.b}}$ sous forme décimale (arrondir au centième)`,
    bonneReponse: (v) => `$${(v.a / v.b).toFixed(2)}$`,
    distracteurs: (v) => [
      `$${(v.b / v.a).toFixed(2)}$`,
      `$${v.a * v.b}$`,
      `$${(v.a / v.b).toFixed(1)}$`
    ]
  },

  // ── Proportion : trouver la partie ──
  {
    id: "prop_005", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { total: { min: 100, max: 500 }, num: { min: 1, max: 7 }, den: { min: 2, max: 8 } },
    enonce: (v) => `Un groupe de $${v.total}$ personnes. $\\dfrac{${v.num}}{${v.den}}$ sont des femmes. Combien de femmes ?`,
    bonneReponse: (v) => `$${Math.round(v.total * v.num / v.den)}$`,
    distracteurs: (v) => [
      `$${v.total - Math.round(v.total * v.num / v.den)}$`,
      `$${v.num * v.den}$`,
      `$${Math.round(v.total / v.den)}$`
    ]
  },

  // ── Passer de fraction à pourcentage (valeurs simples) ── done
  {
    id: "prop_006", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: {n:{values:[20,25,40,50,60,75,80,100]}},
    enonce: (v) => `Quelle est la fraction équivalente à $${v.n}\\%$ ?`,
    bonneReponse: (v) => `$${frac(v.n, 100)}$`,
    distracteurs: (v) => [
      `$${frac(v.n-5, 100)}$`,
      `$${frac(v.n+5, 100)}$`,
      `$${frac(v.n + 10, 100)}$`
    ]
  },
];
