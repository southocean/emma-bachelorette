(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const byId = Object.fromEntries(PLACES.map(p => [p.id, p]));
  const DAYC = { fri: 'var(--fri)', sat: 'var(--sat)', sun: 'var(--sun)' };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const isPhone = () => matchMedia('(max-width: 820px)').matches;

  // ── distance ───────────────────────────────────────────
  function metres(a, b) {
    const R = 6371e3, r = Math.PI / 180;
    const dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function howFar(a, b) {
    if (a.id === b.id) return 'same place';
    const isl = x => x.id === 'suomenlinna';
    if (isl(a) !== isl(b)) return 'ferry from Market Square (~15 min) + walking';
    const m = metres(a, b) * 1.3; // streets are not straight lines
    if (m > 12000) return `${(m / 1000).toFixed(0)} km: train or bus`;
    const walk = Math.round(m / 80); // ~4.8 km/h
    if (walk <= 25) return `${walk} min walk (${(m / 1000).toFixed(1)} km)`;
    return `${walk} min walk, or ~${Math.max(8, Math.round(walk / 3))} min by tram/bus (${(m / 1000).toFixed(1)} km)`;
  }

  // ── map ────────────────────────────────────────────────
  const map = L.map('map', { zoomControl: false, attributionControl: true }).setView([60.1699, 24.9384], 13);
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, className: 'osm',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const markers = {};
  const planIndex = {}; // id -> [{day, n}]
  Object.entries(PLAN).forEach(([day, d]) => {
    let n = 0;
    d.steps.forEach(s => { if (s.place) { n++; (planIndex[s.place] ||= []).push({ day, n }); } });
  });

  function iconFor(p, day) {
    const hits = planIndex[p.id] || [];
    const hit = hits.find(h => h.day === day) || null;
    if (hit) {
      const nums = hits.filter(h => h.day === day).map(h => h.n).join('·');
      return L.divIcon({ className: '', html: `<div class="pin" style="background:${DAYC[day]}">${nums}</div>`, iconSize: [30, 30], iconAnchor: [15, 15] });
    }
    const color = hits.length ? DAYC[hits[0].day] : CATS[p.cat].color;
    return L.divIcon({ className: '', html: `<div class="dot" style="background:${color}"></div>`, iconSize: [16, 16], iconAnchor: [8, 8] });
  }

  PLACES.forEach(p => {
    const m = L.marker([p.lat, p.lng], { icon: iconFor(p, 'sat'), riseOnHover: true })
      // pins near the top would put the tooltip under the filter chips, so open those downwards
      .on('mouseover', () => {
        const low = map.latLngToContainerPoint(m.getLatLng()).y < 190;
        Object.assign(m.getTooltip().options, low ? { direction: 'bottom', offset: [0, 12] } : { direction: 'top', offset: [0, -12] });
      })
      .bindTooltip(`<b>${esc(p.name)}</b>${esc(p.hook)}<br><span class="c">${esc(p.cost)}</span>`,
        { className: 'tip', direction: 'top', offset: [0, -12], opacity: 1 })
      .on('click', () => select(p.id, { fly: false }));
    markers[p.id] = m;
  });

  // ── filters ────────────────────────────────────────────
  const on = Object.fromEntries(Object.keys(CATS).map(k => [k, true]));
  const fEl = $('#filters');
  fEl.innerHTML = Object.entries(CATS).map(([k, c]) =>
    `<button data-cat="${k}" aria-pressed="true"><i style="background:${c.color}"></i>${esc(c.label)}</button>`).join('');
  fEl.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    on[b.dataset.cat] = !on[b.dataset.cat];
    b.setAttribute('aria-pressed', on[b.dataset.cat]);
    drawMarkers();
  });

  let day = 'sat';
  let route;
  function drawMarkers() {
    PLACES.forEach(p => {
      const inDay = (planIndex[p.id] || []).some(h => h.day === day);
      const show = inDay || on[p.cat];
      const m = markers[p.id];
      m.setIcon(iconFor(p, day));
      m.setZIndexOffset(inDay ? 1000 : 0);
      if (show) m.addTo(map); else m.remove();
    });
    if (sel && markers[sel]) markers[sel].getElement()?.classList.add('sel');
  }

  function drawRoute() {
    if (route) route.remove();
    const pts = [];
    PLAN[day].steps.forEach(s => {
      if (!s.place || s.place === 'airport') return;
      const p = byId[s.place];
      const last = pts[pts.length - 1];
      if (last && last.id === 'suomenlinna') pts.push(byId.ferry); // the ferry back
      if (!last || last.id !== p.id) pts.push(p);
    });
    route = L.polyline(pts.map(p => [p.lat, p.lng]), {
      color: getComputedStyle(document.documentElement).getPropertyValue(`--${day}`).trim() || '#c2417a',
      weight: 3, opacity: .75, dashArray: '2 8', lineCap: 'round',
    }).addTo(map);
    const fit = pts.length > 1 ? pts : pts.concat(byId.station);
    map.fitBounds(L.latLngBounds(fit.map(p => [p.lat, p.lng])), {
      paddingTopLeft: [30, 70], paddingBottomRight: [30, isPhone() ? 30 : 30], maxZoom: 15,
    });
  }

  // ── detail card ────────────────────────────────────────
  let sel = null;
  let origin = null;
  const dEl = $('#detail');
  function select(id, { fly = true } = {}) {
    const p = byId[id]; if (!p) return;
    if (sel && markers[sel]) markers[sel].getElement()?.classList.remove('sel');
    sel = id;
    const m = markers[id];
    if (!m._map) m.addTo(map);
    m.getElement()?.classList.add('sel');

    const hits = planIndex[id] || [];
    const kick = hits.length
      ? hits.map(h => `<span style="color:${DAYC[h.day]}">${PLAN[h.day].label} · stop ${h.n}</span>`).join(' &nbsp; ')
      : `<span style="color:${CATS[p.cat].color}">${esc(CATS[p.cat].label)} · alternative</span>`;
    const energy = '●'.repeat(p.energy) + '○'.repeat(3 - p.energy);
    const from = origin && origin !== id ? byId[origin] : null;
    dEl.innerHTML = `
      <button class="x" aria-label="Close">✕</button>
      <div class="kick">${kick}</div>
      <h2>${esc(p.name)}</h2>
      <p class="hook">${esc(p.hook)}</p>
      <dl class="facts">
        <div><dt>Budget / person</dt><dd>${esc(p.cost)}</dd></div>
        <div><dt>Time</dt><dd>${esc(p.time)}</dd></div>
        <div><dt>Energy</dt><dd class="energy" title="${p.energy} of 3">${energy}</dd></div>
      </dl>
      ${from ? `<div class="dist">From <b>${esc(from.name)}</b>: ${howFar(from, p)}</div>` : ''}
      <p>${esc(p.what)}</p>
      ${p.tips.length ? `<ul>${p.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <div class="actions">
        <a class="primary" href="https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}" target="_blank" rel="noopener">Open in Maps</a>
        <button data-origin>${origin === id ? '✓ Measuring from here' : 'Measure distances from here'}</button>
        ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">Website ↗</a>` : ''}
      </div>`;
    dEl.hidden = false;
    dEl.scrollTop = 0;
    reveal(p, fly);
    $('.x', dEl).onclick = closeDetail;
    $('[data-origin]', dEl).onclick = () => { origin = origin === id ? null : id; select(id, { fly: false }); };
  }
  // Keep the chosen place visible beside the card instead of underneath it.
  function reveal(p, fly) {
    const z = fly ? Math.max(map.getZoom(), 15) : map.getZoom();
    const size = map.getSize();
    const card = dEl.getBoundingClientRect(), mapBox = map.getContainer().getBoundingClientRect();
    // the free area of the map: to the left of the card on wide screens, above it on phones
    const wide = !isPhone();
    const free = wide
      ? { x: (card.left - mapBox.left) / 2, y: size.y / 2 }
      : { x: size.x / 2, y: (card.top - mapBox.top + 44) / 2 };
    const pt = map.project([p.lat, p.lng], z);
    const inView = map.latLngToContainerPoint([p.lat, p.lng]);
    const covered = wide ? inView.x > card.left - mapBox.left - 20 : inView.y > card.top - mapBox.top - 20;
    if (!fly && !covered && inView.x > 0 && inView.y > 50) return;
    const centre = map.unproject(pt.subtract([free.x - size.x / 2, free.y - size.y / 2]), z);
    map.flyTo(centre, z, { duration: .6 });
  }
  function closeDetail() {
    dEl.hidden = true;
    if (sel && markers[sel]) markers[sel].getElement()?.classList.remove('sel');
    sel = null;
  }
  map.on('click', closeDetail);
  addEventListener('keydown', e => { if (e.key === 'Escape' && !dEl.hidden) closeDetail(); });

  function focusPlace(id) {
    select(id);
    if (isPhone()) scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── plan tab ───────────────────────────────────────────
  const daysEl = $('#days');
  daysEl.innerHTML = Object.entries(PLAN).map(([k, d]) =>
    `<button data-day="${k}" style="--dc:${DAYC[k]}" aria-pressed="${k === day}"><b>${esc(d.label)}</b><span>${esc(d.title)}</span></button>`).join('');
  daysEl.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    setDay(b.dataset.day);
  });

  function dayCost(k) {
    const seen = new Set(); let sum = 0;
    PLAN[k].steps.forEach(s => { if (s.place && !seen.has(s.place)) { seen.add(s.place); sum += byId[s.place].costPP; } });
    return sum;
  }

  function renderDay() {
    const d = PLAN[day];
    let n = 0, prev = null;
    const items = d.steps.map(s => {
      const p = s.place ? byId[s.place] : null;
      let walk = '';
      if (p && prev && prev.id !== p.id && p.id !== 'airport') walk = `<div class="walk">↓ ${howFar(prev, p)}</div>`;
      if (p) { n++; prev = p; }
      const inner = `
        <span class="row1"><span class="t">${esc(s.t)}</span>${p ? `<span class="c">${esc(p.cost)}</span>` : ''}</span>
        ${p ? `<span class="n">${esc(p.name)}</span>` : ''}
        <span class="d">${esc(s.do)}</span>`;
      return `${walk}<li class="step">
        <span class="num ${p ? '' : 'free'}">${p ? n : '·'}</span>
        ${p ? `<button class="body" data-place="${p.id}">${inner}</button>` : `<div class="body">${inner}</div>`}
      </li>`;
    }).join('');
    $('#dayView').innerHTML = `
      <div style="--dc:${DAYC[day]}">
        <h2 class="daytitle">${esc(d.title)}</h2>
        <p class="daynote">${esc(d.note)} <b>≈ €${Math.round(dayCost(day))} each.</b></p>
        <ol class="steps">${items}</ol>
      </div>`;
  }
  $('#dayView').addEventListener('click', e => {
    const b = e.target.closest('[data-place]'); if (b) focusPlace(b.dataset.place);
  });

  function setDay(k) {
    day = k;
    daysEl.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.day === k));
    renderDay(); drawMarkers(); drawRoute(); closeDetail();
  }

  // ── moments ────────────────────────────────────────────
  $('#moments').innerHTML = MOMENTS.map(m => `
    <button class="moment" ${m.where ? `data-place="${m.where}"` : ''}>
      <span class="row1"><b>${esc(m.name)}</b><span class="c">${esc(m.cost)}</span></span>
      <p>${esc(m.how)}</p>
    </button>`).join('');
  $('#moments').addEventListener('click', e => {
    const b = e.target.closest('[data-place]'); if (b) focusPlace(b.dataset.place);
  });

  // ── bingo ──────────────────────────────────────────────
  function newCard() {
    const a = BINGO.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return { cells: a.slice(0, 16), hit: [] };
  }
  let card = store.get('emma_bingo', null);
  if (!card || !Array.isArray(card.cells) || card.cells.length !== 16) card = newCard();
  const lines = [];
  for (let i = 0; i < 4; i++) {
    lines.push([0, 1, 2, 3].map(j => i * 4 + j), [0, 1, 2, 3].map(j => j * 4 + i));
  }
  lines.push([0, 5, 10, 15], [3, 6, 9, 12]);
  function renderBingo(celebrate) {
    const hit = new Set(card.hit);
    const won = lines.filter(l => l.every(i => hit.has(i)));
    const winCells = new Set(won.flat());
    $('#bingo').innerHTML = card.cells.map((c, i) =>
      `<button data-i="${i}" aria-pressed="${hit.has(i)}" class="${winCells.has(i) ? 'win' : ''}">${esc(c)}</button>`).join('');
    if (celebrate != null && won.length > celebrate) confetti();
    return won.length;
  }
  let wins = renderBingo(null);
  $('#bingo').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const i = +b.dataset.i;
    card.hit = card.hit.includes(i) ? card.hit.filter(x => x !== i) : card.hit.concat(i);
    store.set('emma_bingo', card);
    wins = renderBingo(wins) ;
  });
  $('#bingoReset').onclick = () => { card = newCard(); store.set('emma_bingo', card); wins = renderBingo(null); };

  // ── budget ─────────────────────────────────────────────
  function renderBudget() {
    let total = 0;
    const rows = Object.entries(PLAN).map(([k, d]) => {
      const seen = new Set();
      const parts = [];
      d.steps.forEach(s => {
        if (!s.place || seen.has(s.place)) return;
        seen.add(s.place);
        const p = byId[s.place];
        if (p.costPP) parts.push(`${p.name.split(' — ')[0].split(' (')[0]} €${p.costPP}`);
      });
      const c = dayCost(k); total += c;
      return `<tr><td><b>${esc(d.label)}</b><div class="sub">${esc(parts.join(' · '))}</div></td><td>€${Math.round(c)}</td></tr>`;
    }).join('');
    $('#budget').innerHTML = `
      <p class="lede">Per person, using the middle of each price range. Flights and accommodation are not included.</p>
      <table class="btable">
        <thead><tr><th>Day</th><th>Each</th></tr></thead>
        <tbody>${rows}</tbody>
        <tfoot><tr><td>Whole trip</td><td>≈ €${Math.round(total)}</td></tr></tfoot>
      </table>
      <div class="callout"><strong>Where the money goes:</strong> the buffet, the sauna and the karaoke drinks are about half of it. Everything that makes the trip memorable (the spray, the merch, the dance video, the letters, the bingo) costs almost nothing.</div>
      <p class="fine"><b>Cheaper still:</b> swap Kotiharju for the free Sompasauna (−€20), make the karaoke a pre-drinks-at-home night (−€10), and have breakfast at home both days. <b>Treat Emma:</b> the others split her share of the buffet and sauna (≈ €17 each).</p>
      <p class="fine"><b>Remember:</b> Alko (the only shop for wine) is closed on Sunday. Buy the bubbles by Saturday 18:00.</p>`;
  }

  // ── tabs ───────────────────────────────────────────────
  const tabs = $('.tabs');
  function showTab(name) {
    tabs.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === name));
    document.querySelectorAll('.panel').forEach(p => { p.hidden = p.id !== `panel-${name}`; });
    store.set('emma_tab', name);
  }
  tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) showTab(b.dataset.tab); });

  // ── confetti ───────────────────────────────────────────
  function confetti() {
    const cv = $('#confetti'), ctx = cv.getContext('2d');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    const cols = ['#c2417a', '#d9b35f', '#2b8fb3', '#3f9c6d', '#f6c1cf', '#ffffff'];
    const bits = Array.from({ length: 160 }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * .35,
      vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, r: Math.random() * 6 + 3,
      c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6, va: (Math.random() - .5) * .3,
    }));
    let t = 0;
    (function tick() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      bits.forEach(b => {
        b.vy += .35; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.a += b.va;
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.fillStyle = b.c;
        ctx.fillRect(-b.r / 2, -b.r / 4, b.r, b.r / 2); ctx.restore();
      });
      if (++t < 150) requestAnimationFrame(tick); else ctx.clearRect(0, 0, innerWidth, innerHeight);
    })();
  }

  // ── the admin gate ─────────────────────────────────────
  // Same shape as the Callback CV: tap the logo 11 times (numbers start falling on the
  // 4th tap), and the 11th opens a "security question". The question is a decoy:
  // answering it right earns applause and a roast. The door opens for one word the
  // dialog never asks for — konami — or for the Konami code itself on a keyboard.
  const GATE_WORD = 'konami';
  const DECOYS = [
    { q: 'How many of us are going to Helsinki?', a: ['4', 'four'] },
    { q: 'In what year did the Helsinki Baltic Herring Market start?', a: ['1743'] },
    { q: 'What is the Finnish word for a bachelorette party?', a: ['polttarit'] },
    { q: 'How many steel pipes make up the Sibelius Monument?', a: ['600', 'six hundred'] },
    { q: 'What do Finns say instead of "cheers"?', a: ['kippis'] },
    { q: 'What is 7 × 8?', a: ['56', 'fifty six', 'fifty-six'] },
  ];
  const WRONG = [
    'Wrong. Emma would have got that one, and she is three proseccos in.',
    'No. The herring knew that. The HERRING.',
    'Incorrect. Please return to the karaoke queue.',
    'That is not it. Bold of you to try, though.',
    'Nope. Somewhere in Kallio, a Finn just sighed.',
  ];
  const RIGHT = [
    'Correct! Gold star! …Also, that is not the password. You really thought the secret files were guarded by a pub quiz?',
    'Right answer! Wrong door. A trivia question is not a lock, darling.',
    'Correct, and completely useless. The password was never the question.',
  ];
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const norm = s => s.trim().toLowerCase().replace(/\s+/g, ' ');

  let taps = 0, tapTimer;
  const logo = $('#logo');
  logo.addEventListener('click', e => {
    if (isAdmin()) { showTab('secret'); return; }
    taps++;
    clearTimeout(tapTimer); tapTimer = setTimeout(() => { taps = 0; }, 2500);
    if (taps >= 4) {
      const f = document.createElement('span');
      f.className = 'fall'; f.textContent = taps;
      const r = logo.getBoundingClientRect();
      f.style.left = (e.clientX || r.left + r.width / 2) - 8 + 'px';
      f.style.top = (e.clientY || r.top + r.height / 2) - 10 + 'px';
      f.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
      f.style.setProperty('--r', (Math.random() * 90 - 45) + 'deg');
      document.body.appendChild(f);
      setTimeout(() => f.remove(), 1200);
    }
    if (taps >= 11) { taps = 0; openGate(); }
  });

  const gate = $('#gate');
  let decoy;
  function openGate() {
    decoy = pick(DECOYS);
    $('#gateQ').textContent = decoy.q;
    $('#gateA').value = '';
    $('#gateMsg').textContent = ''; $('#gateMsg').className = 'gate-msg';
    gate.showModal();
    setTimeout(() => $('#gateA').focus(), 50);
  }
  $('#gateForm').addEventListener('submit', e => {
    if (e.submitter && e.submitter.value === 'cancel') return;
    e.preventDefault();
    const a = norm($('#gateA').value);
    const msg = $('#gateMsg');
    if (!a) return;
    if (a === GATE_WORD) { gate.close(); unlock(); return; }
    if (decoy.a.includes(a)) { msg.textContent = pick(RIGHT); msg.className = 'gate-msg'; }
    else { msg.textContent = pick(WRONG); msg.className = 'gate-msg bad'; gate.classList.remove('shake'); void gate.offsetWidth; gate.classList.add('shake'); }
    $('#gateA').select();
  });

  const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let ki = 0;
  addEventListener('keydown', e => {
    if (e.target.matches && e.target.matches('input, textarea')) return;
    const k = e.key.toLowerCase();
    if (k === KONAMI[ki]) { if (++ki === KONAMI.length) { ki = 0; unlock(); } }
    else ki = k === KONAMI[0] ? 1 : 0;
  });

  function isAdmin() { try { return sessionStorage.getItem('emma_admin') === '1'; } catch { return false; } }
  function decode() {
    const bin = atob(window.ADMIN_BLOB || '');
    const key = new TextEncoder().encode(GATE_WORD);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i) ^ key[i % key.length];
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  function unlock(quiet) {
    let data;
    try { data = decode(); } catch { return; }
    try { sessionStorage.setItem('emma_admin', '1'); } catch {}
    $('#secret').innerHTML = `
      <p class="lede">${esc(data.intro)}</p>
      ${data.items.map(t => `
        <div class="trad ${t.picked ? 'picked' : ''}">
          <h3>${esc(t.name)}${t.picked ? '<span class="badge">in the plan</span>' : ''}</h3>
          <div class="meta">${esc(t.where)} · ${esc(t.age)}</div>
          <p>${esc(t.what)}</p>
          <p class="how"><b>In Helsinki:</b> ${esc(t.helsinki)}</p>
        </div>`).join('')}
      <button class="ghost" id="lock">Lock again</button>`;
    $('#lock').onclick = () => {
      try { sessionStorage.removeItem('emma_admin'); } catch {}
      $('#secretTab').hidden = true; $('#secret').innerHTML = ''; showTab('plan');
    };
    $('#secretTab').hidden = false;
    if (!quiet) { showTab('secret'); confetti(); }
  }

  // ── light / dark ───────────────────────────────────────
  const themeBtn = $('#theme');
  const sysDark = matchMedia('(prefers-color-scheme: dark)');
  const current = () => document.documentElement.dataset.theme || (sysDark.matches ? 'dark' : 'light');
  function paintTheme() {
    const d = current() === 'dark';
    themeBtn.textContent = d ? '☀️' : '🌙';
    themeBtn.title = d ? 'Light mode' : 'Dark mode';
  }
  themeBtn.onclick = () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    store.set('emma_theme', next);
    paintTheme();
    route?.setStyle({ color: getComputedStyle(document.documentElement).getPropertyValue(`--${day}`).trim() });
  };
  sysDark.addEventListener?.('change', paintTheme);
  paintTheme();

  // ── boot ───────────────────────────────────────────────
  renderBudget();
  setDay('sat');
  if (isAdmin()) unlock(true);
  const t = store.get('emma_tab', 'plan');
  showTab(t === 'secret' && !isAdmin() ? 'plan' : t);
})();
