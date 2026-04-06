// ═══════════════════════════════════════════════════════
//  UTILITAIRES MATHÉMATIQUES — partagés par tous les thèmes
// ═══════════════════════════════════════════════════════

/** Entier aléatoire dans [min, max] avec pas de 1 */
function ri(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Valeur aléatoire dans [min, max] avec un pas donné.
 *  Accepte aussi un champ "values" : liste de valeurs possibles.
 *  riStep(0, 10, 2)               → 0, 2, 4, 6, 8 ou 10
 *  riStep(null, null, 1, [2,3,5]) → un des éléments de la liste
 */
function riStep(min, max, step, values) {
  if (values && values.length) {
    return values[Math.floor(Math.random() * values.length)];
  }
  step = step || 1;
  const count = Math.floor((max - min) / step);
  return min + Math.floor(Math.random() * (count + 1)) * step;
}

/** Tire une valeur aléatoire pour une variable selon sa config.
 *  Priorité : values > step > min/max */
function pickVar(cfg) {
  return riStep(cfg.min, cfg.max, cfg.step || 1,cfg.values);
}

/** Flottant aléatoire dans [min, max] arrondi à `dec` décimales */
function rf(min, max, dec = 1) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(dec));
}

/** Entier aléatoire non nul dans [min, max] */
function nonZero(min, max) {
  let v;
  do { v = ri(min, max); } while (v === 0);
  return v;
}

/** Plus grand commun diviseur (retourne 1 si a ou b vaut 0) */
function pgcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { const t = b; b = a % b; a = t; }
  return a || 1;
}

/** Formate une fraction LaTeX en la simplifiant automatiquement.
 *  frac(3, 6)  → "\\dfrac{1}{2}"
 *  frac(6, 3)  → "2"
 *  frac(-4, 2) → "-2"
 */
function frac(num, den) {
  if (den === 0) return '\\text{indéfini}';
  const sign = (num * den < 0) ? '-' : '';
  num = Math.abs(num); den = Math.abs(den);
  const g = pgcd(num, den);
  num /= g; den /= g;
  if (den === 1) return `${sign}${num}`;
  return `${sign}\\dfrac{${num}}{${den}}`;
}

/**
 * Simplifie les expressions algébriques courantes dans une chaîne.
 * Exemples :
 *   simplExpr('y=-1x-3')  → 'y=-x-3'
 *   simplExpr('y=1x+0')   → 'y=x'
 *   simplExpr('+-3')       → '-3'
 *   simplExpr('0x+9')      → '9'
 *   simplExpr('x+0.25')   → 'x+0.25'  (décimales préservées)
 */
function simplExpr(s) {
  s = String(s);

  // 1. Coefficient 1 devant x
  s = s.replace(/(^|[=+({\[,\s])\+?1x/g, (_, pre) => pre + 'x');
  s = s.replace(/(^|[=+({\[,\s])-1x/g,  (_, pre) => pre + '-x');
  s = s.replace(/([+\-])1x/g, (_, op) => (op === '-' ? '-x' : '+x'));

  // 2. Terme nul 0x
  s = s.replace(/(^|=)\s*\+?0x\s*([+\-])/g, (_, pre, op) => pre + op);
  s = s.replace(/(^|=)\s*\+?0x\s*$/g, (_, pre) => pre + '0');
  s = s.replace(/[+\-]0x/g, '');

  // 3. Signes doubles
  s = s.replace(/\+\+/g, '+');
  s = s.replace(/\+-/g,  '-');
  s = s.replace(/-\+/g,  '-');
  s = s.replace(/--/g,   '+');

  // 4. Terme +0 ou -0 — ne pas toucher si suivi d'un chiffre ou d'un point (ex: 0.25)
  s = s.replace(/[+\-]0(?![\d.])/g, '');

  // 5. Signe + superflu en début ou après = ou (
  s = s.replace(/(^|[=(,])\+/g, '$1');

  s = s.trim();
  return s;
}

/**
 * Régénère les variables tant que des doublons existent entre
 * la bonne réponse et les distracteurs (max 10 tentatives).
 * Appelle enonce() en premier pour initialiser les éventuels
 * champs stockés dans v (ex: v._r2, v._formules…).
 * Le flag v._deduping permet aux questions lourdes (figures SVG)
 * de sauter la génération graphique pendant cette phase.
 */
function dedupeAnswers(template, vars) {
  for (let i = 0; i < 10; i++) {
    try {
      vars._deduping = true;   // signal : on est en phase de déduplication
      template.enonce(vars);
      vars._deduping = false;
      const bonne = template.bonneReponse(vars);
      const dist  = template.distracteurs(vars);
      const all   = [bonne, ...dist];
      if (new Set(all).size === all.length) return vars;
    } catch(e) { vars._deduping = false; return vars; }
    // Régénérer de nouvelles variables
    for (const [k, cfg] of Object.entries(template.variables || {})) {
      vars[k] = pickVar(cfg);
    }
  }
  vars._deduping = false;
  return vars;
}


/**
 * Calcule l'image d'un nombre par une expression de fonction.
 * Utilise le même parseur que Fig.curve().
 *
 * @param {number} a   La valeur en laquelle évaluer la fonction
 * @param {string} s   L'expression de la fonction, ex: 'x^2', '2x+1', 'sqrt(x+1)'
 * @returns {number}   f(a), arrondi à 10 décimales pour éviter les flottants parasites
 *
 * Exemples :
 *   fimage(3, 'x^2')        → 9
 *   fimage(2, '3x-1')       → 5
 *   fimage(4, 'sqrt(x)')    → 2
 *   fimage(0, 'sin(x)')     → 0
 */
function fimage(a, s) {
  var fn = Fig._parseExpr(s);
  var result = fn(a);
  // Arrondir pour éviter 2.9999999999 au lieu de 3
  return parseFloat(result.toPrecision(10));
}