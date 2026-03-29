// ═══════════════════════════════════════════════════════
//  MOTEUR DE RENDU SVG — figures TikZ
//  Partagé entre qcm-maths-premiere.html et editeur-banque.html
// ═══════════════════════════════════════════════════════

// ── Palette thème sombre ────────────────────────────────
var TC = {
  bg:    '#0d1a2d',
  grid:  '#1e2d45',
  axis:  '#94a3b8',
  text:  '#e2e8f0',
  dim:   '#64748b',
  blue:  '#93c5fd',
  green: '#86efac',
  red:   '#fca5a5',
  yel:   '#fde68a',
  pur:   '#c4b5fd'
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

// ── Arbre de probabilités ───────────────────────────────
function renderTree(code) {
  var W = 310, H = 180;
  var probs = [...code.matchAll(/\$([\d]+\{,\}[\d]+|\d+\.\d+|\d+\/\d+)\$/g)].map(m => m[1].replace('{,}', '.'));
  var pA = probs[0] || '0.5', pnA = probs[1] || '0.5';
  var pB1 = probs[2] || '0.6', pnB1 = probs[3] || '0.4';
  var pB2 = probs[4] || '0.3', pnB2 = probs[5] || '0.7';

  var out = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" style="background:' + TC.bg + ';border-radius:8px" font-family="serif">';

  function branch(x1, y1, x2, y2, label, above) {
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dy = above ? -8 : 10;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + TC.axis + '" stroke-width="1.5"/>'
         + '<text x="' + mx + '" y="' + (my + dy) + '" fill="' + TC.dim + '" font-size="10" text-anchor="middle">' + label + '</text>';
  }
  function node(x, y, label, col) {
    return '<text x="' + x + '" y="' + (y + 4) + '" fill="' + col + '" font-size="13" text-anchor="middle" font-weight="bold">' + label + '</text>';
  }

  var rx = 22, ry = 90;
  var n1x = 110, n1y = 45, n2x = 110, n2y = 135;
  var b1x = 220, b1y = 20, b2x = 220, b2y = 70, b3x = 220, b3y = 110, b4x = 220, b4y = 160;

  out += branch(rx, ry, n1x, n1y, pA, true);
  out += branch(rx, ry, n2x, n2y, pnA, false);
  out += branch(n1x, n1y, b1x, b1y, pB1, true);
  out += branch(n1x, n1y, b2x, b2y, pnB1, false);
  out += branch(n2x, n2y, b3x, b3y, pB2, true);
  out += branch(n2x, n2y, b4x, b4y, pnB2, false);
  out += node(n1x, n1y, 'A', TC.blue);
  out += node(n2x, n2y, 'Ā', TC.blue);
  out += node(b1x, b1y, 'B', TC.green);
  out += node(b2x, b2y, 'B̄', TC.red);
  out += node(b3x, b3y, 'B', TC.green);
  out += node(b4x, b4y, 'B̄', TC.red);

  var pAB   = (parseFloat(pA)  * parseFloat(pB1)).toFixed(2);
  var pAnB  = (parseFloat(pA)  * parseFloat(pnB1)).toFixed(2);
  var pnAB  = (parseFloat(pnA) * parseFloat(pB2)).toFixed(2);
  var pnAnB = (parseFloat(pnA) * parseFloat(pnB2)).toFixed(2);
  out += '<text x="' + (W - 4) + '" y="' + (b1y + 4) + '" fill="' + TC.dim + '" font-size="9" text-anchor="end">' + pAB + '</text>';
  out += '<text x="' + (W - 4) + '" y="' + (b2y + 4) + '" fill="' + TC.dim + '" font-size="9" text-anchor="end">' + pAnB + '</text>';
  out += '<text x="' + (W - 4) + '" y="' + (b3y + 4) + '" fill="' + TC.dim + '" font-size="9" text-anchor="end">' + pnAB + '</text>';
  out += '<text x="' + (W - 4) + '" y="' + (b4y + 4) + '" fill="' + TC.dim + '" font-size="9" text-anchor="end">' + pnAnB + '</text>';

  out += '</svg>';
  return out;
}