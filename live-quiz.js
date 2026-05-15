/* ═══════════════════════════════════════════════════════════
   live-quiz.js  —  Mode Classe Live (WebRTC/PeerJS)
   À inclure dans index.html APRÈS tous les autres scripts.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const PEER_SERVER = null;
  const STUDENT_PAGE = 'eleve.html';

  let peer = null;
  let roomCode = '';
  let connections = [];
  let liveState = {
    active: false, qIdx: -1, totalQ: 0,
    timerInterval: null, timerRemaining: 0,
    revealed: false,
  };
  const Btnstates = ['start','question','answer','podium','end'];
  let btnstate = 'start';

  // ═══════════════════════════════════════════════════════
  // CSS
  // ═══════════════════════════════════════════════════════
  // Le CSS est dans live-quiz.css — inclure dans index.html :
  // <link rel="stylesheet" href="live-quiz.css">

  // ═══════════════════════════════════════════════════════
  // HTML
  // ═══════════════════════════════════════════════════════
  function injectHTML() {
    // Overlay plein écran
    const overlay = document.createElement('div');
    overlay.id = 'liveOverlay';
    overlay.innerHTML = `
      <div id="liveTopBar">
        <div class="ltb-left">
          <span class="ltb-code" id="ltbCode"></span>
          <span class="ltb-students"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg> <span class="ltb-count" id="ltbCount">0</span></span>
        </div>
        <div class="lv-qnum" id="lvQnum"></div>
        <div class="lsp-timer-big" id="lspTimer"> </div>
        <div class="lsp-section">
          <div class="lsp-answered-big" id="lspAnswered"></div>
          </div>
        <div class="ltb-right">
          <button class="lv-ctrl-btn lv-ctrl-primary" id="lvBtnNext" onclick="LiveQuiz.btnSlide()">Suivant</button>
          <button class="lv-ctrl-btn lv-ctrl-danger" onclick="LiveQuiz.endSession()">Quitter</button>
        </div>
      </div>

      <div id="liveWaitScreen">
        <div class="lv-wait-code" id="lvWaitCode"></div>
        <img id="lvWaitQr" class="lv-wait-qr" src="" alt="QR">
        <div class="lv-wait-label">Scanne le QR ou entre le code sur <strong>eleve.html</strong></div>
        <div class="lv-wait-count">Élèves connectés : <strong id="lvWaitCount">0</strong></div>
        <div class="lv-wait-chips" id="lvWaitChips"></div>
      </div>

      <!-- Podium (entre questions + fin) -->
      <div id="livePodium">
        <div class="lv-podium-title">Classement</div>
        <div class="lv-podium-subtitle" id="lvPodiumSubtitle"></div>
        <div class="lv-podium-list" id="lvPodiumList"></div>
      </div>

      <div id="liveMain">
        <div id="liveQZone">
          <div id="liveEnonce"></div>
          <div id="liveAnswers"></div>
        </div>
      </div>`;
    document.body.appendChild(overlay);
  }

  function injectButton() {
    const actions = document.querySelector('.preview-actions');
    if (!actions || document.getElementById('btnLive')) return;
    const btn = document.createElement('button');
    btn.id = 'btnLive'; btn.className = 'btn';
    btn.innerHTML = '<span class="live-dot"></span> Classe live';
    btn.onclick = openLiveModal;
    actions.appendChild(btn);
  }

  // ═══════════════════════════════════════════════════════
  // PEERJS
  // ═══════════════════════════════════════════════════════
  function loadPeerJS() {
    if (window.Peer) return Promise.resolve();
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/peerjs@1.5.2/dist/peerjs.min.js';
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  function startPeer() {
    roomCode = generateCode();
    const url = buildStudentUrl();
    const qrSrc = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(url);
    ['ltbCode','lvWaitCode'].forEach(id => { const el = document.getElementById(id); if(el) el.textContent = roomCode; });
    ['lvWaitQr'].forEach(id => { const el = document.getElementById(id); if(el) el.src = qrSrc; });

    const ICE_SERVERS = [
      { urls: 'stun:stun.relay.metered.ca:80' },
      { urls: 'turn:global.relay.metered.ca:80',                    username: 'dc351ba8dd72c358bd06ecfc', credential: '3kzo/j6VBrTYY/bS' },
      { urls: 'turn:global.relay.metered.ca:80?transport=tcp',      username: 'dc351ba8dd72c358bd06ecfc', credential: '3kzo/j6VBrTYY/bS' },
      { urls: 'turn:global.relay.metered.ca:443',                   username: 'dc351ba8dd72c358bd06ecfc', credential: '3kzo/j6VBrTYY/bS' },
      { urls: 'turns:global.relay.metered.ca:443?transport=tcp',    username: 'dc351ba8dd72c358bd06ecfc', credential: '3kzo/j6VBrTYY/bS' },
    ];
    const opts = PEER_SERVER
      ? { host: PEER_SERVER.host, port: PEER_SERVER.port, path: PEER_SERVER.path, config: { iceServers: ICE_SERVERS } }
      : { config: { iceServers: ICE_SERVERS } };
    peer = new Peer('qcm-prof-' + roomCode, opts);
    peer.on('open', () => {
      liveState.active = true; liveState.qIdx = -1;
      const s = getQCMState();
      liveState.totalQ = s ? s.generatedQuestions.length : 0;
      document.getElementById('btnLive').classList.add('live-on');
    });
    peer.on('connection', conn => {
      const student = { conn, name:'?', answers:[], answered:false };
      connections.push(student);
      conn.on('data', msg => handleStudentMsg(student, msg));
      conn.on('close', () => { connections = connections.filter(s => s !== student); refreshStudentsAll(); });
    });
    peer.on('error', e => { if (e.type === 'unavailable-id') { peer.destroy(); peer = null; startPeer(); } });
  }

  function handleStudentMsg(student, msg) {
    if (msg.type === 'hello') {
      student.name = msg.name || 'Élève';
      refreshStudentsAll();
      if (liveState.qIdx >= 0) {
        const s = getQCMState();
        if (s) student.conn.send(buildQMsg(s.generatedQuestions[liveState.qIdx], liveState.qIdx));
      }
    }
    if (msg.type === 'answer') {
      student.answers[liveState.qIdx] = { idx:msg.answerIdx, text:msg.answerText };
      student.answered = true;
      refreshStudentsAll();
      refreshStatsBars(liveState.revealed);
    }
  }

  // ═══════════════════════════════════════════════════════
  // ACTIONS
  // ═══════════════════════════════════════════════════════
  function openLiveModal() {
    const s = getQCMState();
    if (!s || !s.generatedQuestions || !s.generatedQuestions.length) {
      if (typeof showToast === 'function') showToast('Génère d\'abord un QCM avant de lancer la session.');
      else alert('Génère d\'abord un QCM.');
      return;
    }
    loadPeerJS().then(() => {
      if (!peer) startPeer();
      btnstate = 'start';
      const overlay = document.getElementById('liveOverlay');
      overlay.classList.add('open');
      document.getElementById('liveWaitScreen').classList.add('show');
      document.getElementById('liveMain').style.display = 'none';
      refreshStudentsAll();
      buildProgressDots();
    });
  }

  function btnSlide() {
    switch (btnstate) {
      case 'start':
        btnstate = 'question';
        nextQuestion();
        break;
      case 'question':
        btnstate = 'answer';
        revealCurrent();
        break;
      case 'answer':
        if (connections.length > 0) {
        btnstate = 'podium';
        showPodium(false);}
        else{
          btnstate='question';
          nextQuestion();
        }
        break;
      case 'podium':
        btnstate = 'question';
        nextQuestion();
        break;
      case 'end':
        btnstate = 'start';
        closeSessionUI();
        break;
    }
  }

  function nextQuestion() {
    const state = getQCMState();
    liveState.qIdx++;
    liveState.revealed = false;
    if (liveState.qIdx >= liveState.totalQ) { endSession(); return; }

    const q = state.generatedQuestions[liveState.qIdx];
    connections.forEach(s => { s.answered = false; });
    broadcast(buildQMsg(q, liveState.qIdx));

    // Masquer podium/attente, afficher la zone question
    document.getElementById('liveWaitScreen').classList.remove('show');
    document.getElementById('livePodium').classList.remove('show');
    document.getElementById('liveMain').style.display = 'grid';


    renderQuestion(q);
    buildProgressDots();
    refreshStudentsAll();
    refreshStatsBars(false);

    document.getElementById('lvBtnNext').disabled = false;
    updateNextBtn();
  }

  function renderQuestion(q) {
    document.getElementById('lvQnum').textContent =
      'Question ' + (liveState.qIdx + 1) + '/' + liveState.totalQ;

    buildContent(document.getElementById('liveEnonce'), q.enonce);

    const letters = ['A','B','C','D'];
    const cols = Math.min(q.cols || 4, q.reponses.length);
    const grid = document.getElementById('liveAnswers');
    grid.style.gridTemplateColumns = ['1fr','1fr 1fr','1fr 1fr 1fr','1fr 1fr 1fr 1fr'][cols - 1] || '1fr 1fr';
    grid.innerHTML = '';
    q.reponses.forEach((rep, i) => {
      const div = document.createElement('div');
      div.className = 'lv-ans';
      div.dataset.idx = i;
      div.innerHTML = `<div class="lv-ans-letter">${letters[i]}</div>
        <div class="lv-ans-text"></div>`;
      buildContent(div.querySelector('.lv-ans-text'), rep.replace(/%%TIKZ[\s\S]*?%%ENDTIKZ%%/g, ''));
      grid.appendChild(div);
    });

    setTimeout(() => {
      if (window.renderMathInElement)
        renderMathInElement(document.getElementById('liveOverlay'), {
          delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],
          throwOnError:false
        });
    }, 100);

    clearProTimer();
    startProTimer(q.duree || 60);
  }

  function revealCurrent() {
    clearProTimer();
    liveState.revealed = true;
    const state = getQCMState();
    const q = state.generatedQuestions[liveState.qIdx];
    const bonne = q.bonneReponse.replace(/%%TIKZ[\s\S]*?%%ENDTIKZ%%/g, '');
    broadcast({ type:'reveal', bonneReponse:bonne });

    document.querySelectorAll('#liveAnswers .lv-ans').forEach((el, i) => {
      if (q.reponses[i].replace(/%%TIKZ[\s\S]*?%%ENDTIKZ%%/g,'') === bonne)
        el.classList.add('correct');
    });

    refreshStatsBars(true);
    updateNextBtn();
  }

  function endSession() {
    clearProTimer();
    btnstate = 'end';
    // Envoyer les scores finaux aux élèves
    const state = getQCMState();
    connections.forEach(s => {
      let sc = 0;
      if (state) state.generatedQuestions.forEach((q, qi) => {
        const b = q.bonneReponse.replace(/%%TIKZ[\s\S]*?%%ENDTIKZ%%/g,'');
        if (s.answers[qi] && s.answers[qi].text === b) sc++;
      });
      s.conn.send({ type:'end', score:sc, total:liveState.totalQ });
    });
    // Afficher le podium final seulement s'il y a des élèves, sinon fermer directement
    if (connections.length > 0) {
      showPodium(true);
    } else {
      closeSessionUI();
    }
  }

  // ═══════════════════════════════════════════════════════
  // TIMER
  // ═══════════════════════════════════════════════════════
  function startProTimer(duree) {
    liveState.timerRemaining = duree;
    updateTimerUI(duree, duree);
    liveState.timerInterval = setInterval(() => {
      liveState.timerRemaining--;
      updateTimerUI(liveState.timerRemaining, duree);
      if (liveState.timerRemaining <= 0) { clearProTimer(); revealCurrent(); btnstate = 'answer'; }
    }, 1000);
  }

  function updateTimerUI(rem, total) {
    const pct = Math.max(0, rem / total * 100);
    const fill = document.getElementById('lvTimerFill');
    const label = document.getElementById('lvTimerLabel');
    const big = document.getElementById('lspTimer');
    if (fill) { fill.style.width = pct + '%'; fill.className = 'lv-timer-fill' + (rem <= 5 ? ' low' : ''); }
    if (label) label.textContent = rem + 's';
    if (big) { big.textContent = rem + 's'; big.className = 'lsp-timer-big' + (rem <= 5 ? ' low' : ''); }
  }

  function clearProTimer() {
    clearInterval(liveState.timerInterval);
    liveState.timerInterval = null;
  }

  // ═══════════════════════════════════════════════════════
  // STATS & TOP 5
  // ═══════════════════════════════════════════════════════
  function refreshStatsBars(reveal = false) {
    const state = getQCMState();
    if (!state || liveState.qIdx < 0) return;

    // Compteur de réponses
    const answered = connections.filter(s => s.answers[liveState.qIdx] !== undefined);
    const answeredEl = document.getElementById('lspAnswered');
    if (answeredEl) answeredEl.textContent = 'responses ' + answered.length + '/' + connections.length;
  }

  function computeScore(student, state, upToQ) {
    let sc = 0;
    for (let qi = 0; qi <= upToQ && qi < state.generatedQuestions.length; qi++) {
      const q = state.generatedQuestions[qi];
      const bonne = q.bonneReponse.replace(/%%TIKZ[\s\S]*?%%ENDTIKZ%%/g, '');
      if (student.answers[qi] && student.answers[qi].text === bonne) sc++;
    }
    return sc;
  }

  function closeSessionUI() {
    if (peer) { peer.destroy(); peer = null; }
    connections = [];
    liveState = { active:false, qIdx:-1, totalQ:0, timerInterval:null, timerRemaining:0, revealed:false };
    btnstate = 'start';
    document.getElementById('btnLive').classList.remove('live-on');
    document.getElementById('liveOverlay').classList.remove('open');
    document.getElementById('liveWaitScreen').classList.remove('show');
    document.getElementById('livePodium').classList.remove('show');
    document.getElementById('liveMain').style.display = 'none';
    document.getElementById('lspAnswered').textContent='';
    document.getElementById('lspTimer').textContent='';
    document.getElementById('lvQnum').textContent='';
    document.getElementById('lvBtnNext').textContent='Suivant';
    if (typeof showToast === 'function') showToast('Session terminée.');
  }

  function showPodium(isFinal) {
    const state = getQCMState();
    if (!state || !connections.length) return;

    document.getElementById('liveMain').style.display = 'none';
    document.getElementById('liveWaitScreen').classList.remove('show');


    const upTo = liveState.qIdx;
    const ranked = connections
      .map(s => ({ name: s.name, score: computeScore(s, state, upTo) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const medals = ['1','2','3','4','5'];
    const subtitle = isFinal
      ? 'Classement final'
      : `Après la question ${upTo + 1} / ${liveState.totalQ}`;

    document.getElementById('lvPodiumSubtitle').textContent = subtitle;

    const list = document.getElementById('lvPodiumList');
    list.innerHTML = ranked.map((s, i) => `
      <div class="lv-podium-row">
        <div class="lv-podium-medal">${medals[i]}</div>
        <div class="lv-podium-name">${escHtml(s.name)}</div>
        <div class="lv-podium-score">${s.score}/${upTo + 1}</div>
      </div>`).join('');
    document.getElementById('livePodium').classList.add('show');
  }

  // ═══════════════════════════════════════════════════════
  // ÉLÈVES
  // ═══════════════════════════════════════════════════════
  function refreshStudentsAll() {
    const count = connections.length;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('ltbCount', count); set('lvWaitCount', count);

    const lvWaitChips = document.getElementById('lvWaitChips');
    if (lvWaitChips) lvWaitChips.innerHTML = connections.map(s =>
      `<div class="lv-wait-chip">${escHtml(s.name)}</div>`).join('');
  }

  // ═══════════════════════════════════════════════════════
  // UTILITAIRES
  // ═══════════════════════════════════════════════════════
  function buildProgressDots() {
    const el = document.getElementById('lvProgress');
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < liveState.totalQ; i++) {
      const d = document.createElement('div');
      d.className = 'lv-pdot' + (i < liveState.qIdx ? ' done' : i === liveState.qIdx ? ' active' : '');
      el.appendChild(d);
    }
  }

  function updateNextBtn() {
    const btn = document.getElementById('lvBtnNext');
    if (!btn ) return;
    const next = liveState.qIdx + 1;
    btn.textContent = next >= liveState.totalQ && btnstate==='end' ? 'Terminer' : 'Suivante';
  }

  function broadcast(msg) {
    connections.forEach(s => { if (s.conn && s.conn.open) s.conn.send(msg); });
  }

  function buildQMsg(q, idx) {
    return {
      type:'question', index:idx, total:liveState.totalQ,
      enonce: q.enonce.replace(/%%TIKZ[\s\S]*?%%ENDTIKZ%%/g,''),
      reponses: q.reponses.map(r => r.replace(/%%TIKZ[\s\S]*?%%ENDTIKZ%%/g,'')),
      bonneReponse: q.bonneReponse.replace(/%%TIKZ[\s\S]*?%%ENDTIKZ%%/g,''),
      duree: q.duree || 60,
    };
  }

  function buildStudentUrl() {
    return location.origin + location.pathname.replace(/[^/]*$/, '') + STUDENT_PAGE + '?code=' + roomCode;
  }

  function generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({length:6}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
  }

  function getQCMState() {
    try { return window.state || (typeof state !== 'undefined' ? state : null); } catch(e) { return null; }
  }

  function copyLink() {
    navigator.clipboard.writeText(buildStudentUrl()).then(() => { if (typeof showToast==='function') showToast('Lien copié !'); });
  }

  function copyCode() {
    navigator.clipboard.writeText(roomCode).then(() => { if (typeof showToast==='function') showToast('Code copié !'); });
  }

  function escHtml(str) {
    return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function buildContent(container, str) {
    container.innerHTML = '';
    if (typeof str !== 'string') { container.textContent = String(str); return; }
    const parts = str.split(/(%%SVG[\s\S]*?%%ENDSVG%%(?:\s*%%TIKZ[\s\S]*?%%ENDTIKZ%%)?|%%TIKZ[\s\S]*?%%ENDTIKZ%%)/);
    parts.forEach(part => {
      if (part.startsWith('%%SVG')) {
        const svg = part.replace(/^%%SVG/,'').replace(/%%ENDSVG%%[\s\S]*$/,'').trim();
        const w = document.createElement('div'); w.className='fig-wrap'; w.innerHTML=svg;
        container.appendChild(w);
      } else if (!part.startsWith('%%TIKZ') && part) {
        const span = document.createElement('span');
        span.innerHTML = part.replace(/((\$\$[\s\S]*?\$\$)|(\$[^$]*?\$))|(\\\\\s*)/g,
          (m,math,d,i,br) => math ? math : br ? '<br>' : m);
        if (window.renderMathInElement) renderMathInElement(span, {delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false});
        container.appendChild(span);
      }
    });
  }

  // ═══════════════════════════════════════════════════════
  // API PUBLIQUE + INIT
  // ═══════════════════════════════════════════════════════
  window.LiveQuiz = { openLiveModal, nextQuestion, revealCurrent, endSession, btnSlide, copyLink, copyCode };

  function init() {
    injectHTML();
    const tryBtn = () => {
      if (document.querySelector('.preview-actions')) injectButton();
      else setTimeout(tryBtn, 200);
    };
    tryBtn();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();