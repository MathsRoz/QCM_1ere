# QCM Maths Première

Générateur de QCM interactif pour la classe de **Première** (BO 2025, session 2027).

Application web statique — aucune installation, aucun serveur requis, fonctionne directement dans le navigateur.

Application hosté en page GitHub : [https://mathsroz.github.io/QCM_1ere/](https://mathsroz.github.io/QCM_1ere/)

---

## Fonctionnalités

- **6 thèmes** du programme : Calcul algébrique, Proportions & pourcentages, Évolutions & variations, Fonctions, Statistiques, Probabilités
- **3 niveaux** : 1ère Technologique, Spécifique, Spécialité — filtrage inclusif ou strict
- **Questions paramétrées** : variables aléatoires à chaque génération, pas configurable (`step`), listes de valeurs explicites (`values`), déduplication automatique des réponses identiques
- **Mode interactif** : sélection des réponses, correction instantanée, score
- **Export LaTeX** : document classique ou diaporama Beamer, corrigé optionnel, compilation PDF directe via Overleaf
- **Rendu mathématique** via [KaTeX](https://katex.org/), figures géométriques en SVG pur JS
- **Éditeur de banque** : prévisualisation de chaque question, variables éditables en direct, tirages alternatifs
- **Responsive** : adapté mobile et desktop

---

## Structure du projet

```
index.html     Application principale
editeur-banque.html         Outil d'exploration et d'édition de la banque
question.html               Affichage d'une question isolée (?id=calc_001)
questions/
├── utils.js                Utilitaires partagés (ri, frac, simplExpr, pickVar, dedupeAnswers…)
├── svg-renderer.js         Moteur de rendu SVG pour les figures (axes, boxplot, arbres…)
├── calcul.js               Banque — Calcul algébrique
├── proportions.js          Banque — Proportions & pourcentages
├── evolutions.js           Banque — Évolutions & variations
├── fonctions.js            Banque — Fonctions
├── stats.js                Banque — Statistiques
├── proba.js                Banque — Probabilités
└── figures.js              Banque — Questions avec figures
```

---

## Format des questions

Chaque question est un objet JavaScript dans son fichier thématique :

```js
{
  id: "calc_001",                              // identifiant unique
  theme: "calcul",                             // thème
  groupe: "nom_du_groupe",                     // (optionnel) au plus 1 question par groupe par QCM
  niveau: ["techno", "specifique", "specialite"], // niveaux concernés
  cols: 4,                                     // nombre de colonnes de réponses
  variables: {
    a: { min: 1, max: 7 },                     // entier aléatoire dans [min, max]
    t: { min: 5, max: 30, step: 5 },           // avec pas : 5, 10, 15, 20, 25, 30
    x: { values: [30, 45, 60, 120] },          // liste de valeurs explicites
  },
  enonce:        (v) => `Calculer $${v.a} + ${v.t}$`,
  bonneReponse:  (v) => `$${v.a + v.t}$`,
  distracteurs:  (v) => [`$${v.a}$`, `$${v.t}$`, `$${v.a * v.t}$`],
}
```

### Utilitaires disponibles dans les questions

| Fonction | Description |
|---|---|
| `ri(min, max)` | Entier aléatoire dans [min, max] |
| `rf(min, max, dec)` | Flottant aléatoire arrondi à `dec` décimales |
| `frac(num, den)` | Fraction LaTeX simplifiée : `frac(3,6)` → `\dfrac{1}{2}` |
| `simplExpr(s)` | Simplifie une expression : `'y=-1x+0'` → `'y=-x'` |
| `pickVar(cfg)` | Tire une valeur selon la config (values / step / min-max) |
| `pgcd(a, b)` | Plus grand commun diviseur |

---

## Ajouter une question

1. Ouvrir le fichier thématique correspondant dans `questions/`
2. Ajouter l'objet question dans le tableau `QUESTIONS_XXX` avant le `];` final
3. Tester dans `editeur-banque.html` en recherchant l'id de la question

---

## Groupes de questions

Le champ `groupe` permet d'éviter deux questions similaires dans le même QCM. Si plusieurs questions ont le même groupe, une seule est tirée aléatoirement à chaque génération.

```js
{ id: "calc_021", groupe: "isoler_variable", ... }  // formule F=ma
{ id: "calc_022", groupe: "isoler_variable", ... }  // formule U=RI
// → au plus 1 des deux dans chaque QCM généré
```

---

## Outils inclus

### `editeur-banque.html`
Exploration complète de la banque : liste toutes les questions avec filtres par thème, prévisualisation rendue (KaTeX + SVG), variables éditables en direct, tirages alternatifs.

### `question.html?id=calc_001`
Affiche une question isolée identifiée par son `id` dans l'URL. Utile pour partager ou tester une question spécifique.

---

## Technologies

- HTML / CSS / JavaScript vanilla — zéro dépendance runtime
- [KaTeX](https://katex.org/) — rendu des formules mathématiques
- SVG généré en JS pur — figures géométriques sans dépendance externe
- Export LaTeX compatible `pdflatex` (packages : `amsmath`, `tikz`, `multicol`, `enumitem`, `beamer`)
