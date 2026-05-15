// -- Questions non répertoriées

const QUESTIONS_NON_REPERTORIEES = [


   {
    id: 'A1-A', theme: 'Non répertoriées',
    groupe: 'Polynôme du second degré',
    desc : "Déterminer graphiquement de le signe de $a$ et de $\\Delta$ ",
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a: { values: [0,1] },
      d: { values: [0,1,2] },
    },


    fonc016Fig: function(f) {
         var svg = Fig.svg(-2, 2, -2, 2)
        .axes()
        .clip()
        .curve(f)
        .endClip()
        .end();
 
        var tikz = Fig.latex(-2, 2, -2, 2)
        .axes()
        .clip()
        .curve(f)
        .endClip()
        .end();

        return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'; 
    },

    enonce: function(v) {
      v.s = [' < ',' > ', '='];
      v.ca = (v.d===2) ? (v.a===0)? 4:5 :
        (v.d===0)? (v.a===0)? 1 : 2  : 
        (v.a===0) ? 0 :3 ;
      v.f =['-(x-0.8)(x+.2)+1','-(x-0.8)(x+.2)-1', '(x-0.8)(x+.2)+1','(x-0.8)(x+.2)-1','-(x-0.8)(x-.8)','(x+.2)(x+.2)'];
      return 'Soit $f$ définie sur $\\mathbb{R}$ par $f(x)=ax^2+b+c$ avec $a$, $b$ et $c$ des réels et $a\\neq0$ représentée ci-contre.' +this.fonc016Fig(v.f[v.ca])
      + '\\\\ On peut affirmer que :' ;
    },
 
    bonneReponse: function(v) {
      return '$a'+ v.s[v.a] +'0$ et $\\Delta' + v.s[v.d] +'0$';
    },
 
    distracteurs: function(v) {
      return [
        '$a'+ v.s[(v.a+1)%2] +'0$ et $\\Delta' + v.s[(v.d+1)%3] +'0$',   // pente opposée
        '$a'+ v.s[(v.a+1)%2] +'0$ et $\\Delta' + v.s[v.d] +'0$',   // ordonnée opposée
        '$a'+ v.s[v.a] +'0$ et $\\Delta' + v.s[(v.d+2)%3] +'0$',   // les deux inversés
      ];
    }
  },


  // ── Simplifications littérales combinées ──────────────

// {
//   id: "C7-L", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["techno", "specifique", "specialite"], cols: 2,
//   desc: "Simplifier $-(ax + b) + cx$",
//   variables: { a: { min: -6, max: 6 }, b: { min: -8, max: 8 }, c: { min: -8, max: 6 } },
//   enonce: (v) => `Simplifier $${simplExpr(`-(${v.a}x + ${v.b}) + ${v.c}x`)}$`,
//   bonneReponse: (v) => `$${simplExpr(`${v.c - v.a}x - ${v.b}`)}$`,
//   distracteurs: (v) => [
//     `$${simplExpr(`${v.c + v.a}x - ${v.b}`)}$`,
//     `$${simplExpr(`${v.c - v.a}x + ${v.b}`)}$`,
//     `$${simplExpr(`${v.c + v.a}x + ${v.b}`)}$`,
//   ]
// },

// {
//   id: "C7-M", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["techno", "specifique", "specialite"], cols: 2,
//   desc: "Simplifier $-(ax - b) - cx$",
//   variables: { a: { min: 2, max: 6 }, b: { min: 1, max: 8 }, c: { min: 2, max: 6 } },
//   enonce: (v) => `Simplifier $-(${v.a}x - ${v.b}) - ${v.c}x$`,
//   bonneReponse: (v) => `$${simplExpr(`${-(v.a + v.c)}x + ${v.b}`)}$`,
//   distracteurs: (v) => [
//     `$${simplExpr(`${v.c - v.a}x + ${v.b}`)}$`,
//     `$${simplExpr(`${-(v.a + v.c)}x - ${v.b}`)}$`,
//     `$${simplExpr(`${v.a - v.c}x + ${v.b}`)}$`,
//   ]
// },

// {
//   id: "C7-N", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["techno", "specifique", "specialite"], cols: 2,
//   desc: "Simplifier $(-1)(ax + b) + (-1)(cx - d)$",
//   variables: { a: { min: 2, max: 5 }, b: { min: 1, max: 6 }, c: { min: 2, max: 5 }, d: { min: 1, max: 6 } },
//   enonce: (v) => `Simplifier $(-1)(${v.a}x + ${v.b}) + (-1)(${v.c}x - ${v.d})$`,
//   bonneReponse: (v) => `$${simplExpr(`${-(v.a + v.c)}x - ${v.b} + ${v.d}`)}$`,
//   distracteurs: (v) => [
//     `$${simplExpr(`${-(v.a + v.c)}x + ${v.b} - ${v.d}`)}$`,
//     `$${simplExpr(`${-(v.a + v.c)}x - ${v.b} - ${v.d}`)}$`,
//     `$${simplExpr(`${v.a + v.c}x - ${v.b} + ${v.d}`)}$`,
//   ]
// },

// {
//   id: "C7-O", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["specifique", "specialite"], cols: 2,
//   desc: "Simplifier $\\dfrac{ax + b}{c} + \\dfrac{dx}{c}$",
//   variables: { a: { min: 2, max: 5 }, b: { min: 1, max: 8 }, c: { min: 2, max: 6 }, d: { min: 2, max: 5 } },
//   enonce: (v) => `Simplifier $\\dfrac{${v.a}x + ${v.b}}{${v.c}} + \\dfrac{${v.d}x}{${v.c}}$`,
//   bonneReponse: (v) => `$\\dfrac{${simplExpr(`${v.a + v.d}x + ${v.b}`)}}{${v.c}}$`,
//   distracteurs: (v) => [
//     `$\\dfrac{${simplExpr(`${v.a + v.d}x`)}}{${v.c}} + ${v.b}$`,
//     `$\\dfrac{${simplExpr(`${v.a + v.d}x + ${v.b}`)}}{${2 * v.c}}$`,
//     `$\\dfrac{${simplExpr(`${v.a - v.d}x + ${v.b}`)}}{${v.c}}$`,
//   ]
// },

// {
//   id: "C7-P", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["specifique", "specialite"], cols: 2,
//   desc: "Simplifier $\\dfrac{-(ax - b)}{c}$",
//   variables: { a: { min: 2, max: 6 }, b: { min: 1, max: 8 }, c: { min: 2, max: 6 } },
//   enonce: (v) => `Simplifier $\\dfrac{-(${v.a}x - ${v.b})}{${v.c}}$`,
//   bonneReponse: (v) => `$\\dfrac{-${v.a}x + ${v.b}}{${v.c}}$`,
//   distracteurs: (v) => [
//     `$\\dfrac{-${v.a}x - ${v.b}}{${v.c}}$`,
//     `$\\dfrac{${v.a}x - ${v.b}}{${v.c}}$`,
//     `$-\\dfrac{${v.a}x + ${v.b}}{${v.c}}$`,
//   ]
// },

// {
//   id: "C7-Q", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["specifique", "specialite"], cols: 2,
//   desc: "Simplifier $\\dfrac{a}{b} \\times \\dfrac{c}{a}$",
//   variables: { a: { min: 2, max: 7 }, b: { min: 2, max: 7 }, c: { min: 2, max: 7 } },
//   enonce: (v) => {
//     v.b = (v.b === v.a) ? v.b + 1 : v.b;
//     return `Simplifier $\\dfrac{${v.a}}{${v.b}} \\times \\dfrac{${v.c}}{${v.a}}$`;
//   },
//   bonneReponse: (v) => `$\\dfrac{${v.c}}{${v.b}}$`,
//   distracteurs: (v) => [
//     `$\\dfrac{${v.a * v.c}}{${v.a * v.b}}$`,
//     `$\\dfrac{${v.c}}{${v.a}}$`,
//     `$\\dfrac{${v.a}}{${v.b * v.c}}$`,
//   ]
// },

// {
//   id: "C7-R", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["specifique", "specialite"], cols: 2,
//   desc: "Simplifier $\\dfrac{1}{\\dfrac{a}{b}}$",
//   variables: { a: { min: 2, max: 7 }, b: { min: 2, max: 7 } },
//   enonce: (v) => {
//     v.b = (v.b === v.a) ? v.b + 1 : v.b;
//     return `Simplifier $\\dfrac{1}{\\dfrac{${v.a}}{${v.b}}}$`;
//   },
//   bonneReponse: (v) => `$\\dfrac{${v.b}}{${v.a}}$`,
//   distracteurs: (v) => [
//     `$\\dfrac{${v.a}}{${v.b}}$`,
//     `$${v.a} \\times ${v.b}$`,
//     `$\\dfrac{1}{${v.a} \\times ${v.b}}$`,
//   ]
// },

// {
//   id: "C7-S", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["specifique", "specialite"], cols: 2,
//   desc: "Simplifier $\\dfrac{-(a/b)}{c/d}$",
//   variables: { a: { min: 2, max: 6 }, b: { min: 2, max: 6 }, c: { min: 2, max: 6 }, d: { min: 2, max: 6 } },
//   enonce: (v) => `Simplifier $\\dfrac{-\\dfrac{${v.a}}{${v.b}}}{\\dfrac{${v.c}}{${v.d}}}$`,
//   bonneReponse: (v) => `$-\\dfrac{${v.a} \\times ${v.d}}{${v.b} \\times ${v.c}}$`,
//   distracteurs: (v) => [
//     `$\\dfrac{${v.a} \\times ${v.d}}{${v.b} \\times ${v.c}}$`,
//     `$-\\dfrac{${v.a} \\times ${v.c}}{${v.b} \\times ${v.d}}$`,
//     `$\\dfrac{-${v.a} \\times ${v.c}}{${v.b} \\times ${v.d}}$`,
//   ]
// },

// {
//   id: "C7-T", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["specialite"], cols: 2,
//   desc: "Simplifier $-(ax + b) \\div \\dfrac{c}{d}$",
//   variables: { a: { min: 2, max: 5 }, b: { min: 1, max: 6 }, c: { min: 2, max: 5 }, d: { min: 2, max: 5 } },
//   enonce: (v) => `Simplifier $-(${v.a}x + ${v.b}) \\div \\dfrac{${v.c}}{${v.d}}$`,
//   bonneReponse: (v) => `$\\dfrac{${v.d}}{${v.c}} \\times (-${v.a}x - ${v.b})$`,
//   distracteurs: (v) => [
//     `$\\dfrac{${v.c}}{${v.d}} \\times (-${v.a}x - ${v.b})$`,
//     `$\\dfrac{${v.d}}{${v.c}} \\times (${v.a}x + ${v.b})$`,
//     `$\\dfrac{${v.d}}{${v.c}} \\times (-${v.a}x + ${v.b})$`,
//   ]
// },

// {
//   id: "C7-U", theme: "calcul",
//   groupe: "Simplifier une expression littérale",
//   niveau: ["specialite"], cols: 2,
//   desc: "Simplifier $\\dfrac{-(ax-b)}{c} + \\dfrac{dx+b}{c}$",
//   variables: { a: { min: 2, max: 5 }, b: { min: 1, max: 6 }, c: { min: 2, max: 5 }, d: { min: 2, max: 5 } },
//   enonce: (v) => `Simplifier $\\dfrac{-(${v.a}x - ${v.b})}{${v.c}} + \\dfrac{${v.d}x + ${v.b}}{${v.c}}$`,
//   bonneReponse: (v) => `$\\dfrac{${simplExpr(`${v.d - v.a}x + ${2 * v.b}`)}}{${v.c}}$`,
//   distracteurs: (v) => [
//     `$\\dfrac{${simplExpr(`${v.d - v.a}x`)}}{${v.c}}$`,
//     `$\\dfrac{${simplExpr(`${v.d + v.a}x + ${2 * v.b}`)}}{${v.c}}$`,
//     `$\\dfrac{${simplExpr(`${v.d - v.a}x - ${2 * v.b}`)}}{${v.c}}$`,
//   ]
// },

]

  // ── Helper : génère la réponse SVG+TikZ pour fonc_016 ──
