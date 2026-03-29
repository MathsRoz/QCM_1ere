// ═══════════════════════════════════════════════════════
//  UTILITAIRES MATHÉMATIQUES — partagés par tous les thèmes
// ═══════════════════════════════════════════════════════

/** Entier aléatoire dans [min, max] avec pas de 1 */
function ri(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Valeur aléatoire dans [min, max] avec un pas donné.
 *  riStep(0, 10, 2) → 0, 2, 4, 6, 8 ou 10
 *  riStep(1, 9, 2)  → 1, 3, 5, 7 ou 9  (valeurs impaires)
 *  C'est cette fonction qui est utilisée par instantiateQuestion
 *  quand une variable définit un champ "step".
 */
function riStep(min, max, step, values) {
  if (values && values.length) {
    return values[Math.floor(Math.random() * values.length)];
  }
  step = step || 1;
  const count = Math.floor((max - min) / step);
  return min + Math.floor(Math.random() * (count + 1)) * step;
}
 
/** Tire une valeur aléatoire pour une variable selon sa config. */
function pickVar(cfg) {
  if (cfg.values && cfg.values.length) {
    return cfg.values[Math.floor(Math.random() * cfg.values.length)];
  }
  return riStep(cfg.min, cfg.max, cfg.step || 1);
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
 *
 * Règles appliquées (dans l'ordre) :
 *   1x   → x          (-1x → -x, +1x → +x)
 *   0x   → 0          (terme en x nul → supprimé ou remplacé)
 *   +-   → -           (signe redondant)
 *   -+   → -
 *   ++   → +
 *   --   → +
 *   +0   → (rien)     (terme nul en fin d'expression)
 *   =+   → =           (signe + inutile après =)
 *   0x+k → k           (expression entière réduite à la constante)
 *   0x-k → -k
 *
 * Exemples :
 *   simplExpr('y=-1x-3')   → 'y=-x-3'
 *   simplExpr('y=1x+0')    → 'y=x'
 *   simplExpr('+-3')        → '-3'
 *   simplExpr('0x+9')       → '9'
 *   simplExpr('y=+3')       → 'y=3'
 *   simplExpr('3x+-2')      → '3x-2'
 *   simplExpr('--5')        → '+5'
 *
 * @param {string} s  L'expression à simplifier
 * @returns {string}  L'expression simplifiée
 */
function simplExpr(s) {
  s = String(s);
 
  // 1. Coefficient 1 devant x (ex: 1x → x, +1x → +x, -1x → -x)
  s = s.replace(/(^|[=+({\[,\s])\+?1x/g, (_, pre) => pre + 'x');
  s = s.replace(/(^|[=+({\[,\s])-1x/g,  (_, pre) => pre + '-x');
  // Milieu d'expression : opérateur + 1x
  s = s.replace(/([+\-])1x/g, (_, op) => (op === '-' ? '-x' : '+x'));
 
  // 2. Terme nul 0x → supprimer le terme avec son signe
  //    Cas : début ou après = : "0x+" ou "0x-" → ""
  s = s.replace(/(^|=)\s*\+?0x\s*([+\-])/g, (_, pre, op) => pre + op);
  //    Cas : terme isolé "0x" en fin → ""
  s = s.replace(/(^|=)\s*\+?0x\s*$/g, (_, pre) => pre + '0');
  //    Cas : "+0x" ou "-0x" au milieu → supprimer
  s = s.replace(/[+\-]0x/g, '');
 
  // 3. Signes doubles
  s = s.replace(/\+\+/g, '+');
  s = s.replace(/\+-/g,  '-');
  s = s.replace(/-\+/g,  '-');
  s = s.replace(/--/g,   '+');
 
  // 4. Terme +0 ou -0 (constante nulle) — ne pas toucher si suivi de . ou chiffre
  s = s.replace(/[+\-]0(?![\d.])/g, '');   // +0 ou -0 non suivi d'un chiffre ou d'un point
 
  // 5. Signe + superflu en début ou après = ou (
  s = s.replace(/(^|[=(,])\+/g, '$1');
 
  // 6. Nettoyage final : espace éventuels
  s = s.trim();
 
  return s;
}







/** Régénère les variables tant que des doublons existent entre
 *  la bonne réponse et les distracteurs (max 10 tentatives). */
function dedupeAnswers(template, vars) {
  for (let i = 0; i < 10; i++) {
    try {
      const bonne = template.bonneReponse(vars);
      const dist  = template.distracteurs(vars);
      const all   = [bonne, ...dist];
      if (new Set(all).size === all.length) return vars; // pas de doublon
    } catch(e) { return vars; }
    // Régénérer de nouvelles variables
    for (const [k, cfg] of Object.entries(template.variables || {})) {
      vars[k] = riStep(cfg.min, cfg.max, cfg.step || 1);
    }
  }
  return vars;
}




