// ═══════════════════════════════════════════════════════
//  THÈME : Questions avec figures TikZ
//  BO 2025 — session 2027
//
//  Règle absolue : PAS de template literals (backticks).
//  Le code TikZ contient des $ qui cassent les interpolations JS.
//  → Toujours construire les chaînes avec + et des guillemets simples/doubles.
//
//  mkTikz(code) encapsule le code dans %%TIKZ...%%ENDTIKZ%%
//  Le moteur HTML (stripTikz + injectTikzNodes) injecte ensuite
//  un <script type="text/tikz"> dans le DOM pour TikZJax.
//  L'export LaTeX (latexifyStr) réinjecte le code tikzpicture natif.
// ═══════════════════════════════════════════════════════

function mkTikz(code) {
  return '%%TIKZ' + code + '%%ENDTIKZ%%';
}

// ─── Helper : graduations TikZ ───────────────────────
function gradX(n,m) {
  var s = '';
  for (var i = n; i <= m; i++) {
    if(i!=0){
    s += '  \\draw (' + i + ',2pt)--(' + i + ',-2pt) node[below,font=\\small]{' + i + '};\n';
  }
  }
  return s;
}
function gradY(n,m) {
  var s = '';
  
  for (var i = n; i <= m; i++) {
    if(i!=0){
    s += '  \\draw (2pt,' + i + ')--(-2pt,' + i + ') node[left,font=\\small]{' + i + '};\n';
    }
  }
  return s;
}

// ─────────────────────────────────────────────────────
var QUESTIONS_FIGURES = [

  // ════════════════════════════════════
  // FONCTIONS — Lire une image f(3)
  // ════════════════════════════════════
  // {
  //   id: 'fig_fonc_001', theme: 'fonctions',
  //   niveau: ['techno', 'specifique', 'specialite'], cols: 4,
  //   variables: { a: { min: 1, max: 2 }, b: { min: 0, max: 2 } },
  //   enonce: function(v) {
  //     var ymax = 5;
  //     var y2   = v.a * 1 + v.b;
  //     var code = '\\begin{tikzpicture}[scale=0.75]\n'
  //       + '  \\draw[very thin,gray!30] (0,0) grid (5,' + ymax + ');\n'
  //       + '  \\draw[->,thick] (-0.3,0)--(5.6,0) node[right]{$x$};\n'
  //       + '  \\draw[->,thick] (0,-0.3)--(0,' + (ymax + 0.6) + ') node[above]{$y$};\n'
  //       + gradX(5)
  //       + gradY(5)
  //       + '  \\draw[blue,very thick] (0,' + v.b + ')--(5,' + (v.a * 5 + v.b) + ')'
  //       + ' node[right,font=\\small]{$f$};\n'
  //       + '\\end{tikzpicture}';
  //     return 'On donne la courbe de $f(x) = ' + v.a + 'x + ' + v.b + '$.\n'
  //          + mkTikz(code)
  //          + '\n\nQuelle est la valeur de $f(3)$ ?';
  //   },
  //   bonneReponse: function(v) { return '$' + (v.a * 3 + v.b) + '$'; },
  //   distracteurs: function(v) {
  //     return [
  //       '$' + (v.a * 3 + v.b + 1) + '$',
  //       '$' + (v.a * 2 + v.b) + '$',
  //       '$' + (v.a * 3) + '$'
  //     ];
  //   }
  // },

  // // ════════════════════════════════════
  // // FONCTIONS — Lire un antécédent
  // // ════════════════════════════════════
  // {
  //   id: 'fig_fonc_002', theme: 'fonctions',
  //   niveau: ['techno', 'specifique', 'specialite'], cols: 4,
  //   variables: { m: { min: 1, max: 2 }, p: { min: 1, max: 3 } },
  //   enonce: function(v) {
  //     var target = v.m * 3 + v.p;
  //     var ymax   = v.m * 5 + v.p;
  //     var code = '\\begin{tikzpicture}[scale=0.75]\n'
  //       + '  \\draw[very thin,gray!30] (0,0) grid (5,' + ymax + ');\n'
  //       + '  \\draw[->,thick] (-0.3,0)--(5.6,0) node[right]{$x$};\n'
  //       + '  \\draw[->,thick] (0,-0.3)--(0,' + (ymax + 0.6) + ') node[above]{$y$};\n'
  //       + gradX(5)
  //       + gradY(ymax)
  //       + '  \\draw[blue,very thick] (0,' + v.p + ')--(5,' + (v.m * 5 + v.p) + ')'
  //       + ' node[right,font=\\small]{$f$};\n'
  //       + '  \\draw[dashed,red!70!black,thick] (0,' + target + ')--(3,' + target + ')--(3,0);\n'
  //       + '  \\filldraw[red!70!black] (3,' + target + ') circle (2.5pt);\n'
  //       + '  \\node[left,red!70!black]  at (0,' + target + ') {$' + target + '$};\n'
  //       + '  \\node[below,red!70!black] at (3,0) {$?$};\n'
  //       + '\\end{tikzpicture}';
  //     return 'Lire graphiquement l\'antecedent de $' + target + '$ par $f$.\n'
  //          + mkTikz(code);
  //   },
  //   bonneReponse: function(v) { return '$x = 3$'; },
  //   distracteurs: function(v) {
  //     return [
  //       '$x = ' + (v.m * 3 + v.p) + '$',
  //       '$x = 2$',
  //       '$x = ' + v.p + '$'
  //     ];
  //   }
  // },

  // ════════════════════════════════════
  // STATS — Boite a moustaches
  // ════════════════════════════════════
  // {
  //   id: 'fig_stat_001', theme: 'stats',
  //   niveau: ['techno', 'specifique', 'specialite'], cols: 4,
  //   variables: {
  //     min: { min: 5,  max: 10 },
  //     q1:  { min: 12, max: 18 },
  //     med: { min: 20, max: 25 },
  //     q3:  { min: 28, max: 34 },
  //     max: { min: 36, max: 42 }
  //   },
  //   enonce: function(v) {
  //     var gradLine = '';
  //     for (var g = 0; g <= 45; g += 5) {
  //       gradLine += '  \\draw (' + g + ',0.35)--(' + g + ',-0.35)'
  //                + ' node[below,font=\\tiny]{' + g + '};\n';
  //     }
  //     var code = '\\begin{tikzpicture}[x=0.19cm,y=0.5cm]\n'
  //       + '  \\draw[->,thick] (-1,0)--(48,0);\n'
  //       + gradLine
  //       + '  \\draw[blue,thick] (' + v.min + ',0)--(' + v.q1 + ',0);\n'
  //       + '  \\draw[blue,thick] (' + v.min + ',-0.7)--(' + v.min + ',0.7);\n'
  //       + '  \\draw[blue,thick,fill=blue!15] (' + v.q1 + ',-0.7) rectangle (' + v.q3 + ',0.7);\n'
  //       + '  \\draw[red,very thick] (' + v.med + ',-0.7)--(' + v.med + ',0.7);\n'
  //       + '  \\draw[blue,thick] (' + v.q3 + ',0)--(' + v.max + ',0);\n'
  //       + '  \\draw[blue,thick] (' + v.max + ',-0.7)--(' + v.max + ',0.7);\n'
  //       + '  \\node[above,font=\\tiny,blue] at (' + v.q1  + ',0.7){$Q_1=' + v.q1  + '$};\n'
  //       + '  \\node[above,font=\\tiny,red]  at (' + v.med + ',0.7){$Me=' + v.med  + '$};\n'
  //       + '  \\node[above,font=\\tiny,blue] at (' + v.q3  + ',0.7){$Q_3=' + v.q3  + '$};\n'
  //       + '\\end{tikzpicture}';
  //     return 'Voici la boite a moustaches d\'une serie statistique :\n'
  //          + mkTikz(code)
  //          + '\n\nQuelle est l\'etendue interquartile ?';
  //   },
  //   bonneReponse: function(v) { return '$' + (v.q3 - v.q1) + '$'; },
  //   distracteurs: function(v) {
  //     return [
  //       '$' + (v.max - v.min) + '$',
  //       '$' + (v.med - v.q1) + '$',
  //       '$' + (v.q3 - v.med) + '$'
  //     ];
  //   }
  // },

  // ════════════════════════════════════
  // PROBABILITES — Arbre pondere
  // ════════════════════════════════════
  {
    id: 'fig_proba_001', theme: 'proba',
    niveau: ['specifique', 'specialite'], cols: 4,
    variables: { p: { min: 2, max: 7 } },
    enonce: function(v) {
      var pA  = (v.p / 10).toFixed(1);
      var pnA = ((10 - v.p) / 10).toFixed(1);
      var pAB  = (v.p / 10 * 0.6).toFixed(2);
      var code = '\\begin{tikzpicture}[\n'
        + '  grow=right,level distance=27mm,\n'
        + '  level 1/.style={sibling distance=22mm},\n'
        + '  level 2/.style={sibling distance=11mm},\n'
        + '  every node/.style={font=\\small},\n'
        + '  edge from parent/.style={draw,thick}\n'
        + ']\n'
        + '\\node{}\n'
        + '  child{ node{$\\bar{A}$}\n'
        + '    child{ node{$B$}            edge from parent node[above,font=\\tiny]{$0{,}3$}}\n'
        + '    child{ node{$\\bar{B}$}     edge from parent node[below,font=\\tiny]{$0{,}7$}}\n'
        + '    edge from parent node[below]{$' + pnA + '$}\n'
        + '  }\n'
        + '  child{ node{$A$}\n'
        + '    child{ node{$B$}            edge from parent node[above,font=\\tiny]{$0{,}6$}}\n'
        + '    child{ node{$\\bar{B}$}     edge from parent node[below,font=\\tiny]{$0{,}4$}}\n'
        + '    edge from parent node[above]{$' + pA + '$}\n'
        + '  };\n'
        + '\\end{tikzpicture}';
      return 'On donne l\'arbre de probabilites :\n'
           + mkTikz(code)
           + '\n\nCalculer $P(A \\cap B)$.';
    },
    bonneReponse: function(v) { return '$' + (v.p / 10 * 0.6).toFixed(2) + '$'; },
    distracteurs: function(v) {
      return [
        '$' + (v.p / 10 * 0.4).toFixed(2) + '$',
        '$' + ((10 - v.p) / 10 * 0.3).toFixed(2) + '$',
        '$' + (v.p / 10).toFixed(1) + '$'
      ];
    }
  },

  // ════════════════════════════════════
  // // CALCUL — Tableau de signes
  // // ════════════════════════════════════
  // {
  //   id: 'fig_calc_001', theme: 'calcul',
  //   niveau: ['specifique', 'specialite'], cols: 4,
  //   variables: { a: { min: 1, max: 4 }, b: { min: 1, max: 8 } },
  //   enonce: function(v) {
  //     var code = '\\begin{tikzpicture}\n'
  //       + '  \\draw[thick] (0,0) rectangle (8,1.8);\n'
  //       + '  \\draw[thick] (0,0.9)--(8,0.9);\n'
  //       + '  \\draw[thick] (1.6,0)--(1.6,1.8);\n'
  //       + '  \\draw[thick] (4.2,0)--(4.2,1.8);\n'
  //       + '  \\node at (0.8,1.35){$x$};\n'
  //       + '  \\node at (2.9,1.35){$-\\infty$};\n'
  //       + '  \\node[blue] at (4.2,1.35){$\\dfrac{' + v.b + '}{' + v.a + '}$};\n'
  //       + '  \\node at (6.1,1.35){$+\\infty$};\n'
  //       + '  \\node at (0.8,0.45){$' + v.a + 'x-' + v.b + '$};\n'
  //       + '  \\node[red!70!black]   at (2.9,0.45){$-$};\n'
  //       + '  \\node[blue]           at (4.2,0.45){$0$};\n'
  //       + '  \\node[green!50!black] at (6.1,0.45){$+$};\n'
  //       + '\\end{tikzpicture}';
  //     return 'Voici le tableau de signes de $f(x) = ' + v.a + 'x - ' + v.b + '$ :\n'
  //          + mkTikz(code)
  //          + '\n\nSur quel intervalle $f(x) > 0$ ?';
  //   },
  //   bonneReponse: function(v) {
  //     return '$\\left]' + frac(v.b, v.a) + ' ; +\\infty\\right[$';
  //   },
  //   distracteurs: function(v) {
  //     return [
  //       '$\\left]-\\infty ; ' + frac(v.b, v.a) + '\\right[$',
  //       '$\\mathbb{R}$',
  //       '$\\left[' + frac(v.b, v.a) + ' ; +\\infty\\right[$'
  //     ];
  //   }
  // },

  // // ════════════════════════════════════
  // // EVOLUTIONS — Diagramme en barres
  // // ════════════════════════════════════
  // {
  //   id: 'fig_evol_001', theme: 'evolutions',
  //   niveau: ['techno', 'specifique', 'specialite'], cols: 4,
  //   variables: { v0: { min: 100, max: 200 }, t: { min: 10, max: 40 } },
  //   enonce: function(v) {
  //     var v1   = Math.round(v.v0 * (1 + v.t / 100));
  //     var ymax = Math.ceil(v1 / 50) * 50 + 50;
  //     var sc   = 0.015;
  //     var gradY = '';
  //     for (var y = 0; y <= ymax; y += 50) {
  //       gradY += '  \\draw (2pt,' + (y * sc).toFixed(3) + ')--(-2pt,' + (y * sc).toFixed(3) + ')'
  //             + ' node[left,font=\\tiny]{' + y + '};\n';
  //     }
  //     var code = '\\begin{tikzpicture}[x=1.2cm,y=1cm]\n'
  //       + '  \\draw[->,thick] (0,0)--(4,0);\n'
  //       + '  \\draw[->,thick] (0,0)--(0,' + ((ymax + 30) * sc).toFixed(3) + ');\n'
  //       + gradY
  //       + '  \\draw[fill=blue!60!black,draw=blue] (0.2,0) rectangle (1.5,' + (v.v0 * sc).toFixed(3) + ');\n'
  //       + '  \\node[above,font=\\footnotesize] at (0.85,' + (v.v0 * sc).toFixed(3) + '){' + v.v0 + '};\n'
  //       + '  \\node[below,font=\\footnotesize] at (0.85,0){An~1};\n'
  //       + '  \\draw[fill=green!50!black,draw=green!70!black] (2.2,0) rectangle (3.5,' + (v1 * sc).toFixed(3) + ');\n'
  //       + '  \\node[above,font=\\footnotesize] at (2.85,' + (v1 * sc).toFixed(3) + '){' + v1 + '};\n'
  //       + '  \\node[below,font=\\footnotesize] at (2.85,0){An~2};\n'
  //       + '\\end{tikzpicture}';
  //     return 'Le graphique montre l\'evolution d\'un prix (en euros) :\n'
  //          + mkTikz(code)
  //          + '\n\nQuel est le taux d\'evolution entre An~1 et An~2 ?';
  //   },
  //   bonneReponse: function(v) { return '$+' + v.t + '\\%$'; },
  //   distracteurs: function(v) {
  //     return [
  //       '$-' + v.t + '\\%$',
  //       '$+' + Math.round(v.t / 2) + '\\%$',
  //       '$+' + (v.t + 10) + '\\%$'
  //     ];
  //   }
  // }

];
