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

/**
 * Point d'entrée : convertit du code TikZ en SVG.
 * Détecte automatiquement le type de figure.
 */
function tikzToSvg(code) {
  if (code.includes('grow=right') || code.includes('child{') || code.includes('child {')) {
    return renderTree(code);
  }
  if (code.includes('rectangle') && (code.includes('Q_1') || code.includes('Q_3') || code.includes('Me='))) {
    return renderBoxplot(code);
  }
  if (code.includes('rectangle') && code.includes('node[below') && code.includes('An')) {
    return renderBarchart(code);
  }
  if (code.includes('rectangle') && code.includes('node at') && code.includes('infty')) {
    return renderSignTable(code);
  }
  return renderAxes(code);
}

// ── Repère cartésien + droite(s) ────────────────────────
function renderAxes(code) {
  var W = 260, ox = 30, oy = 165, s = 28, nx = 5, ny = 4;

  var mDraw = code.match(/\\draw\[.*?\]\s*\(0\s*,\s*([\d.]+)\s*\)\s*--\s*\(\s*[\d.]+\s*,\s*([\d.]+)\s*\)/);
  var aVal = 1, bVal = 0;
  if (mDraw) {
    var y0 = parseFloat(mDraw[1]), y5 = parseFloat(mDraw[2]);
    aVal = (y5 - y0) / 5; bVal = y0;
    ny = Math.ceil(Math.max(y5, y0)) + 1;
  }

  function px(x) { return ox + x * s; }
  function py(y) { return oy - y * s; }

  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + (oy + 24) + '" style="background:' + TC.bg + ';border-radius:8px">';

  // Grille
  for (var xi = 0; xi <= nx; xi++)
    out += '<line x1="' + px(xi) + '" y1="20" x2="' + px(xi) + '" y2="' + (oy + 2) + '" stroke="' + TC.grid + '" stroke-width="1"/>';
  for (var yi = 0; yi <= ny; yi++)
    out += '<line x1="' + (ox - 2) + '" y1="' + py(yi) + '" x2="' + (px(nx) + 10) + '" y2="' + py(yi) + '" stroke="' + TC.grid + '" stroke-width="1"/>';

  // Axes
  out += '<defs><marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="' + TC.axis + '"/></marker></defs>';
  out += '<line x1="' + (ox - 10) + '" y1="' + oy + '" x2="' + (px(nx) + 14) + '" y2="' + oy + '" stroke="' + TC.axis + '" stroke-width="1.8" marker-end="url(#arr)"/>';
  out += '<line x1="' + ox + '" y1="' + (oy + 12) + '" x2="' + ox + '" y2="16" stroke="' + TC.axis + '" stroke-width="1.8" marker-end="url(#arr)"/>';

  // Graduations
  for (var gx = 1; gx <= nx; gx++) {
    out += '<line x1="' + px(gx) + '" y1="' + (oy - 3) + '" x2="' + px(gx) + '" y2="' + (oy + 3) + '" stroke="' + TC.axis + '" stroke-width="1"/>';
    out += '<text x="' + px(gx) + '" y="' + (oy + 14) + '" fill="' + TC.dim + '" font-size="10" text-anchor="middle">' + gx + '</text>';
  }
  for (var gy = 1; gy <= ny; gy++) {
    out += '<line x1="' + (ox - 3) + '" y1="' + py(gy) + '" x2="' + (ox + 3) + '" y2="' + py(gy) + '" stroke="' + TC.axis + '" stroke-width="1"/>';
    out += '<text x="' + (ox - 6) + '" y="' + (py(gy) + 4) + '" fill="' + TC.dim + '" font-size="10" text-anchor="end">' + gy + '</text>';
  }

  // Labels
  out += '<text x="' + (px(nx) + 16) + '" y="' + (oy + 4) + '" fill="' + TC.axis + '" font-size="12" font-style="italic">x</text>';
  out += '<text x="' + (ox + 5) + '" y="14" fill="' + TC.axis + '" font-size="12" font-style="italic">y</text>';
  out += '<text x="' + (ox - 6) + '" y="' + (oy + 14) + '" fill="' + TC.dim + '" font-size="10" text-anchor="end">O</text>';

  // Droite
  var lineColor = code.includes('red') ? TC.red : TC.blue;
  out += '<line x1="' + px(0) + '" y1="' + py(bVal) + '" x2="' + px(nx) + '" y2="' + py(aVal * nx + bVal) + '" stroke="' + lineColor + '" stroke-width="2.5"/>';
  out += '<text x="' + (px(nx) + 4) + '" y="' + (py(aVal * nx + bVal) + 4) + '" fill="' + lineColor + '" font-size="12" font-style="italic">f</text>';

  // Points remarquables
  var mPoints = code.matchAll(/\\filldraw.*?\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)\s*circle/g);
  for (var mp of mPoints) {
    var fpColor = mp[0].includes('red') ? TC.red : TC.blue;
    out += '<circle cx="' + px(parseFloat(mp[1])) + '" cy="' + py(parseFloat(mp[2])) + '" r="4" fill="' + fpColor + '"/>';
  }

  // Tirets de lecture
  var mDash = code.matchAll(/\\draw\[dashed.*?\]\s*\((\d+(?:\.\d+)?)\s*,\s*0\)\s*--\s*\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)\s*--\s*\(0/g);
  for (var md of mDash) {
    var dashColor = md[0].includes('red') ? TC.red : TC.dim;
    var dx = parseFloat(md[2]), dy2 = parseFloat(md[3]);
    out += '<line x1="' + px(dx) + '" y1="' + oy + '" x2="' + px(dx) + '" y2="' + py(dy2) + '" stroke="' + dashColor + '" stroke-width="1" stroke-dasharray="4 3"/>';
    out += '<line x1="' + ox + '" y1="' + py(dy2) + '" x2="' + px(dx) + '" y2="' + py(dy2) + '" stroke="' + dashColor + '" stroke-width="1" stroke-dasharray="4 3"/>';
    out += '<text x="' + (ox - 6) + '" y="' + (py(dy2) + 4) + '" fill="' + dashColor + '" font-size="10" text-anchor="end">' + dy2 + '</text>';
    var nodeLabel = code.includes('$?$') ? '?' : dx;
    out += '<text x="' + px(dx) + '" y="' + (oy + 14) + '" fill="' + dashColor + '" font-size="10" text-anchor="middle">' + nodeLabel + '</text>';
  }

  out += '</svg>';
  return out;
}

// ── Boîte à moustaches ──────────────────────────────────
function renderBoxplot(code) {
  var W = 340, H = 80, ax = 18, ay = 48, ht = 18, sc = 6.2;
  function px(v) { return ax + v * sc; }

  var allNums = [...code.matchAll(/\((\d{1,2})\s*,/g)].map(x => parseInt(x[1])).filter(n => n >= 5 && n <= 45);
  var uniq = [...new Set(allNums)].sort((a, b) => a - b);
  var vMin = uniq[0] || 5, vQ1 = uniq[1] || 12, vMed = uniq[2] || 20, vQ3 = uniq[3] || 28, vMax = uniq[4] || 38;

  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" style="background:' + TC.bg + ';border-radius:8px">';
  out += '<line x1="' + (ax - 4) + '" y1="' + ay + '" x2="' + (W - 8) + '" y2="' + ay + '" stroke="' + TC.axis + '" stroke-width="1.5"/>';
  for (var g = 0; g <= 45; g += 5) {
    out += '<line x1="' + px(g) + '" y1="' + (ay - 3) + '" x2="' + px(g) + '" y2="' + (ay + 3) + '" stroke="' + TC.axis + '" stroke-width="1"/>';
    out += '<text x="' + px(g) + '" y="' + (ay + 14) + '" fill="' + TC.dim + '" font-size="9" text-anchor="middle">' + g + '</text>';
  }
  out += '<line x1="' + px(vMin) + '" y1="' + ay + '" x2="' + px(vQ1) + '" y2="' + ay + '" stroke="' + TC.blue + '" stroke-width="2"/>';
  out += '<line x1="' + px(vMin) + '" y1="' + (ay - ht / 2) + '" x2="' + px(vMin) + '" y2="' + (ay + ht / 2) + '" stroke="' + TC.blue + '" stroke-width="2"/>';
  out += '<rect x="' + px(vQ1) + '" y="' + (ay - ht / 2) + '" width="' + (px(vQ3) - px(vQ1)) + '" height="' + ht + '" fill="' + TC.blue + '22" stroke="' + TC.blue + '" stroke-width="2"/>';
  out += '<line x1="' + px(vMed) + '" y1="' + (ay - ht / 2) + '" x2="' + px(vMed) + '" y2="' + (ay + ht / 2) + '" stroke="' + TC.red + '" stroke-width="2.5"/>';
  out += '<line x1="' + px(vQ3) + '" y1="' + ay + '" x2="' + px(vMax) + '" y2="' + ay + '" stroke="' + TC.blue + '" stroke-width="2"/>';
  out += '<line x1="' + px(vMax) + '" y1="' + (ay - ht / 2) + '" x2="' + px(vMax) + '" y2="' + (ay + ht / 2) + '" stroke="' + TC.blue + '" stroke-width="2"/>';
  out += '<text x="' + px(vQ1) + '" y="' + (ay - ht / 2 - 4) + '" fill="' + TC.blue + '" font-size="9" text-anchor="middle">Q₁=' + vQ1 + '</text>';
  out += '<text x="' + px(vMed) + '" y="' + (ay - ht / 2 - 4) + '" fill="' + TC.red + '" font-size="9" text-anchor="middle">Me=' + vMed + '</text>';
  out += '<text x="' + px(vQ3) + '" y="' + (ay - ht / 2 - 4) + '" fill="' + TC.blue + '" font-size="9" text-anchor="middle">Q₃=' + vQ3 + '</text>';
  out += '</svg>';
  return out;
}

// ── Diagramme en barres ─────────────────────────────────
function renderBarchart(code) {
  var W = 220, H = 150, ox = 30, oy = 120, bw = 42, gap = 28;

  var vals = [...code.matchAll(/rectangle\s*\([^,]+,\s*0\)\s*rectangle\s*\([^,]+,\s*([\d.]+)\)/g)].map(m => parseFloat(m[1]));
  if (vals.length < 2) {
    var numMatch = [...code.matchAll(/\{([\d]+)\}/g)].map(m => parseInt(m[1])).filter(n => n > 10 && n < 1000);
    vals = numMatch.length >= 2 ? [numMatch[0], numMatch[1]] : [100, 130];
  }
  var v0 = vals[0], v1 = vals[1];
  var maxV = Math.ceil(Math.max(v0, v1) / 50) * 50 + 20;
  var sc = (oy - 10) / maxV;

  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" style="background:' + TC.bg + ';border-radius:8px">';
  out += '<line x1="' + ox + '" y1="8" x2="' + ox + '" y2="' + (oy + 2) + '" stroke="' + TC.axis + '" stroke-width="1.5"/>';
  out += '<line x1="' + (ox - 2) + '" y1="' + oy + '" x2="' + (W - 8) + '" y2="' + oy + '" stroke="' + TC.axis + '" stroke-width="1.5"/>';
  for (var yv = 0; yv <= maxV; yv += 50) {
    var yp = oy - yv * sc;
    out += '<line x1="' + (ox - 3) + '" y1="' + yp + '" x2="' + (ox + 2) + '" y2="' + yp + '" stroke="' + TC.axis + '" stroke-width="1"/>';
    out += '<text x="' + (ox - 5) + '" y="' + (yp + 3) + '" fill="' + TC.dim + '" font-size="8" text-anchor="end">' + yv + '</text>';
  }
  var x1b = ox + gap, h1 = v0 * sc;
  out += '<rect x="' + x1b + '" y="' + (oy - h1) + '" width="' + bw + '" height="' + h1 + '" fill="' + TC.blue + '44" stroke="' + TC.blue + '" stroke-width="1.5"/>';
  out += '<text x="' + (x1b + bw / 2) + '" y="' + (oy - h1 - 4) + '" fill="' + TC.blue + '" font-size="10" text-anchor="middle">' + v0 + '</text>';
  out += '<text x="' + (x1b + bw / 2) + '" y="' + (oy + 12) + '" fill="' + TC.dim + '" font-size="9" text-anchor="middle">An 1</text>';
  var x2b = x1b + bw + gap, h2 = v1 * sc;
  out += '<rect x="' + x2b + '" y="' + (oy - h2) + '" width="' + bw + '" height="' + h2 + '" fill="' + TC.green + '44" stroke="' + TC.green + '" stroke-width="1.5"/>';
  out += '<text x="' + (x2b + bw / 2) + '" y="' + (oy - h2 - 4) + '" fill="' + TC.green + '" font-size="10" text-anchor="middle">' + v1 + '</text>';
  out += '<text x="' + (x2b + bw / 2) + '" y="' + (oy + 12) + '" fill="' + TC.dim + '" font-size="9" text-anchor="middle">An 2</text>';
  out += '</svg>';
  return out;
}

// ── Tableau de signes ───────────────────────────────────
function renderSignTable(code) {
  var W = 300, H = 60;
  var mExpr = code.match(/\$([\d]+)x[-+][\d]+\$/);
  var expr = mExpr ? mExpr[1] + 'x' : 'f(x)';
  var mFrac = code.match(/\\frac\{([\d]+)\}\{([\d]+)\}/);
  var zero = mFrac ? mFrac[1] + '/' + mFrac[2] : '?';

  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" style="background:' + TC.bg + ';border-radius:8px">';
  out += '<rect x="1" y="1" width="' + (W - 2) + '" height="' + (H - 2) + '" fill="none" stroke="' + TC.axis + '" stroke-width="1.2" rx="4"/>';
  out += '<line x1="1" y1="30" x2="' + (W - 1) + '" y2="30" stroke="' + TC.axis + '" stroke-width="1"/>';
  out += '<line x1="90" y1="1" x2="90" y2="' + (H - 1) + '" stroke="' + TC.axis + '" stroke-width="1"/>';
  out += '<line x1="175" y1="1" x2="175" y2="' + (H - 1) + '" stroke="' + TC.axis + '" stroke-width="1"/>';
  out += '<text x="45" y="20" fill="' + TC.text + '" font-size="12" font-style="italic" text-anchor="middle">x</text>';
  out += '<text x="132" y="20" fill="' + TC.dim + '" font-size="12" text-anchor="middle">−∞</text>';
  out += '<text x="175" y="20" fill="' + TC.yel + '" font-size="11" text-anchor="middle">' + zero + '</text>';
  out += '<text x="238" y="20" fill="' + TC.dim + '" font-size="12" text-anchor="middle">+∞</text>';
  out += '<text x="45" y="48" fill="' + TC.text + '" font-size="10" text-anchor="middle">' + expr + '</text>';
  out += '<text x="132" y="50" fill="' + TC.red + '" font-size="20" font-weight="bold" text-anchor="middle">−</text>';
  out += '<text x="175" y="48" fill="' + TC.yel + '" font-size="13" font-weight="bold" text-anchor="middle">0</text>';
  out += '<text x="238" y="50" fill="' + TC.green + '" font-size="20" font-weight="bold" text-anchor="middle">+</text>';
  out += '</svg>';
  return out;
}

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
  _PAD:  { l:28, r:24, t:18, b:22 },
  _FS:   12,
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
      + ' style="background:' + (bg || TC.bg) + ';border-radius:8px;display:block;margin:0 auto">'
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
  latex: function(xmin, xmax, ymin, ymax) {
    var f = this._make('latex');
    f._xmin = xmin; f._xmax = xmax;
    f._ymin = ymin; f._ymax = ymax;
    f._SC = 1; f._ox = 0; f._oy = 0;
    f._out = '\\begin{tikzpicture}[scale=0.75, baseline=(current bounding box.west)]\n';
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
      '\\clip (' + this._xmin + ',' + this._ymin + ') rectangle ('
        + this._xmax + ',' + this._ymax + ');\n'
    );
  },

  endClip: function() {
    return this._add('</g>', '');
  },

  // ── Grille ────────────────────────────────────────────
  // .grid(step)   step par défaut = 1
  grid: function(stepx,stepy) {
    stepx = stepx || 1;
    stepy= stepy || stepx ||1;
    var xmin = this._xmin, xmax = this._xmax;
    var ymin = this._ymin, ymax = this._ymax;
    var svg  = '';
    if (this._ctx === 'svg') {
      for (var x = xmin; x <= xmax; x += stepx) {
        svg += '<line x1="' + this._px(x) + '" y1="' + this._py(ymax)
             + '" x2="' + this._px(x) + '" y2="' + this._py(ymin)
             + '" stroke="' + TC.grid + '" stroke-width=".5"/>';
      }
      for (var y = ymin; y <= ymax; y += stepy) {
        svg += '<line x1="' + this._px(xmin) + '" y1="' + this._py(y)
             + '" x2="' + this._px(xmax) + '" y2="' + this._py(y)
             + '" stroke="' + TC.grid + '" stroke-width=".5"/>';
      }
    }
    return this._add(svg,
      '\\draw[very thin,gray!30] (' + xmin + ',' + ymin + ') grid [xstep=' + stepx + ',ystep=' + stepy + '] ('
      + xmax + ',' + ymax + ');\n');
  },

  // ── Axes avec flèches ─────────────────────────────────
  // .axes()
  axes: function() {
    var xmin = this._xmin, xmax = this._xmax;
    var ymin = this._ymin, ymax = this._ymax;
    var ox = this._px(0), oy = this._py(0);
    var aid = this._ARR, fs = this._FS;
    var svg =
      // axe x
      '<line x1="' + this._px(xmin) + '" y1="' + oy
        + '" x2="' + (this._px(xmax) + 12) + '" y2="' + oy
        + '" stroke="' + TC.axis + '" stroke-width="1.8" marker-end="url(#' + aid + ')"/>'
      // axe y
      + '<line x1="' + ox + '" y1="' + this._py(ymin)
        + '" x2="' + ox + '" y2="' + (this._py(ymax) - 8)
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
      '\\draw[-stealth] (' + xmin + ',0) -- (' + (xmax) + ',0) node[above]{$x$};\n'
      + '\\draw[-stealth] (0,' + ymin + ') -- (0,' + (ymax) + ') node[right]{$y$};\n'
      + '\\node[below left,fontsize=small] {O};\n');
  },

  // ── Graduations ───────────────────────────────────────
  // .gradX(step)   .gradY(step)
  gradX: function(step) {
    step = step || 1;
    var oy = this._py(0), fs = this._FS;
    var svg = '', tikz = '';
    for (var x = this._xmin; x <= this._xmax; x += 1) {
      if (x === 0) continue;
      var px = this._px(x);
      svg  += '<line x1="' + px + '" y1="' + (oy - 3) + '" x2="' + px + '" y2="' + (oy + 3)
            + '" stroke="' + TC.axis + '" stroke-width="1"/>'
            + '<text x="' + px + '" y="' + (oy + fs + 4) + '" fill="' + TC.dim
            + '" font-size="' + fs + '" text-anchor="middle">' + x*step + '</text>';
      tikz += '\\draw (' + x + ',2pt) -- (' + x + ',-2pt) node[below,font=\\small]{$' + x*step + '$};\n';
    }
    return this._add(svg, tikz);
  },

  gradY: function(step) {
    step = step || 1;
    var ox = this._px(0), fs = this._FS;
    var svg = '', tikz = '';
    for (var y = this._ymin; y <= this._ymax; y += 1) {
      if (y === 0) continue;
      var py = this._py(y);
      svg  += '<line x1="' + (ox - 3) + '" y1="' + py + '" x2="' + (ox + 3) + '" y2="' + py
            + '" stroke="' + TC.axis + '" stroke-width="1"/>'
            + '<text x="' + (ox - 8) + '" y="' + (py + fs / 2) + '" fill="' + TC.dim
            + '" font-size="' + fs + '" text-anchor="end">' + y*step + '</text>';
      tikz += '\\draw (2pt,' + y + ') -- (-2pt,' + y + ') node[left,font=\\small]{$' + y*step + '$};\n';
    }
    return this._add(svg, tikz);
  },



  // ── Segment entre deux points ────────────────────────
  // .line(x1, y1, x2, y2, color, style, arrows)
  // color  : 'black' | 'red' | 'green' (défaut 'black')
  // style  : 'solid' | 'dashed' | 'dotted' (défaut 'solid')
  // arrows : '' | '->' | '<-' | '<->' (défaut '')
  line: function(x1, y1, x2, y2, color, style, arrows) {
    var col   = color === 'red' ? TC.red : color === 'green' ? TC.green : TC.black;
    var dash  = style === 'dashed' ? ' stroke-dasharray="5 3"'
              : style === 'dotted' ? ' stroke-dasharray="2 3"' : '';
    var tikzS = style === 'dashed' ? 'dashed,' : style === 'dotted' ? 'dotted,' : '';
    var aid   = this._ARR;
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
        + '" stroke="' + col + '" stroke-width="1.5"' + dash
        + markerStart + markerEnd + '/>',
      '\\draw[' + tikzArr + tikzS + (color || 'blue') + ',thick] ('
        + x1 + ',' + y1 + ') -- (' + x2 + ',' + y2 + ');\n'
    );
  },



  // ── Texte à une position mathématique ───────────────
  // .text(x, y, t, color, anchor, tikzT)
  // x, y   : coordonnées mathématiques
  // t      : texte SVG. Préfixe '~' → barre au-dessus : '~A' affiche Ā
  // color  : 'black' | 'blue' | 'red' | 'green' (défaut 'black')
  // anchor : 'middle' | 'start' | 'end' (défaut 'middle')
  // tikzT  : texte TikZ si différent (ex: '\\bar{A}').
  //          Si omis et t commence par '~', génère \\bar{X} automatiquement.
  //
  // Exemples :
  //   .text(2,  1,  'A')                    → SVG: A     / TikZ: $A$
  //   .text(2, -1,  '~A')                   → SVG: Ā     / TikZ: $\bar{A}$
  //   .text(4,  0.5,'~B', 'red', 'start')   → SVG: B̄     / TikZ: $\bar{B}$
  //   .text(1,  0.7,'0,3')                  → SVG: 0,3   / TikZ: $0,3$
  text: function(x, y, t, color, anchor, tikzT) {
    var col = color === 'red'   ? TC.red
            : color === 'blue'  ? TC.blue
            : color === 'green' ? TC.green
            : TC.black;
    var anch = anchor || 'middle';
    var fs   = this._FS;
    var tikzAnch = anchor === 'start' ? 'anchor=west,'
                 : anchor === 'end'   ? 'anchor=east,' : '';
 
    // Notation ~X → barre au-dessus via text-decoration SVG
    var svgContent, tikzContent;
    if (typeof t === 'string' && t.charAt(0) === '~') {
      var letter = t.slice(1);
      svgContent  = '<tspan text-decoration="overline">' + letter + '</tspan>';
      tikzContent = tikzT !== undefined ? tikzT : '\\bar{' + letter + '}';
    } else {
      svgContent  = t;
      tikzContent = tikzT !== undefined ? tikzT : t;
    }
 
    return this._add(
      '<text x="' + this._px(x) + '" y="' + this._py(y) + '"'
        + ' fill="' + col + '" font-size="' + fs + '" font-weight="bold"'
        + ' text-anchor="' + anch + '" dominant-baseline="central">' + svgContent + '</text>',
      '\\node[' + tikzAnch + 'font=\\small] at (' + x + ',' + y + '){$' + tikzContent + '$};\n'
    );
  },


  // ── Droite affine  y = a*x + b ───────────────────────
  // .line(a, b, xmin, xmax, color, label)
  affine: function(a, b, xmin, xmax, color, label) {
    var col = color === 'blue' ? TC.blue : color === 'green' ? TC.green : TC.red;
    var lbl = label || '';
    var x1 = xmin, y1 = a * xmin + b, x2 = xmax, y2 = a * xmax + b;
    return this._add(
      '<line x1="' + this._px(x1) + '" y1="' + this._py(y1)
        + '" x2="' + this._px(x2) + '" y2="' + this._py(y2)
        + '" stroke="' + col + '" stroke-width="2.5"/>'
        + (lbl ? '<text x="' + (this._px(x2) + 4) + '" y="' + (this._py(y2) + 4)
            + '" fill="' + col + '" font-size="12" font-style="italic">' + lbl + '</text>' : ''),
      '\\draw[' + (color || 'red') + ',very thick] (' + x1 + ',' + y1 + ') -- ('
        + x2 + ',' + y2 + ')' + (lbl ? ' node[right]{$' + lbl + '$}' : '') + ';\n'
    );
  },

  // ── Point (disque plein) ──────────────────────────────
  // .point(x, y, color)
  point: function(x, y, color) {
    var col = color === 'red' ? TC.red : color === 'green' ? TC.green : TC.blue;
    return this._add(
      '<circle cx="' + this._px(x) + '" cy="' + this._py(y) + '" r="4" fill="' + col + '"/>',
      '\\filldraw[' + (color || 'blue') + '] (' + x + ',' + y + ') circle (2pt);\n'
    );
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

  arbre : function(xmin,xmax,ymin,ymax){
    var col = 'black';
    var style ='';
    var arrow = '->'
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

