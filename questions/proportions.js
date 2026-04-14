// ═══════════════════════════════════════════════════════
//  THÈME : Proportions et pourcentages
//  BO 2025 — session 2027
// ═══════════════════════════════════════════════════════

const QUESTIONS_PROPORTIONS = [

  // ── Calculer p% d'une valeur ── done
  {
    id: "prop_001", theme: "proportions",
    niveau: ["techno", "specifique"], cols: 4,
    variables: { total: { min: 20, max: 200}, taux: { min: 10, max: 90, step:10 } },
    enonce: (v) => `Pour calculer $${v.taux}\\%$ de $${v.total}$, il faut faire :`,
    bonneReponse: (v) => `$${v.total} \\times \\dfrac{${v.taux}}{ 100}$`,
    distracteurs: (v) => [
      `$${v.total} \\times \\dfrac{ 100}{${v.taux}}$`,
      `$${v.taux} \\times \\dfrac{ 100}{${v.total}}$`,
      `$${v.taux} \\times ${v.total}$`
    ]
  },

  // ── Exprimer une fraction en pourcentage ── done
  {
    id: "prop_002", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { values : [1,2,3,4]}, b:{values : [5,10,25]},c:{values:[3,4,5,6]}  },
    enonce: (v) => {
      v.c=(v.c*v.b===100) ? v.c+1:v.c;
      return `Exprimer $\\dfrac{${v.a*v.c}}{${v.b*v.c}} $ en pourcentage.`},
    bonneReponse: (v) => `$${(v.a/v.b*100).toFixed(0)}\\%$`,
    distracteurs: (v) => [
      `$${(v.a/v.b*100-3).toFixed(0)}\\%$`,
      `$${(v.a/v.b*100-1).toFixed(0)}\\%$`,
      `$ ${v.a*v.c}\\%$`
    ]
  },

  // ── Trouver le tout connaissant la partie et le taux ── done
  {
    id: "prop_003", theme: "proportions",
    niveau: ["specialite"], cols: 4,
    variables: { p: { values: [20,30,40,50,60,70,80,90,110,120,130,140,150,160,170,180,190,200]}, t: { values : [10,20,30,40,60,70,80,90]} },
    enonce: (v) => {
  
  return `$${(v.p * v.t / 100).toFixed(0)}$ représente $${v.t}\\%$ de :`;
},
    bonneReponse: (v) => `$${v.p}$`,
    distracteurs: (v) => [
      `$${(v.p*v.t/100+100-v.t).toFixed(0)}$`,
      `$${(v.p*v.t/100 + v.t).toFixed(0)}$`,
      `$${v.p+10}$`
    ]
  },

  // ── Écriture décimale d'une fraction ── done
  {
    id: "prop_004", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { values:[2,4,5]}, b: { min:2, max:9} ,c:{values : [3,4,5,6,7,8,9]}},
    enonce: (v) => {v.b=(v.a===v.b) ? v.b+1:v.b;
      
      return `Écrire $\\dfrac{${v.b*v.c}}{${v.a*v.c}}$ sous forme décimale (arrondir au centième)`},
    bonneReponse: (v) => `$${+parseFloat(v.b / v.a).toFixed(2)}$`,
    distracteurs: (v) => [
      `$${+parseFloat(v.b / v.a+.25).toFixed(2)}$`,
      `$${+parseFloat(v.b / v.a+.05).toFixed(2)}$`,
      `$${+parseFloat(v.b / v.a+.5).toFixed(2)}$`,
    ]
  },

  // ── Proportion : trouver la partie ── done
  {
    id: "prop_005", theme: "proportions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 3, max: 9 }, b: { min: 3, max: 9 }, c: { min: 2, max: 9 } },
    enonce: (v) => {
      v.c=(v.c>=v.b) ? v.b-1:v.c;
      return `Sur un groupe de $${v.a*v.b}$ personnes, $\\dfrac{${v.c}}{${v.b}}$ sont des femmes. Il y a combien de femmes dans le groupe ?`},
    bonneReponse: (v) => `$${v.a*v.c}$`,
    distracteurs: (v) => [
      `$${v.a*v.c-1}$`,
      `$${v.a*v.c+2}$`,
      `$${v.a*v.c-2}$`,
    ]
  },

  // ── Passer de fraction à pourcentage (valeurs simples) ── done
  {
    id: "prop_006", theme: "proportions",
    niveau: ["techno", "specifique"], cols: 4,
    variables: {n:{values:[20,25,40,50,60,75,80]}},
    enonce: (v) => `Quelle est la fraction équivalente à $${v.n}\\%$ ?`,
    bonneReponse: (v) => `$${frac(v.n, 100)}$`,
    distracteurs: (v) => [
      `$${frac(v.n-5, 100)}$`,
      `$${frac(v.n+5, 100)}$`,
      `$${frac(v.n + 10, 100)}$`
    ]
  },


{
  id: "prop_007", theme: "proportions",
  groupe: "proportion_proportion",
  niveau: ["techno", "specifique", "specialite"], cols: 4,
  variables: {
    a: { values: [2,3, 4, 5] },   // dénominateur de la première proportion
    b: { values: [2,3, 4, 5] },   // dénominateur de la deuxième proportion
  },
  enonce: (v) => {
    return `Dans un lycée, $\\dfrac{1}{${v.a}}$ des élèves sont internes. `
      + `Parmi eux, $\\dfrac{1}{${v.b}}$ sont des filles. `
      + `La proportion de filles internes parmi l'ensemble des élèves est égale à :`;
  },
  bonneReponse: (v) => `$${frac(1, v.a * v.b)}$`,
  distracteurs: (v) => [
    `$${frac(1, v.a + v.b)}$`,
    `$${frac(v.a+v.b, v.b*v.a)}$`,
    `$${frac(1, v.b)}$`,
  ]
},

{
  id: "prop_007b", theme: "proportions",
  groupe: "proportion_proportion",
  niveau: [ "specialite"], cols: 4,
  variables: {
    a: { values: [2, 4, 5] },   // dénominateur de la première proportion
    b: { values: [2, 4, 5] },   // dénominateur de la deuxième proportion
  },
  enonce: (v) => {
    return `Dans un lycée, $\\dfrac{1}{${v.a}}$ des élèves sont internes. `
      + `Parmi eux, $\\dfrac{1}{${v.b}}$ sont des filles. `
      + `La proportion de filles internes parmi l'ensemble des élèves est égale à :`;
  },
  bonneReponse: (v) => `$${+parseFloat(100/ (v.a * v.b)).toFixed(2)}\\%$`,
  distracteurs: (v) => [
    `$${+parseFloat(100/ v.a + 100/v.b).toFixed(2)}\\%$`,
    `$${+parseFloat(100/(v.b+v.a)).toFixed(0)}\\%$`,
    `$${+parseFloat(100/ v.b).toFixed(2)}\\%$`,
  ]
},





];
