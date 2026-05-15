// ═══════════════════════════════════════════════════════
//  THÈME : Évolutions et variations
//  BO 2025 — session 2027
// ═══════════════════════════════════════════════════════

const QUESTIONS_EVOLUTIONS = [

  // ── Hausse → coefficient multiplicateur ──
  {
    id: "E1-A", theme: "evolutions", groupe : "Passer d’une formulation additive  à une formulation multiplicative",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    desc : 'Augmenter de $t\\%$ revient à multiplier par ...',
    variables: { t: { min: 1, max: 20 } },
    enonce: (v) => `Augmenter de $${v.t}\\%$ correspond à multiplier par…`,
    bonneReponse: (v) => `$${(1 + v.t / 100).toFixed(2)}$`,
    distracteurs: (v) => [
      `$${(v.t / 100).toFixed(2)}$`,
      `$${(1 - v.t / 100).toFixed(2)}$`,
      `$${v.t}$`
    ]
  },

  // ── Baisse → coefficient multiplicateur ──
  {
    id: "E1-B", theme: "evolutions", groupe : "Passer d’une formulation additive  à une formulation multiplicative",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    desc : 'Diminuer de $t\\%$ revient à multiplier par ...',
    variables: { t: { min: 1, max: 30 } },
    enonce: (v) => `Diminuer de $${v.t}\\%$ correspond à multiplier par…`,
    bonneReponse: (v) => `$${(1 - v.t / 100).toFixed(2)}$`,
    distracteurs: (v) => [
      `$${(v.t / 100).toFixed(2)}$`,
      `$${(1 + v.t / 100).toFixed(2)}$`,
      `$-${(v.t / 100).toFixed(2)}$`
    ]
  },

  // ── Calculer la valeur finale après hausse ── done
  {
    id: "E2-A", theme: "evolutions", groupe :"Appliquer un taux d’évolution",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    desc : "Application d'une hausse",
    variables: { v0: { min: 1, max: 3 }, t: { min: 1, max: 4 } },
    enonce: (v) => `Une valeur de $${v.v0*20}$ augmente de $${v.t*10}\\%$. La valeur est alors égale à ...`,
    bonneReponse: (v) => `$${v.v0 *20* (1 + v.t / 10)}$`,
    distracteurs: (v) => [
      `$${v.v0*20 + v.t*10}$`,
      `$${(v.v0 *20* v.t / 10).toFixed(0)}$`,
      `$${v.v0*20 * (1 - v.t / 10)}$`
    ]
  },

  // ── Calculer la valeur finale après baisse ── done
  {
    id: "E2-B", theme: "evolutions", groupe :"Appliquer un taux d’évolution",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    desc : "Application d'une baisse",
    variables: { v0: { min: 1, max: 3 }, t: { min: 1, max: 4 } },
    enonce: (v) => `Une valeur de $${v.v0*20}$ baisse de $${v.t*10}\\%$. La valeur est alors égale à ...`,
    bonneReponse: (v) => `$${v.v0 *20* (1 - v.t / 10)}$`,
    distracteurs: (v) => [
      `$${v.v0*20 - v.t*10}$`,
      `$${(v.v0 *20/ v.t / 10).toFixed(0)}$`,
      `$${v.v0*20 * (1 + v.t / 10)}$`
    ]
  },

  // ── Retrouver la valeur initiale ──
  {
    id: "E2-C", theme: "evolutions",groupe :"Appliquer un taux d’évolution",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    desc : "Retrouver la valeur initiale",
    variables: { v0: { min: 20, max: 80,step:20 }, t: { min: 20, max: 40, step:10 } },
    enonce: (v) => {
      const vf = Math.round(v.v0* (1 + v.t / 100));
      return `Après une hausse de $${v.t}\\%$, la valeur est $${vf}$. Quelle est la valeur de départ ?`;
    },
    bonneReponse: (v) => `$${v.v0}$`,
    distracteurs: (v) => {
      const vf = Math.round(v.v0*(1 + v.t / 100));
      return [
        `$${vf + v.t}$`,
        `$${(vf - v.t / 100)}$`,
        `$${Math.abs(vf - v.t)}$`
      ];
    }
  },

  // ── Calculer un taux d'évolution ──
  {
    id: "E3-A", theme: "evolutions", groupe : "Calculer un taux d’évolution",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    desc : "Calculer un taux d'évolution entre $V_i$ et $V_f$",
    variables: { v0: { min: 1, max: 25 }, t: { min: -9 , max: 10 } },
    enonce: (v) => {
      if (v.t===0){v.t=-1;}
      return `Une valeur passe de $${v.v0*10}$ à $${(v.v0*10 *(1 + v.t/10)).toFixed(0)}$. Quel est le taux d'évolution ?`},
    bonneReponse: (v) => `$${(v.t*10)}\\%$`,
    distracteurs: (v) => [
      `$${(-v.t*10)}\\%$`,
      `$${(v.v0*10-(v.v0*10 *(1 + v.t/10)).toFixed(0))}\\%$`,
      `$${-(v.v0*10-(v.v0*10 *(1 + v.t/10)).toFixed(0))}\\%$`
    ]
  },

  // ── Taux global de deux évolutions successives ──
  {
    id: "E4-A", theme: "evolutions", groupe : "Calculer le taux d’évolution d'évolutions successives",
    niveau: ["specifique", "specialite"], cols: 4,
    desc : 'Taux de deux augmentations',
    variables: { t1: { min: 10, max: 100, step: 10}, t2: { min: 10, max: 100, step:10 } },
    enonce: (v) => `Une hausse de $${v.t1}\\%$ puis une hausse de $${v.t2}\\%$ correspond à une hausse de :`,
    bonneReponse: (v) => `$${((1 + v.t1 / 100) * (1 + v.t2 / 100) * 100 - 100).toFixed(0)}\\%$`,
    distracteurs: (v) => [
      `$${v.t1 + v.t2}\\%$`,
      `$${(v.t1 * v.t2 / 100+100).toFixed(0)}\\%$`,
      `$${(v.t1 * v.t2 / 100).toFixed(0)}\\%$`
    ]
  },

  {
    id: "E4-B", theme: "evolutions", groupe : "Calculer le taux d’évolution d'évolutions successives",
    niveau: ["specifique", "specialite"], cols: 2,
    desc : 'Taux d\'une hausse puis une baisse',
    variables: { t1: { min: 10, max: 100, step: 10}, t2: { min: 10, max: 90, step:10 } },
    enonce: (v) => `Une hausse de $${v.t1}\\%$ puis une baisse de $${v.t2}\\%$ correspond à :`,
    bonneReponse: (v) => {
      t = ((1 + v.t1 / 100) * (1 - v.t2 / 100) * 100 - 100).toFixed(0)
      evo = (t<0) ? "baisse" : "hausse";
      return `Une ${evo} de $ ${Math.abs(t)}\\%$`},
    distracteurs: (v) => [
      `Une ${(v.t1 - v.t2<0) ? "baisse" : "hausse"} de $${Math.abs(v.t1 - v.t2)}\\%$`,
      `Une ${((v.t1 * v.t2 / 100+100)<0) ? "baisse" : "hausse"} de $${(v.t1 * v.t2 / 100+100).toFixed(0)}\\%$`,
      `Une ${(v.t1 - v.t1*v.t2/100<0) ? "baisse" : "hausse"} de $${(Math.abs(v.t1 - v.t1*v.t2/100)).toFixed(0)}\\%$`
    ]
  },

  // ── Taux d'évolution réciproque ──
  {
    id: "E5-A", theme: "evolutions", groupe : "Calculer un taux d’évolution réciproque",
    niveau: ["specifique", "specialite"], cols: 4,
    desc : 'Taux d\'évolution réciproque',
    variables: { t: { min: -50, max: 25, step:75 } },
    enonce: (v) => {
      signe = (v.t<0)? "" :"+";
      return `Le taux d'évolution réciproque d'une évolution de $${v.t}\\%$ est :`},
    bonneReponse: (v) => `$${+parseFloat(1 / (1 + v.t / 100) * 100 - 100).toFixed(2)}\\%$`,
    distracteurs: (v) => [
      (v.t<0)? `$`+ signe + `${-v.t}\\%$`:`$${-v.t}\\%$`,
      `$`+ signe + `${v.t}\\%$`,
      `$`+ signe + `${+parseFloat(100 / (100 + v.t)).toFixed(2)}\\%$`
    ]
  },

  // ── Coefficient multiplicateur → taux ──
  {
    id: "E1-C", theme: "evolutions", groupe :"Passer d’une formulation additive  à une formulation multiplicative",
    niveau: ["techno", "specifique", "specialite"], cols: 2,
    desc : 'Multiplier par $C$ correspond à ...',
    variables: { t: { min: -35, max: 35 } },
    enonce: (v) =>{
      if(v.t===0){v.t=-17;}
      return `Multiplier une valeur par $${(1 + v.t / 100).toFixed(2)}$ correspond à:`},
    bonneReponse: (v) => `Une `+ ((v.t<0) ? "baisse" : "hausse" )+ ` de $${Math.abs(v.t)}\\%$`,
    distracteurs: (v) => [
      `Une `+ ((v.t>0) ? "baisse" : "hausse" )+ ` de $${Math.abs(v.t)}\\%$`,
      `Une `+ ((v.t>0) ? "baisse" : "hausse" )+ ` de $${Math.abs((100 + v.t)).toFixed(0)}\\%$`,
      `Une `+ ((v.t<0) ? "baisse" : "hausse" )+ ` de $${Math.abs((100 + v.t)).toFixed(0)}\\%$`,
    ]
  },
  
  {
    id: "E4-C", theme: "evolutions", groupe :"Calculer le taux d’évolution d'évolutions successives",
    niveau: ["techno", "specifique", "specialite"], cols: 2,
    desc : 'Calcul pour deux augmentations',
    variables: { t: { min: 10, max: 30 ,step:10} },
    enonce: (v) =>{
      if(v.t===0)(v.t=-17)
      return `Le prix d’un article est noté $P$. Il connait deux augmentations de $${v.t}\\%$.
Le prix après ces augmentations est:`},
    bonneReponse: (v) => `$P\\times ${(1+v.t/100).toFixed(1)}^2$`,
    distracteurs: (v) => [
      `$P\\times \\left(1+\\left(\\dfrac{t}{100}\\right)^2\\right)$`,
      `$P\\times ${(1+2*v.t/100).toFixed(1)}$`,
      `$\\dfrac{P}{${((1+v.t/100)**2).toFixed(2)}}$`,
    ]
  },
];
