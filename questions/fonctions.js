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
        .endClip()
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a, v.b, -4, 4, 'red', 'f')
        .endClip()
        .end();

      return 'On donne la courbe de $f$ ci-contre. '
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
        .endClip()
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a, v.b, -4, 4, 'red', 'f')
        .endClip()
        .end();

      return 'On donne la courbe de $f$ ci-contre. '
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
    id: 'fonc_012_second_degre', theme: 'fonctions',
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
        .endClip()
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .curve(simplExpr(v.a+'*4(x-'+v.r1+')(x-'+v.r2+')/('+v.y0+')-'+v.k))
        .endClip()
        .end();

      return 'On donne la courbe de $f$ ci-contre. '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Résoudre ${f(x)=' + (-v.k)*v.gy + '}$';
    },
    bonneReponse: function(v) { return (v.r1===v.r2)? '$x='+v.r1*v.gx+'$': '$x='+v.r1*v.gx +'$ ou $x='+v.r2*v.gx  + '$'; },
    distracteurs: function(v) {
      return [
        (v.r1===v.r2)? '$x='+(-v.r1*v.gx)+'$' :'$x='+v.r1*v.gx + '$',
        (v.r1===v.r2)? '$x='+((v.x0+1)*v.gx)+'$' :'$x='+v.r2*v.gx + '$',
        '$x='+ (fimage(-v.k,simplExpr(v.a+'*4(x-'+v.r1*v.gx+')(x-'+v.r2*v.gx+')/('+v.y0+')-'+v.k))*v.gy).toFixed(0) + '$',
      ];
    }
  },

   // ── Reconnaître la courbe d'une fonction affine ──
  // Les 4 réponses sont des petits graphiques (SVG web + TikZ export)
  {
    id: 'fonc_013', theme: 'fonctions',
    groupe: 'reconnaitre_courbe',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a: { values: [-9,-8,-7,-6,-5,-4,-3,-2, -1, 1, 2,3,4,5,6,7,8,9] },
      b: { values: [-9,-8,-7,-6,-5,-4,-3,-2, -1, 1, 2,3,4,5,6,7,8,9] },
    },

    fonc013Fig: function(a, b) {
  var svg = Fig.svg(-1.5, 1.5, -1.5, 1.5)
    .axes()
    .clip()
    .affine(a/Math.abs(a), b/Math.abs(b), -3, 3)
    .endClip()
    .end();
 
  var tikz = Fig.latex(-1.5, 1.5, -1.5, 1.5,.6)
    .axes()
    .clip()
    .affine(a/Math.abs(a), b/Math.abs(b), -3, 3)
    .endClip()
    .end();
 
  return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';
},


    enonce: function(v) {
      v._a = v.a; v._b = v.b;
      const expr = v.a + 'x+' +v.b;
      return 'Laquelle de ces courbes peut représenter la fonction $f$ définie par ${f(x) = ' + simplExpr(expr) + '}$' + ' ?';
    },
 
    bonneReponse: function(v) {
      if (v._deduping) return 'bonne:' + v._a + ',' + v._b;
      return this.fonc013Fig(v._a, v._b);
    },
 
    distracteurs: function(v) {
      if (v._deduping) return [
        'dist1:' + (-v._a) + ',' + v._b,
        'dist2:' + v._a    + ',' + (-v._b),
        'dist3:' + (-v._a) + ',' + (-v._b),
      ];
      return [
        this.fonc013Fig(-v._a,  v._b),   // pente opposée
        this.fonc013Fig( v._a, -v._b),   // ordonnée opposée
        this.fonc013Fig(-v._a, -v._b),   // les deux inversés
      ];
    }
  },

  {
    id: 'fonc_014_affine', theme: 'fonctions',
    groupe: 'f(x)=g(x)',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a1:  { values: [-1,-.5,-.25,.25,.5,1] },
      a2:{values:[-1,-.5,-.25,.25,.5,1]},
      gx : {values : [1,2]},
      gy : {values : [1,2]},
      y0:  { values : [-3,-2,-1,1,2,3]},
      x0: { values : [-3,-2,-1,1,2,3]},
    },



    enonce: function(v) {
      v.a1 = (v.a1===v.a2) ? (v.a1===-1) ? v.a1+1 : v.a1-1 : v.a1 ;
      v._x0=v.x0*v.gx;
      v._y0=v.y0*v.gy;
      v.b1 = v.y0-v.a1*v.x0;
      v.b2= v.y0-v.a2*v.x0;
      v._a1=v.a1*v.gy/v.gx
      v._a2=v.a2*v.gy/v.gx
      v._b1 = v._y0-v.a1*v.gy/v.gx*v._x0;
      v._b2 = v._y0-v.a2*v.gy/v.gx*v._x0;
      var xcf= (Math.abs(v.a1*4+v.b1)<=4) ? 4.1:-4.1 ;
      var xcg= (Math.abs(v.a2*4+v.b2)<=4) ? 4.1:-4.1 ;
      // Pendant dedupeAnswers, on calcule juste _y0 — pas de SVG
      if (v._deduping) return '';

      var svg = Fig.svg(-5, 5, -4, 4)
        .grid(1,1,-4,4,-4,4).axes(-4,4,-4,4).gradX(v.gx,-4,4).gradY(v.gy,-4,4).clip()
        .affine(v.a1, v.b1, -4, 4, 'red', 'f')
        .affine(v.a2, v.b2, -4, 4, 'blue', 'g')
        .endClip()
        .text(xcf,v.a1*xcf+v.b1,'C_f','red',(xcf>0) ? 'start':'end')
        .text(xcg,v.a2*xcg+v.b2,'C_g','blue',(xcg>0) ? 'start':'end')
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a1, v.b1, -4, 4, 'red', 'f')
        .affine(v.a2, v.b2, -4, 4, 'blue', 'g')
        .endClip()
        .text(xcf,v.a1*xcf+v.b1,'C_f','red',(xcf>0) ? 'start':'end','\\mathcal{C}_f')
        .text(xcg,v.a2*xcg+v.b2,'C_g','blue',(xcg>0) ? 'start':'end','\\mathcal{C}_g')
        .end();

      return 'Les courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$ représentent les fonctions $f$ et $g$. '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Résoudre $f(x)=g(x)$';
    },
    bonneReponse: function(v) { return '$x=' + v._x0 + '$'; },
    distracteurs: function(v) {
      return [
        '$x=' + v._y0+ '$',
        '$x=' + (v._b2) + '$',
        '$x=' + (v._b1) + '$'
      ];
    }
  },

  {
    id: 'fonc_014_affine_second_deg', theme: 'fonctions',
    groupe: 'f(x)=g(x)',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a2: {values: [-1,1]},
      r1: {min:-3,max:3},
      dx: {min:2,max:3},
      y1: {values: [-3,-2,-1,1,2,3]},
      dy: {min:1,max:3},
      gx : {values : [1,2]},
      gy : {values : [1,2]},
      
    },
    enonce: function(v) {
      v.y2=(v.dy<=v.dx)? v.dy: v.dy-1   ;
      v.r2=(Math.abs(v.r1+v.dx)>3) ? v.r1-v.dx : v.r1+v.dx;
      v.y2=(Math.abs(v.y1+v.y2)>3) ? v.y1-v.y2 : v.y1+v.y2;
      v.a1=(v.y2-v.y1)/(v.r2-v.r1);
      v.b=v.y1-v.a1*v.r1
      while (Math.abs(v.a1*4+v.b)>=4 && Math.abs(v.a1*-4+v.b)>=4 && v.r1==v.r2 && Math.abs(v.a1)>1){
        v.r2=ri(-3,3);
        v.r1=ri(-3,3);
        v.a1=(v.y2-v.y1)/(v.r2-v.r1);
        v.b=v.y1-v.a1*v.r1
      }
      


      v.y0=(v.r1===v.r2)? 1:.5*((v.r2-v.r1)*(v.r1-v.r2)+(v.r1+v.r2)/2*v.a1+v.b);
      var xcf= (Math.abs(v.a1*4+v.b)<=4) ? 4.1:-4.1 ;

      var g =simplExpr(v.a2+'(x-'+v.r1+')(x-'+v.r2+')/'+v.y0+'+('+v.a1+'x+'+v.b+')');
      if (Math.abs(fimage(-4,g))<=4){
        var xg=-4;
        var yg=fimage(xg,g);
        var p='end';
      }else{
        var i = 0;
        while(Math.abs(fimage(-4+i,g))>=4){
          i+=.05;
        }
        var xg=-4+i;
        var yg=fimage(xg,g);
        yg=(yg>0)? yg+.4 : yg-.4;
        var p='middle';
      }
      
      // Pendant dedupeAnswers, on calcule juste _y0 — pas de SVG
      if (v._deduping) return '';

      var svg = Fig.svg(-5, 5, -4, 4)
        .grid(1,1,-4,4,-4,4).axes(-4,4,-4,4).gradX(v.gx,-4,4).gradY(v.gy,-4,4).clip()
        .affine(v.a1, v.b, -4, 4, 'red', 'f')
        .curve(g,-4,4,'blue')
        .endClip()
        .text(xcf,v.a1*xcf+v.b,'C_f','red',(xcf>0) ? 'start':'end')
        .text(xg,yg,'C_g','blue', p)
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a1, v.b, -4, 4, 'red', 'f')
        .curve(g,-4,4,'blue')
        .endClip()
        .text(xcf,v.a1*xcf+v.b,'C_f','red',(xcf>0) ? 'start':'end')
        .text(xg,yg,'C_g','blue', p)
        .end();

      return 'Les courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$ représentent les fonctions $f$ et $g$ définies sur $\\mathbb{R}$. \\\\ '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Résoudre $f(x)=g(x)$';
    },
    bonneReponse: function(v) { return '$x\\in\\{' + Math.min(v.r1,v.r2)*v.gx +','+ Math.max(v.r1,v.r2)*v.gx + '\\}$'; },
    distracteurs: function(v) {
      return [
        '$x\\in\\{' + Math.min(v.y1,v.y2)*v.gy +','+ Math.max(v.y1,v.y2)*v.gy + '\\}$',
        '$x\\in\\{' + Math.min(-v.y1,-v.y2)*v.gy +','+ Math.max(-v.y1,-v.y2)*v.gy + '\\}$',
        '$x\\in\\{' + Math.min(-v.r1,-v.r2)*v.gx +','+ Math.max(-v.r1,-v.r2)*v.gx + '\\}$',
      ];
    }
  },


  {
    id: 'fonc_015_affine_second_deg', theme: 'fonctions',
    groupe: 'f(x)>g(x)',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a2: {values: [-1,1]},
      r1: {min:-3,max:3},
      dx: {min:2,max:3},
      y1: {values: [-3,-2,-1,1,2,3]},
      dy: {min:1,max:3},
      gx : {values : [1,2]},
      gy : {values : [1,2]},
      s:{values:[0,1,2,3]}
    },
    enonce: function(v) {
      v.y2=(v.dy<=v.dx)? v.dy: v.dy-1   ;
      v.r2=(Math.abs(v.r1+v.dx)>3) ? v.r1-v.dx : v.r1+v.dx;
      v.y2=(Math.abs(v.y1+v.y2)>3) ? v.y1-v.y2 : v.y1+v.y2;
      v.a1=(v.y2-v.y1)/(v.r2-v.r1);
      v.b=v.y1-v.a1*v.r1
      while (Math.abs(v.a1*4+v.b)>=4 && Math.abs(v.a1*-4+v.b)>=4 && v.r1==v.r2 && Math.abs(v.a1)>1){
        v.r2=ri(-3,3);
        v.r1=ri(-3,3);
        v.a1=(v.y2-v.y1)/(v.r2-v.r1);
        v.b=v.y1-v.a1*v.r1
      }
      
      const signes=[' \\leqslant ', ' < ',' \\geqslant ', ' > '];
      var signe = signes[v.s];

      v.y0=(v.r1===v.r2)? 1:.5*((v.r2-v.r1)*(v.r1-v.r2)+(v.r1+v.r2)/2*v.a1+v.b);
      var xcf= (Math.abs(v.a1*4+v.b)<=4) ? 4.1:-4.1 ;

      var g =simplExpr(v.a2+'(x-'+v.r1+')(x-'+v.r2+')/'+Math.abs(v.y0)+'+('+v.a1+'x+'+v.b+')');
      if (Math.abs(fimage(-4,g))<=4){
        var xg=-4;
        var yg=fimage(xg,g);
        var p='end';
      }else{
        var i = 0;
        while(Math.abs(fimage(-4+i,g))>=4){
          i+=.05;
        }
        var xg=-4+i;
        var yg=fimage(xg,g);
        yg=(yg>0)? yg+.4 : yg-.4;
        var p='middle';
      }
      
      r=[        ' ['+Math.min(v.r1,v.r2)*v.gx + ';' + Math.max(v.r1,v.r2)*v.gx  +']',
        ']'+Math.min(v.r1,v.r2)*v.gx + ';' + Math.max(v.r1,v.r2)*v.gx  +'[',
        ' ] -\\infty;' + Math.min(v.r1,v.r2)*v.gx  +'] \\cup ['+ Math.max(v.r1,v.r2)*v.gx  +';+\\infty[',
        ' ] -\\infty;' + Math.min(v.r1,v.r2)*v.gx  +'[ \\cup ]'+ Math.max(v.r1,v.r2)*v.gx  +';+\\infty[',
      ]
       v.canswer = 0;
      if (v.a2===-1){
        v.canswer = (v.s===0) ? 0 :
        (v.s===1)? 1:
        (v.s===2)? 2:
        3;
      } else {
        v.canswer = (v.s===0) ? 2 :
        (v.s===1)? 3:
        (v.s===2)? 0:  1;

      }
      
      // Pendant dedupeAnswers, on calcule juste _y0 — pas de SVG
      if (v._deduping) return '';

      var svg = Fig.svg(-5, 5, -4, 4)
        .grid(1,1,-4,4,-4,4).axes(-4,4,-4,4).gradX(v.gx,-4,4).gradY(v.gy,-4,4).clip()
        .affine(v.a1, v.b, -4, 4, 'red', 'f')
        .curve(g,-4,4,'blue')
        .endClip()
        .text(xcf,v.a1*xcf+v.b,'C_f','red',(xcf>0) ? 'start':'end')
        .text(xg,yg,'C_g','blue', p)
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX(v.gx).gradY(v.gy).clip()
        .affine(v.a1, v.b, -4, 4, 'red', 'f')
        .curve(g,-4,4,'blue')
        .endClip()
        .text(xcf,v.a1*xcf+v.b,'C_f','red',(xcf>0) ? 'start':'end')
        .text(xg,yg,'C_g','blue', p)
        .end();

      return 'Les courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$ représentent les fonctions $f$ et $g$ définies sur $\\mathbb{R}$. \\\\'
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Résoudre $f(x)'+ signe +' g(x)$';
    },

    bonneReponse: function(v) { return '$x\\in' + r[v.canswer] +'$'; },
    distracteurs: function(v) {
      return [
        '$x\\in' + r[(v.canswer+1)%4] +'$',
        '$x\\in' + r[(v.canswer+2)%4] +'$',
        '$x\\in' + r[(v.canswer+3)%4] +'$',
      ];
    }
  },

   {
    id: 'fonc_016', theme: 'fonctions',
    groupe: 'tableau de signes affine',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: { a:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
      b:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]}
    },
    enonce: function(v) {
      if (v._deduping) return '';
      var s1 = (v.a*v.b<0) ? '+' : '-';
      var s2 = (v.a*v.b>0) ? '+' : '-';

      var svg = Fig.svg(.6, 6.5, -1.5, -.5)
        .tableauS([['x','-∞',v.b,'+∞'],['f(x)',s1,'0',s2]]).end();

      var tikz = Fig.latex(0, 7, -2, 0)
        .tableauS([['x','-\\infty',v.b,'+\\infty'],['f(x)',s1,'0',s2]]).end();

      return 'La seule fonction $f$ qui a le tableau de signes ci-contre est : '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';
    },
 
    bonneReponse: function(v) {
     return '${f(x)='+ simplExpr(-v.a +'x+'+v.b*v.a) +'}$' 
    },
 
    distracteurs: function(v) {
      return ['${f(x)='+ simplExpr(v.a +'x+'+v.b*v.a) +'}$',
              '${f(x)='+ simplExpr(v.a +'x+'+ (-v.b*v.a)) +'}$',
              '${f(x)='+ simplExpr(-v.a +'x+'+ (-v.b*v.a)) +'}$'
            ];
    }
  },

  {
    id: 'fonc_017', theme: 'fonctions',
    groupe: 'tableau de signes affine',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: { a:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
      b:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]}
    },
    enonce: function(v) {
      if (v._deduping) return '';
      return 'Le tableau de signes de la fonction $f$ définie sur $\\mathbb{R}$ apr ${f(x)=' + simplExpr(v.a+'x+'+v.b*v.a) +'}$ est :' ;
    },
    
    aux: function(a,s1,s2) {
      var svg = Fig.svg(.6, 6.5, -1.5, -.5)
        .tableauS([['x','-∞',a,'+∞'],['f(x)',s1,'0',s2]]).end();

      var tikz = Fig.latex(0, 7, -2, 0)
        .tableauS([['x','-\\infty',a,'+\\infty'],['f(x)',s1,'0',s2]]).end();

      return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';

    },

    bonneReponse: function(v) {
      let [s1,s2]= (v.a>0)? ['-','+']:['+','-'] ;
     return this.aux(-v.b,s1,s2) 
    },
 
    distracteurs: function(v) {

      let [s1,s2]= (v.a>0)? ['-','+']:['+','-'] ;
      let [s3,s4]= (v.a<0)? ['-','+']:['+','-'] ;
      


      return [this.aux(-v.b,s3,s4) ,
              this.aux(v.b,s1,s2) ,
              this.aux(v.b,s3,s4) 
            ];
    }
  },

  {
    id: 'fonc_018', theme: 'fonctions',
    groupe: 'tableau de signes second degré',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: { a:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
      b:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
      c:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
      d:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
    },
    enonce: function(v) {
      if (v._deduping) return '';

      (Math.abs(v.b)===Math.abs(v.d)) ? v.d-- : ' ' ;

      return 'Le tableau de signes de la fonction $f$ définie sur $\\mathbb{R}$ par ${f(x)=' + simplExpr('('+v.a+'x+'+v.b*v.a+')('+v.c+'x+'+v.d*v.c+')') +'}$ est :';
    },
    
    aux: function(a,b,s1,s2) {
      var svg = Fig.svg(.6, 8.5, -1.5, -.5)
        .tableauS([['x','-∞',a,b,'+∞'],['f(x)',s1,'0',s2,'0',s1]]).end();

      var tikz = Fig.latex(0, 9, -2, 0)
        .tableauS([['x','-\\infty',a,b,'+\\infty'],['f(x)',s1,'0',s2,'0',s1]]).end();

      return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';

    },

    bonneReponse: function(v) {
      let [s1,s2]= (v.a*v.c<0)? ['-','+']:['+','-'] ;
     return this.aux(Math.min(-v.b,-v.d),Math.max(-v.b,-v.d),s1,s2) 
    },
 
    distracteurs: function(v) {
      let [s1,s2]= (v.a*v.c<0)? ['-','+']:['+','-'] ;
      return [this.aux(Math.min(-v.b,-v.d),Math.max(-v.b,-v.d),s2,s1) ,
              this.aux(Math.min(v.b,v.d),Math.max(v.b,v.d),s1,s2) ,
              this.aux(Math.min(v.b,v.d),Math.max(v.b,v.d),s2,s1)  
            ];
    }
  },

  {
    id: 'fonc_018b', theme: 'fonctions',
    groupe: 'tableau de signes second degré',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: { a:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
      b:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
      c:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
      d:{values:[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]},
    },
    enonce: function(v) {
      if (v._deduping) return '';

      (Math.abs(v.b)===Math.abs(v.d)) ? v.d-- : ' ' ;
      let [s1,s2]= (v.a*v.c<0)? ['-','+']:['+','-'] ;

      return 'On considère le tableau de signes ci-contre.' + this.aux(-v.b,-v.d,s1,s2)  + 'La seule fonction $f$ représentée par le tableau est :';
    },
    
    aux: function(a,b,s1,s2) {
      var svg = Fig.svg(.6, 8.5, -1.5, -.5)
        .tableauS([['x','-∞',Math.min(a,b),Math.max(a,b),'+∞'],['f(x)',s1,'0',s2,'0',s1]]).end();

      var tikz = Fig.latex(0, 9, -2, 0)
        .tableauS([['x','-\\infty',Math.min(a,b),Math.max(a,b),'+\\infty'],['f(x)',s1,'0',s2,'0',s1]]).end();

      return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';

    },

    bonneReponse: function(v) {
     return '${f(x)=' + simplExpr('('+v.a+'x+'+v.b*v.a+')('+v.c+'x+'+v.d*v.c+')') +'}$';
    },
 
    distracteurs: function(v) {
      return ['${f(x)=' + simplExpr('('+(-v.a)+'x+'+(-v.b*v.a)+')('+(-v.c)+'x+'+(v.d*v.c)+')') +'}$',
              '${f(x)=' + simplExpr('('+(-v.a)+'x+'+(-v.b*v.a)+')('+v.c+'x+'+v.d*v.c+')') +'}$',
              '${f(x)=' + simplExpr('('+v.a+'x+'+v.b*v.a+')('+(-v.c)+'x+'+(-v.d*v.c)+')') +'}$'
            ];
    }
  },


  {
    id: 'fonc_019_degre3', theme: 'fonctions',
    groupe: 'graph -> signe',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      a:  { values: [-1,1] },
      b: {values: [-1,1]},
      c :{ min:-2, max :1}
    },


    aux: function(a,b,c,s1,s2){

      var svg = Fig.svg(.6, 10.5, -1.5, -.5)
        .tableauS([['x','-∞',a,b,c,'+∞'],['f(x)',s1,'0',s2,'0',s1,'0',s2]]).end();

      var tikz = Fig.latex(0, 11, -2, 0)
        .tableauS([['x','-\\infty',a,b,c,'+\\infty'],['f(x)',s1,'0',s2,'0',s1,'0',s2]]).end();

      return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';

    },

    enonce: function(v) {
      v._a=v.a+'*x-'+v.c
      v.f= simplExpr(v.b +'*('+v._a+'-1)*('+v._a+'-2)*('+v._a+'+1)')
      // Pendant dedupeAnswers, on calcule juste _y0 — pas de SVG
      if (v._deduping) return '';
      v._r=[(2+v.c)/v.a,(1+v.c)/v.a,(-1+v.c)/v.a]
      v._r.sort((a, b) => a - b);
      
      var svg = Fig.svg(-4, 4, -4, 4)
        .grid().axes().gradX().gradY().clip()
        .curve(v.f)
        .endClip()
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX().gradY().clip()
        .curve(v.f)
        .endClip()
        .end();

      return 'On donne la courbe de la fonction $f$ ci-contre. '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Quel est le tableau de signe de la fonction $f$ ?';
    },
    bonneReponse: function(v) { 
      let [s1,s2]= (v.a*v.b>0)? ['-','+']:['+','-'] ;
      return this.aux(v._r[0],v._r[1],v._r[2],s1,s2) },
    distracteurs: function(v) {
      let [s1,s2]= (v.a*v.b>0)? ['-','+']:['+','-'] ;
      return [
        this.aux(v._r[0],v._r[1],v._r[2],s2,s1) ,
        this.aux(v._r[2],v._r[1],v._r[0],s1,s2) ,
        this.aux(v._r[2],v._r[1],v._r[0],s2,s1) ,
      ];
    }
  },

  {
    id: 'fonc_019_degre2', theme: 'fonctions',
    groupe: 'graph -> signe',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      s:{values:[-1,1]},
      a:  { min:-3,max:3},
      b: { min:-3,max:3},
      k:{min:1, max:3}
    },


    aux: function(a,b,s1,s2){

      var svg = Fig.svg(.6, 8.5, -1.5, -.5)
        .tableauS([['x','-∞',a,b,'+∞'],['f(x)',s1,'0',s2,'0',s1]]).end();

      var tikz = Fig.latex(0, 9, -2, 0)
        .tableauS([['x','-\\infty',a,b,'+\\infty'],['f(x)',s1,'0',s2,'0',s1]]).end();

      return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';

    },

    enonce: function(v) {
      v.b=(v.b===v.a) ? -v.b:v.b;
      v.f= simplExpr(v.s +'*(x-'+v.a+')*(x-'+v.b+')')
      v.y0= (v.a-v.b ===0)? 1: Math.abs(fimage((v.a+v.b)/2,v.f));
      v.f= simplExpr(v.k*v.s +'*(x-'+v.a+')*(x-'+v.b+')/'+v.y0)
      var svg = Fig.svg(-4, 4, -4, 4)
        .grid().axes().gradX().gradY().clip()
        .curve(v.f)
        .endClip()
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX().gradY().clip()
        .curve(v.f)
        .endClip()
        .end();

      return 'On donne la courbe de la fonction $f$ ci-contre. '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Quel est le tableau de signe de la fonction $f$ ?';
    },
    bonneReponse: function(v) { 
      let [s1,s2]= (v.s<0)? ['-','+']:['+','-'] ;
      return this.aux(Math.min(v.a,v.b),Math.max(v.a,v.b),s1,s2) },
    distracteurs: function(v) {
      let [s1,s2]= (v.s<0)? ['-','+']:['+','-'] ;
      return [
        this.aux(Math.min(v.a,v.b),Math.max(v.a,v.b),s2,s1) ,
        this.aux(Math.max(v.a,v.b),Math.min(v.a,v.b),s1,s2) ,
        this.aux(Math.max(v.a,v.b),Math.min(v.a,v.b),s2,s1) ,
      ];
    }
  },

  {
    id: 'fonc_020', theme: 'fonctions', groupe:'xf(x)>0',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: { a: {values:[-1,1]},b: {values:[-1,1]}   },
    
    aux: function(f,p1,p2,p3,p4) {
      if (this._deduping) return '';
      var svg = Fig.svg(-4, 4, -4, 4)
        .grid().axes().gradX().gradY().clip()
        .curve(f)
        .point(-2.85,fimage(-2.85,f),'A','blue',p1)
        .point(-.71,fimage(-.71,f),'B','blue','end',p3)
        .point(1.36,fimage(1.36,f),'R','blue',p2,p4)
        .point(3,fimage(3,f),'S','blue',p1)
        .endClip()
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX().gradY().clip()
        .curve(f)
        .point(-2.85,fimage(-2.85,f),'A','blue',p1)
        .point(-.71,fimage(-.71,f),'B','blue','end',p3)
        .point(1.36,fimage(1.36,f),'R','blue',p2,p4)
        .point(3,fimage(3,f),'S','blue',p1)
        .endClip()
        .end();

      return [svg,tikz];

    },

    enonce: function(v) {
      var a=v.a;
      var b=v.b;
      
      v._f=a+'*('+b+'x-.2)('+b+'x-2.5)('+b+'x+2)/6'
      let [p1,p2]=(v.a*v.b>0)? ['end','start'] :['start','end'];
      let [p3,p4]=(v.a*v.b>0)? ['above','below'] :['below','above'];
      let [svg,tikz] = this.aux(v._f,p1,p2,p3,p4);
      return 'On a représenté ci-contre la courbe $\\mathcal{C}$ d\'une fonction $f$.\\\\' 
      +'Les points A, B, R et S appartiennent à la courbe $\\mathcal{C}$. \\\\ '
      +'Leurs abscisses sont notées respectivement $x_A$, $x_B$, $x_R$ et $x_S$. \\\\' 
      + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
      + 'L\'inéquation $x\\times f(x)>0$ est vérifiée par : ' ;
    },
    
    

    bonneReponse: function(v) {
     return (v.a*v.b>0)? '$x_A$ et $x_S$': '$x_B$ et $x_R$' ;
    },
 
    distracteurs: function(v) {
      return [(v.a*v.b<0)? '$x_A$ et $x_S$': '$x_B$ et $x_R$',
              (v.a*v.b<0)? '$x_A$ et $x_R$': '$x_B$ et $x_S$',
               '$x_R$ et $x_S$'
            ];
    }
  },


  {
    id: 'fonc_021', theme: 'fonctions', groupe:'Calcul d\'image',
    niveau: ['techno', 'specifique', 'specialite'], cols: 4,
    variables: {situation:{values:[0,1,2]}, a: {min:2,max:3}, b: {min:2,max:5}, c: {min:2,max:9}, x:{min:-4,max:4} },
    
    

    enonce: function(v) {
      var table = [
        {
        f: simplExpr('3x^2+'+v.b+'x+'+v.c),
        ga : fimage(v.x,simplExpr('3x^2+'+v.b+'x+'+v.c)),
        dis : ['$'+fimage(v.x,simplExpr('3x*2+'+v.b+'x+'+v.c))+'$',
              '$'+fimage(v.x,simplExpr('3x*2+'+v.b+'x+'+(-v.c)))+'$',
              '$'+fimage(v.x,simplExpr('3x^2+'+(-v.b)+'x+'+v.c))+'$',],
      },
      {
        f: simplExpr(v.a+'(x-'+v.b+')^2+'+v.c),
        ga : fimage(v.x,simplExpr(v.a+'(x-'+v.b+')^2+'+v.c)),
        dis : ['$'+fimage(v.x,simplExpr(v.a+'(x-'+v.b+')*2+'+v.c))+'$',
              '$'+fimage(v.x,simplExpr('(x-'+v.b+')^2+'+v.c))+'$',
              '$'+fimage(v.x,simplExpr(v.a+'(x+'+v.b+')^2+'+v.c))+'$',],
      },
      {
        f: simplExpr(frac(v.a,v.b)==='1'?'(x-2)-\\dfrac{1}{2}' : frac(v.a,v.b)+'(x-2)-\\dfrac{1}{2}' ),
        ga : frac(v.a*(v.x-2)*2-v.b,v.b*2),
        dis : ['$'+frac(v.a*(v.x-2)*2+v.b,v.b*2)+'$',
              '$'+frac(v.a*(v.x-2)*2-1,v.b+2)+'$',
              '$'+frac(v.a*(v.x-2)*2+1,v.b+2)+'$',],
      },
      

      ];
      v._s=table[v.situation]
      return 'On considère la fonction $f$ définie pour tout réel $x$ par ${f(x)='+ v._s.f+'}$. \\\\ '
      + 'L\'image de $'+v.x+'$ par la fonction $f$ est égale à :'
    },
    
    

    bonneReponse: function(v) {
     return  '$'+v._s.ga+'$';
    },
 
    distracteurs: function(v) {
    

      return v._s.dis;
    }
  },

  {
    id: 'fonc_022_degre2', theme: 'fonctions',
    niveau: ['techno', 'specifique', 'specialite'], cols: 2,
    variables: {
      s:{values:[-1,1]},
      a:  { min:-3,max:3},
      b: { min:-3,max:3},
      k:{min:1, max:3}
    },


    aux: function(a,b,s1,s2){

      var svg = Fig.svg(.6, 8.5, -2.5, -.5)
        .tableauV([['x','-∞',a,'+∞'],['f','',s1,b,s2,'']]).end();

      var tikz = Fig.latex(0, 9, -2, 0)
        .tableauV([['x','-\\infty',a,'+\\infty'],['f','',s1,b,s2,'']]).end();

      return '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%';

    },

    enonce: function(v) {
      v.b=(v.b===v.a) ? -v.b:v.b;
      v.k=(-v.k*v.s===v.x0)? (v.k===1)? v.k+1 : v.k-1:v.k;
      v.f= simplExpr(v.s +'*(x-'+v.a+')*(x-'+v.b+')')
      v.x0=(v.a+v.b)/2;
      
      v.y0= (v.a-v.b ===0)? 1: Math.abs(fimage((v.a+v.b)/2,v.f));
      v.f= simplExpr(v.k*v.s +'*(x-'+v.a+')*(x-'+v.b+')/'+ Math.abs(v.y0))
      
      var svg = Fig.svg(-4, 4, -4, 4)
        .grid().axes().gradX().gradY().clip()
        .curve(v.f)
        .endClip()
        .end();

      var tikz = Fig.latex(-4, 4, -4, 4)
        .grid().axes().gradX().gradY().clip()
        .curve(v.f)
        .endClip()
        .end();

      return 'On donne la courbe de la fonction $f$ ci-contre. '
           + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
           + 'Quel est le tableau de variations de la fonction $f$ ?';
    },
    bonneReponse: function(v) { 
      let [s1,s2]= (v.s<0)? ['c','d']:['d','c'] ;
      return this.aux(v.x0,-v.s*v.k,s1,s2) },
    distracteurs: function(v) {
      let [s1,s2]= (v.s<0)? ['c','d']:['d','c'] ;
      return [
        this.aux(v.x0,-v.s*v.k,s2,s1)  ,
        this.aux(-v.s*v.k,v.x0,s1,s2)  ,
        this.aux(-v.s*v.k,v.x0,s2,s1)  ,
      ];
    }
  },
];
 