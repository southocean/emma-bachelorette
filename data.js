// Everything the page shows lives here. Edit this file, commit, push — the site updates.
//
// Place fields:
//   id, name, cat, lat, lng
//   venue:  the real name/address of the place, when the name is an activity
//   plan:   { day: 'fri'|'sat'|'sun', step: n } when it is in the itinerary, else absent
//   hook:   one line shown on hover
//   what:   the longer "why go" text shown on click
//   cost:   per-person budget as text; costPP: number (EUR) used for sums, 0 = free
//   time:   how long it takes
//   energy: 1 (slow) .. 3 (high)
//   tips:   array of short practical lines
//   url:    official site, when there is one worth opening
// Optional card blocks (drawn as visuals instead of text):
//   journey:   [[icon, label, sub], ...]                       a chain: A → B → C
//   schedules: [{ day, title, note?, mode, line?, rows: [[dep, arr, tag?, line?, track?]] }]
//              tag 'ours' highlights the departure we plan to take
//   hours:     [{ day, open, close, label?, extra?: [{label, from, to}], visit?: [from, to] }]
//              our visit is read from the plan unless given
//   steps:     [{ title, items: [[icon, text], ...] }]
//   prices:    { title?, rows: [[icon, label, price], ...] }
//   tags:      ['short', 'facts']

window.TRIP = {
  title: 'Helsinki, Emma edition',
  dates: 'Fri 2 – Sun 4 October 2026',
  crew: 4,
};

window.CATS = {
  eat:      { label: 'Eat & drink',   color: '#d9822b' },
  sauna:    { label: 'Sauna & swim',  color: '#2b8fb3' },
  see:      { label: 'See',           color: '#6b7fd7' },
  night:    { label: 'Night & karaoke', color: '#c2417a' },
  make:     { label: 'Make & moments', color: '#3f9c6d' },
  practical:{ label: 'Practical',     color: '#8a8f98' },
};

window.PLACES = [
  // ───────── In the plan (activities, then the logistics pins) ─────────
  // Cards are built from the structured fields (journey, schedules, hours, steps,
  // prices, tags); `what` stays one or two short sentences.
  {
    id: 'bauchladen', name: 'Emma\'s belly-tray shop', venue: 'Narinkkatori, Kamppi', cat: 'make', lat: 60.1692, lng: 24.9328, gq: 'Narinkkatori, 00100 Helsinki',
    hook: 'Bauchladen: Emma sells silly things from a tray to fund the night',
    what: 'A German bachelorette tradition: the bride sells tiny things to strangers from a vendor\'s tray. Narinkkatori is the big square outside Kamppi, busy with Saturday shoppers.',
    cost: '≈ €5 stock (shared)', costPP: 5, time: '1 h', energy: 3,
    prices: { title: 'The tray menu', rows: [
      ['🍫', 'Fazer Blue mini', '€1'], ['🖤', 'Salmiakki, sold as a dare', '€1'], ['🍭', 'Lollipop', '€0.50'],
      ['🪙', 'Lucky penny', '€0.50'], ['🎤', 'One line of any song, sung by the bride', '€2'], ['✏️', 'A 30-second portrait by Emma', '€2'],
    ] },
    steps: [{ title: 'How it works', items: [
      ['🧰', 'Build it after breakfast: shoebox lid, a ribbon round her neck, an "Emma\'s Last Sale" sign'],
      ['🛒', 'Stock it at any K-Market or Alepa, ≈ €5 each'],
      ['🫙', 'Everything goes in a jar: it pays the first round at karaoke'],
    ] }],
    tips: ['No alcohol on the tray: unlicensed sales are illegal in Finland.', 'Sell on the open square, not inside the mall.'],
  },
  {
    id: 'queem', name: 'Quê Em', venue: 'Kansakoulukatu 1, Kamppi', cat: 'eat', lat: 60.1682, lng: 24.9342, gq: 'Quê Em, Kansakoulukatu 1, 00100 Helsinki',
    hook: 'Sat dinner: à la carte · Sun lunch: the €29.90 Vietnamese buffet',
    what: 'The reason for the trip, so we go twice: à la carte on Saturday night, then the buffet on Sunday, when nothing physical comes after it.',
    cost: 'à la carte ≈ €15–25 · buffet €29.90', costPP: 30, time: '1–1.5 h', energy: 1,
    hours: [
      { day: 'sat', open: '12:00', close: '23:00', extra: [{ label: 'Buffet', from: '11:00', to: '15:00' }] },
      { day: 'sun', open: '12:00', close: '22:00', extra: [{ label: 'Buffet', from: '11:00', to: '16:00' }] },
    ],
    prices: { rows: [['🍜', 'Buffet (Sat 11–15, Sun 11–16)', '€29.90'], ['🥢', 'À la carte dinner', '≈ €15–25']] },
    tags: ['bánh mì', 'phở', 'summer rolls', 'noodles & rice', 'desserts', 'drinks'],
    tips: [
      'Book both: Sat 20:30 and Sun 13:15. Their booking page calls the buffet "Brunch".',
      'The site shows the buffet from 11:00 but the doors from 12:00: confirm when you book.',
      'tableonline.fi · 050 468 6661 · info@queem.fi',
    ],
    url: 'https://queem.fi/en/menu/brunch/',
  },
  {
    id: 'activate', name: 'LED jump Activate Itis', venue: 'Activate, Itis shopping centre, Itäkeskus', cat: 'make', lat: 60.2107, lng: 25.0823, gq: 'Activate Itis, Itäkatu 1-7, 00930 Helsinki',
    hook: 'Rooms where the floor, walls and lights are the game',
    what: 'Game rooms of short challenges: jump on lit tiles, dodge, climb and solve puzzles as a team.',
    cost: '≈ €20–30 (check)', costPP: 25, time: '1 h', energy: 3,
    tags: ['60 min', 'one team of 4', 'Itis Bulevardi, 2nd floor', 'sporty clothes'],
    hours: [{ day: 'sat', open: '10:00', close: '22:00' }],
    tips: ['Book the 16:15 slot online so the four of you play together.', 'The sauna is straight after: shower there, and bring the day clothes to change back into.', '+358 50 375 6709 · itis@activategames.fi'],
    url: 'https://playactivate.fi/en/itis',
  },
  {
    id: 'suomenlinna', name: 'Champagne spray & dance', venue: 'Suomenlinna sea fortress', cat: 'make', lat: 60.14009, lng: 24.98997, gq: 'Kuninkaanportti, Suomenlinna, 00190 Helsinki',
    hook: 'Sea-fortress cliffs + open Baltic: the two videos of the trip',
    what: 'An 18th-century island fortress. Both videos happen on the cliffs at the far end, with nothing but sea behind Emma.',
    cost: 'Free (bottle from Alko)', costPP: 0, time: '1h20', energy: 2,
    journey: [['⛴️', 'Main quay', 'ferry lands'], ['🚶', 'Blue route', '≈ 20 min'], ['🌊', 'King\'s Gate cliffs', 'film here'], ['🚶', 'Wander back', '≈ 20 min']],
    steps: [
      { title: '🍾 The spray', items: [['📱', 'Slow-mo, low angle, Emma facing the light'], ['🤝', 'Shake ~10 s, thumb over the top'], ['⬆️', 'Pop up and away, never at people'], ['🔁', 'Second take from behind her']] },
      { title: '💃 The dance', items: [['🎵', 'Emma picks the song'], ['⛴️', 'Learn the 20 seconds on the ferry over'], ['🎬', 'Film wide on the ramparts, phone on a bag, 0.5×']] },
    ],
    tips: ['Toilets and cafés are at the main quay only.', 'Shoes for wet rock.'],
    url: 'https://www.suomenlinna.fi/en/',
  },
  {
    id: 'allas', name: 'Bridal sauna', venue: 'Allas Sea Pool, Katajanokanlaituri 2a', cat: 'sauna', lat: 60.1671, lng: 24.95716, gq: 'Allas Sea Pool, Katajanokanlaituri 2a, 00160 Helsinki',
    hook: 'Morsiussauna by the harbour: sea-view saunas, a warm pool and the Baltic',
    what: 'Morsiussauna, the Finnish bride\'s sauna: her women took her to the sauna to wash off her maiden life. Allas does it on the harbour, next to Market Square: five saunas, a 27 °C pool and a 13 °C sea-water pool.',
    cost: '€24 weekend ticket', costPP: 24, time: '1h45', energy: 1,
    hours: [{ day: 'sat', open: '08:00', close: '21:00' }],
    steps: [{ title: 'The ritual', items: [
      ['💬', 'One piece of real marriage advice from each of us'],
      ['🎤', 'One song each for Emma'],
      ['🌊', 'The cold plunge: the 13 °C sea-water pool'],
      ['♨️', 'Warm up in the 27 °C pool with the harbour lights on'],
      ['🌿', 'Want the vihta? Ask at the desk, or book the private Corner Sauna'],
    ] }],
    prices: { rows: [['🎟️', 'Weekend ticket, valid 2 h', '€24'], ['🧺', 'Towel rental', '€8.90']] },
    tags: ['5 saunas', 'warm pool 27 °C', 'sea pool 13 °C', 'swimsuits on'],
    tips: [
      'Buy the tickets online, up to two weeks ahead: weekends sell out.',
      'Swimsuits are required, except in the women\'s floating sauna.',
      'No alcohol, and no photos or filming in the saunas or changing rooms.',
      'Pools and saunas close at 20:40; ticket sales end at 20:00.',
    ],
    url: 'https://www.allaspool.fi/en/',
  },
  {
    id: 'saigonese', name: 'Lunch at Quán a Lợi', venue: 'The Saigonese Home Kitchen & Coffee, Lapinlahdenkatu 21', cat: 'eat', lat: 60.1674, lng: 24.9265, gq: 'The Saigonese Home Kitchen & Coffee, Lapinlahdenkatu 21, 00180 Helsinki',
    hook: 'Our friend\'s Vietnamese kitchen: vegan phở, curry, steamed buns',
    what: 'A friend\'s Vietnamese home kitchen, next to Kamppi metro. Nearly half the menu is vegan.',
    cost: '≈ €15–20', costPP: 18, time: '1 h', energy: 1,
    hours: [{ day: 'sat', open: '12:00', close: '21:00' }, { day: 'sun', open: '12:00', close: '19:00' }],
    tags: ['vegan phở', 'curry', 'steamed buns', 'summer rolls', 'Vietnamese coffee'],
    tips: ['Book 12:00 for four, when it opens.', '046 598 9104'],
    url: 'https://the-saigonese.com/food-menu/',
  },
  {
    id: 'populus', name: 'Karaoke', venue: 'Populus, Kallio', cat: 'night', lat: 60.18921, lng: 24.95507, gq: 'Karaokebar Populus, Aleksis Kiven katu 22, 00500 Helsinki',
    hook: 'One of Helsinki\'s oldest karaoke bars: locals, not tourists',
    what: 'Finns take karaoke seriously and cheer everyone on, which is Emma\'s natural habitat.',
    cost: 'Free entry · drinks ≈ €8–10', costPP: 20, time: 'All night', energy: 3,
    steps: [{ title: 'Game plan', items: [
      ['📝', 'Names on the list the moment you arrive: Saturday lists get long'],
      ['🎤', 'Queue Emma\'s solo and one group song'],
      ['🇫🇮', 'Learn one Finnish chorus (Irwin Goodman, Kaija Koo) and the room adopts you'],
    ] }],
    prices: { rows: [['🚪', 'Entry', 'Free'], ['🍺', 'A drink', '≈ €8–10']] },
    tips: ['Still going after? Wallis on Katajanokka is open until 4:30 (on the map).'],
  },
  {
    id: 'herring', name: 'Helsinki\'s oldest festival', venue: 'Baltic Herring Market, Market Square', cat: 'eat', lat: 60.1676, lng: 24.9526, gq: 'Kauppatori Market Square, Helsinki',
    hook: 'The Baltic Herring Market (since 1743) opens the day you fly home',
    what: 'The special occasion: the Baltic Herring Market, Helsinki\'s oldest festival (since 1743), opens in Market Square on Sunday 4 Oct, the day you fly home.',
    cost: '≈ €5–10 tasting', costPP: 8, time: '1h15', energy: 1,
    hours: [{ day: 'sun', open: '09:00', close: '19:00' }],
    tags: ['since 1743', 'fishing boats at the quay', 'pickled in dozens of flavours', 'archipelago bread'],
    tips: ['Taste, don\'t lunch: the Quê Em buffet is next.', 'Before 12 is quietest.'],
    url: 'https://silakkamarkkinat.fi/en/',
  },
  {
    id: 'uspenski', name: 'Cathedral', venue: 'Uspenski Cathedral', cat: 'see', lat: 60.1686, lng: 24.9597, gq: 'Uspenski Cathedral, Kanavakatu 1, 00160 Helsinki',
    hook: 'Red-brick Orthodox cathedral on a rock, 5 min from the market',
    what: 'The largest Orthodox church in Western Europe, with a harbour view from its hill.',
    cost: 'Free', costPP: 0, time: '20 min', energy: 1,
    tips: ['Inside can be closed during Sunday services; the view is always open.'],
  },
  {
    id: 'senate', name: 'More cathedral & square', venue: 'Helsinki Cathedral & Senate Square', cat: 'see', lat: 60.1697, lng: 24.9522, gq: 'Helsinki Cathedral, Unioninkatu 29, 00170 Helsinki',
    hook: 'The white cathedral on top of the most famous stairs in Finland',
    what: 'Helsinki\'s postcard view. Climb the stairs, look inside, group photo from the bottom.',
    cost: 'Free', costPP: 0, time: '30 min', energy: 1,
    tips: ['Visitors usually get in from about midday on Sundays, after the service.'],
  },
  {
    id: 'regatta', name: 'Letter to future Emma', venue: 'Café Regatta', cat: 'make', lat: 60.18017, lng: 24.91179, gq: 'Café Regatta, Merikannontie 8, 00260 Helsinki',
    hook: 'Tiny red seaside cabin, huge cinnamon buns, fire pits outside',
    what: 'The slow ending: coffee, a cinnamon bun and the sea.',
    cost: '≈ €5–8', costPP: 6, time: '1 h', energy: 1,
    steps: [{ title: 'The letters', items: [['✉️', 'Bring 4 envelopes and a pen'], ['✍️', 'One letter each, sealed'], ['📅', 'Opened on her first wedding anniversary']] }],
    tips: ['Long queue? Do the Sibelius Monument first and come back.'],
  },
  {
    id: 'sibelius', name: 'The last group photo', venue: 'Sibelius Monument', cat: 'see', lat: 60.1821, lng: 24.9131, gq: 'Sibelius Monument, Helsinki',
    hook: '600 steel pipes in a park, 5 min from Café Regatta',
    what: 'A wave of 600 welded steel pipes honouring Jean Sibelius. The last group photo of the trip.',
    cost: 'Free', costPP: 0, time: '15 min', energy: 1, tips: [],
  },
  {
    id: 'fazer', name: 'Last coffee', venue: 'Fazer Café Kluuvikatu', cat: 'eat', lat: 60.1686, lng: 24.9477, gq: 'Karl Fazer Café, Kluuvikatu 3, 00100 Helsinki',
    hook: 'Fazer\'s flagship café, 10 minutes from the station',
    what: 'A last coffee in the Finnish chocolate brand\'s flagship café, a 10-minute walk from the station.',
    cost: '≈ €5–12', costPP: 8, time: '45 min', energy: 1,
    tips: ['Check Sunday opening hours before you go.'],
  },

  // logistics pins: on the map, but only as lines between activities in the plan
  {
    id: 'home', name: 'Our Airbnb', venue: 'Lapinlahdenkatu 29, Kamppi', cat: 'practical', always: true, lat: 60.16765, lng: 24.92453, gq: 'Lapinlahdenkatu 29, 00180 Helsinki',
    hook: 'Home base for both nights, 6 min from Kamppi metro',
    what: 'Our apartment for Friday and Saturday night, in the quiet west end of Kamppi. Saturday lunch is on the same street.',
    cost: 'Booked', costPP: 0, time: 'Fri night – Sun morning', energy: 1,
    journey: [['🚇', 'Kamppi metro', '6 min walk'], ['🍜', 'Quán a Lợi', 'same street'], ['🚉', 'Central Station', '18 min walk']],
    tips: ['Every metro line in the city stops at Kamppi.'],
  },
  {
    id: 'ferry', name: 'Suomenlinna ferry', venue: 'Market Square (Kauppatori), east corner', cat: 'practical', lat: 60.1670, lng: 24.9536, gq: 'Suomenlinna Ferry, Helsinki',
    hook: 'HSL ferry 19 · every 20 min · 15 min crossing',
    what: 'Regular HSL public transport from the harbour square, covered by the day ticket.',
    cost: 'In the HSL day ticket', costPP: 0, time: '15 min each way', energy: 1,
    journey: [['🧺', 'Market Square', 'east corner'], ['⛴️', 'Ferry 19', '15 min'], ['🏰', 'Suomenlinna', 'main quay']],
    schedules: [
      { day: 'sat', title: 'Sat 3 Oct · Market Square → Suomenlinna', line: '19', mode: 'ferry', rows: [
        ['13:20', '13:35', 'too soon'], ['13:40', '13:55', 'ours'], ['14:00', '14:15'] ] },
      { day: 'sat', title: 'Sat 3 Oct · Suomenlinna → Market Square', line: '19', mode: 'ferry', rows: [
        ['15:00', '15:15'], ['15:20', '15:35', 'ours'], ['15:40', '15:55', 'latest for Activate'] ] },
    ],
    tags: ['Old Market Hall (toilets)', 'Havis Amanda fountain', 'SkyWheel', 'Sunday: the Herring Market'],
    tips: ['Ferry 19 runs every 20 min on Saturday afternoons; times follow that rhythm. Check the HSL app on the day.'],
    url: 'https://www.hsl.fi/en',
  },
  {
    id: 'airport', name: 'Airport train', venue: 'Helsinki Airport station ↔ Central Station', cat: 'practical', lat: 60.3172, lng: 24.9633, gq: 'Helsinki Airport railway station, Vantaa',
    hook: 'I or P train · ~30 min · every 10–15 min · ABC ticket €4.50',
    what: 'The I and P trains both run between the airport and Central Station, one each way round the loop. Take whichever comes first.',
    cost: '€4.50 (app) · €4.80 (tap a card)', costPP: 4.5, time: '28–34 min', energy: 1,
    journey: [['✈️', 'HEL', 'underground: follow "Trains"'], ['🚆', 'I or P train', '28–34 min'], ['🚉', 'Central Station', 'city centre']],
    schedules: [
      { day: 'fri', title: 'Fri 2 Oct · HEL → Central Station', note: 'You land 22:35 (flight from ARN 20:40). Gate to platform ≈ 15–20 min.', mode: 'train', rows: [
        ['22:42', '23:11', 'too soon', 'P', 'track 1'], ['22:57', '23:26', 'ours', 'P', 'track 1'], ['23:04', '23:38', '', 'I', 'track 2'],
        ['23:12', '23:41', 'if we\'re slow', 'P', 'track 1'], ['23:27', '23:56', '', 'P', 'track 1'] ] },
      { day: 'sun', title: 'Sun 4 Oct · Central Station → HEL', note: 'Flight to ARN 21:15, inside Schengen (no passport control): ~1 h at the airport is plenty.', mode: 'train', rows: [
        ['19:16', '19:43', 'extra calm', 'I', 'track 3'], ['19:26', '19:53', '', 'I', 'track 4'], ['19:36', '20:03', 'ours', 'I', 'track 1'],
        ['19:46', '20:13', 'latest', 'I', 'track 4'], ['19:48', '20:21', 'too late', 'P', 'track 19'] ] },
    ],
    prices: { rows: [['📱', 'ABC single, HSL app', '€4.50'], ['💳', 'ABC single, tap a bank card', '€4.80'], ['🎫', 'Sunday: the ABC day ticket covers it', '€0']] },
    tips: ['Buy before boarding: no conductors, and inspectors check.', 'Checking a bag? Bag drop usually closes ~40 min before departure: the 19:36 still leaves room.', 'Tickets are valid 90 min. Get the HSL app before you fly.', 'Timetable: Fintraffic open data for 2 & 4 Oct 2026. Check the HSL app on the day.'],
    url: 'https://www.hsl.fi/en/travelling/visitors/airport-train',
  },
  {
    id: 'station', name: 'Bag lockers', venue: 'Central Station, west wing (north end)', cat: 'practical', lat: 60.1710, lng: 24.9414, gq: 'Helsinki Central Station, Kaivokatu 1, 00100 Helsinki',
    hook: 'Card-paid lockers · from €3.90 / 3 h · west wing open 6:00–24:00',
    what: 'Leave the bags at 10:00 so Sunday is hands-free; collect them for the airport train.',
    cost: 'from €3.90 / 3 h · ≈ €5–8 each', costPP: 0, time: '10 min', energy: 1,
    hours: [{ day: 'sun', open: '06:00', close: '24:00', label: 'West wing', visit: ['10:00', '18:45'] }],
    steps: [{ title: 'How to', items: [
      ['🧭', 'North end of the west wing, by the Eliel Square entrance'],
      ['📦', 'S fits one cabin bag, XL fits two'],
      ['⏱️', 'Book 12 h: 10:00 → 19:00 is 9 h, and overtime costs extra'],
      ['💳', 'Pay by card, keep the code: it opens the locker'],
    ] }],
    prices: { rows: [['📦', 'S, 3 h (73 × 38 × 94 cm)', 'from €3.90'], ['🧳', 'XL, 3 h (63 × 96 × 94 cm)', 'from €4.90'], ['⏱️', '12 h: more, so share an XL', '≈ €5–8 each']] },
    tips: ['Full? LuggageHero, Radical Storage and Nannybag have spots next to the station.'],
    url: 'https://www.vr.fi/en/railway-stations-and-routes/helsinki',
  },
  {
    id: 'alko', name: 'Alko Arkadia', venue: 'Salomonkatu 1, across from Narinkkatori', cat: 'practical', lat: 60.17066, lng: 24.93497, gq: 'Alko Arkadia, Salomonkatu 1, 00100 Helsinki',
    hook: 'The only kind of shop that sells the champagne-spray bottle',
    what: 'Supermarkets only sell drinks up to 8%, so sparkling wine means Alko, the state shop.',
    cost: '≈ €3–4 (one bottle ÷ 4)', costPP: 4, time: '15 min', energy: 1,
    hours: [{ day: 'sat', open: '09:00', close: '18:00' }],
    prices: { rows: [['🍾', 'Cava or crémant, with a real cork', '€10–15'], ['👯', 'Two bottles: one to spray, one to drink', '≈ €6–8 each']] },
    tips: ['Closed on Sunday, and shut before you land on Friday: Saturday morning it is.'],
    url: 'https://www.alko.fi/en',
  },
  {
    id: 'itakeskus', name: 'Metro to Itäkeskus', venue: 'Itäkeskus metro station', cat: 'practical', lat: 60.2102, lng: 25.0796, gq: 'Itäkeskus metro station, Helsinki',
    hook: 'Kamppi → Itäkeskus · ~15 min · every few minutes',
    what: 'Any eastbound metro goes; the Itis shopping centre is right by the station.',
    cost: 'In the HSL day ticket', costPP: 0, time: '15 min', energy: 1,
    journey: [['Ⓜ️', 'Kamppi', 'eastbound'], ['🚇', 'Metro M1 or M2', '≈ 15 min'], ['Ⓜ️', 'Itäkeskus', ''], ['🛍️', 'Itis', '2 min walk']],
    tips: [],
  },

  // ───────── Alternatives ─────────
  {
    id: 'oodi', name: 'Oodi — Urban Workshop', cat: 'make', lat: 60.1738, lng: 24.9383, gq: 'Oodi Helsinki Central Library, Töölönlahdenkatu 4, 00100 Helsinki',
    hook: 'Free badge makers, vinyl cutter & heat press — make team merch',
    what: 'Helsinki\'s central library is also a free makerspace. Book the button-badge machine and the vinyl cutter + heat press and make merch yourselves: badges with Emma\'s face, iron-on slogans on thrifted tees or tote bags. The machines are free; you only pay for materials. The building itself (the wooden wave, the top-floor "book heaven") is worth seeing too.',
    cost: '≈ €2–5 materials', costPP: 4, time: '1.5 h', energy: 1,
    tips: ['Book slots in advance on varaamo.hel.fi (search "Oodi"). Some devices need a library card: check the booking terms, or ask staff on the day.', 'Opens 10:00 on Saturday.'],
    url: 'https://oodihelsinki.fi/en/services/urban-workshop/',
  },
  {
    id: 'kallioeats', name: 'Kallio cheap eats (Vaasankatu / Helsinginkatu)', cat: 'eat', lat: 60.1861, lng: 24.9519, gq: 'Vaasankatu, 00500 Helsinki',
    hook: 'Helsinki\'s cheapest good food and bars, 3 min from the sauna',
    what: 'Kallio is the old working-class district turned bar-and-student quarter. Food here is cheap: pizza, ramen, kebab, Nepalese, Finnish bar food. A late snack before or after karaoke.',
    cost: '≈ €12–18', costPP: 15, time: '1 h', energy: 1,
    tips: ['Vaasankatu is the lively bar street; Helsinginkatu and Fleminginkatu have the food.'],
  },
  {
    id: 'nom', name: 'NOM Vietnamese Kitchen', cat: 'eat', lat: 60.1628, lng: 24.9418, gq: 'NOM Vietnamese Kitchen, Iso Roobertinkatu 20-22, 00120 Helsinki',
    hook: 'Another Vietnamese restaurant, in the Design District',
    what: 'A backup if Quê Em is fully booked. NOM on Iso Roobertinkatu also has a weekend menu.',
    cost: '≈ €20–30', costPP: 25, time: '1 h', energy: 1,
    tips: ['Iso Roobertinkatu is a pedestrian street full of little shops.'],
    url: 'https://www.nomvietnamesekitchen.fi/',
  },
  {
    id: 'oldhall', name: 'Old Market Hall', cat: 'eat', lat: 60.16616, lng: 24.95279, gq: 'Vanha Kauppahalli, Eteläranta, 00130 Helsinki',
    hook: '1889 market hall: salmon soup, pastries, snacks',
    what: 'A beautiful 1889 brick hall on the harbour with small stalls: the salmon soup is the classic cheap-ish lunch. Pairs perfectly with the Herring Market next door on Sunday.',
    cost: '≈ €12–16', costPP: 14, time: '45 min', energy: 1, tips: [],
  },
  {
    id: 'hakaniemi', name: 'Hakaniemi Market Hall', cat: 'eat', lat: 60.1793, lng: 24.9511, gq: 'Hakaniemi Market Hall, Hämeentie 1a, 00530 Helsinki',
    hook: 'The locals\' market hall — Karelian pies, cheap lunch, crafts upstairs',
    what: 'Less touristy than the Old Market Hall and cheaper. Karelian pies with egg butter are a very Finnish €2 snack. The upper floor has craft and textile shops.',
    cost: '≈ €5–15', costPP: 10, time: '45 min', energy: 1, tips: ['Short walk from Kallio.'],
  },
  {
    id: 'ekberg', name: 'Café Ekberg', cat: 'eat', lat: 60.16474, lng: 24.93777, gq: 'Café Ekberg, Bulevardi 9, 00120 Helsinki',
    hook: 'Helsinki\'s oldest café (1852) — breakfast & pastries',
    what: 'Classic Finnish bakery-café on Bulevardi. Good for a proper sit-down breakfast if you want one instead of eating in.',
    cost: '≈ €8–20', costPP: 12, time: '45 min', energy: 1, tips: [],
  },
  {
    id: 'teurastamo', name: 'Teurastamo', cat: 'eat', lat: 60.19057, lng: 24.97179, gq: 'Teurastamo, Helsinki',
    hook: 'Old abattoir turned food yard — street food, gin distillery',
    what: 'A former slaughterhouse complex with restaurants, street food and Helsinki Distilling Company. Weekends often have events — check what is on.',
    cost: '≈ €12–25', costPP: 18, time: '1–2 h', energy: 2, tips: [],
  },
  {
    id: 'ateljee', name: 'Ateljee Bar (Hotel Torni)', cat: 'night', lat: 60.1673, lng: 24.9389, gq: 'Ateljee Bar, Hotel Torni, Yrjönkatu 26, 00100 Helsinki',
    hook: 'Rooftop bar on the 14th floor — best cheap view in town',
    what: 'No entry fee, just order one drink and enjoy a 360° view over the city. Tiny, so go early evening. The toilet has one of the best views in Helsinki (seriously).',
    cost: '≈ €12–15 one drink', costPP: 13, time: '45 min', energy: 1, tips: ['A good Friday-night option if you land before ~22:00.'],
  },
  {
    id: 'wallis', name: 'Wallis Karaoke', cat: 'night', lat: 60.1681, lng: 24.9627, gq: 'Wallis Karaoke Bar, Kanavaranta 7, 00160 Helsinki',
    hook: 'Karaoke with sea views, open until 4:30 every night',
    what: 'Right by Uspenski Cathedral on the Katajanokka canal. The place to move to if the night is still going after Kallio.',
    cost: 'Free entry · drinks', costPP: 15, time: 'Late', energy: 3, tips: [],
  },
  {
    id: 'restroom', name: 'Restroom Karaoke', cat: 'night', lat: 60.1588, lng: 24.9452, gq: 'Karaokebar Restroom, Helsinki',
    hook: 'A tiny karaoke bar inside a 1952 public toilet',
    what: 'Exactly what it sounds like: a converted 1952 public toilet, now one of the smallest and quirkiest karaoke bars in town, in posh Ullanlinna. Great story, very small — crowded on weekend nights.',
    cost: 'Free entry · drinks', costPP: 15, time: '1–2 h', energy: 3, tips: [],
  },
  {
    id: 'annak', name: 'Anna K Karaoke', cat: 'night', lat: 60.16731, lng: 24.93685, gq: 'Karaokebar Anna K, Annankatu 23, 00100 Helsinki',
    hook: 'Small, cosy, singing from 15:00 — daytime karaoke!',
    what: 'Singing starts at 3 pm, so this is the option for afternoon karaoke if the evening gets too tired.',
    cost: 'Free entry · drinks', costPP: 15, time: '1–2 h', energy: 2, tips: ['Annankatu 23.'],
  },
  {
    id: 'erottaja', name: 'Erottaja Bar', cat: 'night', lat: 60.1655, lng: 24.9432, gq: 'Karaoke Bar Erottaja, Erottajankatu 15-17, 00130 Helsinki',
    hook: 'Bar/club hybrid, 7,600 karaoke songs, 20+',
    what: 'Central, busy on weekends, a mix of karaoke and club. Age limit 20+.',
    cost: 'Free entry · drinks', costPP: 15, time: 'Late', energy: 3, tips: [],
  },
  {
    id: 'kaiku', name: 'Kaiku (club)', cat: 'night', lat: 60.18375, lng: 24.9599, gq: 'Kaiku, Kaikukatu 4, 00530 Helsinki',
    hook: 'If Emma wants to DANCE — Helsinki\'s best-loved club',
    what: 'Small, sweaty, great sound, mostly house/techno. For a dance-floor night instead of (or after) karaoke. Check the weekend line-up and entry price online.',
    cost: '≈ €10–15 entry + drinks', costPP: 30, time: 'Late', energy: 3, tips: ['Opens late — nothing happens before midnight.'],
  },
  {
    id: 'vaasankatu', name: 'Vaasankatu bar street', cat: 'night', lat: 60.1864, lng: 24.9555, gq: 'Vaasankatu, 00500 Helsinki',
    hook: 'Cheap bars in a row — the Kallio bar crawl',
    what: 'Several no-frills bars within 100 m. Perfect for a mini bar crawl with the bingo card between dinner and karaoke.',
    cost: '≈ €6–8 a beer', costPP: 15, time: '1–2 h', energy: 2, tips: [],
  },
  {
    id: 'loyly', name: 'Löyly', cat: 'sauna', lat: 60.1523, lng: 24.9306, gq: 'Löyly, Hernesaarenranta 4, 00150 Helsinki',
    hook: 'The famous design sauna by the sea',
    what: 'Architect-designed sauna on the seafront with a ladder straight into the Baltic. More expensive and must be booked, but iconic. Mixed sauna, swimsuits on.',
    cost: '≈ €25 for 2 h', costPP: 25, time: '2 h', energy: 1, tips: ['Book early for weekends.'],
    url: 'https://www.loylyhelsinki.fi/en/',
  },
  {
    id: 'sompa', name: 'Sompasauna (free!)', cat: 'sauna', lat: 60.1808, lng: 24.9985, gq: 'Sompasauna, Mustikkamaa, Helsinki',
    hook: 'Free, volunteer-run, wood-fired sauna on Mustikkamaa — open 24/7',
    what: 'A community sauna built and run by volunteers — no staff, no fee, no bookings. Everyone helps with wood and cleaning, and you jump straight into the sea. Very Helsinki, very free, a bit wild. Swimsuits are optional here, so expect some nudity. Moved to Mustikkamaa in 2025.',
    cost: 'Free', costPP: 0, time: '1–2 h', energy: 2, tips: ['Bring your own towel, water, a lock for the lockers and flip-flops.', 'The budget backup if Kotiharju is booked out.'],
  },
  {
    id: 'kotiharju', name: 'Kotiharju Sauna', venue: 'Harjutorinkatu 1, Kallio', cat: 'sauna', lat: 60.18651, lng: 24.95734, gq: 'Kotiharjun Sauna, Harjutorinkatu 1, 00500 Helsinki',
    hook: 'Helsinki\'s last wood-heated public sauna (1928)',
    what: 'A 1928 neighbourhood sauna in Kallio, still heated with wood. Regulars cool off on the pavement outside in towels; private sauna rooms can be booked.',
    cost: 'Public €16 · private ≈ €20', costPP: 16, time: '1.5 h', energy: 1,
    tips: ['Closed on Mondays.', 'Bring towels and water.'],
    url: 'https://www.kotiharjunsauna.fi/en',
  },
  {
    id: 'skywheel', name: 'SkyWheel (and the SkySauna)', cat: 'sauna', lat: 60.1661, lng: 24.9575, gq: 'SkyWheel Helsinki, Katajanokanlaituri 2, 00160 Helsinki',
    hook: 'Big wheel with a gondola that is a real sauna',
    what: 'The regular ride is a quick harbour view. The SkySauna gondola is a famous one-off, but it is a splurge — look it up only if the group decides to treat Emma.',
    cost: 'Ride ≈ €15 · SkySauna = splurge', costPP: 15, time: '20 min', energy: 1, tips: [],
  },
  {
    id: 'temppeli', name: 'Temppeliaukio (Rock Church)', cat: 'see', lat: 60.1729, lng: 24.9252, gq: 'Temppeliaukio Church, Lutherinkatu 3, 00100 Helsinki',
    hook: 'A church blasted into solid rock, with great acoustics',
    what: 'Built inside a granite outcrop with a copper dome. Concerts happen here because the acoustics are special — Emma might like it.',
    cost: '≈ €5–8', costPP: 6, time: '30 min', energy: 1, tips: [],
  },
  {
    id: 'kiasma', name: 'Kiasma', cat: 'see', lat: 60.1720, lng: 24.9366, gq: 'Kiasma, Mannerheiminaukio 2, 00100 Helsinki',
    hook: 'Contemporary art museum next to Oodi',
    what: 'Right beside Oodi — worth it if the group wants an art hour. Check for free-entry evenings.',
    cost: '≈ €20', costPP: 20, time: '1.5 h', energy: 1, tips: [],
  },
  {
    id: 'amosrex', name: 'Amos Rex', cat: 'see', lat: 60.1705, lng: 24.9365, gq: 'Amos Rex, Mannerheimintie 22-24, 00100 Helsinki',
    hook: 'Underground art museum with the domed square you can climb',
    what: 'The museum is underground; above it the bubble-domed square is free to walk on and very photogenic.',
    cost: 'Square free · museum ≈ €20', costPP: 0, time: '15 min – 1.5 h', energy: 1, tips: [],
  },
  {
    id: 'design', name: 'Design District & Iso Roobertinkatu', cat: 'see', lat: 60.1632, lng: 24.9440, gq: 'Iso Roobertinkatu, 00120 Helsinki',
    hook: 'Vintage shops, Finnish design, the Design Museum',
    what: 'Streets full of small design shops, vintage stores and cafés between Iso Roobertinkatu and the Esplanade. Good for a slow browse.',
    cost: 'Free to browse', costPP: 0, time: '1 h', energy: 1, tips: ['UFF and other second-hand shops for cheap finds.'],
  },
  {
    id: 'kaivopuisto', name: 'Kaivopuisto & Café Ursula', cat: 'see', lat: 60.1570, lng: 24.9560, gq: 'Café Ursula, Ehrenströmintie 3, 00140 Helsinki',
    hook: 'Seaside park and cliffs, café on the water',
    what: 'The prettiest seaside park in the centre. A free, slow sunset walk; Café Ursula sits right on the water.',
    cost: 'Free · café ≈ €6', costPP: 0, time: '1 h', energy: 1, tips: ['Sunset on 3 Oct is around 18:40.'],
  },
  {
    id: 'kallioChurch', name: 'Kallio Church', cat: 'see', lat: 60.1840, lng: 24.9495, gq: 'Kallio Church, Itäinen Papinkatu 2, 00530 Helsinki',
    hook: 'Granite Jugend church whose bells play Sibelius',
    what: 'Its tower can be seen from all over the city. The street in front (Siltasaarenkatu) leads down to Hakaniemi.',
    cost: 'Free', costPP: 0, time: '15 min', energy: 1, tips: [],
  },
  {
    id: 'hietaniemi', name: 'Hietaniemi Beach', cat: 'see', lat: 60.1722, lng: 24.9060, gq: 'Hietaniemi Beach, Helsinki',
    hook: 'City beach — cold-water dip for the brave',
    what: 'The city\'s main sandy beach, near Café Regatta. An October dip (~10 °C) is a very Finnish dare.',
    cost: 'Free', costPP: 0, time: '30 min', energy: 2, tips: [],
  },
  {
    id: 'seurasaari', name: 'Seurasaari island', cat: 'see', lat: 60.1845, lng: 24.8860, gq: 'Seurasaari, Helsinki',
    hook: 'Forest island with old wooden houses and bold squirrels',
    what: 'A quiet island reached by a white wooden bridge. The open-air museum is closed in October, but the island paths are free and beautiful in autumn colours.',
    cost: 'Free', costPP: 0, time: '1.5 h', energy: 1, tips: ['Bring nuts for the squirrels (and the ducks).'],
  },
  {
    id: 'nuuksio', name: 'Nuuksio National Park ↗', cat: 'see', lat: 60.2920, lng: 24.5590, gq: 'Nuuksio National Park, Espoo',
    hook: 'Autumn forest & lakes, ~1 h by bus — only if you drop Suomenlinna',
    what: 'Early October is peak autumn colour. Too far for this timeline unless you swap it for Suomenlinna — but it is free and gorgeous.',
    cost: 'Bus ≈ €4 each way', costPP: 8, time: 'Half day', energy: 2, tips: [],
  },
  {
    id: 'esplanadi', name: 'Esplanadi — busking spot', cat: 'make', lat: 60.1675, lng: 24.9475, gq: 'Esplanadi Park, Helsinki',
    hook: 'Polttarit dare: Emma sings one song for coins',
    what: 'Optional polttarit moment (the Finnish word for a bachelorette). Emma sings one song in the park with a hat out; whatever lands in the hat buys the next round. Finns recognise polttarit instantly and usually play along.',
    cost: 'Free (profit!)', costPP: 0, time: '15 min', energy: 3, tips: ['Between the Herring Market and Senate Square on Sunday.'],
  },
];

// Transfers between activities: one clickable step each, drawn as legs + real departures.
// virtual: no map pin; the map fits `from` → `to` (place ids) when the card opens.
// schedule rows: [dep, arr, tag, line, platform, mode]
window.TRIPS = [
  {
    id: 'trip-fri-1', name: 'To the Airbnb', venue: 'Central Station → Kamppi', cat: 'practical', virtual: true, from: 'station', to: 'home',
    hook: 'Walk 15 min · or metro 1 stop to Kamppi + 6 min on foot',
    what: '', cost: 'The airport ticket covers the metro (valid 90 min)', costPP: 0, time: '≈ 15 min', energy: 1,
    journey: [['🚉', 'Central Station', 'train in 23:26'], ['🚇', 'M1 / M2 west', '1 stop, or walk 15 min'], ['🚶', 'The Airbnb', '6 min from Kamppi']],
    tips: ['On Friday nights the metro runs until about 2 am.'],
  },
  {
    id: 'trip-sat-1', name: 'Metro + ferry to Suomenlinna', venue: 'Kamppi → Helsingin yliopisto → Market Square → Suomenlinna', cat: 'practical', virtual: true, from: 'saigonese', to: 'suomenlinna',
    hook: 'Metro 3 min, walk 7 min, ferry 15 min',
    what: '', cost: 'HSL day ticket ≈ €11 (buy it now)', costPP: 0, time: '≈ 50 min', energy: 1,
    journey: [['🚶', 'Kamppi metro', '5 min walk'], ['🚇', 'M1 / M2 east', '3 min'], ['🚶', 'Market Square', '7 min'], ['⛴️', 'Ferry 19', '15 min']],
    schedules: [
      { day: 'sat', title: 'Metro · Kamppi → Helsingin yliopisto', mode: 'metro', rows: [
        ['13:11', '13:14', '', 'M1'], ['13:15', '13:18', 'ours', 'M2'], ['13:23', '13:26', 'latest', 'M2'] ] },
      { day: 'sat', title: 'Ferry · Market Square → Suomenlinna', mode: 'ferry', line: '19', rows: [
        ['13:40', '13:55', 'ours'], ['14:00', '14:15', 'if we miss it'] ] },
    ],
    tips: ['Get off at Helsingin yliopisto and walk down to the harbour; the ferry leaves from the east corner of Market Square.', 'Rather walk lunch off? Kamppi → Market Square is 20 min on foot.'],
  },
  {
    id: 'trip-sat-2', name: 'Ferry + metro to Itis', venue: 'Suomenlinna → Market Square → Helsingin yliopisto → Itäkeskus', cat: 'practical', virtual: true, from: 'suomenlinna', to: 'activate',
    hook: 'Ferry 15 min, walk 7 min, metro 13 min',
    what: '', cost: 'In the HSL day ticket', costPP: 0, time: '≈ 45 min', energy: 1,
    journey: [['⛴️', 'Ferry 19', '15 min'], ['🚶', 'Helsingin yliopisto metro', '7 min'], ['🚇', 'M1 / M2 east', '13 min'], ['🚶', 'Itis, 2nd floor', '3 min walk']],
    schedules: [
      { day: 'sat', title: 'Ferry · Suomenlinna → Market Square', mode: 'ferry', line: '19', rows: [
        ['15:00', '15:15', 'if we\'re done early'], ['15:20', '15:35', 'ours'], ['15:40', '15:55', 'latest'] ] },
      { day: 'sat', title: 'Metro · Helsingin yliopisto → Itäkeskus', mode: 'metro', rows: [
        ['15:44', '15:57', 'ours', 'M1'], ['15:48', '16:01', '', 'M2'], ['16:00', '16:13', 'tight for 16:15', 'M2'] ] },
    ],
    tips: ['Any eastbound train works: M1 (Vuosaari) and M2 (Mellunmäki) both stop at Itäkeskus.'],
  },
  {
    id: 'trip-sat-3', name: 'Metro to Allas', venue: 'Itäkeskus → Helsingin yliopisto → Market Square', cat: 'practical', virtual: true, from: 'activate', to: 'allas',
    hook: 'M1 or M2 west · 13 min · then 10 min on foot',
    what: '', cost: 'In the HSL day ticket', costPP: 0, time: '≈ 30 min', energy: 1,
    journey: [['🚶', 'Itäkeskus metro', '3 min'], ['🚇', 'M1 / M2 west', '13 min'], ['🚶', 'Allas', '10 min from Helsingin yliopisto']],
    schedules: [{ day: 'sat', title: 'Metro · Itäkeskus → Helsingin yliopisto', mode: 'metro', rows: [
      ['17:17', '17:30', '', 'M2'], ['17:21', '17:34', 'ours', 'M1'], ['17:25', '17:38', 'latest', 'M2'] ] }],
    tips: ['Walk down to Market Square: Allas is on the quay next to the SkyWheel.', 'Times follow the ~4-minute metro rhythm: check the HSL app on the day.'],
  },
  {
    id: 'trip-sat-4', name: 'Metro to Quê Em', venue: 'Allas → Helsingin yliopisto → Kamppi', cat: 'practical', virtual: true, from: 'allas', to: 'queem',
    hook: 'Walk 8 min, metro 3 min, walk 3 min',
    what: '', cost: 'In the HSL day ticket', costPP: 0, time: '≈ 20 min', energy: 1,
    journey: [['🚶', 'Helsingin yliopisto metro', '8 min'], ['🚇', 'M1 / M2 west', '3 min, 2 stops'], ['🚶', 'Quê Em', '3 min from Kamppi']],
    tips: ['Trains every ~4 min: leave Allas around 20:05 and you walk in at 20:30.'],
  },
  {
    id: 'trip-sat-5', name: 'Tram to karaoke', venue: 'Simonkatu → Fleminginkatu', cat: 'practical', virtual: true, from: 'queem', to: 'populus',
    hook: 'Tram 9, door to door · 14 min',
    what: '', cost: 'In the HSL day ticket', costPP: 0, time: '≈ 20 min', energy: 1,
    journey: [['🚶', 'Simonkatu stop', '2 min'], ['🚊', 'Tram 9', '14 min'], ['🎤', 'Populus', 'next to the stop']],
    schedules: [{ day: 'sat', title: 'Tram 9 · Simonkatu → Fleminginkatu', mode: 'tram', line: '9', rows: [
      ['22:11', '22:25', 'ours'], ['21:59', '22:13', 'if dinner is quick'] ] },
      { day: 'sat', title: 'Or metro · Kamppi → Sörnäinen, + 7 min walk', mode: 'metro', rows: [
      ['22:05', '22:10', '', 'M1'], ['22:10', '22:15', '', 'M2'] ] }],
    tips: ['Times follow the usual Saturday-evening rhythm: check the HSL app on the day.'],
  },
  {
    id: 'trip-sat-6', name: 'Home from karaoke', venue: 'Populus → Sörnäinen → Kamppi', cat: 'practical', virtual: true, from: 'populus', to: 'home',
    hook: 'Walk 9 min, metro 6 min, walk 6 min · the metro runs until about 2 am',
    what: '', cost: 'In the HSL day ticket', costPP: 0, time: '≈ 25 min', energy: 1,
    journey: [['🚶', 'Sörnäinen metro', '9 min'], ['🚇', 'M1 / M2 west', '6 min'], ['🚶', 'The Airbnb', '6 min from Kamppi']],
    tips: ['Populus closes at 01:30 on Saturdays; the last metros leave around 2 am.', 'The HSL day ticket from 13:05 is valid 24 h, so it still covers this.', 'Later than that: a night bus, or a taxi for the four of us (≈ €15–25).'],
  },
  {
    id: 'trip-sun-0', name: 'To the lockers', venue: 'Kamppi → Central Station', cat: 'practical', virtual: true, from: 'home', to: 'station',
    hook: 'Walk 18 min · or metro Kamppi → Central Station, 1 stop',
    what: '', cost: 'Walk: free · metro: buy the Sunday ABC day ticket now', costPP: 0, time: '≈ 18 min', energy: 1,
    journey: [['🏠', 'The Airbnb', 'check out'], ['🚶', 'Kamppi metro', '6 min'], ['🚇', 'M1 / M2 east', '1 stop'], ['🚉', 'Central Station', 'west wing lockers']],
    tips: ['Travelling light with backpacks, the walk is easy: straight along Kalevankatu and past Kamppi.', 'Taking the metro? Buy the Sunday ABC day ticket here instead of at 12:50: it still covers the airport train.'],
  },
  {
    id: 'trip-sun-1', name: 'Tram to Quê Em', venue: 'Hallituskatu → Simonkatu', cat: 'practical', virtual: true, from: 'senate', to: 'queem',
    hook: 'Tram 7 · 8 min · or a 20-min walk',
    what: '', cost: 'HSL ABC day ticket €12.80 (covers the airport)', costPP: 0, time: '≈ 15 min', energy: 1,
    journey: [['🚶', 'Hallituskatu stop', '1 min'], ['🚊', 'Tram 7', '8 min'], ['🚶', 'Quê Em', '1 min']],
    schedules: [{ day: 'sun', title: 'Tram 7 · Hallituskatu → Simonkatu', mode: 'tram', line: '7', rows: [
      ['12:45', '12:52', 'if we\'re early'], ['12:57', '13:05', 'ours'] ] }],
    tips: ['Buy the ABC day ticket now: it covers the trams and the airport train tonight.', 'Also fine: M1/M2 from Helsingin yliopisto to Kamppi, 3 min.'],
  },
  {
    id: 'trip-sun-2', name: 'Bus to Café Regatta', venue: 'Kamppi → Sibeliuksen puisto', cat: 'practical', virtual: true, from: 'queem', to: 'regatta',
    hook: 'Bus 25 · 9 min · then 4 min on foot',
    what: '', cost: 'In the ABC day ticket', costPP: 0, time: '≈ 20 min', energy: 1,
    journey: [['🚶', 'Kamppi bus stop', '3 min'], ['🚌', 'Bus 25', '9 min'], ['🚶', 'Café Regatta', '4 min']],
    schedules: [{ day: 'sun', title: 'Bus · Kamppi → Sibeliuksen puisto', mode: 'bus', rows: [
      ['14:47', '14:56', 'if we stop eating early', '25'], ['15:07', '15:16', 'ours', '25'], ['15:12', '15:24', '', '24'] ] }],
    tips: [],
  },
  {
    id: 'trip-sun-3', name: 'Tram back to the centre', venue: 'Töölön halli → Aleksanterinkatu', cat: 'practical', virtual: true, from: 'sibelius', to: 'fazer',
    hook: '8 min walk, then tram 2 or 4 · 11 min',
    what: '', cost: 'In the ABC day ticket', costPP: 0, time: '≈ 25 min', energy: 1,
    journey: [['🚶', 'Töölön halli stop', '8 min'], ['🚊', 'Tram 2 / 4', '11 min'], ['☕', 'Fazer Café', '1 min']],
    schedules: [{ day: 'sun', title: 'Tram · Töölön halli → Aleksanterinkatu', mode: 'tram', rows: [
      ['16:43', '16:54', '', '4'], ['16:51', '17:02', 'ours', '2'], ['16:55', '17:06', 'latest', '4'] ] }],
    tips: [],
  },
];
window.PLACES.push(...window.TRIPS);

// The day-by-day plan. Three kinds of step:
//   { t, act: placeId, do, name? }      an activity: numbered, on the map, has a card
//                                        (name overrides the place name in the plan)
//   { t, go: text, icon, place?, open? } logistics: a thin line between activities.
//                                        `place` puts it on the route; `open: true` makes
//                                        it clickable (only the ferry, which has a card)
//   { t, note: text }                   a plain line (breakfast, sleep)
// Any step can carry costPP (+ label) to override or add to the per-person budget.
window.PLAN = {
  fri: {
    label: 'Fri 2 Oct', title: 'Land',
    steps: [
      { end: '23:30', t: '22:35', go: 'Land at HEL · I/P train to Central Station, ~30 min (ABC ticket)', icon: '✈️', place: 'airport', open: true, costPP: 4.5, label: 'Airport train' },
      { t: '23:30', go: 'Walk 15 min to the Airbnb (or metro 1 stop to Kamppi) · check in', icon: '🚶', place: 'trip-fri-1', open: true },
      { t: 'Night', note: 'Veil on Emma, sleep. Saturday is long.' },
    ],
  },
  sat: {
    label: 'Sat 3 Oct', title: 'The big day',
    steps: [
      { t: '09:30', go: 'Breakfast at the Airbnb, build Emma\'s tray', icon: '🏠', place: 'home', open: true },
      { t: '10:30', go: 'Walk 8 min to Alko Arkadia for the bubbles (opens 9:00, closed Sunday)', icon: '🛒', place: 'alko', open: true, costPP: 4, label: 'Bubbles' },
      { t: '10:45', act: 'bauchladen', do: 'Emma sells her tray to Saturday shoppers.' },
      { t: '12:00', act: 'saigonese', do: 'Lunch at our friend\'s Vietnamese vegan kitchen.' },
      { t: '13:05', go: 'Metro + ferry to Suomenlinna · buy the HSL day ticket', icon: '⛴️', place: 'trip-sat-1', open: true, costPP: 11, label: 'HSL day ticket' },
      { t: '14:00', act: 'suomenlinna', do: 'Film both on the sea cliffs, then wander back.' },
      { t: '15:20', go: 'Ferry back + metro to Itäkeskus', icon: '⛴️', place: 'trip-sat-2', open: true },
      { t: '16:15', act: 'activate', do: 'One hour of Activate, the four of us as one team.' },
      { t: '17:15', go: 'Metro Itäkeskus → Helsingin yliopisto, walk to Allas', icon: '🚇', place: 'trip-sat-3', open: true },
      { t: '17:45', act: 'allas', do: 'Straight from the jumping into the heat: advice, one song each, the sea pool. Stay until the ticket runs out (19:45).' },
      { t: '20:05', go: 'Metro Helsingin yliopisto → Kamppi, walk to Quê Em', icon: '🚇', place: 'trip-sat-4', open: true },
      { t: '20:30', act: 'queem', name: 'Quê Em à la carte', do: 'Dinner à la carte: a first taste before tomorrow\'s buffet.', cost: 'à la carte ≈ €15–25', costPP: 20 },
      { t: '22:05', go: 'Tram 9 to Populus, door to door', icon: '🚊', place: 'trip-sat-5', open: true },
      { end: '24:00', t: '22:30', act: 'populus', do: 'Karaoke until 01:30: Emma\'s solo, the group number.' },
      { t: 'Late', go: 'Metro home to the Airbnb (runs until about 2 am)', icon: '🌙', place: 'trip-sat-6', open: true },
    ],
  },
  sun: {
    label: 'Sun 4 Oct', title: 'Herring & home',
    steps: [
      { t: '09:40', go: 'Check out · walk 18 min to Central Station (or metro 1 stop)', icon: '🚶', place: 'trip-sun-0', open: true },
      { t: '10:00', go: 'Bags into the Central Station lockers', icon: '🧳', place: 'station', open: true, costPP: 6, label: 'Lockers' },
      { t: '10:30', act: 'herring', do: 'Opening day: a light tasting, save room for the buffet.' },
      { t: '11:50', act: 'uspenski', do: 'Up the hill for the harbour view.' },
      { t: '12:20', act: 'senate', do: 'The cathedral, the steps, the group photo.' },
      { t: '12:50', go: 'Tram 7 to Kamppi · buy an ABC day ticket (covers the airport)', icon: '🚊', place: 'trip-sun-1', open: true, costPP: 12.8, label: 'HSL ABC day ticket' },
      { t: '13:15', act: 'queem', name: 'Quê Em buffet', do: 'The €29.90 Vietnamese buffet, finally.', cost: '€29.90 buffet', costPP: 30 },
      { t: '15:00', go: 'Bus 25 to Sibelius Park', icon: '🚌', place: 'trip-sun-2', open: true },
      { t: '15:20', act: 'regatta', do: 'Cinnamon buns and letters to future Emma.' },
      { t: '16:20', act: 'sibelius', do: '600 steel pipes, all four of us in front.' },
      { t: '16:40', go: 'Tram 2 back to the centre', icon: '🚊', place: 'trip-sun-3', open: true },
      { t: '17:05', act: 'fazer', do: 'Fazer\'s flagship café, then a last wander.' },
      { end: '21:15', t: '19:15', go: 'Bags from the lockers · airport train 19:36 · flight 21:15', icon: '✈️', place: 'airport', open: true },
    ],
  },
};

// Small, cheap rituals that make the trip. No tab of their own any more; search still finds them.
window.MOMENTS = [
  { name: 'The champagne spray', cost: '€3–4 each', where: 'suomenlinna',
    how: 'Slow-mo, low angle, sea behind Emma. Shake ~10 s, pop up and away. Do two takes: front and from behind.' },
  { name: 'The dance video', cost: 'Free', where: 'suomenlinna',
    how: 'Emma picks the song; learn 20 seconds of choreography on the ferry over; film it on the ramparts right after the spray. Play it at the wedding.' },
  { name: 'Emma\'s belly-tray shop', cost: '≈ €5', where: 'bauchladen',
    how: 'The German Bauchladen: Emma sells sweets, charms and "one sung line, €2" to strangers. The jar pays for the first karaoke round.' },
  { name: 'Morsiussauna', cost: '€24', where: 'allas',
    how: 'The Finnish bridal sauna ritual at Allas: one piece of marriage advice and one song from each of you, then the sea pool.' },
  { name: 'Polttari bingo', cost: 'Free', where: null,
    how: 'Everyone gets their own secret 5×5 card of dares and moments. First full line wins a secret prize, chosen by Emma.' },
  { name: 'Emma\'s karaoke setlist', cost: 'Free', where: 'populus',
    how: 'Before the trip, everyone secretly picks one song Emma MUST sing. Reveal them at the bar one by one.' },
  { name: 'Herring tasting challenge', cost: '≈ €5 shared', where: 'herring',
    how: 'Buy the three weirdest-flavoured pickled herrings you can find; blind-taste on rye bread and score them 1–10.' },
  { name: 'Letters to future Emma', cost: 'Free', where: 'regatta',
    how: 'One sealed letter each, opened on her first wedding anniversary.' },
  { name: 'One disposable-style album', cost: 'Free', where: null,
    how: 'A shared phone album where nobody may look until Monday. Everyone is allowed only 24 photos.' },
  { name: 'The busking dare', cost: 'Free', where: 'esplanadi',
    how: 'Emma sings one song for coins on Esplanadi; the hat buys a round. Only if the mood is right.' },
];

// Weather for the three days. The page fetches a fresh forecast from Open-Meteo
// (free, no key) and falls back to this snapshot when it is offline.
//   code: WMO weather code · lo/hi: °C · rain: max chance of rain, % · mm · wind: km/h
window.WEATHER = {
  at: '29 Sep 2026', lat: 60.17, lng: 24.94,
  days: {
    fri: { date: '2026-10-02', code: 45, lo: 10, hi: 15, rain: 0, mm: 0, wind: 8 },
    sat: { date: '2026-10-03', code: 51, lo: 12, hi: 15, rain: 6, mm: 0.3, wind: 13 },
    sun: { date: '2026-10-04', code: 51, lo: 12, hi: 15, rain: 26, mm: 0.9, wind: 20 },
  },
};

// The packing checklist, shown in the Packing tab under the forecast. Ranked: the
// things you cannot fix in Helsinki come first. No counts: pack what fits your bag.
// Ticks are saved on each phone. Items: [icon, text, note?]. `shared` sections are
// for the group: split them between us instead of packing four of each.
window.PACKING = [
  { title: 'Can\'t leave without', items: [
    ['🪪', 'Passport + permit'],
    ['📱', 'Phone + charger + power bank'],
    ['💳', 'Bank card'],
    ['💊', 'Any medicine'],
    ['📲', 'HSL app installed'],
  ] },
  { title: 'Dress for', items: [
    ['🚶‍♀️', 'Saturday', 'Outdoors, walking'],
    ['🏃‍♀️', 'The LED jump', 'Sneakers, sporty, change after'],
    ['💃', 'A night out', 'Dinner + karaoke, Sat evening'],
    ['☕', 'Sunday', 'Markets, walks, café'],
    ['😴', 'Sleep'],
  ] },
  { title: 'Sauna', items: [
    ['👙', 'Swimsuit'],
    ['🧖‍♀️', 'Quick-dry towel'],
    ['🩴', 'Flip-flops'],
    ['🛍️', 'A bag for the wet things'],
  ] },
  { title: 'Toiletries', items: [
    ['🪥', 'Toothbrush + toothpaste'],
    ['🩸', 'Period products'],
    ['🧼', 'Deodorant'],
    ['🎀', 'Hair ties, clips, brush'],
    ['🩹', 'Blister plasters'],
    ['🧴', 'Skincare + makeup remover'],
    ['💄', 'Makeup'],
  ] },
  { title: 'For Emma (shared)', shared: true, items: [
    ['👰‍♀️', 'The veil (and a sash)'],
    ['✉️', 'Envelopes and pens'],
    ['🎀', 'Ribbon, marker, card (tray sign)'],
    ['🪙', '€0.50 and €1 coins for the tray'],
    ['🔊', 'Tiny speaker (optional: dancing)'],
  ] },
  { title: 'Nice to have', items: [
    ['👜', 'Small crossbody bag or tote'],
    ['☂️', 'Small umbrella'],
  ] },
];

// Bingo. Everyone types a secret number; it seeds their own 5×5 card of 8 dares + 17 moments.
//   BINGO: shared moments, marked when they happen while you are there (✨)
//   DARES: personal dares, marked only if YOU did it: photo, video or witness (🎯)
window.BINGO = [
  'A Finn teaches Emma a word', 'Someone says "Kippis!" with us', 'Photo with a stranger in a hat',
  'Emma gets a karaoke round of applause', 'Find a Moomin', 'Someone jumps in the sea',
  'A stranger congratulates the bride', 'Try salmiakki (and survive)', 'Wave back at a tram',
  'Spot another polttarit group', 'Squirrel sighting', 'Emma dances in public',
  'Someone cries (happy)', 'Order in Finnish', 'Get a free sample at the market', 'Everyone in one photo, no selfie stick',
  'Emma sells out her tray', 'A stranger buys a sung line', 'Champagne hits someone', 'Spot the SkyWheel from the ferry',
  'A Finn joins our karaoke song', 'Someone says "Moi!" to us first', 'Emma gets whisked with the vihta', 'Someone gets lost in Activate',
];

window.DARES = [
  "Get a Finn to teach you a word, and use it later that day",
  "Buy one sung line from Emma's tray",
  "Sell something from Emma's tray yourself",
  "Get a stranger to give Emma one piece of marriage advice",
  "Get a stranger to write a wish in Emma's wedding card",
  "Order something entirely in Finnish",
  "Do a cartwheel (or a very brave attempt) on the Suomenlinna ramparts",
  "Keep the Finnish sauna silence for 5 full minutes",
  "Sing a solo at karaoke",
  "Get a stranger to sing a line with you at karaoke",
  "Say \"Kippis!\" with a table of strangers",
  "Say \"Moi!\" to five strangers and get five back",
  "Eat salmiakki without pulling a face, on camera",
  "Eat the weirdest pickled herring in one bite",
  "Find a Moomin and take a selfie with it",
  "Teach a stranger one word in Vietnamese or Swedish",
  "Get a stranger to take a photo of you and Emma",
  "Find someone else in Helsinki who is getting married this year"
];
