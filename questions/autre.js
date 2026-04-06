// -- Questions non répertoriées

const QUESTIONS_NON_REPERTORIEES = [


   {
    id: 'fonc_016b', theme: 'Non répertoriées',
    groupe: 'secon_deg_signe_delta_a',
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

]

  // ── Helper : génère la réponse SVG+TikZ pour fonc_016 ──
