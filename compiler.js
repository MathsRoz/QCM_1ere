// ═══════════════════════════════════════════════════════
//  compiler.js — Fonctions de compilation LaTeX partagées
//  Utilisé par : index.html, editeur-banque.html
// ═══════════════════════════════════════════════════════

// ── Préambule LaTeX commun ──────────────────────────────
const LATEX_PREAMBLE_ARTICLE =
    '\\documentclass[12pt,a4paper]{article}\n'
  + '\\usepackage[utf8]{inputenc}\n\\usepackage[T1]{fontenc}\n\\usepackage[french]{babel}\n'
  + '\\usepackage[upright]{fourier}\n'
  + '\\usepackage{amsmath,amssymb}\\usepackage{multicol}\\usepackage{enumitem}\n'
  + '\\usepackage{tikz}\n\\usetikzlibrary{arrows.meta,calc,trees}\n'
  + '\\usepackage[left=1cm,right=1cm,top=1cm,bottom=2cm]{geometry}\n'
  + '\\usepackage[dvipsnames]{xcolor}\\definecolor{correct}{RGB}{16,185,129}\n';

const LATEX_PREAMBLE_BEAMER = (theme, color) =>
    '\\documentclass{beamer}\n'
  + '\\usepackage[utf8]{inputenc}\\usepackage[T1]{fontenc}\\usepackage[french]{babel}\n'
  + '\\usepackage[upright]{fourier}\n'
  + '\\usepackage{amsmath,amssymb}\n'
  + '\\usepackage{tikz}\\usetikzlibrary{arrows.meta,calc,trees}\n'
  + '\\usefonttheme[onlymath]{serif}'
  + '\\usepackage[dvipsnames]{xcolor}\n'
  + '\\usetheme{'+(theme||'Singapore')+'}\\usecolortheme{'+(color||'default')+'}\n';

// ── Conversion chaîne → LaTeX ───────────────────────────
// Remplace les marqueurs %%SVG%%TIKZ%%, balises HTML, <br> etc.
function latexifyStr(str) {
  if (typeof str !== 'string') return str;
  str = str.replace(/%%SVG[\s\S]*?%%ENDSVG%%\s*%%TIKZ([\s\S]*?)%%ENDTIKZ%%/g, (_,tikz) =>
    '\n' + tikz.trim() + '\n\n');
  str = str.replace(/%%SVG[\s\S]*?%%ENDSVG%%/g, '\n% [figure SVG — non exportable en LaTeX]\n');
  str = str.replace(/%%TIKZ([\s\S]*?)%%ENDTIKZ%%/g, (_,code) =>
    '\n'+code.trim()+'\n\n');
  return str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<b>(.*?)<\/b>/gi, '\\textbf{$1}')
    .replace(/<i>(.*?)<\/i>/gi, '\\textit{$1}')
    .replace(/<[^>]+>/g, '');
}

// ── Extraction figure + texte ───────────────────────────
// Retourne { text, tikz } — tikz vaut '' si pas de figure
function examSplit(str) {
  if (typeof str !== 'string') return { text: String(str), tikz: '' };
  var tikzCode = '';
  str = str.replace(/%%SVG[\s\S]*?%%ENDSVG%%\s*%%TIKZ([\s\S]*?)%%ENDTIKZ%%/g, function(_, t) {
    tikzCode = t.trim(); return '';
  });
  str = str.replace(/%%TIKZ([\s\S]*?)%%ENDTIKZ%%/g, function(_, t) {
    tikzCode = t.trim(); return '';
  });
  str = str.replace(/%%SVG[\s\S]*?%%ENDSVG%%/g, '');
  str = str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<b>(.*?)<\/b>/gi, '\\textbf{$1}')
    .replace(/<i>(.*?)<\/i>/gi, '\\textit{$1}')
    .replace(/<[^>]+>/g, '').trim();
  return { text: str, tikz: tikzCode };
}

// ── Même chose pour Beamer ──────────────────────────────
function beamerSplit(str) {
  if (typeof str !== 'string') return { text: String(str), tikz: '' };
  var tikzCode = '';
  str = str.replace(/%%SVG[\s\S]*?%%ENDSVG%%\s*%%TIKZ([\s\S]*?)%%ENDTIKZ%%/g, function(_, t) {
    tikzCode = t.trim(); return '';
  });
  str = str.replace(/%%TIKZ([\s\S]*?)%%ENDTIKZ%%/g, function(_, t) {
    tikzCode = t.trim(); return '';
  });
  str = str.replace(/%%SVG[\s\S]*?%%ENDSVG%%/g, '');
  str = str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<b>(.*?)<\/b>/gi, '\\textbf{$1}')
    .replace(/<i>(.*?)<\/i>/gi, '\\textit{$1}')
    .replace(/<[^>]+>/g, '').trim();
  return { text: str, tikz: tikzCode };
}

// ── Contenu d'une question → bloc LaTeX article ─────────
// q : { enonce, reponses, bonneReponse, cols }
// idx : numéro affiché (1-based)
function questionToLatex(q, idx) {
  const p = examSplit(q.enonce);
  const hasFig = p.tikz !== '';
  var out = '';

  out += '% -- Question ' + idx + '\n';
  out += '\\begin{minipage}{\\linewidth}\n';

  if (hasFig) {
    var innerTikz = p.tikz
    out += '\\noindent\\textbf{Question ' + idx + '.} ' + p.text + '\n\n';
    out += '\\noindent\\begin{minipage}{0.45\\textwidth}\n\\vspace{1em}\n';
    out += '\\begin{enumerate}[label=\\textbf{\\Alph*.},leftmargin=*]\n';
    q.reponses.forEach(r => { out += '  \\item ' + latexifyStr(r) + '\n\\vspace{1em}\n'; });
    out += '\\end{enumerate}\n\\end{minipage}\\hfill\n';
    out += '\\begin{minipage}{0.50\\textwidth}\n  \n';
    out += innerTikz
    out += '\\end{minipage}\n';
  } else {
    out += '\\noindent\\textbf{Question ' + idx + '.} ' + latexifyStr(q.enonce) + '\n\n';
    const cols = q.cols > 1 ? q.cols : 1;
    if (cols > 1) out += '\\begin{multicols}{' + cols + '}\n';
    out += '\\begin{enumerate}[label=\\textbf{\\Alph*.},leftmargin=*]\n';
    q.reponses.forEach(r => { out += '  \\item ' + latexifyStr(r) + '\n\\vspace{1em}\n'; });
    out += '\\end{enumerate}\n';
    if (cols > 1) out += '\\end{multicols}\n';
  }

  out += '\\end{minipage}\n\\vspace{2em}\n\n';
  return out;
}

// ── Document classique ──────────────────────────────────
// questions : tableau de { enonce, reponses, bonneReponse, cols }
// opts      : { inclCorrige }
function buildExamDoc(questions, opts) {
  opts = opts || {};
  const letters = ['A','B','C','D'];
  let out = LATEX_PREAMBLE_ARTICLE
    + '\n\\begin{document}\n\n'
    + '\\textbf{Nom, Prénom :}\n'
    + '\\begin{center}{\\Large\\bfseries QCM -- Automatismes Premi\\`{e}re}\\end{center}\n'
    + '\\vspace{1em}\n\n';

  questions.forEach((q, i) => { out += questionToLatex(q, i + 1); });

  if (opts.inclCorrige) {
    out += '\\newpage\n\n\\begin{center}{\\Large\\bfseries Corrig\\\'e}\\end{center}\n\\vspace{1em}\n\n';
    out += '\\begin{enumerate}[leftmargin=*]\n';
    questions.forEach((q, i) => {
      const idx = q.reponses.indexOf(q.bonneReponse);
      const letter = letters[idx] != null ? letters[idx] : '?';
      out += '  \\item \\textbf{Q'+(i+1)+'.} R\\\'eponse~: {\\color{correct}\\textbf{'
           + letter + '.} ' + latexifyStr(q.bonneReponse) + '}\n';
    });
    out += '\\end{enumerate}\n';
  }

  out += '\n\\end{document}';
  return out;
}

// ── Frame Beamer d'une question ─────────────────────────
function questionToFrame(q, idx) {
  const p = beamerSplit(q.enonce);
  const hasFig = p.tikz !== '';
  const letters = ['A','B','C','D'];
  const repLines = q.reponses.map((r,j) =>
    '\\textbf{'+letters[j]+')} '+latexifyStr(r)+'\n\n\\vspace{1em}');

  let f = '\\begin{frame}{Question '+(idx)+'}\n';

  if (hasFig) {
    var innerTikz = p.tikz
      .replace(/^\\begin\{tikzpicture\}[^\n]*\n?/, '')
      .replace(/\\end\{tikzpicture\}\s*$/, '').trim();
    f += '\\begin{columns}[totalwidth=\\textwidth]\n';
    f += '\\begin{column}{0.4\\textwidth}\n';
    f += '  \\small '+p.text+'\n  \\vspace{1em}\n\n';
    repLines.forEach(r => { f += '  '+r+'\n'; });
    f += '\\end{column}\n';
    f += '\\begin{column}{0.55\\textwidth}\n  \\hfill\n';
    f += '  \\begin{tikzpicture}[scale=0.55, baseline=(current bounding box.west)]\n';
    f += innerTikz + '\n  \\end{tikzpicture}\n  \\hfill\n';
    f += '\\end{column}\n\\end{columns}\n';
  } else {
    f += '\\begin{center}\n  '+p.text+'\n\\end{center}\n\\vspace{0.5em}\n';
    f += '\\begin{columns}\n';
    f += '\\begin{column}{0.48\\textwidth}\n  '+repLines[0]+'\n';
    if (repLines[2]) f += '  '+repLines[2]+'\n';
    f += '\\end{column}\n';
    f += '\\begin{column}{0.48\\textwidth}\n';
    if (repLines[1]) f += '  '+repLines[1]+'\n';
    if (repLines[3]) f += '  '+repLines[3]+'\n';
    f += '\\end{column}\n\\end{columns}\n';
  }

  f += '\\end{frame}\n\n';
  return f;
}

// ── Frame Beamer de correction ──────────────────────────
function corrToFrame(q, idx) {
  const p = beamerSplit(q.enonce);
  const hasFig = p.tikz !== '';
  let f = '\\begin{frame}{Correction Q'+idx+'}\n';

  if (hasFig) {
    var innerTikz = p.tikz
      .replace(/^\\begin\{tikzpicture\}[^\n]*\n?/, '')
      .replace(/\\end\{tikzpicture\}\s*$/, '').trim();
    f += '\\begin{columns}[T,totalwidth=\\textwidth]\n';
    f += '\\begin{column}{0.4\\textwidth}\n';
    f += '  \\small '+p.text+'\n  \\vspace{0.6em}\n\n';
    f += '  {\\large\\color{green!60!black}\\textbf{'+latexifyStr(q.bonneReponse)+'}}\n';
    f += '\\end{column}\n';
    f += '\\begin{column}{0.55\\textwidth}\n  \\hfill\n';
    f += '  \\begin{tikzpicture}[scale=0.55, baseline=(current bounding box.west)]\n';
    f += innerTikz + '\n  \\end{tikzpicture}\n  \\hfill\n';
    f += '\\end{column}\n\\end{columns}\n';
  } else {
    f += '\\begin{center}\n  '+p.text+'\n  \\vspace{0.8em}\n\n';
    f += '  {\\large\\color{green!60!black}\\textbf{'+latexifyStr(q.bonneReponse)+'}}\n';
    f += '\\end{center}\n';
  }

  f += '\\end{frame}\n\n';
  return f;
}

// ── Diaporama Beamer ────────────────────────────────────
// questions : tableau de { enonce, reponses, bonneReponse, cols }
// opts      : { theme, color, fmt }  fmt: 'one'|'corrected'|'allcorr'
function buildBeamerDoc(questions, opts) {
  opts = opts || {};
  let out = LATEX_PREAMBLE_BEAMER(opts.theme, opts.color)
    + '\n\\begin{document}\n\n';

  if (opts.fmt === 'allcorr') {
    questions.forEach((q,i) => { out += questionToFrame(q, i+1); });
    questions.forEach((q,i) => { out += corrToFrame(q, i+1); });
  } else {
    questions.forEach((q,i) => {
      out += questionToFrame(q, i+1);
      if (opts.fmt === 'corrected') out += corrToFrame(q, i+1);
    });
  }

  return out + '\\end{document}';
}

// ── Coloration syntaxique LaTeX ─────────────────────────
function highlightLatex(code) {
  return code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/(\\begin|\\end)\{([^}]+)\}/g,'<span class="lt-env">$1{$2}</span>')
    .replace(/(\\[a-zA-Z]+)/g,'<span class="lt-cmd">$1</span>')
    .replace(/(\$[^$]+\$)/g,'<span class="lt-math">$1</span>')
    .replace(/(%.+)/g,'<span class="lt-comment">$1</span>');
}

// ── Télécharger un .tex ─────────────────────────────────
function downloadTex(content, filename) {
  filename = filename || 'qcm-maths.tex';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], {type:'text/plain'}));
  a.download = 'QCM-' + new Date().toLocaleDateString('fr-FR').replace(/\//g,'-') + '.tex';
  a.click();
}

// ── Envoyer vers Overleaf (POST) ────────────────────────
function openInOverleaf(latex) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://www.overleaf.com/docs';
  form.target = '_blank';
  const input = document.createElement('input');
  input.type = 'hidden'; input.name = 'snip'; input.value = latex;
  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

// ── Compiler via ytotech puis Overleaf en fallback ──────
// latex    : chaîne LaTeX à compiler
// onToast  : fonction(msg, type) pour afficher les notifications
// filename : nom du PDF téléchargé (défaut: 'qcm.pdf')
async function compilePDF(latex, onToast, filename) {
  onToast  = onToast  || function(){};
  filename = filename || 'qcm.pdf';
  onToast('Tentative de compilation…');
  try {
    const fd = new FormData();
    fd.append('filecontents[]', new Blob([latex],{type:'text/plain'}), 'main.tex');
    fd.append('filename[]','main.tex'); fd.append('engine','pdflatex'); fd.append('return','pdf');
    const res = await fetch('https://latex.ytotech.com/builds/sync',{method:'POST',body:fd});
    if (res.ok) {
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      onToast('PDF généré ✓', 'success');
      return;
    }
  } catch(e) {}
  openInOverleaf(latex);
  onToast('Ouverture sur Overleaf…');
}