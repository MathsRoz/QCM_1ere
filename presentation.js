// ═══════════════════════════════════════════════════════
//  presentation.js — Mode présentation partagé
//  Utilisé par : index.html, editeur-banque.html
//
//  Dépendances attendues dans la page hôte :
//    - presGetQuestions()   → retourne le tableau de questions à présenter
//    - presRenderContent(container, str)  → injecte un énoncé/réponse dans un élément DOM
// ═══════════════════════════════════════════════════════

const pres = {
  idx: 0,
  showCorr: false,
  answers: {},
};

function openPresentation(questions) {
  if (!questions || !questions.length) return;

  // Stocker les questions dans pres pour y accéder partout
  pres.questions = questions;
  pres.idx = 0;
  pres.showCorr = false;
  pres.answers = {};

  // Créer l'overlay
  const overlay = document.createElement('div');
  overlay.className = 'pres-overlay';
  overlay.id = 'presOverlay';
  overlay.innerHTML = `
    <div class="pres-header" id="presHeader"></div>
    <div class="pres-body" id="presBody">
      <div class="pres-card" id="presCard" style="position:relative"></div>
    </div>`;
  document.body.appendChild(overlay);

  overlay._keyHandler = (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); presGo(1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); presGo(-1); }
    if (e.key === 'Escape')     closePresentation();
    if (e.key === 'c' || e.key === 'C') togglePresCorr();
  };
  document.addEventListener('keydown', overlay._keyHandler);

  overlay._resizeHandler = () => adaptPresFont();
  window.addEventListener('resize', overlay._resizeHandler);

  renderPresSlide();
}

function renderPresSlide() {
  const questions = pres.questions;
  const n = questions.length;
  const q = questions[pres.idx];
  const letters = ['A','B','C','D'];
  const cols = Math.min(q.cols || 4, q.reponses.length);
  const gridCols = cols === 1 ? '1fr 1fr' : cols === 2 ? '1fr 1fr' : cols === 3 ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr';

  // ── Header ─────────────────────────────────────────
  document.getElementById('presHeader').innerHTML = `
    <div class="pres-counter">Question <strong>${pres.idx + 1}</strong> / ${n}</div>
    <div class="pres-nav">
      <button class="pres-btn pres-corr-btn${pres.showCorr ? ' on' : ''}"
        onclick="togglePresCorr()">
        ${pres.showCorr ? '🙈 Masquer' : '👁️ Corrigé'}
      </button>
      <button class="pres-btn pres-btn-prev" onclick="presGo(-1)"
        ${pres.idx === 0 ? 'disabled' : ''}> Précédente</button>
      <button class="pres-btn pres-btn-next" onclick="presGo(1)">
        ${pres.idx === n - 1 ? 'Terminer' : 'Suivante'}
      </button>
      <button class="pres-btn pres-btn-close" onclick="closePresentation()" title="Fermer">✕</button>
    </div>`;

  // ── Carte ──────────────────────────────────────────
  const card = document.getElementById('presCard');
  card.innerHTML = '';

  // Énoncé
  const enonce = document.createElement('div');
  enonce.className = 'pres-q-enonce';
  presRenderContent(enonce, q.enonce);
  card.appendChild(enonce);

  // Réponses
  const grid = document.createElement('div');
  grid.className = 'pres-answers';
  grid.style.gridTemplateColumns = gridCols;
  const sel = pres.answers[pres.idx];

  q.reponses.forEach((rep, ri) => {
    const btn = document.createElement('button');
    btn.className = 'pres-answer';
    const isCorrect = rep === q.bonneReponse;
    const isSelected = sel === ri;

    if (pres.showCorr) {
      if (isCorrect) btn.classList.add('correct');
      if (isSelected && !isCorrect) btn.classList.add('wrong');
    } else if (isSelected) {
      btn.classList.add('selected');
    }

    btn.onclick = () => {
      if (pres.showCorr) return;
      pres.answers[pres.idx] = ri;
      updatePresSelection();
    };

    const letter = document.createElement('div');
    letter.className = 'pres-letter';
    letter.textContent = letters[ri];

    const content = document.createElement('div');
    presRenderContent(content, rep);

    btn.appendChild(letter);
    btn.appendChild(content);
    grid.appendChild(btn);
  });
  card.appendChild(grid);

  // Barre de progression
  const prog = document.createElement('div');
  prog.className = 'pres-progress';
  prog.style.width = ((pres.idx + 1) / n * 100) + '%';
  document.getElementById('presHeader').appendChild(prog);

  // Adapter la police
  adaptPresFont();

  // KaTeX
  setTimeout(() => {
    if (window.renderMathInElement)
      renderMathInElement(card, {
        delimiters:[
          {left: '$$', right: '$$', display: true},
          {left: '$',  right: '$',  display: false},
        ],
        throwOnError: false
      });
  }, 40);
}

function presGo(dir) {
  const n = pres.questions.length;
  const newIdx = pres.idx + dir;
  if (newIdx < 0) return;
  if (newIdx >= n) { closePresentation(); return; }
  pres.idx = newIdx;
  renderPresSlide();
}

// Met à jour uniquement les classes sans reconstruire le DOM
function updatePresSelection() {
  const q = pres.questions[pres.idx];
  const sel = pres.answers[pres.idx];
  const card = document.getElementById('presCard');
  if (!card) return;
  card.querySelectorAll('.pres-answer').forEach((btn, ri) => {
    btn.classList.remove('selected', 'correct', 'wrong');
    const isCorrect  = q.reponses[ri] === q.bonneReponse;
    const isSelected = ri === sel;
    if (pres.showCorr) {
      if (isCorrect) btn.classList.add('correct');
      if (isSelected && !isCorrect) btn.classList.add('wrong');
    } else if (isSelected) {
      btn.classList.add('selected');
    }
  });
}

function togglePresCorr() {
  pres.showCorr = !pres.showCorr;
  const corrBtn = document.querySelector('.pres-corr-btn');
  if (corrBtn) {
    corrBtn.textContent = pres.showCorr ? '🙈 Masquer' : '👁️ Corrigé';
    corrBtn.classList.toggle('on', pres.showCorr);
  }
  updatePresSelection();
}

function closePresentation() {
  const overlay = document.getElementById('presOverlay');
  if (overlay) {
    document.removeEventListener('keydown', overlay._keyHandler);
    if (overlay._resizeHandler) window.removeEventListener('resize', overlay._resizeHandler);
    overlay.remove();
  }
}

function adaptPresFont() {
  const card = document.getElementById('presCard');
  const body = document.getElementById('presBody');
  if (!card || !body) return;

  const h = body.clientHeight;
  const base = Math.min(32, Math.max(14, Math.round(h / 28)));

  // Énoncé
  const enonce = card.querySelector('.pres-q-enonce');
  if (enonce) enonce.style.fontSize = base + 'px';

  // Réponses
  card.querySelectorAll('.pres-answer').forEach(btn => {
    btn.style.fontSize = Math.round(base * 0.85) + 'px';
    btn.style.padding  = Math.round(base * 0.3) + 'px ' + Math.round(base * 0.5) + 'px';
  });

  // Lettre
  card.querySelectorAll('.pres-letter').forEach(el => {
    el.style.fontSize = Math.round(base * 0.75) + 'px';
    el.style.top      = -10 + 'px';
    el.style.left     = -10 + 'px';
  });

  // Gap
  const grid = card.querySelector('.pres-answers');
  if (grid) grid.style.gap = Math.round(h / 60) + 'px';
}
