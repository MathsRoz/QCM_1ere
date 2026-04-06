// ═══════════════════════════════════════════════════════
//  THÈME : Calcul numérique et algébrique
//  BO 2025 — session 2027
// ═══════════════════════════════════════════════════════

const QUESTIONS_CALCUL = [

  // ── Fractions : addition à même dénominateur ── done
  {
    id: "calc_001", theme: "calcul", groupe :"fraction",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 1, max: 7 }, b: { min: 2, max: 9 }, c: { min: 1, max: 7 } },
    enonce: (v) => {
      if (v.b===v.c){v.c++}
      if (v.b===v.a){v.a--}
      return `Calculer $\\dfrac{${v.a}}{${v.b}} + \\dfrac{${v.c}}{${v.b}}$`},
    bonneReponse: (v) => `$${frac(v.a + v.c, v.b)}$`,
    distracteurs: (v) => [
      `$${frac(v.a + v.c,2 * v.b)}$`,
      `$${frac(v.a * v.c,v.b)}$`,
      `$${frac(v.a + v.c,v.b * v.b)}$`
    ]
  },

  // ── Fractions : multiplication ── done
  {
    id: "calc_002", theme: "calcul", groupe :"fraction",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 1, max: 5 }, b: { min: 2, max: 7 }, c: { min: 1, max: 5 }, d: { min: 2, max: 7 } },
    enonce: (v) => {
      if (v.b===v.a){v.a--}
      if (v.c===v.d){v.c--}
      return `Calculer $\\dfrac{${v.a}}{${v.b}} \\times \\dfrac{${v.c}}{${v.d}}$`},
    bonneReponse: (v) => `$${frac(v.a * v.c, v.b * v.d)}$`,
    distracteurs: (v) => [
      `$\\dfrac{${v.a + v.c}}{${v.b + v.d}}$`,
      `$\\dfrac{${v.a * v.c}}{${v.b + v.d}}$`,
      `$\\dfrac{${v.a + v.c}}{${v.b * v.d}}$`
    ]
  },

  // ── Comparer deux fractions ── done
  {
    id: "calc_003", theme: "calcul", groupe :"fraction",
    niveau: ["techno", "specifique", "specialite"], cols: 2,
    variables: { a: { min: 3, max: 6 }, b: { min: 3, max: 8 }, c: { min: 1, max: 6 }, d: { min: 3, max: 8 } },
    enonce: (v) => {
      if (v.b<=v.a){v.a=v.b-1}
      if (v.d<=v.c){v.c=v.d-1}
      if (v.b===v.d){v.b++}
      if (v.a===v.c){v.a--}

      return`Comparer $\\dfrac{${v.a}}{${v.b}}$ et $\\dfrac{${v.c}}{${v.d}}$`},
    bonneReponse: (v) => {
      const lhs = v.a * v.d, rhs = v.c * v.b;
      if (lhs > rhs) return `$\\dfrac{${v.a}}{${v.b}} > \\dfrac{${v.c}}{${v.d}}$`;
      if (lhs < rhs) return `$\\dfrac{${v.a}}{${v.b}} < \\dfrac{${v.c}}{${v.d}}$`;
      return `$\\dfrac{${v.a}}{${v.b}} = \\dfrac{${v.c}}{${v.d}}$`;
    },
    distracteurs: (v) => {
      const lhs = v.a * v.d, rhs = v.c * v.b;
      if (lhs > rhs) return [
        `$\\dfrac{${v.a}}{${v.b}} < \\dfrac{${v.c}}{${v.d}}$`,
        `$\\dfrac{${v.a}}{${v.b}} = \\dfrac{${v.c}}{${v.d}}$`,
        `Impossible à comparer`
      ];
      if (lhs === rhs) return [
        `$\\dfrac{${v.a}}{${v.b}} < \\dfrac{${v.c}}{${v.d}}$`,
        `$\\dfrac{${v.a}}{${v.b}} > \\dfrac{${v.c}}{${v.d}}$`,
        `Impossible à comparer`
      ];
      return [
        `$\\dfrac{${v.a}}{${v.b}} > \\dfrac{${v.c}}{${v.d}}$`,
        `$\\dfrac{${v.a}}{${v.b}} = \\dfrac{${v.c}}{${v.d}}$`,
        `Impossible à comparer`
      ];
    }
  },

  // ── Puissances : produit ── done
  {
    id: "calc_004", theme: "calcul", groupe :"puissance",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 5 }, p: { min: -9, max: 9 }, q: { min: -9, max: 9 } },
    enonce: (v) => `Simplifier $${v.a}^{${v.p}} \\times ${v.a}^{${v.q}}$`,
    bonneReponse: (v) => `$${v.a}^{${v.p + v.q}}$`,
    distracteurs: (v) => [
      `$${v.a}^{${v.p * v.q}}$`,
      `$${v.a * v.a}^{${v.p + v.q}}$`,
      `$${v.a}^{${v.p - v.q}}$`
    ]
  },

  // ── Puissances : quotient ── done
  {
    id: "calc_005", theme: "calcul", groupe :"puissance",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 6 }, p: { min: -6, max: 6 }, q: { min: -6, max: 8 } },
    enonce: (v) => {
      if(v.p===v.q){v.q--}
      return `Simplifier $\\dfrac{${v.a}^{${v.p}}}{${v.a}^{${v.q}}}$`},
    bonneReponse: (v) => `$${v.a}^{${v.p - v.q}}$`,
    distracteurs: (v) => [
      `$${v.a}^{${v.p + v.q}}$`,
      `$1$`,
      `$${v.a}^{${v.p * v.q}}$`
    ]
  },

  // ── Écriture décimale → pourcentage ── done
  {
    id: "calc_006", theme: "calcul", groupe :"%",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { n: { min: 1, max: 9 } },
    enonce: (v) => `Écrire $${v.n * 5}\\%$ sous forme décimale`,
    bonneReponse: (v) => `$${v.n * 5 / 100}$`,
    distracteurs: (v) => [
      `$${v.n * 5}$`,
      `$${v.n / 2}$`,
      `$${v.n * 500}$`
    ]
  },

  // ── Pourcentage → décimale ── done
  {
    id: "calc_007", theme: "calcul", groupe :"%",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { n: { min: 1, max: 9 } },
    enonce: (v) => `Écrire $0.${v.n < 10 ? '0' + v.n : v.n}$ sous forme de pourcentage`,
    bonneReponse: (v) => `$${v.n}\\%$`,
    distracteurs: (v) => [
      `$${v.n / 10}\\%$`,
      `$${v.n * 10}\\%$`,
      `$${v.n / 100}\\%$`
    ]
  },

  // ── Identité remarquable : (a+b)² ── done
  {
    id: "calc_008", theme: "calcul", groupe : "id_rem",
    niveau: ["techno", "specifique", "specialite"], cols: 2,
    variables: { a: { min: 2, max: 8 },
                  b:{min:2,max:8}},
    enonce: (v) => `Développer $(${v.a}x + ${v.b})^2$`,
    bonneReponse: (v) => `$${v.a**2}x^2 + ${2 * v.a*v.b}x + ${v.b ** 2}$`,
    distracteurs: (v) => [
      `$${v.a**2}x^2 + ${v.b ** 2}$`,
      `$${v.a**2}x^2 + ${v.a*v.b}x + ${v.b ** 2}$`,
      `$${v.a**2}x^2 + ${2 * v.a*v.b}x - ${v.b ** 2}$`
    ]
  },

  // ── Identité remarquable : (a-b)² ── done
  {
    id: "calc_009", theme: "calcul",groupe : "id_rem",
    niveau: ["techno", "specifique", "specialite"], cols: 2,
    variables: { a: { min: 2, max: 7 },
                  b:{min:2,max:8} },
    enonce: (v) => `Développer $(${v.a}x - ${v.b})^2$`,
    bonneReponse: (v) => `$${v.a**2}x^2 - ${2 * v.b*v.a}x + ${v.b ** 2}$`,
    distracteurs: (v) => [
      `$${v.a**2}x^2 + ${v.b ** 2}$`,
      `$${v.a**2}x^2 - ${v.b ** 2}$`,
      `$${v.a**2}x^2 + ${2 * v.b*v.a}x + ${v.b ** 2}$`
    ]
  },

  // ── Identité remarquable : (a+b)(a-b) ── done
  {
    id: "calc_010", theme: "calcul",groupe : "id_rem",
    niveau: ["techno", "specifique", "specialite"], cols: 2,
    variables: { a: { min: 2, max: 7 } ,
                  b:{min:2,max:8} },
    enonce: (v) => `Développer $(${v.a}x + ${v.b})(${v.a}x - ${v.b})$`,
    bonneReponse: (v) => `$${v.a**2}x^2 - ${v.b ** 2}$`,
    distracteurs: (v) => [
      `$${v.a**2}x^2 + ${v.b ** 2}$`,
      `$${v.a**2}x^2 - ${2 * v.a*v.b}x - ${v.b ** 2}$`,
      `$${v.a**2}x^2 + ${2 * v.a*v.b}x - ${v.b ** 2}$`
    ]
  },

  // ── Factorisation : différence de carrés ── done
  {
    id: "calc_011", theme: "calcul", groupe : "id_rem",
    niveau: ["techno","specifique", "specialite"], cols: 2,
    variables: { a: { min: 2, max: 8 } },
    enonce: (v) => `Factoriser $x^2 - ${v.a ** 2}$`,
    bonneReponse: (v) => `$(x - ${v.a})(x + ${v.a})$`,
    distracteurs: (v) => [
      `$(x - ${v.a})^2$`,
      `$(x + ${v.a})^2$`,
      `$(x - ${v.a / 2})(x + ${v.a / 2})$`
    ]
  },

  // ── Équation du 1er degré ── done
  {
    id: "calc_012", theme: "calcul", groupe : "equation",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 9 }, b: { min: 1, max: 20 } },
    enonce: (v) => {
      if(v.a===v.b){v.a++}
      return `Résoudre $${v.a}x + ${v.b} = 0$`},
    bonneReponse: (v) => `$x = ${frac(-v.b, v.a)}$`,
    distracteurs: (v) => [
      `$x = ${frac(v.b, v.a)}$`,
      `$x = ${frac(v.a, v.b)}$`,
      `$x = -${frac(v.a, v.b)}$`
    ]
  },

  // ── Équation ax+b = c ── done
  {
    id: "calc_013", theme: "calcul", groupe : "equation",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 8 }, b: { min: 1, max: 15 }, c: { min: 1, max: 6 } },
    enonce: (v) => `Résoudre $${v.a}x + ${v.b} = ${v.a * v.c + v.b}$`,
    bonneReponse: (v) => `$x = ${v.c}$`,
    distracteurs: (v) => [
      `$x = ${frac(v.a * v.c + v.b+v.b,v.a)}$`,
      `$x = ${v.a + v.c}$`,
      `$x = -${v.c}$`
    ]
  },

  // ── Inéquation du 1er degré ── done
  {
    id: "calc_014", theme: "calcul", groupe : "inequation",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 8 }, b: { min: 1, max: 12 } },
    enonce: (v) => `Résoudre l'inéquation $${v.a}x - ${v.b} > 0$`,
    bonneReponse: (v) => `$x > ${frac(v.b, v.a)}$`,
    distracteurs: (v) => [
      `$x < ${frac(v.b, v.a)}$`,
      `$x > ${frac(-v.b, v.a)}$`,
      `$x < ${frac(-v.b, v.a)}$`
    ]
  },



  // ── Équation produit nul ── done
  {
    id: "calc_015", theme: "calcul",
    niveau: ["specifique", "specialite"], cols: 2,
    variables: { a: { min: 1, max: 8 }, b: { min: 1, max: 8 } },
    enonce: (v) => `Résoudre $(x - ${v.a})(x + ${v.b}) = 0$`,
    bonneReponse: (v) => `$x = ${v.a}$ ou $x = -${v.b}$`,
    distracteurs: (v) => [
      `$x = -${v.a}$ ou $x = ${v.b}$`,
      `$x = ${v.a}$ ou $x = ${v.b}$`,
      `$x = -${v.a}$ ou $x = -${v.b}$`
    ]
  },

  // ── Signe d'une expression du 1er degré ── done
  {
    id: "calc_016", theme: "calcul",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { a: { min: 2, max: 7 }, b: { min: 2, max: 10 } },
    enonce: (v) => `Sur quel intervalle $${v.a}x - ${v.b}$ est-il strictement positif ?`,
    bonneReponse: (v) => `$\\left]${frac(v.b, v.a)} ; +\\infty\\right[$`,
    distracteurs: (v) => [
      `$\\left]-\\infty ; ${frac(v.b, v.a)}\\right[$`,
      `$\\left]${frac(v.b, -v.a)} ; +\\infty\\right[$`,
      `$\\left]-\\infty ; ${frac(v.b, -v.a)}\\right[$`
    ]
  },

  // ── Expression littérale : simplification ── done
  {
    id: "calc_017", theme: "calcul",
    niveau: ["techno", "specifique"], cols: 4,
    variables: { a: { min: 2, max: 7 }, b: { min: 1, max: 6 } },
    enonce: (v) => `Simplifier $-(${v.a}x - ${v.b})$`,
    bonneReponse: (v) => `$-${v.a}x + ${v.b}$`,
    distracteurs: (v) => [
      `$-${v.a}x - ${v.b}$`,
      `$${v.a}x - ${v.b}$`,
      `$${v.a}x + ${v.b}$`
    ]
  },

  // ── Équation x² = a ── done
  {
    id: "calc_018", theme: "calcul", groupe : "id_rem",
    niveau: ["specifique", "specialite"], cols: 2,
    variables: { a: { min: 1, max: 9 } },
    enonce: (v) => `Résoudre $x^2 = ${v.a ** 2}$`,
    bonneReponse: (v) => `$x = ${v.a}$ ou $x = -${v.a}$`,
    distracteurs: (v) => [
      `$x = ${v.a}$`,
      `$x = -${v.a}$`,
      `$x = ${v.a ** 2}$`
    ]
  },
  // ── Inverse du double d'un entier ──
  {
    id: "calc_019", theme: "calcul", groupe : "fr->math",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { n: { min: 3, max: 9 } },
    enonce: (v) => `L'inverse du double de $${v.n}$ est égal à :`,
    bonneReponse: (v) => `$\\dfrac{1}{${2 * v.n}}$`,
    distracteurs: (v) => [
      `$${frac(2, v.n)}$`,
      `$${frac(v.n, 2)}$`,
      `$${2 * v.n}$`
    ]
  },
  {
    id: "calc_019b", theme: "calcul", groupe : "fr->math",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { n: { min: 4, max: 8 } },
    enonce: (v) => `Le triple de l'inverse de $${v.n}$ est égal à :`,
    bonneReponse: (v) => '$'+frac(3,v.n)+'$',
    distracteurs: (v) => [
      '$'+frac(1,3*v.n)+'$',
      '$'+frac(v.n,3)+'$',
      '$'+frac(3*v.n,1)+'$'
    ]
  },
 
  // ── Calcul avec la relation F = a + b/(cd) ──
  // Valeurs fixées : a=1/2, b=3, c=4, d=-1/4 → F = 1/2 + 3/(4×(-1/4)) = 1/2 - 3 = -5/2
  {
    id: "calc_020", theme: "calcul",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: {a : {min:2,max:8}, b : {min:2,max:9},c : {min:2,max:8}},
    enonce: (v) =>
      `On considère la relation $F = a + \\dfrac{b}{cd}$.\n\\\\` +
      `Lorsque $a = \\dfrac{1}{${v.a}}$, $b = ${v.b}$, $c = ${v.c}$, $d = -\\dfrac{1}{${v.c}}$,` +
      ` la valeur de $F$ est égale à :`,
    bonneReponse: (v) => `$`+frac(1-v.b*v.a,v.a)+`$`,
    distracteurs: (v) => [
      `$`+frac(1-v.b*v.a,-v.a)+`$`,
      `$`+frac(1-v.b,v.a-1)+`$`,
      `$`+frac(1-v.b,-v.a+1)+`$`
    ]
  },


  {
    id: "calc_021_isol_var", theme: "calcul",
    niveau: ["techno", "specifique", "specialite"], cols: 2,
    variables: { f: { values: [0, 1, 2, 3, 4, 5, 6, 7,8] } },
    enonce: (v) => {
      const formules = [
        // [énoncé, variable isolée, bonne réponse, dist1, dist2, dist3]
        [
          'F = ma',           'a',
          'a = \\dfrac{F}{m}',
          'a = Fm',
          'a = \\dfrac{m}{F}',
          'a = F - m',
          'F,m,a'
        ],
        [
          'U = RI',           'I',
          'I = \\dfrac{U}{R}',
          'I = UR',
          'I = \\dfrac{R}{U}',
          'I = U - R',
          'U,R,I'
        ],
        [
          'p = \\dfrac{m}{V}', 'V',
          'V = \\dfrac{m}{p}',
          'V = mp',
          'V = \\dfrac{p}{m}',
          'V = \\dfrac{1}{mp}',
          'p,m,V'
        ],
        [
          'y = mx + p',        'x',
          'x = \\dfrac{y - p}{m}',
          'x = \\dfrac{m}{y - p}',
          'x = \\dfrac{y}{m} + p',
          'x = \\dfrac{p - y}{m}',
          'y,m,x,p'
        ],
        [
          'PV = nRT',          'T',
          'T = \\dfrac{PV}{nR}',
          'T = \\dfrac{nR}{PV}',
          'T = \\dfrac{PR}{nV}',
          'T = \\dfrac{V}{nR}',
          'P,V,n,R,T'
        ],
        [
          'E = \\dfrac{1}{2}mv^2', 'v',
          'v = \\sqrt{\\dfrac{2E}{m}}',
          'v = \\dfrac{2E}{m}',
          'v = \\dfrac{m}{2E}',
          'v = \\sqrt{\\dfrac{m}{2E}}',
          'E,m,v'
        ],
        [
          'A = \\pi r^2',       'r',
          'r = \\sqrt{\\dfrac{A}{\\pi}}',
          'r = \\dfrac{A}{\\pi}',
          'r = \\dfrac{\\pi}{A}',
          'r = \\sqrt{A\\pi}',
          'A,r'
        ],
        [
          'x = \\dfrac{ab}{c}', 'b',
          'b = \\dfrac{cx}{a}',
          'b = \\dfrac{ax}{c}',
          'b = \\dfrac{a}{cx}',
          'b = \\dfrac{x}{ac}',
          'x,a,b,c'
        ],
        [
          '\\dfrac{1}{x}+\\dfrac{1}{y}=\\dfrac{1}{u}', 'u',
          'u=\\dfrac{xy}{x+y}',
          'u=\\dfrac{x+y}{xy}',
          'u=xy',
          'u=x+y',
          'x,y,u'
        ],
      ];
      const formule = formules[v.f];
      v._formules = formule;
      return `On considère $${v._formules[6]}$ des réels non nuls tels que $${v._formules[0]}$. \n \\\\ Isoler $${v._formules[1]}$.`;
    },
    bonneReponse: (v) => `$${v._formules[2]}$`,
    distracteurs: (v) => [
      `$${v._formules[3]}$`,
      `$${v._formules[4]}$`,
      `$${v._formules[5]}$`,
    ]
  },

  // ── Signe d'un polynôme du second degré factorisé ──
  // f(x) = a(x - r1)(x - r2) avec a, r1, r2 variés
  // On demande : sur quel intervalle f(x) > 0 (ou < 0)
  {
    id: "calc_022", theme: "calcul",
    groupe: "signe_second_degre",
    niveau: ["specifique", "specialite"], cols: 2,
    variables: {
      r1:   { min: -5, max: 4 },   // racine gauche
      ecart:{ min: 1, max: 5 },    // r2 = r1 + ecart (garantit r1 < r2)
      a:    { values: [-3, -2, -1, 1, 2, 3] },
      sens: { values: [0, 1] },    // 0 = cherche f>0, 1 = cherche f<0
    },
    enonce: (v) => {
      const r2 = v.r1 + v.ecart;
      v._r2 = r2;
      const aStr = v.a === 1 ? '' : v.a === -1 ? '-' : String(v.a);
      // Écrire les facteurs avec le bon signe
      const f1 = v.r1 === 0 ? 'x' : `(x ${v.r1 > 0 ? '- ' + v.r1 : '+ ' + (-v.r1)})`;
      const f2 = r2   === 0 ? 'x' : `(x ${r2   > 0 ? '- ' + r2   : '+ ' + (-r2)})`;
      v._expr = `${aStr}${f1}${f2}`;
      const inegalite = v.sens === 0 ? '> 0' : '< 0';
      return `Résoudre $f(x) ${inegalite}$ où $f(x) = ${v._expr}$.`;
    },
    bonneReponse: (v) => {
      const r1 = v.r1, r2 = v._r2, a = v.a;
      // f(x) = a(x-r1)(x-r2), racines r1 < r2
      // Si a > 0 : f > 0 sur ]-∞,r1[ ∪ ]r2,+∞[, f < 0 sur ]r1,r2[
      // Si a < 0 : f > 0 sur ]r1,r2[, f < 0 sur ]-∞,r1[ ∪ ]r2,+∞[
      const positifExt = a > 0; // f>0 à l'extérieur si a>0
      if (v.sens === 0) {
        // cherche f > 0
        return positifExt
          ? `$x \\in \\left]-\\infty\\,;\\,${r1}\\right[ \\cup \\left]${r2}\\,;\\,+\\infty\\right[$`
          : `$x \\in \\left]${r1}\\,;\\,${r2}\\right[$`;
      } else {
        // cherche f < 0
        return positifExt
          ? `$x \\in \\left]${r1}\\,;\\,${r2}\\right[$`
          : `$x \\in \\left]-\\infty\\,;\\,${r1}\\right[ \\cup \\left]${r2}\\,;\\,+\\infty\\right[$`;
      }
    },
    distracteurs: (v) => {
      const r1 = v.r1, r2 = v._r2, a = v.a;
      const positifExt = a > 0;
      // Distracteur 1 : réponse inversée (confusion signe de a)
      const dist1 = v.sens === 0
        ? (positifExt
            ? `$x \\in \\left]${r1}\\,;\\,${r2}\\right[$`
            : `$x \\in \\left]-\\infty\\,;\\,${r1}\\right[ \\cup \\left]${r2}\\,;\\,+\\infty\\right[$`)
        : (positifExt
            ? `$x \\in \\left]-\\infty\\,;\\,${r1}\\right[ \\cup \\left]${r2}\\,;\\,+\\infty\\right[$`
            : `$x \\in \\left]${r1}\\,;\\,${r2}\\right[$`);
      // Distracteur 2 : intervalles fermés (inclure les racines, erreur classique)
      const dist2 = v.sens === 0
        ? (positifExt
            ? `$x \\in \\left]-\\infty\\,;\\,${r1}\\right] \\cup \\left[${r2}\\,;\\,+\\infty\\right[$`
            : `$x \\in \\left[${r1}\\,;\\,${r2}\\right]$`)
        : (positifExt
            ? `$x \\in \\left[${r1}\\,;\\,${r2}\\right]$`
            : `$x \\in \\left]-\\infty\\,;\\,${r1}\\right] \\cup \\left[${r2}\\,;\\,+\\infty\\right[$`);
      // Distracteur 3 : confondre les racines (inverser r1 et r2)
      const dist3 = v.sens === 0
        ? (positifExt
            ? `$x \\in \\left]-\\infty\\,;\\,${r2}\\right[ \\cup \\left]${r1}\\,;\\,+\\infty\\right[$`
            : `$x \\in \\left]${r2}\\,;\\,${r1}\\right[$`)
        : (positifExt
            ? `$x \\in \\left]${r2}\\,;\\,${r1}\\right[$`
            : `$x \\in \\left]-\\infty\\,;\\,${r2}\\right[ \\cup \\left]${r1}\\,;\\,+\\infty\\right[$`);
      return [dist1, dist2, dist3];
    }
  },

{
  id: "calc_023", theme: "calcul",
  groupe: "puissance",
  niveau: ["techno", "specifique", "specialite"], cols: 2,
  variables: {
    a: { min: 6, max: 9 },   // exposant numérateur
    b: { min: 2, max: 5 },   // exposant dénominateur
    x: {min:2, max:9},
    y : {min:2, max:5}
  },
  enonce: (v) => {
    v.y=(v.x===v.y) ? v.y+1:v.y;
    // N = 10^a / 5^b = 2^b * 10^(a-b) / 10^b... on recalcule proprement
    // 10^a / 5^b = (2*5)^a / 5^b = 2^a * 5^a / 5^b = 2^a * 5^(a-b)
    v._exp = v.a - v.b;
    v._exp = (v._exp===1) ? " " : v._exp;
    v._N = Math.pow(2, v.a) * Math.pow(5, v._exp);
    return `On considère le nombre $N = \\dfrac{${v.x*v.y}^{${v.a}}}{${v.x}^{${v.b}}}$. On a :`;
  },
  bonneReponse: (v) => `$N = ${v.y}^{${v.a}} \\times ${v.x}^{${v._exp}}$`,
  distracteurs: (v) => [
    `$N = ${v.y}^{${v._exp}}$`,
    `$N = ${v.y}^{${v._exp}} \\times ${v.x}^{${v._exp}}$`,
    `$N = ${v.y*v.x}^{${v._exp}}$`,
  ]
},

{
  id: "calc_024", theme: "calcul",
  groupe: "conversion_unite",
  niveau: ["techno", "specifique", "specialite"], cols: 2,
  variables: {
    situation: { values: [0, 1, 2, 3] }
  },
  enonce: (v) => {
    const situations = [
      // [énoncé, donnée, valeur à convertir, facteur, unité départ, unité arrivée, résultat]
      {
        texte: "Un appareil a besoin d'une énergie de $7{,}5 \\times 10^6$ J pour se mettre en route. À combien de kWh cela correspond-il ?",
        donnee: "1\\,\\text{kWh} = 3{,}6 \\times 10^6\\,\\text{J}",
        val: 7.5e6, facteur: 3.6e6, op: '/',
        uniteRes: '\\text{kWh}',
      },
      {
        texte: "Une voiture roule à $90\\,\\text{km/h}$. Quelle est sa vitesse en m/s ?",
        donnee: "1\\,\\text{km/h} = \\dfrac{1}{3{,}6}\\,\\text{m/s}",
        val: 90, facteur: 3.6, op: '/',
        uniteRes: '\\text{m/s}',
      },
      {
        texte: "Une piscine contient $250\\,\\text{m}^3$ d'eau. Quel est ce volume en litres ?",
        donnee: "1\\,\\text{m}^3 = 1000\\,\\text{L}",
        val: 250, facteur: 1000, op: '*',
        uniteRes: '\\text{L}',
      },
      {
        texte: "Un câble mesure $3{,}5 \\times 10^4\\,\\text{cm}$. Quelle est sa longueur en km ?",
        donnee: "1\\,\\text{km} = 10^5\\,\\text{cm}",
        val: 3.5e4, facteur: 1e5, op: '/',
        uniteRes: '\\text{km}',
      },
      {
        texte: "Une réaction chimique libère $4{,}5 \\times 10^3\\,\\text{cal}$. Combien cela fait-il en Joules ?",
        donnee: "1\\,\\text{cal} = 4{,}18\\,\\text{J}",
        val: 4.5e3, facteur: 4.18, op: '*',
        uniteRes: '\\text{J}',
      },
    ];

    const s = situations[v.situation];
    v._s = s;

    // Calcul du résultat exact
    const res = s.op === '/' ? s.val / s.facteur : s.val * s.facteur;
    v._res = parseFloat(res.toPrecision(4));

    return s.texte + `\\\\Donnée : $${s.donnee}$`;
  },

  bonneReponse: (v) => `$${v._res}\\,${v._s.uniteRes}$`,

  distracteurs: (v) => {
    const s = v._s;
    const res = v._res;
    // Dist 1 : opération inverse (multiplier au lieu de diviser ou vice-versa)
    const inv = s.op === '/' ? s.val * s.facteur : s.val / s.facteur;
    const d1 = parseFloat(inv.toPrecision(4));
    // Dist 2 : erreur de puissance de 10 (facteur x10)
    const d2 = parseFloat((res * 10).toPrecision(4));
    // Dist 3 : erreur de puissance de 10 (facteur /10)
    const d3 = parseFloat((res / 10).toPrecision(4));
    return [
      `$${d1}\\,${s.uniteRes}$`,
      `$${d2}\\,${s.uniteRes}$`,
      `$${d3}\\,${s.uniteRes}$`,
    ];
  }
},

{
  id: "calc_025", theme: "calcul",
  groupe: "ordre de grandeur",
  niveau: ["techno", "specifique", "specialite"], cols: 4,
  variables: {
    situation: { values: [0,1,2,3] },
    a: { min: 1, max: 3 },   
    b: { values:[100,50,200,300,400]}, 
  },
  enonce: (v) => {
    var situations = [
      {
        enon: `$\\sqrt{${v.b-v.a}} \\times \\sqrt{${v.b+v.a}}$`,
        ga : `$${v.b}$`,
        dis : ['$' + v.b/10 + '$',
              '$' + v.b/100 + '$',
              '$' + v.b*10 + '$',],
      },
      {
        enon: ` $${v.b-v.a} \\times ${v.b+v.a}$`,
        ga : '$' + v.b*v.b + '$',
        dis : ['$' + v.b*v.b/10 + '$',
              '$' + v.b*v.b/100 + '$',
              '$' + v.b*v.b*10 + '$',],
      },
      {
        enon: `$${v.b-v.a/2*3}^2$`,
        ga : `$${v.b*v.b}$`,
        dis : ['$' + v.b*v.b/10 + '$',
              '$' + v.b*v.b/100 + '$',
              '$' + v.b + '$',],
      },
      {
        enon: `$${v.b-v.a} \\times ${0.5-v.a/100}$`,
        ga : `$${v.b/2}$`,
        dis : ['$' + v.b/10/2 + '$',
              '$' + v.b/100/2 + '$',
              '$' + v.b*10/2 + '$',],
      },
      {
        enon: `$10^${10-v.a} + 10^{${-10+v.a}}$`,
        ga : `$10^${10-v.a}$`,
        dis : [`$10^0$`,
              '$0$',
              `$100^${0}$`,],
      },
    ];

     v._s = situations[v.situation];
    

    return 'On considère $A=$ ' + v._s.enon + ' . $A$ est environ égale à :' ;
  },

  bonneReponse: (v) => v._s.ga,

  distracteurs: (v) => v._s.dis
  
},


];


