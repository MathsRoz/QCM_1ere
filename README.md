# QCM Mathématiques — Première

Générateur de QCM interactif pour les **automatismes de Première** (BO 2025), conçu pour les professeurs et les élèves.

[https://mathsroz.github.io/QCM_1ere/](https://mathsroz.github.io/QCM_1ere/)

---

## Fonctionnalités

- **Génération aléatoire** de QCM à partir d'une banque de questions paramétriques
- **Seed déterministe** — chaque QCM est reproductible via un lien partageable
- **Mode présentation** plein écran pour le vidéoprojecteur (navigation clavier)
- **Export LaTeX** — document classique (article) ou diaporama (Beamer)
- **Compilation PDF** via [ytotech](https://latex.ytotech.com) ou Overleaf
- **Thème clair / sombre** avec persistance localStorage
- **Éditeur de banque** pour consulter, tester et compiler les questions

---

## Structure des fichiers

```
├── index.html              Application principale
├── editeur-banque.html     Éditeur et explorateur de la banque de questions
├── question.html           Affichage d'une question individuelle (?id=calc_001)
├── style.css               Feuille de style commune (thème clair/sombre)
├── compiler.js             Fonctions de compilation LaTeX partagées
└── questions/
    ├── utils.js            Utilitaires (frac, ri, pickVar, dedupeAnswers, makeTable…)
    ├── svg-renderer.js     Moteur de rendu SVG + TikZ (objet Fig)
    ├── calcul.js           Thème : Calcul numérique et algébrique
    ├── proportions.js      Thème : Proportions et pourcentages
    ├── evolutions.js       Thème : Évolutions et variations
    ├── fonctions.js        Thème : Fonctions et représentations
    ├── stats.js            Thème : Statistiques
    ├── proba.js            Thème : Probabilités
    └── autre.js            Questions non répertoriées / en cours
```

---


## Format d'une question

```js
{
  id: 'calc_001',                          // identifiant unique
  theme: 'calcul',                         // thème
  groupe: 'fractions',                     // groupe (évite les doublons thématiques)
  niveau: ['techno', 'specifique', 'specialite'],
  cols: 4,                                 // colonnes pour l'affichage des réponses

  variables: {
    a: { min: 1, max: 9 },                 // entier aléatoire dans [min, max]
    b: { min: 2, max: 5, step: 1 },        // avec pas
    c: { values: [10, 20, 50, 100] },      // liste de valeurs possibles
  },

  enonce:       (v) => `Calculer $\\dfrac{${v.a}}{${v.b}}$`,
  bonneReponse: (v) => `$${frac(v.a, v.b)}$`,
  distracteurs: (v) => [`$${v.a}$`, `$${v.b}$`, `$${v.a + v.b}$`],
}
```

### Insérer une figure SVG + TikZ

```js
enonce: (v) => {
  const svg  = Fig.svg(-3, 3, -2, 2).axes().curve('x^2-1').end();
  const tikz = Fig.latex(-3, 3, -2, 2).axes().curve('x^2-1').end();
  return 'Soit la courbe ci-dessous :'
    + '%%SVG' + svg + '%%ENDSVG%%%%TIKZ' + tikz + '%%ENDTIKZ%%'
    + 'Quel est le minimum ?';
}
```

Les marqueurs `%%SVG...%%ENDSVG%%%%TIKZ...%%ENDTIKZ%%` permettent d'avoir deux rendus : SVG pour le navigateur, TikZ pour l'export LaTeX.

---

## API Fig (svg-renderer.js)

Objet fluide pour générer des figures mathématiques en SVG (navigateur) et TikZ (LaTeX).

```js
// Initialisation
Fig.svg(xmin, xmax, ymin, ymax)       // contexte SVG navigateur
Fig.latex(xmin, xmax, ymin, ymax)     // contexte TikZ LaTeX

// Méthodes chaînables
.axes()                               // repère avec flèches
.grid(stepx, stepy)                   // quadrillage
.gradX(step) / .gradY(step)           // graduations sur les axes
.curve('x^2 - 2*x + 1')              // courbe d'une expression
.affine(a, b, xmin, xmax)             // droite y = ax + b
.line(x1, y1, x2, y2, color)         // segment
.point(x, y, label, color)           // point avec label
.text(x, y, 'texte', color)          // texte (supporte $x_1$, ~x pour barre)
.frac(x, y, num, den)                // fraction centrée
.dashes(x0, y0, labelX, labelY)      // tirets de lecture graphique
.label(expr, 'C_f', color)           // étiquette sur une courbe
.arbre()                              // arbre de probabilités (2 niveaux)
.camembert([{val, color}])            // diagramme circulaire
.tableauS(t)                          // tableau de signes
.tableauV(t)                          // tableau de variations
.clip() / .endClip()                  // zone de découpe
.end()                                // retourne la chaîne SVG ou TikZ
```

Les marges internes sont configurables via `Fig._PAD = { l, r, t, b }`.

---

## Seed et reproductibilité

Chaque QCM généré reçoit une **seed** affichée comme badge `🎲 XXXXXXXXX`. Cliquer dessus copie un lien du type :

```
index.html?seed=482759301&level=specialite&inclusive=1&n=12&themes=calcul,proba
```

Ouvrir ce lien régénère exactement le même QCM (mêmes questions, mêmes variables, même ordre). Le générateur utilisé est **Mulberry32**, patché sur `Math.random` uniquement pendant la génération puis restauré.

---

## Export LaTeX

### Document classique (article)
- Questions numérotées avec réponses en colonnes (`multicols`)
- Figures en `minipage` côte à côte avec le texte
- Option : inclure le corrigé en fin de document

### Diaporama (Beamer)
- Formats : 1 question par frame / question + correction / toutes puis toutes corrections
- Choix du thème Beamer (Singapore, Madrid, Warsaw…) et de la palette de couleurs
- Figures en `columns` côte à côte

### Compilation
1. **Automatique** via [latex.ytotech.com](https://latex.ytotech.com) → téléchargement direct du PDF
2. **Fallback** → ouverture sur [Overleaf](https://overleaf.com) avec le code pré-rempli

---

## Ajouter des questions

1. Ouvrir le fichier du thème correspondant (ex: `questions/stats.js`)
2. Ajouter un objet question dans le tableau `QUESTIONS_STATS`
3. Tester via `question.html?id=votre_id` ou dans l'éditeur de banque (`editeur-banque.html`)

Les variables sont automatiquement dé-dupliquées par `dedupeAnswers` — si la bonne réponse et un distracteur sont identiques, de nouvelles variables sont tirées (jusqu'à 10 tentatives). Le flag `v._deduping` permet aux questions avec figures lourdes de sauter la génération SVG pendant cette phase.

---

## Dépendances

| Bibliothèque | Usage | Version |
|---|---|---|
| [KaTeX](https://katex.org) | Rendu des formules mathématiques | 0.16.9 |
| [DM Sans / DM Mono](https://fonts.google.com) | Typographie | — |

Tout le reste est vanilla JS / HTML / CSS, sans framework ni bundler.

---

## Licence

MIT — libre d'utilisation, de modification et de redistribution.
