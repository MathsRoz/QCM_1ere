// ═══════════════════════════════════════════════════════
//  THÈME : Fonctions et représentations
//  BO 2025 — session 2027
// ═══════════════════════════════════════════════════════




const QUESTIONS_FONCTIONS = [

  // // ── Calculer une image ──
  // {
  //   id: "fonc_001", theme: "fonctions",
  //   niveau: ["techno", "specifique", "specialite"], cols: 4,
  //   variables: { a: { min: -6, max: 6 }, b: { min: -8, max: 8 }, x: { min: -4, max: 6 } },
  //   enonce: (v) => {
  //     v.b = (v.b===0) ? 1 : v.b;
  //     v.a = (v.a===0) ? -2 : v.a;
  //     s = (v.b<0) ? "":"+";
  //     return `$f(x) = ${v.a}x `+s+` ${v.b}$. Calculer $f(${v.x})$`},
  //   bonneReponse: (v) => `$${v.a * v.x + v.b}$`,
  //   distracteurs: (v) => [
  //     `$${v.a * v.x - v.b}$`,
  //     `$${v.a + v.x + v.b}$`,
  //     `$${(v.a + v.b) * v.x}$`
  //   ]
  // },

  // // ── Trouver un antécédent ──
  // {
  //   id: "fonc_002", theme: "fonctions",
  //   niveau: ["techno", "specifique", "specialite"], cols: 4,
  //   variables: { a: { min: 1, max: 6 }, b: { min: -8, max: 8 }, c: { min: 1, max: 5 } },
  //   enonce: (v) => `$f(x) = ${v.a}x + ${v.b}$. Trouver l'antécédent de $${v.a * v.c + v.b}$`,
  //   bonneReponse: (v) => `$x = ${v.c}$`,
  //   distracteurs: (v) => [
  //     `$x = ${v.a + v.b}$`,
  //     `$x = ${v.a * v.b}$`,
  //     `$x = -${v.c}$`
  //   ]
  // },

  // ── Reconnaître fonction affine / linéaire ──
  // {
  //   id: "fonc_003", theme: "fonctions",
  //   niveau: ["techno", "specifique", "specialite"], cols: 4,
  //   variables: { a: { min: 1, max: 8 }, b: { min: -10, max: 10 } },
  //   enonce: (v) => `$f(x) = ${v.a}x + ${v.b}$ est une fonction…`,
  //   bonneReponse: (v) => `Affine, strictement croissante`,
  //   distracteurs: (v) => [
  //     `Linéaire`,
  //     `Affine, strictement décroissante`,
  //     `Constante`
  //   ]
  // },

  // // ── Identifier une fonction linéaire ──
  // {
  //   id: "fonc_004", theme: "fonctions",
  //   niveau: ["techno", "specifique", "specialite"], cols: 4,
  //   variables: { a: { min: 1, max: 8 } },
  //   enonce: (v) => `$f(x) = ${v.a}x$ est une fonction…`,
  //   bonneReponse: (v) => `Linéaire`,
  //   distracteurs: (v) => [
  //     `Affine non linéaire`,
  //     `Constante`,
  //     `Quadratique`
  //   ]
  // },

  // ── Lire le coefficient directeur ──
  // {
  //   id: "fonc_005", theme: "fonctions",
  //   niveau: ["techno", "specifique", "specialite"], cols: 4,
  //   variables: { m: { min: 1, max: 5 }, b: { min: -6, max: 6 } },
  //   enonce: (v) => `Quel est le coefficient directeur de $y = ${v.m}x + ${v.b}$ ?`,
  //   bonneReponse: (v) => `$${v.m}$`,
  //   distracteurs: (v) => [
  //     `$${v.b}$`,
  //     `$${v.m + v.b}$`,
  //     `$-${v.m}$`
  //   ]
  // },

  // ── Calculer le coefficient directeur à partir de deux points ──
  {
    id: "fonc_006", theme: "fonctions",
    niveau: ["techno", "specifique", "specialite"], cols: 4,
    variables: { x1: { min: 0, max: 3 }, y1: { min: 1, max: 6 }, dx: { min: 2, max: 6 }, dy: { min: 2, max: 10 } },
    enonce: (v) => `Coefficient directeur de la droite passant par $A(${v.x1};${v.y1})$ et $B(${v.x1 + v.dx};${v.y1 + v.dy})$`,
    bonneReponse: (v) => `$${frac(v.dy, v.dx)}$`,
    distracteurs: (v) => [
      `$${frac(-v.dy, v.dx)}$`,
      `$${frac(v.dx, v.dy)}$`,
      `$${frac(-v.dx, v.dy)}$`
    ]
  },

  // ── Appartenance d'un point à une courbe ── done
  {
    id: "fonc_008", theme: "fonctions",
    niveau: ["specifique", "specialite"], cols: 4,
    variables: { a: { min: -5, max: 5 }, b: { min: -6, max: 6 }, c: { min: 1, max: 8 } },
    enonce: (v) => {
      if(v.a==0){v.a=3}
      return 'La droite d\'équation '+ simplExpr(' $y = '+(v.a)+'x +'+ (v.b) +'$' )+` passe par le point de coordonnées :`},
    bonneReponse: (v) => `$(${v.c};${v.a*v.c+v.b})$`,
    distracteurs: (v) => [
      `$(${v.c-1};${v.a*(v.c-2)+v.b})$`,
      `$(${v.c+1};${v.a*(v.c+2)+v.b})$`,
      `$(${v.c-2};${v.a*(v.c-1)+v.b})$`,
    ]
  },


  // ── Lire f(x₀) graphiquement ──
  {
    id: 'fonc_011', theme: 'fonctions',
    groupe: 'image',
    niveau: ['techno', 'specifique', 'specialite'], cols: 4,
    variables: {
      a:  { values: [-2,-1,-.5,-.25,.25,.5,1,2] },
      gx : {values : [1,2]},
      gy : {values : [1,2]},
      y0:  { min: -3, max: 3 },
      x0: { min: -3, max: 3 },
    },
    enonce: function(v) {
      v._x0=v.x0*v.gx;
      v._y0=v.y0*v.gy;
      v.b = v.y0-v.a*v.x0;
      v._a=v.a*v.gy/v.gx
      v._b = v._y0-v.a*v.gy/v.gx*v._x0;
      // Pendant dedupeAnswers, on calcule juste _y0 — pas de SVG
      if (v._deduping) return '';
      

      var svg = Fig.svg(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a, v.b, -4, 4, 'red', 'f')
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a, v.b, -4, 4, 'red', 'f')
        .end();

      return 'On donne la courbe de $f$ ci-dessous. '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Quelle est la valeur de $f(' + v._x0+ ')$ ?';
    },
    bonneReponse: function(v) { return '$' + v._y0 + '$'; },
    distracteurs: function(v) {
      return [
        '$' + (v._x0-v._b)/v._a + '$',
        '$' + (v._a) + '$',
        '$' + (v._x0) + '$'
      ];
    }
  },

  // ── Résoudre une équation f(x)=k ──
  {
    id: 'fonc_012_affine', theme: 'fonctions',
    groupe: 'f(x)=k',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a:  { values: [-2,-1,-.5,-.25,.25,.5,1,2] },
      gx : {values : [1,2]},
      gy : {values : [1,2]},
      y0:  { min: -3, max: 3 },
      x0: { min: -3, max: 3 },
    },
    enonce: function(v) {
      v._x0=v.x0*v.gx;
      v._y0=v.y0*v.gy;
      v.b = v.y0-v.a*v.x0;
      v._a=v.a*v.gy/v.gx
      v._b = v._y0-v.a*v.gy/v.gx*v._x0;

      // Pendant dedupeAnswers, on calcule juste _y0 — pas de SVG
      if (v._deduping) return '';

      var svg = Fig.svg(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a, v.b, -4, 4, 'red', 'f')
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a, v.b, -4, 4, 'red', 'f')
        .end();

      return 'On donne la courbe de $f$ ci-dessous. '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Résoudre $f(x)=' + v._y0 + '$.';
    },
    bonneReponse: function(v) { return '$x=' + v._x0 + '$'; },
    distracteurs: function(v) {
      return [
        '$x=' + (v._a*v._y0+v._b) + '$',
        '$x=' + (v._a) + '$',
        '$x=' + (v._y0) + '$'
      ];
    }
  },

  {
    id: 'fonc_013_second_degre', theme: 'fonctions',
    groupe: 'f(x)=k',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a:  { values: [-2,-1,1,2] },
      gx : {values : [1,2]},
      gy : {values : [1,2]},
      r1:  { min: -3, max: 3 },
      r2: { min: -3, max: 3 },
    },
    enonce: function(v) {
      v.y0=(v.r1===v.r2)? 1:(v.r2-v.r1)*(v.r1-v.r2);
      v.x0=(v.r1+v.r2)/2;
      v.k=-ri(-3+Math.abs(v.a),3-Math.abs(v.a));
      // Pendant dedupeAnswers, on calcule juste _y0 — pas de SVG
      if (v._deduping) return '';

      var svg = Fig.svg(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .curve(simplExpr(v.a+'*4(x-'+v.r1+')(x-'+v.r2+')/('+v.y0+')-'+v.k))
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .curve(simplExpr(v.a+'*4(x-'+v.r1+')(x-'+v.r2+')/('+v.y0+')'))
        .end();

      return 'On donne la courbe de $f$ ci-dessous. '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Résoudre $f(x)=' + (-v.k)*v.gy + '$';
    },
    bonneReponse: function(v) { return (v.r1===v.r2)? '$x='+v.r1*v.gx+'$': '$x='+v.r1*v.gx +'$ ou $x='+v.r2*v.gx  + '$'; },
    distracteurs: function(v) {
      return [
        (v.r1===v.r2)? '$x='+(-v.r1*v.gx)+'$' :'$x='+v.r1*v.gx + '$',
        (v.r1===v.r2)? '$x='+((v.x0+1)*v.gx)+'$' :'$x='+v.r2*v.gx + '$',
        '$x='+ (fimage(-v.k,simplExpr(v.a+'*4(x-'+v.r1+')(x-'+v.r2+')/('+v.y0+')-'+v.k))*v.gy).toFixed(0) + '$',
      ];
    }
  },

   // ── Reconnaître la courbe d'une fonction affine ──
  // Les 4 réponses sont des petits graphiques (SVG web + TikZ export)
  {
    id: 'fonc_014', theme: 'fonctions',
    groupe: 'reconnaitre_courbe',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a: { values: [-3,-2, -1, 1, 2,3] },
      b: { values: [-3,-2, -1, 1, 2,3] },
    },
    enonce: function(v) {
      v._a = v.a; v._b = v.b;
      const expr = v.a + 'x+' +v.b;
      return 'Laquelle de ces courbes représente $f(x) = ' + simplExpr(expr) + '$' + ' ?';
    },
 
    bonneReponse: function(v) {
      if (v._deduping) return 'bonne:' + v._a + ',' + v._b;
      return fonc013Fig(v._a, v._b);
    },
 
    distracteurs: function(v) {
      if (v._deduping) return [
        'dist1:' + (-v._a) + ',' + v._b,
        'dist2:' + v._a    + ',' + (-v._b),
        'dist3:' + (-v._a) + ',' + (-v._b),
      ];
      return [
        fonc013Fig(-v._a,  v._b),   // pente opposée
        fonc013Fig( v._a, -v._b),   // ordonnée opposée
        fonc013Fig(-v._a, -v._b),   // les deux inversés
      ];
    }
  },
];
 



// ── Helper : génère la réponse SVG+TikZ pour fonc_013 ──
function fonc013Fig(a, b) {
  var svg = Fig.svg(-2, 2, -2, 2)
    .axes()
    .clip()
    .affine(a/Math.abs(a), b/Math.abs(b), -3, 3)
    .endClip()
    .end();
 
  var tikz = Fig.latex(-2, 2, -2, 2)
    .axes()
    .clip()
    .affine(a/Math.abs(a), b/Math.abs(b), -3, 3)
    .endClip()
    .end();
 
  return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';
}

