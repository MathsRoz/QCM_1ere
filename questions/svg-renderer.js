// ═══════════════════════════════════════════════════════
//  MOTEUR DE RENDU SVG — figures TikZ
//  Partagé entre qcm-maths-premiere.html et editeur-banque.html
// ═══════════════════════════════════════════════════════

// ── Palette thème sombre ────────────────────────────────
var TC = {
  bg:    '#ffffff',
  grid:  '#adadad',
  axis:  '#000c1d',
  text:  '#022757',
  dim:   '#000000',
  blue:  '#002b5c',
  green: '#86efac',
  red:   '#9e3333',
  yel:   '#fde68a',
  pur:   '#c4b5fd',
  black:'#000000' ,
};




// ═══════════════════════════════════════════════════════
//  OBJET Fig — API fluente SVG + TikZ
//  Coordonnées mathématiques directes, pas de ox/oy/sc.
//
//  Usage :
//    var svg  = Fig.svg(xmin, xmax, ymin, ymax)
//                  .grid(1).axes().gradX(1).gradY(1)
//                  .line(2,1,'blue','f').point(3,7,'red')
//                  .dashes(3,7).end();
//    var tikz = Fig.latex(xmin, xmax, ymin, ymax)
//                  .grid(1).axes().gradX(1).gradY(1)
//                  .line(2,1,'blue','f').point(3,7,'red')
//                  .dashes(3,7).end();
//    return '%%SVG'+svg+'%%ENDSVG%%%%TIKZ'+tikz+'%%ENDTIKZ%%';
// ═══════════════════════════════════════════════════════
var Fig = {

  // ── Constantes de mise en page (px) ─────────────────
  _PAD:  { l:19, r:17, t:18, b:18 },
  _FS:   14,
  _COUNT: 0,                            // compteur global → ids uniques garantis

  // ── Usine : crée un objet de rendu indépendant ───────
  _make: function(ctx) {
    var f = Object.create(Fig);
    f._ctx = ctx;
    f._out = '';
    Fig._COUNT += 1;
    f._ARR = 'figArr' + Fig._COUNT;
    return f;
  },

  // ── Init SVG ─────────────────────────────────────────
  // Fig.svg(xmin, xmax, ymin, ymax, bg)
  svg: function(xmin, xmax, ymin, ymax, bg) {
    var f = this._make('svg');
    f._xmin = xmin; f._xmax = xmax;
    f._ymin = ymin; f._ymax = ymax;
    var p = this._PAD;
    var scY = Math.max(12, Math.min(28, Math.floor(300 / (ymax - ymin))));
    var scX = Math.max(12, Math.min(28, Math.floor(300 / (xmax - xmin))));
    var sc  = Math.min(scX, scY);
    f._SC = sc;
    f._W  = p.l + (xmax - xmin) * sc + p.r;
    f._H  = p.t + (ymax - ymin) * sc + p.b;
    f._ox = p.l - xmin * sc;
    f._oy = p.t + ymax * sc;
    var aid = f._ARR;
    var cid = 'clip' + aid;
    f._clipId = cid;
    f._out = '<svg xmlns="http://www.w3.org/2000/svg"'
      + ' viewBox="0 0 ' + f._W + ' ' + f._H + '"'
      + ' width="' + f._W + '" height="' + f._H + '"'
      + ' style="background:' + (bg || TC.bg) + ';border-radius:3px;display:block;margin:0 auto">'
      + '<defs>'
      + '<marker id="' + aid + '" markerWidth="7" markerHeight="7"'
      + ' refX="5" refY="3" orient="auto">'
      + '<path d="M0,0 L0,6 L7,3 z" fill="' + TC.axis + '"/>'
      + '</marker>'
      + '<clipPath id="' + cid + '">'
      + '<rect x="' + f._px(xmin) + '" y="' + f._py(ymax)
      + '" width="' + ((xmax - xmin) * sc) + '" height="' + ((ymax - ymin) * sc) + '"/>'
      + '</clipPath>'
      + '</defs>';
    return f;
  },

  // ── Init LaTeX ────────────────────────────────────────
  // Fig.latex(xmin, xmax, ymin, ymax)
  latex: function(xmin, xmax, ymin, ymax,scale,scalediap) {
    scale= scale||.75;
    scalediap = scalediap || scale;
    var f = this._make('latex');
    f._xmin = xmin; f._xmax = xmax;
    f._ymin = ymin; f._ymax = ymax;
    f._SC = 1; f._ox = 0; f._oy = 0;
    f._out = '\\begin{tikzpicture}[scale='+ scale +', baseline=(current bounding box.west)]\n';
    return f;
  },

  end: function() {
    return this._out + (this._ctx === 'svg' ? '</svg>' : '\\end{tikzpicture}');
  },

  // ── Conversion coordonnées math → pixels ─────────────
  // En mode latex, retourne les coordonnées mathématiques directement
  _px: function(x) { return this._ctx === 'latex' ? x : (this._ox + x * this._SC); },
  _py: function(y) { return this._ctx === 'latex' ? y : (this._oy - y * this._SC); },

  _add: function(svgStr, tikzStr) {
    if (typeof this._out !== 'string') this._out = '';
    this._out += this._ctx === 'svg' ? svgStr : tikzStr;
    return this;
  },

  // ── Clipping ──────────────────────────────────────────
  clip: function() {
    return this._add(
      '<g clip-path="url(#' + this._clipId + ')">',
      '\\begin{scope}\n'
      + '\\clip (' + this._xmin + ',' + this._ymin + ') rectangle ('
        + this._xmax + ',' + this._ymax + ');\n'
    );
  },

  endClip: function() {
    return this._add('</g>', '\\end{scope}\n');
  },

  // ── Grille ────────────────────────────────────────────
  // .grid(step)   step par défaut = 1
  grid: function(stepx,stepy,xmin,xmax,ymin,ymax) {
    stepx = stepx || 1;
    stepy= stepy || stepx ||1;
    var xmin = xmin || this._xmin, xmax = xmax || this._xmax;
    var ymin = ymin || this._ymin, ymax = ymax || this._ymax;
    var svg  = '';
    if (this._ctx === 'svg') {
      for (var x = xmin; x <= xmax; x += stepx) {
        svg += '<line x1="' + this._px(x) + '" y1="' + this._py(ymax)
             + '" x2="' + this._px(x) + '" y2="' + this._py(ymin)
             + '" stroke="' + TC.grid + '" stroke-width="1"/>';
      }
      for (var y = ymin; y <= ymax; y += stepy) {
        svg += '<line x1="' + this._px(xmin) + '" y1="' + this._py(y)
             + '" x2="' + this._px(xmax) + '" y2="' + this._py(y)
             + '" stroke="' + TC.grid + '" stroke-width="1"/>';
      }
    }
    return this._add(svg,
      '\\draw[thick ,gray!30] (' + xmin + ',' + ymin + ') grid [xstep=' + stepx + ',ystep=' + stepy + '] ('
      + xmax + ',' + ymax + ');\n');
  },

  // ── Axes avec flèches ─────────────────────────────────
  // .axes()
  axes: function(xmin,xmax,ymin,ymax) {
    var xmin = xmin || this._xmin, xmax = xmax || this._xmax;
    var ymin = ymin || this._ymin, ymax = ymax || this._ymax;
    var ox = this._px(0), oy = this._py(0);
    var aid = this._ARR, fs = this._FS;
    var svg =
      // axe x
      '<line x1="' + (this._px(xmin)-12) + '" y1="' + oy
        + '" x2="' + (this._px(xmax) + 12) + '" y2="' + oy
        + '" stroke="' + TC.axis + '" stroke-width="1.8" marker-end="url(#' + aid + ')"/>'
      // axe y
      + '<line x1="' + ox + '" y1="' + (this._py(ymin)+12)
        + '" x2="' + ox + '" y2="' + (this._py(ymax) - 12)
        + '" stroke="' + TC.axis + '" stroke-width="1.8" marker-end="url(#' + aid + ')"/>'
      // label x
      + '<text x="' + (this._px(xmax)+4) + '" y="' + (oy -10)
        + '" fill="' + TC.axis + '" font-size="' + (fs + 2) + '" font-style="italic">x</text>'
      // label y
      + '<text x="' + (ox +10) + '" y="' + (this._py(ymax) - 4)
        + '" fill="' + TC.axis + '" font-size="' + (fs + 2) + '" font-style="italic">y</text>'
      // O
      + '<text x="' + (ox - 4) + '" y="' + (oy + fs + 2)
        + '" fill="' + TC.dim + '" font-size="' + fs + '" text-anchor="end">O</text>';
    return this._add(svg,
      '\\draw[-stealth,very thick] (' + (xmin-.5) + ',0) -- (' + (xmax+.5) + ',0) node[above]{$x$};\n'
      + '\\draw[-stealth, very thick] (0,' + (ymin-.5) + ') -- (0,' + (ymax+.5) + ') node[right]{$y$};\n'
      + '\\node[below left,font=\\small] {O};\n');
  },

  // ── Graduations ───────────────────────────────────────
  // .gradX(step)   .gradY(step)
  gradX: function(step,xmin,xmax) {
    step = step || 1;
    xmin = xmin || this._xmin; xmax = xmax || this._xmax; 
    var oy = this._py(0), fs = this._FS;
    var svg = '', tikz = '';
    for (var x = xmin; x <= xmax; x += 1) {
      if (x === 0) continue;
      var px = this._px(x);
      svg  += '<line x1="' + px + '" y1="' + (oy - 3) + '" x2="' + px + '" y2="' + (oy + 3)
            + '" stroke="' + TC.axis + '" stroke-width="1"/>'
            + '<text x="' + px + '" y="' + (oy + fs + 4) + '" fill="' + TC.dim
            + '" font-size="' + fs + '" text-anchor="middle">' + x*step + '</text>';
      tikz += '\\draw[thick] (' + x + ',4pt) -- (' + x + ',-4pt) node[below,font=\\small]{$' + x*step + '$};\n';
    }
    return this._add(svg, tikz);
  },

  gradY: function(step,ymin,ymax) {
    step = step || 1;
    ymin = ymin || this._ymin; ymax = ymax || this._ymax; 
    var ox = this._px(0), fs = this._FS;
    var svg = '', tikz = '';
    for (var y = ymin; y <= ymax; y += 1) {
      if (y === 0) continue;
      var py = this._py(y);
      svg  += '<line x1="' + (ox - 3) + '" y1="' + py + '" x2="' + (ox + 3) + '" y2="' + py
            + '" stroke="' + TC.axis + '" stroke-width="1"/>'
            + '<text x="' + (ox - 8) + '" y="' + (py + fs / 2) + '" fill="' + TC.dim
            + '" font-size="' + fs + '" text-anchor="end">' + y*step + '</text>';
      tikz += '\\draw[thick] (4pt,' + y + ') -- (-4pt,' + y + ') node[left,font=\\small]{$' + y*step + '$};\n';
    }
    return this._add(svg, tikz);
  },



  // ── Segment entre deux points ────────────────────────
  // .line(x1, y1, x2, y2, color, style, arrows)
  // color  : 'black' | 'red' | 'green' (défaut 'black')
  // style  : 'solid' | 'dashed' | 'dotted' (défaut 'solid')
  // arrows : '' | '->' | '<-' | '<->' (défaut '')
  line: function(x1, y1, x2, y2, color, style, arrows, weight) {
    var col   = color === 'red' ? TC.red : color === 'green' ? TC.green : TC.black;
    var dash  = style === 'dashed' ? ' stroke-dasharray="5 3"'
              : style === 'dotted' ? ' stroke-dasharray="2 3"' : '';
    var tikzS = style === 'dashed' ? 'dashed,' : style === 'dotted' ? 'dotted,' : '';
    var aid   = this._ARR;
    weight = weight || 1.5 ;
    arrows = arrows || '';
 
    // Marqueurs SVG selon le sens des flèches
    var smEnd = 'smE' + aid, smStart = 'smS' + aid;
    var defsExtra = '';
    if (arrows && !this._smArr) {
      this._smArr = true;
      defsExtra = '<defs>'
        + '<marker id="' + smEnd + '" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">'
        + '<path d="M0,0 L0,4 L4,2 z" fill="' + col + '"/></marker>'
        + '<marker id="' + smStart + '" markerWidth="4" markerHeight="4" refX="1" refY="2" orient="auto">'
        + '<path d="M4,0 L4,4 L0,2 z" fill="' + col + '"/></marker>'
        + '</defs>';
    }
 
    var markerStart = (arrows === '<-' || arrows === '<->') ? ' marker-start="url(#' + smStart + ')"' : '';
    var markerEnd   = (arrows === '->' || arrows === '<->') ? ' marker-end="url(#' + smEnd + ')"' : '';
// TikZ : style de flèche
    var tikzArr = arrows === '->'  ? '-stealth,'
                : arrows === '<-'  ? 'stealth-,'
                : arrows === '<->' ? 'stealth-stealth,' : '';
    if (markerStart && !this._revArr) {
      this._revArr = true;
      defsExtra = '<defs><marker id="rev' + aid + '" markerWidth="7" markerHeight="7"'
        + ' refX="2" refY="3" orient="auto">'
        + '<path d="M7,0 L7,6 L0,3 z" fill="' + col + '"/>'
        + '</marker></defs>';
    }
 
    // TikZ : style de flèche
    var tikzArr = arrows === '->'  ? '-stealth,'
                : arrows === '<-'  ? 'stealth-,'
                : arrows === '<->' ? 'stealth-stealth,' : '';
 
    return this._add(
      defsExtra
      + '<line x1="' + this._px(x1) + '" y1="' + this._py(y1)
        + '" x2="' + this._px(x2) + '" y2="' + this._py(y2)
        + '" stroke="' + col + '" stroke-width=" '+ weight +' "' + dash
        + markerStart + markerEnd + '/>',
      '\\draw[' + tikzArr + tikzS + (color || ' ') + ',thick] ('
        + x1 + ',' + y1 + ') -- (' + x2 + ',' + y2 + ');\n'
    );
  },



  // ── Texte à une position mathématique ───────────────
  // .text(x, y, t, color, anchor, tikzT)
  // x, y   : coordonnées mathématiques
  // t      : texte SVG. Préfixe '~' → barre au-dessus : '~A' affiche Ā
  // color  : 'black' | 'blue' | 'red' | 'green' (défaut 'black')
  // anchor : 'middle' | 'start' | 'end' (défaut 'middle')
  // height : 'above' | 'below' | 'middle' (defaut 'middle')
  // tikzT  : texte TikZ si différent (ex: '\\bar{A}').
  //          Si omis et t commence par '~', génère \\bar{X} automatiquement.
  //
  // Exemples :
  //   .text(2,  1,  'A')                    → SVG: A     / TikZ: $A$
  //   .text(2, -1,  '~A')                   → SVG: Ā     / TikZ: $\bar{A}$
  //   .text(4,  0.5,'~B', 'red', 'start')   → SVG: B̄     / TikZ: $\bar{B}$
  //   .text(1,  0.7,'0,3')                  → SVG: 0,3   / TikZ: $0,3$
   text: function(x, y, t, color, anchor, tikzT) {
    color= color || ' ';
    var col = color === 'red'   ? TC.red
            : color === 'blue'  ? TC.blue
            : color === 'green' ? TC.green
            : TC.black;
    color = color === 'red'   ? 'Red'
            : color === 'blue'  ? 'Blue' 
            : color === 'green' ? 'Green'
            : 'black';
    var anch = anchor || 'middle';
    var fs   = this._FS;
    var tikzAnch = anchor === 'start' ? 'anchor=west'
                 : anchor === 'end'   ? 'anchor=east' : '';
  
 
    // Notation ~X → barre au-dessus
    // Notation X_y → indice (ex: 'C_f', 'x_0', 'C_g')
    var svgContent, tikzContent;
    if (typeof t === 'string' && t.charAt(0) === '~') {
      var letter = t.slice(1);
      svgContent  = '<tspan text-decoration="overline">' + letter + '</tspan>';
      tikzContent = tikzT !== undefined ? tikzT : '\\bar{' + letter + '}';
    } else if (typeof t === 'string' && t.indexOf('_') !== -1) {
      var parts = t.split('_');
      var base  = parts[0];
      var sub   = parts.slice(1).join('_');
      svgContent  = base + '<tspan dy="' + (fs*0.35) + '" font-size="' + (fs*0.75) + '">' + sub + '</tspan>';
      tikzContent = tikzT !== undefined ? tikzT : base + '_{' + sub + '}';
    } else {
      svgContent  = t;
      tikzContent = tikzT !== undefined ? tikzT : t;
    }
 
    return this._add(
      '<text x="' + this._px(x) + '" y="' + (this._py(y)) + '"'
        + ' fill="' + col + '" font-size="' + fs + '" font-weight="bold"'
        + ' text-anchor="' + anch + '" dominant-baseline="central">' + svgContent + '</text>',
      '\\node[' +  'font=\\small,' + color +','+ tikzAnch +'] at (' + x + ',' + y + '){$' + tikzContent + '$};\n'
    );
  },





  // ── Fraction ─────────────────────────────────────────
  // .frac(x, y, num, den, color)
  // Affiche num/den centré en (x,y) en SVG, et \dfrac{num}{den} en TikZ.
  // x, y   : coordonnées mathématiques du centre de la fraction
  // num    : chaîne numérateur  (ex: '3', 'x+1')
  // den    : chaîne dénominateur (ex: '4', '2x')
  // color  : 'black' | 'blue' | 'red' | 'green' (défaut 'black')
  frac: function(x, y, num, den, color) {
    var col = color === 'red'   ? TC.red
            : color === 'blue'  ? TC.blue
            : color === 'green' ? TC.green
            : TC.black;
    color = color === 'red'   ? 'Red'
            : color === 'blue'  ? 'Blue' 
            : color === 'green' ? 'Green'
            : 'black';
    var fs   = this._FS;
    var fsF  = fs * 0.85;          // police légèrement réduite pour num/den
    var px   = this._px(x);
    var py   = this._py(y);
    var gap  = fsF * 0.6;          // demi-hauteur entre barre et texte
    var barW = Math.max(String(num).length, String(den).length) * fsF * 0.55 + 4;
 
    var svg =
      // Numérateur
      '<text x="' + px + '" y="' + (py - gap) + '"'
        + ' fill="' + col + '" font-size="' + fsF + '"'
        + ' text-anchor="middle" dominant-baseline="auto">' + num + '</text>'
      // Barre de fraction
      + '<line x1="' + (px - barW/2) + '" y1="' + py
        + '" x2="' + (px + barW/2) + '" y2="' + py
        + '" stroke="' + col + '" stroke-width="1"/>'
      // Dénominateur
      + '<text x="' + px + '" y="' + (py + gap) + '"'
        + ' fill="' + col + '" font-size="' + fsF + '"'
        + ' text-anchor="middle" dominant-baseline="hanging">' + den + '</text>';
 
    var tikz = '\\node[font=\\small] at (' + x + ',' + y + '){$\\dfrac{' + num + '}{' + den + '}$};\n';
 
    return this._add(svg, tikz);
  },



  label: function(f,name,color,xmin,xmax,ymin,ymax){
    var xmin = xmin || this._xmin, xmax = xmax || this._xmax;
    var ymin = ymin || this._ymin, ymax = ymax || this._ymax;
    var x=xmin;
    if (fimage(xmin,f)<=ymax && fimage(xmin,f)>=ymin){
        var y=fimage(x,f);
        var p='end';
      }else{
        while((fimage(x,f)>=ymax || fimage(x,f)<=ymin) || x>xmax){
          x+=.02;
        }
        var y=(Math.abs(fimage(x,f)-ymax)>Math.abs(fimage(x,f)-ymin)) ? ymin:ymax;
        y=(y>0)? y+.4 : y-.4;
        var p='middle';
      }
    var nameT= '\\mathcal{C}_'+ name[-1]
      return this.text(x,y,name,color,p,nameT);
  },

  // ── Droite affine  y = a*x + b ───────────────────────
  // .line(a, b, xmin, xmax, color, label)
  affine: function(a, b, xmin, xmax, color, label) {
    var col = color === 'blue' ? TC.blue : color === 'green' ? TC.green : TC.red;
    color = color === 'red'   ? 'Red'
            : color === 'blue'  ? 'Blue' 
            : color === 'green' ? 'Green'
            : 'black';
    var x1 = xmin, y1 = a * xmin + b, x2 = xmax, y2 = a * xmax + b;
    return this._add(
      '<line x1="' + this._px(x1) + '" y1="' + this._py(y1)
        + '" x2="' + this._px(x2) + '" y2="' + this._py(y2)
        + '" stroke="' + col + '" stroke-width="2.5"/>',
      '\\draw[' + (color || 'red') + ',very thick] (' + x1 + ',' + y1 + ') -- ('
        + x2 + ',' + y2 + ')' + ';\n'
    );
  },

  // ── Point (disque plein) ──────────────────────────────
  // .point(x, y, l, color, anchor, height)
    //x,y, l:lettre, anchor:{'end','middle','start'}, height:{'above', 'below'}
  point: function(x, y, l , color,  anchor, height) {
    l=l||'';
    height = height || 'above'
    dy=(height==='above') ? .5 : -.5;
    var col = color==='blue' ? TC.blue : color === 'red' ? TC.red : color === 'green' ? TC.green : TC.black;
    color = color === 'red'   ? 'Red'
            : color === 'blue'  ? 'Blue' 
            : color === 'green' ? 'Green'
            : 'black';
    return this._add(
      '<circle cx="' + this._px(x) + '" cy="' + this._py(y) + '" r="4" fill="' + col + '"/>',
      '\\filldraw[' + (color || 'black') + '] (' + x + ',' + y + ') circle (2pt);\n'
    ).text(x,y+dy,l,color,anchor);
  },

  // ── Tirets de lecture ────────────────────────────────
  // .dashes(x0, y0, labelX, labelY, color)
  //   labelX / labelY : texte affiché (défaut = valeur numérique)
  //   color : 'red' | 'gray' (défaut)
  dashes: function(x0, y0, labelX, labelY, color) {
    var col  = color === 'red' ? TC.red : TC.dim;
    var lx   = (labelX !== undefined && labelX !== null) ? labelX : x0;
    var ly   = (labelY !== undefined && labelY !== null) ? labelY : y0;
    var pxs  = this._px(x0), pys = this._py(y0);
    var ox   = this._px(0),  oy  = this._py(0);
    var fs   = this._FS;
    return this._add(
      // vertical x0 → point
      '<line x1="' + pxs + '" y1="' + oy + '" x2="' + pxs + '" y2="' + pys
        + '" stroke="' + col + '" stroke-width="1" stroke-dasharray="4 3"/>'
      // horizontal 0 → point
      + '<line x1="' + ox + '" y1="' + pys + '" x2="' + pxs + '" y2="' + pys
        + '" stroke="' + col + '" stroke-width="1" stroke-dasharray="4 3"/>'
      // label sur axe x
      + '<text x="' + pxs + '" y="' + (oy + fs + 4) + '" fill="' + col
        + '" font-size="' + fs + '" text-anchor="middle">' + lx + '</text>'
      // label sur axe y
      + '<text x="' + (ox - 5) + '" y="' + (pys + fs / 2) + '" fill="' + col
        + '" font-size="' + fs + '" text-anchor="end">' + ly + '</text>',
      '\\draw[dashed,' + (color || 'gray') + '] (' + x0 + ',0) -- ('
        + x0 + ',' + y0 + ') -- (0,' + y0 + ');\n'
        + (String(lx) !== String(x0)
            ? '\\node[below,' + (color||'gray') + '] at (' + x0 + ',0){$' + lx + '$};\n' : '')
    );
  },
  // ── Courbe d'une fonction quelconque ─────────────────
  // .curve(expr, xmin, xmax, color, label, steps)
  //
  // expr  : chaîne mathématique, ex: "3x^2-2x+6", "sin(x)", "sqrt(x+1)"
  // xmin/xmax : bornes de tracé (défaut = bornes du repère)
  // color : 'blue' | 'red' | 'green'
  // label : étiquette affichée en bout de courbe
  // steps : nombre de segments (défaut 120)
  //
  // Fonctions supportées dans l'expression :
  //   sin, cos, tan, asin, acos, atan, sqrt, abs, exp, log, ln, pi, e
  //   ^ pour la puissance, implicite multiplication (2x, 3(x+1), x(x-1))
  curve: function(expr, xmin, xmax, color, label, steps) {
    xmin  = (xmin  !== undefined && xmin  !== null) ? xmin  : this._xmin;
    xmax  = (xmax  !== undefined && xmax  !== null) ? xmax  : this._xmax;
    steps = steps || 120;
    color = color || 'red';
 
    // ── Parser : str → fonction JS f(x) ──────────────
    var fn = Fig._parseExpr(expr);
 
    var col = color === 'red' ? TC.red : color === 'green' ? TC.green : TC.blue;
    color = color === 'black'   ? 'black'
            : color === 'blue'  ? 'Blue' 
            : color === 'green' ? 'Green'
            : 'Red';
    var lbl = label || '';
 
    // ── SVG : polyline par segments ───────────────────
    var svg = '';
    if (this._ctx === 'svg') {
      var dx = (xmax - xmin) / steps;
      // Construire des segments continus en coupant aux discontinuités
      var segments = [];  // chaque segment = tableau de points [px,py]
      var seg = [];
      for (var i = 0; i <= steps; i++) {
        var x = xmin + i * dx;
        var y;
        try { y = fn(x); } catch(e) { y = NaN; }
        if (!isFinite(y) || isNaN(y)) {
          if (seg.length > 1) segments.push(seg);
          seg = [];
        } else {
          seg.push([this._px(x), this._py(y)]);
        }
      }
      if (seg.length > 1) segments.push(seg);
 
      segments.forEach(function(s) {
        var pts = s.map(function(p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); }).join(' ');
        svg += '<polyline points="' + pts + '" fill="none" stroke="' + col
          + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
      });
 
      // Label en bout de courbe
      if (lbl && segments.length) {
        var last = segments[segments.length - 1];
        var lp   = last[last.length - 1];
        svg += '<text x="' + (lp[0] + 4) + '" y="' + (lp[1] + 4)
          + '" fill="' + col + '" font-size="12" font-style="italic">' + lbl + '</text>';
      }
    }
 
    // ── TikZ : \draw plot ─────────────────────────────
    // On génère une liste de points TikZ (200 suffit pour LaTeX)
    var tikz = '\\draw[' + color + ',very  thick] plot coordinates{';
    var dxT  = (xmax - xmin) / 200;
    var pts_tikz = [];
    for (var j = 0; j <= 200; j++) {
      var xt = xmin + j * dxT;
      var yt;
      try { yt = fn(xt); } catch(e) { yt = NaN; }
      if (isFinite(yt) && !isNaN(yt)) {
        pts_tikz.push('(' + xt.toFixed(3) + ',' + yt.toFixed(3) + ')');
      }
    }
    tikz += pts_tikz.join(' ') + '}';
    tikz += lbl ? ' node[right]{$' + lbl + '$}' : '';
    tikz += ';\n';
 
    return this._add(svg, tikz);
  },

  // t =[['x'   ,'-∞'  , 2   ,  '+∞' ],
  //     ['f(x)',   '+','0' ,'-'   ]]
  tableauS : function(t,dx,lgt,esp){
    lgt = lgt || 2; // espace de la premiere colonne
    esp = esp || 2; // espace entre les valeurs de x
    dx = dx || .5; // espace entre la deuxieme ligne et la première valeur
    const wt = (t[0].length-2)*esp +lgt+dx*2; // largeur tableau
    const nv = t[0].length-3; //nombre de valeurs remarquables
    var hl = 1; // hauteur d'une ligne
    const nl = t.length; //nombre de ligne
    this.line(0,0,wt,0)  // premiere ligne 
    for (var j = 1; j <= nl; j++){  //| lignes suivantes
      this.line(0,-j*hl,wt,-j*hl)         //| 
    }                                 
    this.line(0,0,0,-nl*hl, 'black')      //|
    this.line(wt,0,wt,-nl*hl, 'black')    //|  3 lignes verticales pour les deux colonnes
    this.line(lgt,0,lgt,-nl*hl,'black')   //|
    for (var j=0 ; j< nv ; j++){
      this.line(lgt+dx+(j+1)*esp,-1*hl,lgt+dx+(j+1)*esp,-(nl)*hl,'gray','dotted', '', 1) // dotted pour les zeros ou non
    }
    this.text(lgt/2,-hl/2,t[0][0])          //|
    for (var j =1;j<=nl -1; j++){           //| texte première colonne
      this.text(lgt/2,(-j*hl)-hl/2,t[j][0]) //|
    }
    for (var j=1 ; j<= t[0].length-1 ; j++){
      this.text(lgt+dx+(j-1)*esp,-hl/2,t[0][j])
    }
    for (var j=1 ; j<= 1+nv*2 ; j++){
      for (var i=1; i<=t.length-1;i++){
          this.text(lgt+dx+(j-1)*esp/2+esp/2,(-i*hl)-hl/2,t[i][j])
        }
    }

    return this;
  },

  tableauV : function(t,dx,lgt,esp){
    lgt = lgt || 2; // espace de la premiere colonne
    esp = esp || 3; // espace entre les valeurs de x
    dx = dx || .5; // espace entre la deuxieme ligne et la première valeur
    const wt = (t[0].length-2)*esp +lgt+dx*2; // largeur tableau
    const nv = t[0].length-3; //nombre de valeurs remarquables
    var hl = 1; // hauteur d'une ligne
    const nl = t.length; //nombre de ligne
    this.line(0,0,wt,0)  // premiere ligne 
    for (var j = 1; j <= nl; j++){  //| lignes suivantes
      this.line(0,-hl-(j-1)*hl*2,wt,-hl-(j-1)*hl*2)         //| 
    }                                 
    this.line(0,0,0,-(nl-1)*hl*2-hl, 'black')      //|
    this.line(wt,0,wt,-(nl-1)*hl*2-hl, 'black')    //|  3 lignes verticales pour les deux colonnes
    this.line(lgt,0,lgt,-(nl-1)*hl*2-hl,'black')   //|
    this.text(lgt/2,-hl/2,t[0][0])          //|
    for (var j =1;j<=nl -1; j++){           //| texte première colonne
      this.text(lgt/2,(hl/2-j*hl*2)-hl/2,t[j][0]) //|
    }
    for (var j=1 ; j<= t[0].length-1 ; j++){
      this.text(lgt+dx+(j-1)*esp,-hl/2,t[0][j])
    }

    function down(x,y,v){v.line(x+dx, y-dx, x -dx+esp , y+dx-2*hl, 'black', '' , '->', ) }
    function up(x,y,v){v.line(x+dx,y+dx-2*hl , x -dx+esp ,y-dx , 'black', '' , '->' ,) }

    for (var j=1 ; j<= t[1].length-1 ; j++){
      for (var i=1; i<=t.length-1;i++){
          (t[i][j]==='c') ? up(lgt+dx+esp*(j-2)/2,-hl,this)
          : (t[i][j]==='d') ? down(lgt+dx+esp*(j-2)/2,-hl,this)
          : (t[i][j-1]==='c'||t[i][j+1]==='d') ? this.text(lgt+dx+(j-1)*esp/2,-1.5*hl-(i-1)*hl*2,t[i][j]) 
          : this.text(lgt+dx+(j-1)*esp/2,-hl/2-i*hl*2,t[i][j]);
        }
    }

    return this;
  },



  arbre : function(xmin,xmax,ymin,ymax){
    var col = 'black';
    var style ='';
    var arrow = '->';
    xmin  = (xmin  !== undefined && xmin  !== null) ? xmin  : this._xmin;
    xmax  = (xmax  !== undefined && xmax  !== null) ? xmax  : this._xmax;
    ymin  = (ymin  !== undefined && ymin  !== null) ? ymin  : this._ymin;
    ymax  = (ymax  !== undefined && ymax  !== null) ? ymax  : this._ymax;
    return this
    .line(0,0,xmax/2,ymax/2,col,style,arrow)
    .line(0,0,xmax/2,-ymax/2,col,style,arrow)
    .line(xmax/2+.5,ymax/2,xmax-.25,ymax*3/4,col,style,arrow)
    .line(xmax/2+.5,ymax/2,xmax-.25,ymax/4,col,style,arrow)
    .line(xmax/2+.5,-ymax/2,xmax-.25,-ymax/4,col,style,arrow)
    .line(xmax/2+.5,-ymax/2,xmax-.25,-ymax*3/4,col,style,arrow)
    .text(xmax/2+.25,ymax/2,'A')
    .text(xmax/2+.25,-ymax/2,'~A','black','middle','\\overline{A}')
    .text(xmax,ymax*3/4,'B')
    .text(xmax,ymax/4,'~B','black','middle','\\overline{B}')
    .text(xmax,-ymax/4,'B')
    .text(xmax,-ymax*3/4,'~B','black','middle','\\overline{B}');
  },


  // ── Diagramme circulaire ──────────────────────────────
// .camembert(data)
//
// data : tableau d'objets { val, color, label }
//   val   : valeur numérique (pas forcément un %)
//   color : 'red' | 'blue' | 'green' | 'black' | code hex '#...'
//   label : texte affiché dans le secteur (ex: '30%', 'A', '')
//
// Exemple :
//   Fig.svg(0,1,0,1).camembert([
//     { val:30, color:'blue',  label:'30%' },
//     { val:50, color:'red',   label:'50%' },
//     { val:20, color:'green', label:'20%' },
//   ]).end()
//
// Le camembert est centré dans le repère SVG, indépendamment
// des coordonnées mathématiques (comme arbre et tableauSV).

camembert: function(data) {
  if (!data || !data.length) return this;

  var W    = this._W || 260;   // largeur SVG en pixels
  var H    = this._H || 260;   // hauteur SVG en pixels
  var cx   = W / 2;
  var cy   = H / 2;
  var r    = Math.min(W, H) * 0.38;
  var rLbl = r * 0.65;         // rayon pour les labels internes

  var total = data.reduce(function(s, d) { return s + d.val; }, 0);

  function resolveColor(c) {
    if (c === 'red')   return TC.red;
    if (c === 'blue')  return TC.blue;
    if (c === 'green') return TC.green;
    if (c === 'black') return TC.black;
    return c;  // hex ou autre
  }

  function polarToCart(cx, cy, r, angleDeg) {
    var rad = (angleDeg - 90) * Math.PI / 180;
    return {
      x: +(cx + r * Math.cos(rad)).toFixed(2),
      y: +(cy + r * Math.sin(rad)).toFixed(2)
    };
  }

  var svgOut  = '';
  var tikzOut = '';
  var angle   = 0;

  data.forEach(function(d) {
    var deg     = d.val / total * 360;
    var endAngle = angle + deg;
    var large   = deg > 180 ? 1 : 0;
    var col     = resolveColor(d.color || 'blue');
    d.color = d.color === 'red'   ? 'Red'
            : d.color === 'blue'  ? 'Blue' 
            : d.color === 'green' ? 'Green'
            : 'black';

    // ── SVG ──────────────────────────────────
    var s = polarToCart(cx, cy, r, angle);
    var e = polarToCart(cx, cy, r, endAngle);

    svgOut += '<path d="M ' + cx + ' ' + cy
      + ' L ' + s.x + ' ' + s.y
      + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + e.x + ' ' + e.y
      + ' Z" fill="' + col + '" stroke="' + TC.bg + '" stroke-width="2"/>';

    // Label SVG au centre du secteur
    if (d.label) {
      var mid = polarToCart(cx, cy, rLbl, angle + deg / 2);
      svgOut += '<text x="' + mid.x + '" y="' + mid.y + '"'
        + ' text-anchor="middle" dominant-baseline="central"'
        + ' font-size="11" font-weight="600" fill="' + TC.bg + '">'
        + d.label + '</text>';
    }

    // ── TikZ ─────────────────────────────────
    // \draw[fill=color] (0,0) -- (angle:r) arc (angle:endAngle:r) -- cycle;
    // TikZ angles : 0° = droite, sens antihoraire → on convertit
    var tikzStart = 90 - angle;
    var tikzEnd   = 90 - endAngle;
    tikzOut += '\\fill[' + (d.color || 'Blue') + ']'
      + ' (0,0) -- (' + tikzStart + ':' + (r/40).toFixed(2) + ')'
      + ' arc (' + tikzStart + ':' + tikzEnd + ':' + (r/40).toFixed(2) + ')'
      + ' -- cycle;\n';
    // Contour
    tikzOut += '\\draw[white,line width=2pt]'
      + ' (0,0) -- (' + tikzStart + ':' + (r/40).toFixed(2) + ')'
      + ' arc (' + tikzStart + ':' + tikzEnd + ':' + (r/40).toFixed(2) + ')'
      + ' -- cycle;\n';
    // Label TikZ
    if (d.label) {
      var midAngle = 90 - (angle + deg / 2);
      var rL = (r / 40 * 0.65).toFixed(2);
      tikzOut += '\\node[font=\\tiny\\bfseries,white] at ('
        + midAngle + ':' + rL + ') {' + d.label + '};\n';
    }

    angle = endAngle;
  });

  return this._add(svgOut, tikzOut);
},


};
 
// fin Fig 






  // ── Parseur d'expression mathématique ────────────────────
// Convertit une chaîne comme "3x^2 - 2x + 6" en fonction JS.
// Appelé en interne par Fig.curve().
Fig._parseExpr = function(expr) {
  var s = expr.trim();
 
  // Étape 1 — remplacer les noms de fonctions par des placeholders
  // pour éviter qu'une regex suivante ne les re-traite
  // ex: sin → __SIN__ puis __SIN__ → Math.sin en fin
  var fns = [
    ['sqrt',  'Math.sqrt'],
    ['abs',   'Math.abs'],
    ['asin',  'Math.asin'],
    ['acos',  'Math.acos'],
    ['atan',  'Math.atan'],
    ['sin',   'Math.sin'],
    ['cos',   'Math.cos'],
    ['tan',   'Math.tan'],
    ['exp',   'Math.exp'],
    ['log10', 'Math.log10'],
    ['log',   'Math.log10'],
    ['ln',    'Math.log'],
  ];
  // Remplace chaque nom par un token unique qu'aucune autre règle ne touchera
  var tokens = [];
  fns.forEach(function(pair, i) {
    var re = new RegExp('\\b' + pair[0] + '\\b', 'gi');
    if (re.test(s)) {
      var tok = '__F' + i + '__';
      s = s.replace(new RegExp('\\b' + pair[0] + '\\b', 'gi'), tok);
      tokens.push([tok, pair[1]]);
    }
  });
 
  s = s
    // Constantes
    .replace(/\bpi\b/gi, '(Math.PI)')
    .replace(/(?<![a-zA-Z_])e(?![a-zA-Z_\d])/g, '(Math.E)')
    // Puissance
    .replace(/\^/g, '**')
    // Multiplication implicite (ordre important : plus long d'abord)
    .replace(/(\d)\s*\(/g,   '$1*(')
    .replace(/(\d)\s*(x)/gi, '$1*$2')
    .replace(/\)\s*\(/g,     ')*(')
    .replace(/\)\s*(x)/gi,   ')*$1')
    .replace(/(x)\s*\(/gi,   '$1*(')
    // -x seul → (-1)*x
    .replace(/(^|[+\-\*(,])\s*-\s*(x)/g, '$1(-1)*$2');
 
  // Étape 2 — remplacer les tokens par les vrais noms Math.xxx
  tokens.forEach(function(pair) {
    s = s.split(pair[0]).join(pair[1]);
  });
 
  try {
    return new Function('x', '"use strict"; return (' + s + ');');
  } catch(e) {
    console.warn('Fig._parseExpr: cannot parse "' + expr + '" → "' + s + '"', e.message);
    return function() { return NaN; };
  }




};