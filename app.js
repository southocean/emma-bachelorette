(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const byId = Object.fromEntries(PLACES.map(p => [p.id, p]));
  // day colours go through --d-*, so secret mode can repaint every day blue in one place
  const DAYC = { fri: 'var(--d-fri)', sat: 'var(--d-sat)', sun: 'var(--d-sun)' };
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
  const walkMin = (a, b) => Math.round(metres(a, b) * 1.3 / 80);
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
  // P is the plan on screen: the public PLAN, or Nam's secret plan when admin mode has it on.
  // Surprise places from the secret plan only exist on the map while it is on.
  let P = PLAN, secretOn = false, secretPlaces = [];
  const allPlaces = () => secretOn ? PLACES.concat(secretPlaces) : PLACES;
  const planIndex = {}; // activity id -> [{day, n}]
  const goIndex = {};   // logistics place id -> [day]
  function indexPlan() {
    for (const k in planIndex) delete planIndex[k];
    for (const k in goIndex) delete goIndex[k];
    Object.entries(P).forEach(([day, d]) => {
      let n = 0;
      d.steps.forEach(s => {
        if (s.act && byId[s.act]) { n++; (planIndex[s.act] ||= []).push({ day, n }); }
        else if (s.go && s.place) (goIndex[s.place] ||= []).includes(day) || goIndex[s.place].push(day);
      });
    });
  }
  indexPlan();
  // transit directions for a transfer card: from its start activity to its end one
  const GDIR = p => { const f = byId[p.from], t = byId[p.to]; return f && t ? `https://www.google.com/maps/dir/?api=1&origin=${f.lat},${f.lng}&destination=${t.lat},${t.lng}&travelmode=transit` : 'https://www.google.com/maps'; };
  const GMAP = p => `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`;
  const PIN_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"/></svg>';

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

  function addMarker(p) {
    const m = L.marker([p.lat, p.lng], { icon: iconFor(p, 'sat'), riseOnHover: true })
      // pins near the top would put the tooltip under the filter chips, so open those downwards
      .on('mouseover', () => {
        const low = map.latLngToContainerPoint(m.getLatLng()).y < (isPhone() ? 170 : 120);
        Object.assign(m.getTooltip().options, low ? { direction: 'bottom', offset: [0, 12] } : { direction: 'top', offset: [0, -12] });
      })
      .bindTooltip(`<b>${esc(p.name)}</b>${p.venue ? `<span class="v">${esc(p.venue)}</span>` : ''}${esc(p.hook)}<br><span class="c">${esc(p.cost)}</span>`,
        { className: 'tip', direction: 'top', offset: [0, -12], opacity: 1 })
      .on('click', () => select(p.id, { fly: false }));
    markers[p.id] = m;
  }
  PLACES.filter(p => !p.virtual).forEach(addMarker);

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
    secretPlaces.forEach(p => { if (!secretOn) markers[p.id].remove(); });
    allPlaces().filter(p => markers[p.id]).forEach(p => {
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
    P[day].steps.forEach(s => {
      const id = s.act || (s.go && s.place !== 'airport' ? s.place : null);
      if (!id || !byId[id] || byId[id].virtual) return;
      const p = byId[id], last = pts[pts.length - 1];
      if (!last || last.id !== p.id) pts.push(p);
    });
    route = pts.length > 1 ? L.polyline(pts.map(p => [p.lat, p.lng]), {
      color: getComputedStyle(document.documentElement).getPropertyValue(`--d-${day}`).trim() || '#c2417a',
      weight: 3, opacity: .75, dashArray: '2 8', lineCap: 'round',
    }).addTo(map) : null;
    const top = isPhone() ? 110 : 72; // clear the search box and the day bar; the chips sit at the bottom
    if (pts.length > 1) map.fitBounds(L.latLngBounds(pts.map(p => [p.lat, p.lng])), { paddingTopLeft: [30, top], paddingBottomRight: [30, 60], maxZoom: 15 });
    else map.setView([60.1699, 24.9384], 13);
  }

  // ── detail card ────────────────────────────────────────
  let sel = null;
  let origin = null;
  let viaSearch = false; // was the open card picked from the search list?
  const dEl = $('#detail');
  function select(id, { fly = true, fromSearch = false } = {}) {
    const p = byId[id]; if (!p) return;
    viaSearch = fromSearch;
    closeResults();
    if (sel && markers[sel]) markers[sel].getElement()?.classList.remove('sel');
    sel = id;
    const m = markers[id];
    if (m) { if (!m._map) m.addTo(map); m.getElement()?.classList.add('sel'); }

    const hits = planIndex[id] || [];
    const gos = goIndex[id] || [];
    const kick = hits.length
      ? hits.map(h => `<span style="color:${DAYC[h.day]}">${P[h.day].label} · stop ${h.n}</span>`).join(' &nbsp; ')
      : gos.length
        ? gos.map(d => `<span style="color:${DAYC[d]}">${P[d].label} · on the way</span>`).join(' &nbsp; ')
        : `<span style="color:${CATS[p.cat].color}">${esc(CATS[p.cat].label)} · alternative</span>`;
    const energy = '●'.repeat(p.energy) + '○'.repeat(3 - p.energy);
    const from = origin && origin !== id ? byId[origin] : null;
    dEl.innerHTML = `
      <button class="x" aria-label="Close">✕</button>
      <div class="kick">${kick}</div>
      <h2>${esc(p.name)}</h2>
      ${p.venue ? `<p class="venue">${PIN_SVG}${esc(p.venue)}</p>` : ''}
      <p class="hook">${esc(p.hook)}</p>
      <dl class="facts">
        <div><dt>Budget / person</dt><dd>${esc(p.cost)}</dd></div>
        <div><dt>Time</dt><dd>${esc(p.time)}</dd></div>
        <div><dt>Energy</dt><dd class="energy" title="${p.energy} of 3">${energy}</dd></div>
      </dl>
      ${from ? `<div class="dist">From <b>${esc(from.name)}</b>: ${howFar(from, p)}</div>` : ''}
      ${p.what ? `<p class="what">${esc(p.what)}</p>` : ''}
      ${cardBlocks(p)}
      ${p.tips.length ? `<ul class="tips">${p.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <div class="actions">
        <a class="primary" href="${p.virtual ? GDIR(p) : GMAP(p)}" target="_blank" rel="noopener">${p.virtual ? 'Directions in Maps' : 'Open in Maps'}</a>
        ${p.virtual ? '' : `<button data-origin>${origin === id ? '✓ Measuring from here' : 'Measure distances from here'}</button>`}
        ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">Website ↗</a>` : ''}
      </div>`;
    dEl.style.setProperty('--dc', DAYC[day]);
    dEl.hidden = false;
    dEl.scrollTop = 0;
    reveal(p, fly);
    markActive(id);
    $('.x', dEl).onclick = dismissCard;
    if ($('[data-origin]', dEl)) $('[data-origin]', dEl).onclick = () => { origin = origin === id ? null : id; select(id, { fly: false, fromSearch: viaSearch }); };
  }
  // ── card blocks: the structured parts of a place, drawn instead of written ──
  const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const MODE_COL = { train: '#8c4799', metro: '#ff6319', tram: '#00985f', bus: '#007ac9', ferry: '#00b9e4' };
  const MODE_IC = { train: '🚆', metro: 'Ⓜ', tram: '🚊', bus: '🚌', ferry: '⛴' };
  const DAYNAME = { fri: 'Fri', sat: 'Sat', sun: 'Sun' };
  // when we are at this place on a given day: from its step to the next step in the plan
  function visitOn(id, d) {
    const steps = (P[d] || { steps: [] }).steps;
    const i = steps.findIndex(s => s.act === id || (s.go && s.place === id));
    if (i < 0 || !/^\d/.test(steps[i].t)) return null;
    const next = steps.slice(i + 1).find(s => /^\d/.test(s.t));
    const from = toMin(steps[i].t), to = next ? toMin(next.t) : from + 60;
    return [from, to > from ? to : from + 60];
  }
  function cardBlocks(p) {
    let h = '';
    if (p.journey) h += `<div class="journey">${p.journey.map(([ic, l, sub], i) =>
      `${i ? '<span class="j-arrow" aria-hidden="true">→</span>' : ''}<div class="j-node"><span class="j-ic">${ic}</span><b>${esc(l)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</div>`).join('')}</div>`;
    if (p.schedules) {
      // today's timetables first
      const list = p.schedules.slice().sort((x, y) => (y.day === day) - (x.day === day));
      h += list.map(sc => `<section class="sched ${sc.day === day ? 'today' : 'other'}">
        <h4>${esc(sc.title)}</h4>${sc.note ? `<p class="sched-note">${esc(sc.note)}</p>` : ''}
        <ol>${sc.rows.map(([dep, arr, tag, line, track, mode]) => {
          const md = mode || sc.mode;
          const ln = line || sc.line || '', mins = toMin(arr) - toMin(dep) + (toMin(arr) < toMin(dep) ? 1440 : 0);
          return `<li class="${tag === 'ours' ? 'ours' : ''}">
            <span class="s-time"><b>${dep}</b><span class="s-dash">→</span>${arr}</span>
            ${ln ? `<span class="s-line" style="background:${MODE_COL[md] || 'var(--ink-2)'}" title="${md}">${esc(ln)}</span>` : `<span class="s-line" style="background:${MODE_COL[md] || 'var(--ink-2)'}">${MODE_IC[md] || ''}</span>`}
            <span class="s-min">${mins} min</span>
            ${track ? `<span class="s-track">${esc(track)}</span>` : ''}
            ${tag ? `<span class="s-tag">${tag === 'ours' ? '★ ours' : esc(tag)}</span>` : ''}
          </li>`; }).join('')}</ol>
      </section>`).join('');
    }
    if (p.hours) {
      const all = p.hours.flatMap(r => [r.open, r.close, ...(r.extra || []).flatMap(e => [e.from, e.to])]).map(toMin);
      const lo = Math.max(0, Math.floor(Math.min(...all) / 60 - 1) * 60), hi = Math.min(1440, Math.ceil(Math.max(...all) / 60 + .5) * 60);
      const pct = m => ((Math.min(hi, Math.max(lo, m)) - lo) / (hi - lo) * 100).toFixed(2) + '%';
      const seg = (f, t, cls, label) => `<span class="${cls}" style="left:${pct(f)};width:calc(${pct(t)} - ${pct(f)})" title="${esc(label)}"></span>`;
      const ticks = []; for (let m = lo; m <= hi; m += 180) ticks.push(`<span style="left:${pct(m)}">${String(m / 60 % 24).padStart(2, '0')}</span>`);
      h += `<section class="hours"><h4>Opening hours <span class="legend"><i class="lg-open"></i>open${p.hours.some(r => r.extra) ? '<i class="lg-extra"></i>' + esc(p.hours.find(r => r.extra).extra[0].label.toLowerCase()) : ''}<i class="lg-us"></i>us</span></h4>
        ${p.hours.map(r => {
          const v = r.visit ? r.visit.map(toMin) : visitOn(p.id, r.day);
          return `<div class="h-row ${r.day === day ? 'today' : ''}" style="--dc:${DAYC[r.day]}"><span class="h-day">${DAYNAME[r.day]}</span>
            <div class="h-bar">${seg(toMin(r.open), toMin(r.close), 'h-open', (r.label || 'Open') + ' ' + r.open + '–' + r.close)}${(r.extra || []).map(e => seg(toMin(e.from), toMin(e.to), 'h-extra', e.label + ' ' + e.from + '–' + e.to)).join('')}${v ? seg(v[0], v[1], 'h-us', 'Us') : ''}</div>
            <span class="h-txt">${r.open}–${r.close}${(r.extra || []).map(e => `<small>${esc(e.label)} ${e.from}–${e.to}</small>`).join('')}</span></div>`;
        }).join('')}
        <div class="h-row h-tickrow"><span></span><div class="h-ticks">${ticks.join('')}</div><span></span></div></section>`;
    }
    if (p.steps) h += p.steps.map(g => `<section class="stepsb"><h4>${esc(g.title)}</h4><ol>${g.items.map(([ic, t]) => `<li><span class="b-ic">${ic}</span>${esc(t)}</li>`).join('')}</ol></section>`).join('');
    if (p.prices) h += `<section class="pricesb">${p.prices.title ? `<h4>${esc(p.prices.title)}</h4>` : ''}<ul>${p.prices.rows.map(([ic, l, v]) => `<li><span class="b-ic">${ic}</span><span class="p-l">${esc(l)}</span><b>${esc(v)}</b></li>`).join('')}</ul></section>`;
    if (p.tags) h += `<div class="tagsb">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>`;
    return h;
  }

  // Keep the chosen place visible beside the card instead of underneath it.
  function reveal(p, fly, zoom) {
    if (p.virtual) {
      // a transfer: zoom to fit both ends in the free part of the map (never wider than
      // city level), then centre the leg's midpoint there like any other place
      const ends = [byId[p.from], byId[p.to]].filter(Boolean);
      if (!ends.length) return;
      const b = L.latLngBounds(ends.map(x => [x.lat, x.lng]));
      const card = dEl.getBoundingClientRect(), mapBox = map.getContainer().getBoundingClientRect();
      const freeW = isPhone() ? mapBox.width - 60 : card.left - mapBox.left - 60;
      const freeH = isPhone() ? card.top - mapBox.top - 120 : mapBox.height - 140;
      const fitZ = map.getBoundsZoom(b, false, L.point(Math.max(0, mapBox.width - freeW), Math.max(0, mapBox.height - freeH)));
      const mid = b.getCenter();
      return reveal({ lat: mid.lat, lng: mid.lng }, true, Math.max(11, Math.min(15, fitZ)));
    }
    const z = zoom != null ? zoom : fly ? Math.max(map.getZoom(), 15) : map.getZoom();
    const size = map.getSize();
    const card = dEl.getBoundingClientRect(), mapBox = map.getContainer().getBoundingClientRect();
    // the free area of the map: to the left of the card on wide screens, above it on phones
    const wide = !isPhone();
    const free = wide
      ? { x: (card.left - mapBox.left) / 2, y: (size.y + 64 - 56) / 2 } // between the top row and the chips
      : { x: size.x / 2, y: (card.top - mapBox.top + 100) / 2 }; // below the search box and the day bar
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
    markActive(null);
  }
  // ✕ (or Escape) on a card that came from the search brings the result list back
  function dismissCard() {
    closeDetail();
    if (viaSearch && searchQ()) openResults();
  }
  map.on('click', () => { closeDetail(); closeResults(); hideTip(); });
  map.on('mousedown', () => hideTip());
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!dEl.hidden) dismissCard(); else if (resultsOpen) closeResults();
  });

  function focusPlace(id) {
    select(id);
    if (isPhone()) scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── search ─────────────────────────────────────────────
  // Searches every place and activity, including ones hidden by the filters.
  // Picking a result folds the list away so the card has the room; closing the
  // card with ✕ unfolds the same list again.
  const fold = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase();
  const momentsAt = {};
  MOMENTS.forEach(m => { if (m.where) (momentsAt[m.where] ||= []).push(m.name + ' ' + m.how); });
  const index = PLACES.map(p => ({
    p,
    name: fold(p.name + (p.venue ? ' ' + p.venue : '')),
    hook: fold(p.hook),
    rest: fold([p.what, p.tips.join(' '), p.cost, CATS[p.cat].label, (momentsAt[p.id] || []).join(' '),
      Object.values(PLAN).flatMap(d => d.steps).filter(s => s.act === p.id && s.name).map(s => s.name).join(' '),
      (planIndex[p.id] || []).map(h => PLAN[h.day].label).join(' ') || (goIndex[p.id] ? 'logistics' : 'alternative')].join(' ')),
  }));
  const qEl = $('#q'), rEl = $('#results'), qClear = $('#qClear');
  let resultsOpen = false, active = -1, shown = [];
  const searchQ = () => qEl.value.trim();

  function search(q) {
    const terms = fold(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.map(e => {
      let score = 0;
      for (const t of terms) {
        const word = new RegExp('(^|[^a-z0-9])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        if (e.name.includes(t)) score += e.name.startsWith(t) || e.name.includes(' ' + t) ? 6 : 4;
        else if (word.test(e.hook)) score += 2; // descriptions only match at the start of a word
        else if (word.test(e.rest)) score += 1;
        else return null; // every word has to match somewhere
      }
      if ((planIndex[e.p.id] || []).length) score += .5; // plan stops first on a tie
      return { p: e.p, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score).map(r => r.p);
  }

  function mark(text, q) {
    // highlight the query words in the name, accent-insensitively
    const f = fold(text), hits = new Array(text.length).fill(false);
    fold(q).split(/\s+/).filter(Boolean).forEach(t => {
      let i = f.indexOf(t);
      while (i !== -1) { for (let k = i; k < i + t.length; k++) hits[k] = true; i = f.indexOf(t, i + 1); }
    });
    let out = '', open = false;
    [...text].forEach((ch, i) => {
      if (hits[i] && !open) { out += '<mark>'; open = true; }
      if (!hits[i] && open) { out += '</mark>'; open = false; }
      out += esc(ch);
    });
    return out + (open ? '</mark>' : '');
  }

  function renderResults() {
    const q = searchQ();
    shown = search(q);
    active = shown.length ? 0 : -1;
    rEl.innerHTML = shown.length
      ? shown.map((p, i) => {
          const hits = planIndex[p.id] || [];
          const color = hits.length ? DAYC[hits[0].day] : CATS[p.cat].color;
          const where = hits.length
            ? hits.map(h => `${P[h.day].label} · stop ${h.n}`).join(', ')
            : `${CATS[p.cat].label} · alternative`;
          return `<li role="option" id="r-${p.id}" data-id="${p.id}" aria-selected="${i === active}">
            <i style="background:${color}"></i>
            <span><b>${mark(p.name, q)}</b><small>${esc(where)} · ${esc(p.cost)}</small></span>
          </li>`;
        }).join('')
      : `<li class="none">Nothing matches “${esc(q)}”.</li>`;
    qEl.setAttribute('aria-activedescendant', active >= 0 ? 'r-' + shown[active].id : '');
  }
  function openResults() {
    if (!searchQ()) return closeResults();
    if (!dEl.hidden) closeDetail(); // the list and the card share the same corner
    renderResults();
    rEl.hidden = false; resultsOpen = true;
    qEl.setAttribute('aria-expanded', 'true');
  }
  function closeResults() {
    rEl.hidden = true; resultsOpen = false;
    qEl.setAttribute('aria-expanded', 'false');
  }
  function moveActive(d) {
    if (!shown.length) return;
    active = (active + d + shown.length) % shown.length;
    rEl.querySelectorAll('[role=option]').forEach((li, i) => li.setAttribute('aria-selected', i === active));
    rEl.children[active].scrollIntoView({ block: 'nearest' });
    qEl.setAttribute('aria-activedescendant', 'r-' + shown[active].id);
  }
  function pickResult(id) {
    qEl.blur();
    select(id, { fromSearch: true });
  }

  qEl.addEventListener('input', () => { qClear.hidden = !qEl.value; openResults(); });
  qEl.addEventListener('focus', () => { if (searchQ() && !resultsOpen && dEl.hidden) openResults(); });
  qEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!resultsOpen) openResults(); else moveActive(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); if (resultsOpen && active >= 0) pickResult(shown[active].id); else openResults(); }
    else if (e.key === 'Escape') {
      e.stopPropagation();
      if (resultsOpen) closeResults(); else { qEl.value = ''; qClear.hidden = true; }
    }
  });
  rEl.addEventListener('mousedown', e => e.preventDefault()); // keep focus in the box while clicking
  rEl.addEventListener('click', e => { const li = e.target.closest('[data-id]'); if (li) pickResult(li.dataset.id); });
  qClear.onclick = () => { qEl.value = ''; qClear.hidden = true; closeResults(); qEl.focus(); };

  // ── plan tab ───────────────────────────────────────────
  const daysEl = $('#days'), timesEl = $('#times');
  function renderDays() {
    daysEl.innerHTML = Object.entries(P).map(([k, d]) =>
      `<button data-day="${k}" style="--dc:${DAYC[k]}" aria-pressed="${k === day}"><b>${esc(d.label)}</b><span>${esc(d.title)} · ≈ €${Math.round(dayCost(k))}</span></button>`).join('')
      + (isAdmin() ? `<button class="secret-toggle" id="secretToggle" aria-pressed="${secretOn}" title="${secretOn ? 'Showing the secret plan: click for the public one' : 'Show the secret plan'}" aria-label="Secret plan">🤫</button>` : '');
    daysEl.classList.toggle('secret', secretOn);
    document.documentElement.classList.toggle('secret-plan', secretOn);
  }
  daysEl.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'secretToggle') setSecret(!secretOn);
    else setDay(b.dataset.day);
  });
  function setSecret(v) {
    secretOn = v && isAdmin();
    try { sessionStorage.setItem('emma_secret', secretOn ? '1' : '0'); } catch {}
    P = secretOn && window.SECRET_PLAN ? window.SECRET_PLAN : PLAN;
    if (!P[day]) day = 'sat';
    indexPlan(); renderDays(); setDay(day); renderBudget();
  }

  function stepCost(s) {
    if (s.costPP != null) return s.costPP;
    return s.act && byId[s.act] ? byId[s.act].costPP : 0;
  }
  function dayCost(k) { return P[k].steps.reduce((sum, s) => sum + stepCost(s), 0); }

  function renderDay() {
    const d = P[day];
    let n = 0, prevAct = null, goSince = false;
    const items = d.steps.map(s => {
      if (s.note) { goSince = true; return `<li class="note"><span class="t">${esc(s.t)}</span>${esc(s.note)}</li>`; }
      if (s.go) {
        goSince = true;
        const txt = `<span class="gi" aria-hidden="true">${s.icon || '→'}</span><span class="gt"><b>${esc(s.t)}</b> ${esc(s.go)}</span>`;
        return s.open && s.place
          ? `<li class="go"><button class="go-open" data-place="${s.place}" title="More about ${esc(byId[s.place].name)}">${txt}<span class="go-more">Info ›</span></button></li>`
          : `<li class="go">${txt}</li>`;
      }
      const p = byId[s.act];
      if (!p) return ''; // a secret-plan step pointing at a place that is not defined
      // consecutive activities with no logistics line between them get a walking estimate
      const walk = prevAct && !goSince && prevAct.id !== p.id
        ? `<li class="go"><span class="gi" aria-hidden="true">🚶</span><span class="gt">${howFar(prevAct, p)}</span></li>` : '';
      n++; prevAct = p; goSince = false;
      return `${walk}<li class="step">
        <span class="num">${n}</span>
        <div class="body">
          <button class="main" data-place="${p.id}">
            <span class="row1"><span class="t">${esc(s.t)}</span><span class="n">${esc(s.name || p.name)}</span></span>
            <span class="d">${esc(s.do)}</span>
            <span class="c">${esc(s.cost || p.cost)}</span>
          </button>
          <a class="gmap" href="${GMAP(p)}" target="_blank" rel="noopener" aria-label="Open ${esc(p.name)} in Google Maps" title="Open in Google Maps">${PIN_SVG}</a>
        </div>
      </li>`;
    }).join('');
    $('#dayView').innerHTML = `<ol class="steps" style="--dc:${DAYC[day]}">${items}</ol>`;

    renderDayBar(d);
    markActive(sel);
  }

  // ── the day bar: the whole day on one line ──
  // Activities are numbered blocks, transport is hatched, walking between two activities
  // is carved off the end of the first one, and breakfast-type notes are pale. Hover (or
  // tap once on a phone) for start, end and length; click an activity to open it.
  const fmtDur = m => m < 60 ? `${m} min` : `${Math.floor(m / 60)}h${m % 60 ? String(m % 60).padStart(2, '0') : ''}`;
  const fmtT = m => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  let barSegs = [];
  function daySegments(d) {
    const timed = d.steps.filter(s => /^\d{1,2}:\d{2}$/.test(s.t) && (!s.act || byId[s.act]));
    const segs = [];
    let n = 0;
    timed.forEach((s, i) => {
      const start = toMin(s.t), next = timed[i + 1];
      let end = s.end ? toMin(s.end) : next ? toMin(next.t) : start + 60;
      if (end <= start) end = start + 30;
      if (s.act) {
        n++;
        const p = byId[s.act], name = s.name || p.name;
        // straight on to another activity: the walk is part of the gap, so show it
        let walk = 0;
        if (next && next.act && byId[next.act] && !s.end) walk = Math.min(walkMin(p, byId[next.act]), Math.floor((end - start) / 2));
        segs.push({ k: 'act', n, place: s.act, label: name, start, end: end - walk });
        if (walk >= 3) segs.push({ k: 'walk', icon: '🚶', label: `Walk to ${byId[next.act].name}`, start: end - walk, end });
        else if (walk) segs[segs.length - 1].end = end;
      } else if (s.go) segs.push({ k: 'go', icon: s.icon || '→', label: s.go, start, end, place: s.open ? s.place : null });
      else segs.push({ k: 'note', icon: '🏠', label: s.note, start, end });
    });
    return segs;
  }
  // every day shares one hour scale, so a shorter day (Sunday) visibly ends earlier
  function barRange() {
    const all = Object.values(P).map(daySegments).filter(x => x.length);
    return [Math.min(...all.map(x => x[0].start)), Math.ceil(Math.max(...all.map(x => x[x.length - 1].end)) / 60) * 60];
  }
  const TINY = 10; // minutes: shorter bits are drawn but not clickable
  function renderDayBar(d) {
    barSegs = daySegments(d);
    timesEl.style.setProperty('--dc', DAYC[day]);
    if (!barSegs.length) { timesEl.innerHTML = ''; return; }
    const [lo, hi] = barRange();
    const pct = m => ((m - lo) / (hi - lo) * 100).toFixed(3) + '%';
    const hours = (hi - lo) / 60, step = hours > 10 ? 2 : 1;
    const ticks = [];
    for (let m = Math.ceil(lo / 60) * 60; m <= hi; m += 60) {
      const minor = (m / 60) % step !== 0 || m >= hi;
      ticks.push(`<span class="tl-tick ${minor ? 'minor' : ''}" style="left:${pct(m)}"><i>${minor ? '' : fmtT(m).slice(0, 2)}</i></span>`);
    }
    timesEl.innerHTML = `
      <div class="tl-scale">${ticks.join('')}</div>
      <div class="tl-track">${barSegs.map((sg, i) => {
        const style = `left:${pct(sg.start)};width:calc(${pct(sg.end)} - ${pct(sg.start)});--i:${i}`;
        const inner = sg.k === 'act' ? `<b>${sg.n}</b>` : '';
        if (sg.k !== 'act' && (sg.k === 'walk' || sg.end - sg.start < TINY))
          return `<span class="tl-seg tl-${sg.k} tl-tiny" style="${style}" aria-hidden="true"></span>`;
        return `<button class="tl-seg tl-${sg.k}${sg.place ? ' can-open' : ''}" data-seg="${i}" style="${style}" aria-label="${esc(sg.label)}, ${fmtT(sg.start)} to ${fmtT(sg.end)}">${inner}</button>`;
      }).join('')}</div>
      <div class="tl-tip" hidden></div>`;
  }
  let tipFor = -1;
  function showTip(i) {
    const sg = barSegs[i], tip = timesEl.querySelector('.tl-tip'), seg = timesEl.querySelector(`[data-seg="${i}"]`);
    if (!sg || !tip || !seg) return;
    tipFor = i;
    const kind = sg.k === 'act' ? `<span class="tt-n">${sg.n}</span>` : `<span class="tt-ic">${sg.icon}</span>`;
    tip.innerHTML = `${kind}<span class="tt-body"><b>${esc(sg.label)}</b><small>${fmtT(sg.start)}–${fmtT(sg.end)} · ${fmtDur(sg.end - sg.start)}${sg.k === 'go' || sg.k === 'walk' ? ' on the way' : ''}</small></span>${sg.place ? '<span class="tt-go" aria-hidden="true">›</span>' : ''}`;
    tip.classList.toggle('can-open', !!sg.place);
    tip.hidden = false;
    timesEl.classList.add('expanded');
    // keep the tip inside the bar
    const box = timesEl.getBoundingClientRect(), r = seg.getBoundingClientRect();
    const w = tip.offsetWidth, x = Math.max(0, Math.min(box.width - w, r.left - box.left + r.width / 2 - w / 2));
    tip.style.left = x + 'px';
    timesEl.querySelectorAll('.tl-seg').forEach(b => b.classList.toggle('hot', +b.dataset.seg === i));
  }
  let tipTimer = 0;
  const hideSoon = ms => { clearTimeout(tipTimer); tipTimer = setTimeout(hideTip, ms); };
  function hideTip() {
    clearTimeout(tipTimer);
    tipFor = -1;
    const tip = timesEl.querySelector('.tl-tip'); if (tip) tip.hidden = true;
    timesEl.querySelectorAll('.tl-seg.hot').forEach(b => b.classList.remove('hot'));
    timesEl.classList.remove('expanded');
  }
  timesEl.addEventListener('pointerover', e => {
    if (e.target.closest('.tl-tip')) { clearTimeout(tipTimer); return; } // reading the bubble keeps it
    const b = e.target.closest('button.tl-seg');
    if (b && e.pointerType !== 'touch') { clearTimeout(tipTimer); showTip(+b.dataset.seg); }
  });
  // leaving a block (or the bar) lets the tip linger a moment, then it goes
  timesEl.addEventListener('pointerout', e => {
    if (e.pointerType === 'touch') return;
    const to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget : null;
    if (!to || !(to.closest('button.tl-seg') || to.closest('.tl-tip'))) hideSoon(2900);
  });
  timesEl.addEventListener('mouseleave', () => { hideSoon(2700); timesEl.classList.remove('quiet'); });
  let lastPointer = 'mouse';
  timesEl.addEventListener('pointerdown', e => { lastPointer = e.pointerType; });
  timesEl.addEventListener('click', e => {
    if (e.target.closest('.tl-tip')) { // the bubble opens what it describes
      const sg = barSegs[tipFor];
      if (sg && sg.place) { hideTip(); timesEl.classList.add('quiet'); select(sg.place); }
      return;
    }
    const b = e.target.closest('button.tl-seg'); if (!b) return;
    const i = +b.dataset.seg, sg = barSegs[i];
    // on a phone the first tap explains (and fades after a few seconds), the second opens
    if (lastPointer === 'touch' && tipFor !== i) { showTip(i); hideSoon(5500); return; }
    if (sg.place) { hideTip(); timesEl.classList.add('quiet'); select(sg.place); } // settle into the selected look at once
    else { showTip(i); hideSoon(4500); }
  });

  // The open card's activity lights up in the plan list (scrolled into view on wide
  // screens), and the time strip on the map hands over to the clock, which spins to
  // that activity's time. Closing the card brings the strip back.
  function markActive(id) {
    hideTip();
    timesEl.classList.toggle('has-sel', !!id);
    timesEl.querySelectorAll('.tl-seg[data-seg]').forEach(b => {
      const sg = barSegs[+b.dataset.seg];
      b.classList.toggle('sel', !!id && !!sg && sg.place === id);
    });
    $('#dayView').querySelectorAll('li').forEach(li => {
      const hit = !!id && !!li.querySelector(`[data-place="${id}"]`);
      li.classList.toggle('sel', hit);
    });
    const step = id && P[day].steps.find(s => s.act === id || (s.go && s.open && s.place === id));
    const hhmm = step && /^\d{1,2}:\d{2}$/.test(step.t) ? step.t : null;
    if (hhmm) clock.show(hhmm); else clock.hide();
    if (!id) return;
    const row = $('#dayView li.sel');
    if (row && !isPhone()) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // ── the clock ──────────────────────────────────────────
  // Starts at the real time, races to the activity's time, then keeps ticking at normal
  // speed. Picking another activity races on to the new time. It never takes the long
  // way round: more than 12 hours ahead means it rewinds instead.
  const clock = (() => {
    const el = $('#clock'), digits = $('#clockTime');
    const hands = { h: $('#handH'), m: $('#handM'), s: $('#handS') };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let shown = false, raf = 0, hideTimer = 0;
    let base = 0, baseAt = 0;  // minutes since midnight, and when that was true
    let anim = null;           // { from, delta, start, dur }
    const nowMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60 + d.getMilliseconds() / 60000; };
    const current = t => base + (t - baseAt) / 60000;
    const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    function paint(min) {
      const m = ((min % 1440) + 1440) % 1440;
      const hh = Math.floor(m / 60), mm = Math.floor(m % 60);
      digits.textContent = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
      hands.h.style.transform = `rotate(${(m / 60) * 30}deg)`;
      hands.m.style.transform = `rotate(${(m % 60) * 6}deg)`;
      hands.s.style.transform = `rotate(${((m * 60) % 60) * 6}deg)`;
    }
    function frame(t) {
      if (anim) {
        const x = Math.min(1, (t - anim.start) / anim.dur);
        paint(anim.from + anim.delta * ease(x));
        if (x >= 1) { base = anim.from + anim.delta; baseAt = t; anim = null; }
      } else paint(current(t));
      raf = requestAnimationFrame(frame);
    }
    function goTo(hhmm) {
      const [h, m] = hhmm.split(':').map(Number);
      const t = performance.now(), from = anim ? anim.from + anim.delta * ease(Math.min(1, (t - anim.start) / anim.dur)) : current(t);
      let delta = (((h * 60 + m) - from) % 1440 + 1440) % 1440;
      if (delta > 720) delta -= 1440;
      if (Math.abs(delta) < 1 / 60 || reduced.matches) { base = from + delta; baseAt = t; anim = null; return; }
      anim = { from, delta, start: t, dur: Math.min(1600, 450 + Math.sqrt(Math.abs(delta)) * 38) };
    }
    return {
      show(hhmm) {
        clearTimeout(hideTimer);
        if (!shown) {
          shown = true;
          base = nowMin(); baseAt = performance.now(); anim = null;
          paint(base);
          hideTip();
          el.hidden = false;
          requestAnimationFrame(() => el.classList.add('in'));
          cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
          setTimeout(() => { if (shown) goTo(hhmm); }, reduced.matches ? 0 : 220); // let it arrive before racing
        } else goTo(hhmm);
        el.style.setProperty('--dc', DAYC[day]);
      },
      hide() {
        if (!shown) return;
        shown = false; anim = null;
        el.classList.remove('in');
        hideTimer = setTimeout(() => { el.hidden = true; cancelAnimationFrame(raf); }, 260);
      },
    };
  })();

  $('#dayView').addEventListener('click', e => {
    const b = e.target.closest('button[data-place]'); if (b) focusPlace(b.dataset.place);
  });

  function setDay(k) {
    day = k;
    daysEl.querySelectorAll('button[data-day]').forEach(b => b.setAttribute('aria-pressed', b.dataset.day === k));
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
  // A popup over the plan. Everyone types a secret number; it seeds their own 5×5 card:
  // 8 dares + 17 moments, shuffled. Same number = same card on any device, and nobody
  // sees yours without it. Cards can only be made until Sat 3 Oct 09:00 (Helsinki);
  // after that the number is locked, and without a card you are out of the game.
  const CARD_DEADLINE = Date.UTC(2026, 9, 3, 6, 0); // 09:00 EEST
  const SIZE = 5, DARES_PER_CARD = 8;
  const locked = () => Date.now() >= CARD_DEADLINE;
  const hashSeed = str => { let h = 2166136261; for (const ch of str) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  function seeded(n) {
    let t = n >>> 0;
    return () => { t = (t + 0x6D2B79F5) >>> 0; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  }
  function shuffle(arr, rnd) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function cardFor(seed) {
    const rnd = seeded(hashSeed('emma5:' + seed));
    const cells = shuffle(DARES, rnd).slice(0, DARES_PER_CARD).map(t => ({ t, k: 'dare' }))
      .concat(shuffle(BINGO, rnd).slice(0, SIZE * SIZE - DARES_PER_CARD).map(t => ({ t, k: 'moment' })));
    return shuffle(cells, rnd);
  }
  let bingo = store.get('emma_bingo5', null);
  if (!bingo || typeof bingo.seed !== 'string' || !Array.isArray(bingo.hits)) bingo = { seed: '', hits: [] };
  const lines = [];
  const idx = [...Array(SIZE).keys()];
  idx.forEach(i => lines.push(idx.map(j => i * SIZE + j), idx.map(j => j * SIZE + i)));
  lines.push(idx.map(i => i * SIZE + i), idx.map(i => i * SIZE + SIZE - 1 - i));
  const fmtDeadline = () => {
    const ms = CARD_DEADLINE - Date.now(), d = Math.floor(ms / 864e5), hr = Math.floor(ms % 864e5 / 36e5);
    return `⏳ Cards lock <b>Sat 3 Oct, 09:00</b>: ${d ? d + ' days ' : ''}${hr} h to go.`;
  };
  function renderBingo(celebrate) {
    const playing = !!bingo.seed, isLocked = locked();
    $('#bingoGate').hidden = playing; $('#bingoPlay').hidden = !playing;
    $('#bingoForm').hidden = isLocked; $('#bingoOut').hidden = !isLocked;
    $('#bingoDeadline').innerHTML = isLocked ? '' : fmtDeadline();
    $('#bingoChange').hidden = isLocked; $('#bingoLock').hidden = !isLocked;
    if (!playing) return 0;
    const cells = cardFor(bingo.seed), hit = new Set(bingo.hits);
    const won = lines.filter(l => l.every(i => hit.has(i))), winCells = new Set(won.flat());
    $('#bingo').innerHTML = cells.map((c, i) =>
      `<button data-i="${i}" data-k="${c.k}" aria-pressed="${hit.has(i)}" class="${winCells.has(i) ? 'win' : ''}" title="${c.k === 'dare' ? 'Dare: only if you did it' : 'Moment: if it happened'}"><span class="bk" aria-hidden="true">${c.k === 'dare' ? '🎯' : '✨'}</span>${esc(c.t)}</button>`).join('');
    $('#bingoWon').hidden = !won.length;
    if (celebrate != null && won.length > celebrate) confetti();
    return won.length;
  }
  let wins = 0;
  const modal = $('#bingoModal');
  function openBingo() { wins = renderBingo(null); modal.showModal(); }
  $('#bingoClose').onclick = () => modal.close();
  // a drag that starts inside the card and is released over the backdrop must not close it
  let downOnBackdrop = false;
  modal.addEventListener('pointerdown', e => { downOnBackdrop = e.target === modal; });
  modal.addEventListener('click', e => { if (e.target === modal && downOnBackdrop) modal.close(); downOnBackdrop = false; });
  $('#bingoForm').addEventListener('submit', e => {
    e.preventDefault();
    if (locked()) { renderBingo(null); return; }
    const v = $('#bingoSeed').value.trim();
    if (!v) { $('#bingoSeed').focus(); return; }
    bingo = { seed: v, hits: [] }; store.set('emma_bingo5', bingo);
    $('#bingoSeed').value = ''; wins = renderBingo(null);
  });
  $('#bingo').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const i = +b.dataset.i;
    bingo.hits = bingo.hits.includes(i) ? bingo.hits.filter(x => x !== i) : bingo.hits.concat(i);
    store.set('emma_bingo5', bingo);
    wins = renderBingo(wins);
  });
  $('#bingoChange').onclick = () => {
    if (locked()) return;
    if (bingo.hits.length && !confirm('A new number gives you a different card and clears your marks. Change it?')) return;
    bingo = { seed: '', hits: [] }; store.set('emma_bingo5', bingo); wins = renderBingo(null);
    setTimeout(() => $('#bingoSeed').focus(), 50);
  };
  $('#bingoReset').onclick = () => {
    if (bingo.hits.length && !confirm('Clear all your marks?')) return;
    bingo.hits = []; store.set('emma_bingo5', bingo); wins = renderBingo(null);
  };

  // ── budget ─────────────────────────────────────────────
  function renderBudget() {
    let total = 0;
    const rows = Object.entries(P).map(([k, d]) => {
      const parts = d.steps.filter(s => stepCost(s) && (!s.act || byId[s.act])).map(s => {
        const name = s.label || s.name || byId[s.act].name.split(' — ')[0].split(' (')[0];
        return `${name} €${+stepCost(s).toFixed(2)}`;
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
      <div class="callout"><strong>Where the money goes:</strong> the meals, Activate and the sauna are most of it. The things that make the trip memorable (the spray, the dance video, the tray shop, the letters, the bingo) cost almost nothing.</div>
      <p class="fine"><b>Cheaper still:</b> swap Kotiharju for the free Sompasauna (−€20) and have breakfast at home both days. <b>Treat Emma:</b> the others split her buffet and sauna (≈ €17 each).</p>
      <p class="fine"><b>Remember:</b> Alko (the only shop for wine) is closed on Sunday, and you land after it closes on Friday. Buy the bubbles on Saturday morning.</p>`;
  }

  // ── tabs ───────────────────────────────────────────────
  const tabs = $('.tabs');
  function showTab(name) {
    tabs.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === name));
    document.querySelectorAll('.panel').forEach(p => { p.hidden = p.id !== `panel-${name}`; });
    daysEl.hidden = name !== 'plan';
    store.set('emma_tab', name);
  }
  tabs.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.tab === 'bingo') openBingo(); else showTab(b.dataset.tab);
  });

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
  $('#gateLeave').onclick = () => gate.close();
  // Enter in the answer box always means Enter, never the first button in the form
  $('#gateA').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); $('#gateForm').requestSubmit($('#gateGo')); }
  });
  $('#gateForm').addEventListener('submit', e => {
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
      $('#secretTab').hidden = true; $('#secret').innerHTML = '';
      setSecret(false); showTab('plan');
    };
    $('#secretTab').hidden = false;
    // the secret plan: surprise places join byId + get markers, shown only in secret mode
    window.SECRET_PLAN = data.secretPlan || null;
    if (!secretPlaces.length) { // register once, even if the gate is opened again
      secretPlaces = (data.secretPlaces || []).filter(p => p && p.id && !byId[p.id]);
      secretPlaces.forEach(p => { p.tips ||= []; p.cat = CATS[p.cat] ? p.cat : 'make'; byId[p.id] = p; addMarker(p); });
    }
    let wasOn = false;
    try { wasOn = sessionStorage.getItem('emma_secret') === '1'; } catch {}
    setSecret(wasOn);
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
    route?.setStyle({ color: getComputedStyle(document.documentElement).getPropertyValue(`--d-${day}`).trim() });
  };
  sysDark.addEventListener?.('change', paintTheme);
  paintTheme();

  // ── boot ───────────────────────────────────────────────
  renderDays();
  renderBudget();
  setDay('sat');
  if (isAdmin()) unlock(true);
  const t = store.get('emma_tab', 'plan');
  showTab(t === 'secret' && !isAdmin() ? 'plan' : t === 'dares' || t === 'bingo' ? 'plan' : t);
})();
