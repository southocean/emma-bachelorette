// Everything the page shows lives here. Edit this file, commit, push — the site updates.
//
// Place fields:
//   id, name, cat, lat, lng
//   plan:   { day: 'fri'|'sat'|'sun', step: n } when it is in the itinerary, else absent
//   hook:   one line shown on hover
//   what:   the longer "why go" text shown on click
//   cost:   per-person budget as text; costPP: number (EUR) used for sums, 0 = free
//   time:   how long it takes
//   energy: 1 (slow) .. 3 (high)
//   tips:   array of short practical lines
//   url:    official site, when there is one worth opening

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
  // ───────── In the plan ─────────
  {
    id: 'airport', name: 'Helsinki Airport → city train', cat: 'practical', lat: 60.3172, lng: 24.9633,
    plan: { day: 'fri', step: 1 },
    hook: 'I/P train to Central Station, ~30 min',
    what: 'Any I or P commuter train goes to Central Station; they run every ~10 minutes until late. You need an ABC-zone ticket — buy it in the HSL app before you board, there is no conductor to buy from.',
    cost: '≈ €4.50', costPP: 4.5, time: '30 min', energy: 1,
    tips: ['Download the HSL app before you fly.', 'On Sunday the same train takes you back — the airport is zone C.'],
    url: 'https://www.hsl.fi/en',
  },
  {
    id: 'alko', name: 'Alko Arkadia (the bubbles run)', cat: 'practical', lat: 60.1693, lng: 24.9345,
    plan: { day: 'fri', step: 2 },
    hook: 'Buy the champagne-spray bottle here — the ONLY place that sells it',
    what: 'Finnish supermarkets only sell drinks up to 8%, so real sparkling wine comes from Alko, the state shop. A cava or crémant for spraying costs €10–15. Alko is open Mon–Fri 9–21 and Sat 9–18, and CLOSED ON SUNDAY. If you land after 21:00 on Friday, go Saturday morning — there are branches all over town.',
    cost: '≈ €3–4 (one bottle ÷ 4)', costPP: 4, time: '15 min', energy: 1,
    tips: ['Buy two: one to spray, one to actually drink.', 'Ask for something with a proper cork, not a screw cap — the pop is the shot.'],
    url: 'https://www.alko.fi/en',
  },
  {
    id: 'oodi', name: 'Oodi — Urban Workshop', cat: 'make', lat: 60.1738, lng: 24.9383,
    plan: { day: 'sat', step: 1 },
    hook: 'Free badge makers, vinyl cutter & heat press — make the team merch',
    what: 'Helsinki\'s central library is also a free makerspace. Book the button-badge machine and the vinyl cutter + heat press and make the trip\'s merch yourselves: badges with Emma\'s face, iron-on "Emma\'s Last Tour" on thrifted tees or tote bags. The machines are free; you only pay for materials. Slow, creative, and you wear the result for the rest of the weekend. The building itself (the wooden wave, the top-floor "book heaven") is worth seeing too.',
    cost: '≈ €2–5 materials', costPP: 4, time: '1.5 h', energy: 1,
    tips: ['Book slots in advance on varaamo.hel.fi (search "Oodi"). Some devices need a library card — check the booking terms, or ask staff on the day.', 'Bring the photos and designs on a phone; the 3rd-floor terrace is a good group photo.', 'Opens 10:00 on Saturday.'],
    url: 'https://oodihelsinki.fi/en/services/urban-workshop/',
  },
  {
    id: 'nom', name: 'NOM Vietnamese Kitchen — the buffet?', cat: 'eat', lat: 60.1628, lng: 24.9418,
    plan: { day: 'sat', step: 2 },
    hook: 'Our one fixed point: Vietnamese buffet (weekend buffet brunch)',
    what: 'The trip\'s only fixed booking. NOM on Iso Roobertinkatu is known for its weekend buffet brunch — if this is "the" buffet, Saturday late morning is the ideal slot: the biggest meal of the day, right before the busiest afternoon. If the buffet you mean is Quê Em instead (also on the map), swap it in — it is 10 minutes\' walk away.',
    cost: '≈ €20–30 (confirm)', costPP: 25, time: '1–1.25 h', energy: 1,
    tips: ['Book a table for 4 and confirm buffet days and price: +358 50 357 8765.', 'Iso Roobertinkatu is a pedestrian street full of little shops — nice slow walk after.'],
    url: 'https://www.nomvietnamesekitchen.fi/',
  },
  {
    id: 'senate', name: 'Senate Square & the Cathedral steps', cat: 'make', lat: 60.1697, lng: 24.9522,
    plan: { day: 'sat', step: 3 },
    hook: 'The big white staircase — film the trip\'s dance video here',
    what: 'The most famous stairs in Finland. Learn a 20-second routine on Friday night (Emma picks the song, obviously) and film it on the Cathedral steps, all four of you in your homemade merch. Free, silly, and the kind of video that gets replayed at the wedding.',
    cost: 'Free', costPP: 0, time: '30–45 min', energy: 2,
    tips: ['Film from the bottom of the steps, phone propped on a bag, 0.5× lens.', 'Go inside the cathedral too — free, calm, five minutes.'],
  },
  {
    id: 'ferry', name: 'Suomenlinna ferry (Market Square)', cat: 'practical', lat: 60.1670, lng: 24.9536,
    plan: { day: 'sat', step: 4 },
    hook: 'Normal HSL ferry, ~15 min, every 20–40 min',
    what: 'The Suomenlinna ferry is regular public transport, so an ordinary HSL ticket works. The crossing is a sightseeing cruise in itself — stand outside on the way over for the view back at the city.',
    cost: 'HSL AB day ticket ≈ €11 covers all of Saturday', costPP: 11, time: '15 min each way', energy: 1,
    tips: ['Buy a 1-day AB ticket in the app on Saturday morning: ferry + trams all day for about the price of three single rides.', 'Check the last-return time in the HSL app before you go.'],
    url: 'https://www.hsl.fi/en',
  },
  {
    id: 'suomenlinna', name: 'Suomenlinna — the champagne spray', cat: 'make', lat: 60.1406, lng: 24.9862,
    plan: { day: 'sat', step: 5 },
    hook: 'Sea-fortress cliffs + open Baltic: THE shot',
    what: 'An 18th-century island fortress with grassy ramparts, tunnels, cannons and cliffs straight onto the open sea. Walk the blue route to the far end (Kustaanmiekka / King\'s Gate area) and do the champagne spray there, on the rocks with nothing but sea behind Emma. Then just wander — this is also the afternoon\'s slow part.',
    cost: 'Free (bottle counted at Alko)', costPP: 0, time: '2 h', energy: 2,
    tips: ['The shot: phone in slow-mo, low angle, Emma facing the sea light, shake hard ~10 s, thumb over the top, pop and aim UP not at people.', 'Film a second take from behind her for the sea view.', 'Toilets and cafés are near the main quay; there is little at the far end.', 'Wear shoes that can handle wet rock.'],
    url: 'https://www.suomenlinna.fi/en/',
  },
  {
    id: 'kotiharju', name: 'Kotiharju Sauna — the bridal sauna', cat: 'sauna', lat: 60.1868, lng: 24.9537,
    plan: { day: 'sat', step: 6 },
    hook: 'Morsiussauna: the old Finnish bride\'s sauna, in the city\'s last wood-fired public sauna',
    what: 'The trip\'s one traditional bachelorette ritual, and it is a real, old, local one: morsiussauna, the Finnish bridal sauna. Before a wedding the bride\'s women took her to the sauna to "wash off" her maiden life — she was whisked with a birch vihta, given marriage advice, sung to, and scrubbed (traditionally with a paste of egg, salt and flour, if you dare). Kotiharju is Helsinki\'s last wood-heated public sauna, open since 1928 in Kallio, and it rents out a private sauna, so you can do it properly: songs, advice, the vihta, no strangers. It is also the day\'s built-in rest: two hot, slow hours before the night.',
    cost: '≈ €20 (private sauna, 2 h) · public €16', costPP: 20, time: '2 h', energy: 1,
    tips: ['Book the private sauna in advance (opening hours Tue–Sun 14–20, closed Mondays).', 'Maid of honour is the "head bather" — she whisks Emma with the vihta.', 'Each person brings one piece of real marriage advice and one song for Emma.', 'Bring towels and water; people cool off on the pavement outside in towels — this is normal here.'],
    url: 'https://www.kotiharjunsauna.fi/en',
  },
  {
    id: 'kallioeats', name: 'Kallio cheap eats (Vaasankatu / Helsinginkatu)', cat: 'eat', lat: 60.1861, lng: 24.9519,
    plan: { day: 'sat', step: 7 },
    hook: 'Helsinki\'s cheapest good food and bars, 3 min from the sauna',
    what: 'Kallio is the old working-class district turned bar-and-student quarter. Dinner here is cheap: pizza, ramen, kebab, Nepalese, Finnish bar food. Pick on the night by mood — the point is a relaxed, cheap refuel before karaoke.',
    cost: '≈ €12–18', costPP: 15, time: '1 h', energy: 1,
    tips: ['Vaasankatu is the lively bar street; Helsinginkatu and Fleminginkatu have the food.', 'Many Kallio places are cash-free — cards everywhere.'],
  },
  {
    id: 'populus', name: 'Populus — karaoke', cat: 'night', lat: 60.1893, lng: 24.9530,
    plan: { day: 'sat', step: 8 },
    hook: 'One of Helsinki\'s oldest karaoke bars — locals, not tourists',
    what: 'Finland takes karaoke seriously: people pick songs with care, the crowd cheers everyone, and a good performer becomes the bar\'s hero for the night — which is exactly Emma\'s natural habitat. Populus is an old-school Kallio karaoke bar, a short walk from the sauna. No entry fee; put your names on the list early on a Saturday.',
    cost: 'Free entry · drinks ≈ €8–10 each', costPP: 20, time: 'All night', energy: 3,
    tips: ['Queue a group song AND an Emma solo as soon as you arrive — Saturday lists get long.', 'Learn one Finnish song chorus (e.g. an Irwin Goodman or Kaija Koo classic) and the room will adopt you.', 'If the night keeps going: Wallis on Katajanokka is open until 4:30 with sea views (on the map).'],
  },
  {
    id: 'herring', name: 'Baltic Herring Market — opening day', cat: 'eat', lat: 60.1676, lng: 24.9526,
    plan: { day: 'sun', step: 1 },
    hook: 'Helsinki\'s oldest festival (since 1743) opens the day you leave',
    what: 'The trip\'s "special occasion": the Baltic Herring Market opens in Market Square on Sunday 4 October. Fishing boats from the archipelago moor at the quay and sell herring every way possible — fried, pickled in dozens of flavours, in rye bread. Do the herring tasting challenge (see Moments), eat fried herring with mash for lunch, and browse the archipelago bread and craft stalls.',
    cost: '≈ €12–16 lunch', costPP: 14, time: '1.5 h', energy: 1,
    tips: ['Open Sun 9–19. Go before 12 for the least crowded stalls.', 'Fried herring (paistetut silakat) with mashed potato is the classic plate.', 'Until 10 Oct, ten Helsinki restaurants also have herring specials on the menu.'],
    url: 'https://silakkamarkkinat.fi/en/',
  },
  {
    id: 'uspenski', name: 'Uspenski Cathedral', cat: 'see', lat: 60.1686, lng: 24.9597,
    plan: { day: 'sun', step: 2 },
    hook: 'Red-brick Orthodox cathedral on a rock, 5 min from the market',
    what: 'The biggest Orthodox church in Western Europe, with golden domes and a view over the harbour from its rocky hill. A quick, free, calm stop after the market.',
    cost: 'Free', costPP: 0, time: '20 min', energy: 1,
    tips: ['Opening hours on Sundays can be limited because of services — the view from the terrace is always open.'],
  },
  {
    id: 'regatta', name: 'Café Regatta — letters to future Emma', cat: 'make', lat: 60.1790, lng: 24.9115,
    plan: { day: 'sun', step: 3 },
    hook: 'Tiny red seaside cabin, huge cinnamon buns, candles & blankets outside',
    what: 'The trip\'s slow ending. A tiny red wooden café by the water, famous for cinnamon buns and outdoor fire pits. Each of you writes a short letter to Emma, sealed, to be opened on her first wedding anniversary. Coffee and a bun, blankets, the sea — this is where the weekend lands softly before the flight.',
    cost: '≈ €5–8', costPP: 6, time: '1 h', energy: 1,
    tips: ['Bring 4 envelopes and a pen (or buy postcards at the market).', 'It is popular — if the queue is long, go to the Sibelius Monument first and come back.', 'Some sausage-grilling fire pits outside are free to use.'],
  },
  {
    id: 'sibelius', name: 'Sibelius Monument', cat: 'see', lat: 60.1821, lng: 24.9131,
    plan: { day: 'sun', step: 4 },
    hook: '600 steel pipes in a park — the last group photo',
    what: 'The monument to Jean Sibelius, a wave of 600 welded steel pipes in Sibelius Park, 5 minutes from Café Regatta. Last group photo of the trip, in the merch.',
    cost: 'Free', costPP: 0, time: '15 min', energy: 1,
    tips: ['Bus or tram back to the Central Station takes ~20 min — leave by ~16:00 for a 20:00 flight.'],
  },
  {
    id: 'station', name: 'Central Station — bags & train to the airport', cat: 'practical', lat: 60.1710, lng: 24.9414,
    plan: { day: 'sun', step: 5 },
    hook: 'Lockers for bags on Sunday; airport trains every ~10 min',
    what: 'Check out in the morning and leave bags in the station\'s lockers so Sunday is hands-free. Aim for a train around 16:30 → airport by ~17:00, three hours before a 20:00 flight.',
    cost: '≈ €4.50 train + lockers', costPP: 8, time: '30 min', energy: 1,
    tips: ['ABC-zone ticket needed for the airport.', 'Check the flight time — adjust the Sunday end time if it moves.'],
  },

  // ───────── Alternatives ─────────
  {
    id: 'queem', name: 'Quê Em — Vietnamese buffet', cat: 'eat', lat: 60.1668, lng: 24.9310,
    hook: 'The other Vietnamese buffet in town — is this the one?',
    what: 'Regulars come here for the buffet. If this is the restaurant on your list, swap it into Saturday\'s brunch slot or do Friday night if you land early enough.',
    cost: '≈ €15–25 (confirm)', costPP: 20, time: '1 h', energy: 1,
    tips: ['Kansakoulukatu 1, by Kamppi.'],
  },
  {
    id: 'oldhall', name: 'Old Market Hall', cat: 'eat', lat: 60.1657, lng: 24.9508,
    hook: '1889 market hall: salmon soup, pastries, snacks',
    what: 'A beautiful 1889 brick hall on the harbour with small stalls: the salmon soup is the classic cheap-ish lunch. Pairs perfectly with the Herring Market next door on Sunday.',
    cost: '≈ €12–16', costPP: 14, time: '45 min', energy: 1, tips: [],
  },
  {
    id: 'hakaniemi', name: 'Hakaniemi Market Hall', cat: 'eat', lat: 60.1793, lng: 24.9511,
    hook: 'The locals\' market hall — Karelian pies, cheap lunch, crafts upstairs',
    what: 'Less touristy than the Old Market Hall and cheaper. Karelian pies with egg butter are a very Finnish €2 snack. The upper floor has craft and textile shops.',
    cost: '≈ €5–15', costPP: 10, time: '45 min', energy: 1, tips: ['Short walk from Kallio.'],
  },
  {
    id: 'ekberg', name: 'Café Ekberg', cat: 'eat', lat: 60.1640, lng: 24.9390,
    hook: 'Helsinki\'s oldest café (1852) — brunch & pastries',
    what: 'Classic Finnish bakery-café on Bulevardi. Good for a proper sit-down breakfast if you want one instead of eating in.',
    cost: '≈ €8–20', costPP: 12, time: '45 min', energy: 1, tips: [],
  },
  {
    id: 'fazer', name: 'Fazer Café Kluuvikatu', cat: 'eat', lat: 60.1690, lng: 24.9478,
    hook: 'The Finnish chocolate brand\'s flagship café',
    what: 'Fazer blue chocolate is the Finnish gift. The café is a pretty, central coffee stop and the shop sells the chocolate you will bring home.',
    cost: '≈ €5–12', costPP: 8, time: '30 min', energy: 1, tips: [],
  },
  {
    id: 'teurastamo', name: 'Teurastamo', cat: 'eat', lat: 60.1880, lng: 24.9780,
    hook: 'Old abattoir turned food yard — street food, gin distillery',
    what: 'A former slaughterhouse complex with restaurants, street food and Helsinki Distilling Company. Weekends often have events — check what is on.',
    cost: '≈ €12–25', costPP: 18, time: '1–2 h', energy: 2, tips: [],
  },
  {
    id: 'ateljee', name: 'Ateljee Bar (Hotel Torni)', cat: 'night', lat: 60.1673, lng: 24.9389,
    hook: 'Rooftop bar on the 14th floor — best cheap view in town',
    what: 'No entry fee, just order one drink and enjoy a 360° view over the city. Tiny, so go early evening. The toilet has one of the best views in Helsinki (seriously).',
    cost: '≈ €12–15 one drink', costPP: 13, time: '45 min', energy: 1, tips: ['A good Friday-night option if you land before ~22:00.'],
  },
  {
    id: 'wallis', name: 'Wallis Karaoke', cat: 'night', lat: 60.1681, lng: 24.9627,
    hook: 'Karaoke with sea views, open until 4:30 every night',
    what: 'Right by Uspenski Cathedral on the Katajanokka canal. The place to move to if the night is still going after Kallio.',
    cost: 'Free entry · drinks', costPP: 15, time: 'Late', energy: 3, tips: [],
  },
  {
    id: 'restroom', name: 'Restroom Karaoke', cat: 'night', lat: 60.1588, lng: 24.9452,
    hook: 'A tiny karaoke bar inside a 1952 public toilet',
    what: 'Exactly what it sounds like: a converted 1952 public toilet, now one of the smallest and quirkiest karaoke bars in town, in posh Ullanlinna. Great story, very small — crowded on weekend nights.',
    cost: 'Free entry · drinks', costPP: 15, time: '1–2 h', energy: 3, tips: ['Close to NOM if you want karaoke earlier in the day.'],
  },
  {
    id: 'annak', name: 'Anna K Karaoke', cat: 'night', lat: 60.1664, lng: 24.9370,
    hook: 'Small, cosy, singing from 15:00 — daytime karaoke!',
    what: 'Singing starts at 3 pm, so this is the option for afternoon karaoke if the evening gets too tired.',
    cost: 'Free entry · drinks', costPP: 15, time: '1–2 h', energy: 2, tips: ['Annankatu 23.'],
  },
  {
    id: 'erottaja', name: 'Erottaja Bar', cat: 'night', lat: 60.1655, lng: 24.9432,
    hook: 'Bar/club hybrid, 7,600 karaoke songs, 20+',
    what: 'Central, busy on weekends, a mix of karaoke and club. Age limit 20+.',
    cost: 'Free entry · drinks', costPP: 15, time: 'Late', energy: 3, tips: [],
  },
  {
    id: 'kaiku', name: 'Kaiku (club)', cat: 'night', lat: 60.1850, lng: 24.9660,
    hook: 'If Emma wants to DANCE — Helsinki\'s best-loved club',
    what: 'Small, sweaty, great sound, mostly house/techno. For a dance-floor night instead of (or after) karaoke. Check the weekend line-up and entry price online.',
    cost: '≈ €10–15 entry + drinks', costPP: 30, time: 'Late', energy: 3, tips: ['Opens late — nothing happens before midnight.'],
  },
  {
    id: 'vaasankatu', name: 'Vaasankatu bar street', cat: 'night', lat: 60.1864, lng: 24.9555,
    hook: 'Cheap bars in a row — the Kallio bar crawl',
    what: 'Several no-frills bars within 100 m. Perfect for a mini bar crawl with the bingo card between dinner and karaoke.',
    cost: '≈ €6–8 a beer', costPP: 15, time: '1–2 h', energy: 2, tips: [],
  },
  {
    id: 'loyly', name: 'Löyly', cat: 'sauna', lat: 60.1523, lng: 24.9306,
    hook: 'The famous design sauna by the sea',
    what: 'Architect-designed sauna on the seafront with a ladder straight into the Baltic. More expensive and must be booked, but iconic. Mixed sauna, swimsuits on.',
    cost: '≈ €25 for 2 h', costPP: 25, time: '2 h', energy: 1, tips: ['Book early for weekends.'],
    url: 'https://www.loylyhelsinki.fi/en/',
  },
  {
    id: 'sompa', name: 'Sompasauna (free!)', cat: 'sauna', lat: 60.1808, lng: 24.9985,
    hook: 'Free, volunteer-run, wood-fired sauna on Mustikkamaa — open 24/7',
    what: 'A community sauna built and run by volunteers — no staff, no fee, no bookings. Everyone helps with wood and cleaning, and you jump straight into the sea. Very Helsinki, very free, a bit wild. Swimsuits are optional here, so expect some nudity. Moved to Mustikkamaa in 2025.',
    cost: 'Free', costPP: 0, time: '1–2 h', energy: 2, tips: ['Bring your own towel, water, a lock for the lockers and flip-flops.', 'The budget backup if Kotiharju is booked out.'],
  },
  {
    id: 'allas', name: 'Allas Sea Pool', cat: 'sauna', lat: 60.1672, lng: 24.9562,
    hook: 'Heated outdoor pools and saunas on the harbour',
    what: 'Heated pool + sea-water pool + saunas right next to Market Square. A slow Sunday option before the flight if you would rather float than walk to Regatta.',
    cost: '≈ €16–20', costPP: 18, time: '1.5 h', energy: 1, tips: ['Buy tickets online in advance.'],
    url: 'https://www.allaspool.fi/en/',
  },
  {
    id: 'skywheel', name: 'SkyWheel (and the SkySauna)', cat: 'sauna', lat: 60.1661, lng: 24.9575,
    hook: 'Big wheel with a gondola that is a real sauna',
    what: 'The regular ride is a quick harbour view. The SkySauna gondola is a famous one-off, but it is a splurge — look it up only if the group decides to treat Emma.',
    cost: 'Ride ≈ €15 · SkySauna = splurge', costPP: 15, time: '20 min', energy: 1, tips: [],
  },
  {
    id: 'temppeli', name: 'Temppeliaukio (Rock Church)', cat: 'see', lat: 60.1729, lng: 24.9252,
    hook: 'A church blasted into solid rock, with great acoustics',
    what: 'Built inside a granite outcrop with a copper dome. Concerts happen here because the acoustics are special — Emma might like it.',
    cost: '≈ €5–8', costPP: 6, time: '30 min', energy: 1, tips: [],
  },
  {
    id: 'kiasma', name: 'Kiasma', cat: 'see', lat: 60.1720, lng: 24.9366,
    hook: 'Contemporary art museum next to Oodi',
    what: 'Right beside Oodi — worth it if the group wants an art hour. Check for free-entry evenings.',
    cost: '≈ €20', costPP: 20, time: '1.5 h', energy: 1, tips: [],
  },
  {
    id: 'amosrex', name: 'Amos Rex', cat: 'see', lat: 60.1705, lng: 24.9365,
    hook: 'Underground art museum with the domed square you can climb',
    what: 'The museum is underground; above it the bubble-domed square is free to walk on and very photogenic.',
    cost: 'Square free · museum ≈ €20', costPP: 0, time: '15 min – 1.5 h', energy: 1, tips: [],
  },
  {
    id: 'design', name: 'Design District & Iso Roobertinkatu', cat: 'see', lat: 60.1632, lng: 24.9440,
    hook: 'Vintage shops, Finnish design, the Design Museum',
    what: 'Streets full of small design shops, vintage stores and cafés between NOM and the Esplanade. Thrift tees for the Oodi merch here.',
    cost: 'Free to browse', costPP: 0, time: '1 h', energy: 1, tips: ['UFF and other second-hand shops for €5 tees.'],
  },
  {
    id: 'kaivopuisto', name: 'Kaivopuisto & Café Ursula', cat: 'see', lat: 60.1570, lng: 24.9560,
    hook: 'Seaside park and cliffs, café on the water',
    what: 'The prettiest seaside park in the centre. A free, slow sunset walk; Café Ursula sits right on the water.',
    cost: 'Free · café ≈ €6', costPP: 0, time: '1 h', energy: 1, tips: ['Sunset on 3 Oct is around 18:40.'],
  },
  {
    id: 'kallioChurch', name: 'Kallio Church', cat: 'see', lat: 60.1840, lng: 24.9495,
    hook: 'Granite Jugend church whose bells play Sibelius',
    what: 'Its tower can be seen from all over the city. The street in front (Siltasaarenkatu) leads down to Hakaniemi.',
    cost: 'Free', costPP: 0, time: '15 min', energy: 1, tips: [],
  },
  {
    id: 'hietaniemi', name: 'Hietaniemi Beach', cat: 'see', lat: 60.1722, lng: 24.9060,
    hook: 'City beach — cold-water dip for the brave',
    what: 'The city\'s main sandy beach, near Café Regatta. An October dip (~10 °C) is a very Finnish dare.',
    cost: 'Free', costPP: 0, time: '30 min', energy: 2, tips: [],
  },
  {
    id: 'seurasaari', name: 'Seurasaari island', cat: 'see', lat: 60.1845, lng: 24.8860,
    hook: 'Forest island with old wooden houses and bold squirrels',
    what: 'A quiet island reached by a white wooden bridge. The open-air museum is closed in October, but the island paths are free and beautiful in autumn colours.',
    cost: 'Free', costPP: 0, time: '1.5 h', energy: 1, tips: ['Bring nuts for the squirrels (and the ducks).'],
  },
  {
    id: 'nuuksio', name: 'Nuuksio National Park ↗', cat: 'see', lat: 60.2920, lng: 24.5590,
    hook: 'Autumn forest & lakes, ~1 h by bus — only if you drop Suomenlinna',
    what: 'Early October is peak autumn colour. Too far for this timeline unless you swap it for Suomenlinna — but it is free and gorgeous.',
    cost: 'Bus ≈ €4 each way', costPP: 8, time: 'Half day', energy: 2, tips: [],
  },
  {
    id: 'esplanadi', name: 'Esplanadi — busking spot', cat: 'make', lat: 60.1675, lng: 24.9475,
    hook: 'Polttarit dare: Emma sings one song for coins',
    what: 'Optional polttarit moment (the Finnish word for a bachelorette). Emma sings one song in the park with a hat out; whatever lands in the hat buys the next round. Finns recognise polttarit instantly and usually play along.',
    cost: 'Free (profit!)', costPP: 0, time: '15 min', energy: 3, tips: ['Right on the way from Senate Square to the ferry on Saturday.'],
  },
];

// The day-by-day plan. Each step points at a place id; times are suggestions.
window.PLAN = {
  fri: {
    label: 'Fri 2 Oct', title: 'Land softly',
    note: 'You land late, so tonight is only about arriving well and setting up the weekend.',
    steps: [
      { t: 'Late', place: 'airport', do: 'Train in, drop bags, find the place.' },
      { t: '≤ 21:00', place: 'alko', do: 'Only if you land in time — otherwise do it Saturday morning. Buy the spray bottle (+1 to drink).' },
      { t: 'Night', place: null, do: 'Welcome moment at home: give Emma her veil/sash, open the "What\'s in store" envelope (the plan, printed), and spend 20 min learning the dance for tomorrow\'s video. Early night.' },
    ],
  },
  sat: {
    label: 'Sat 3 Oct', title: 'The big day',
    note: 'One full day. Each energetic block is followed by a slow one: make → eat → play → wander → sauna → sing.',
    steps: [
      { t: '09:00', place: null, do: 'Slow breakfast at home (supermarket Karelian pies + coffee). Buy the HSL day ticket.' },
      { t: '10:00', place: 'oodi', do: 'Make the team merch: badges + iron-on tees/totes.' },
      { t: '11:45', place: 'nom', do: 'Vietnamese buffet brunch — the one fixed point.' },
      { t: '13:15', place: 'senate', do: 'Dance video on the Cathedral steps, in the merch. Optional: Emma busks one song on Esplanadi on the way.' },
      { t: '14:00', place: 'ferry', do: 'Ferry to Suomenlinna.' },
      { t: '14:20', place: 'suomenlinna', do: 'Walk to the sea cliffs, champagne spray, then wander slowly back. Ferry ~16:20.' },
      { t: '17:00', place: 'kotiharju', do: 'Morsiussauna — the bridal sauna. Two hot, slow hours.' },
      { t: '19:30', place: 'kallioeats', do: 'Cheap dinner in Kallio.' },
      { t: '21:00', place: 'populus', do: 'Karaoke. Emma\'s solo, the group number, and see where the night goes.' },
    ],
  },
  sun: {
    label: 'Sun 4 Oct', title: 'Herring & a soft landing',
    note: 'Sleep in. Everything is walkable or one tram, and it ends quiet, because Monday is work.',
    steps: [
      { t: '10:00', place: 'station', do: 'Check out, bags into the station lockers (or keep them at the flat if checkout is late).' },
      { t: '10:30', place: 'herring', do: 'Herring Market opening day — tasting challenge + fried herring lunch.' },
      { t: '12:15', place: 'uspenski', do: 'Up the hill for the harbour view.' },
      { t: '13:15', place: 'regatta', do: 'Coffee, cinnamon buns, and letters to future Emma.' },
      { t: '15:00', place: 'sibelius', do: 'Last group photo.' },
      { t: '16:30', place: 'station', do: 'Collect bags, train to the airport (flight ~20:00).' },
    ],
  },
};

// Small, cheap rituals that make the trip. Shown in the Moments tab.
window.MOMENTS = [
  { name: 'The champagne spray', cost: '€3–4 each', where: 'suomenlinna',
    how: 'Slow-mo, low angle, sea behind Emma. Shake ~10 s, pop up and away. Do two takes: front and from behind.' },
  { name: 'Homemade team merch', cost: '€2–5', where: 'oodi',
    how: 'Badges with Emma\'s face and an iron-on slogan on €5 thrift tees. Wear them all weekend so every photo matches.' },
  { name: 'The cathedral-steps dance video', cost: 'Free', where: 'senate',
    how: 'Emma chooses the song on Friday night; learn 20 seconds of choreography; film on the steps. Play it at the wedding.' },
  { name: 'Morsiussauna', cost: '≈ €20', where: 'kotiharju',
    how: 'The real Finnish bridal sauna ritual: vihta whisking, one piece of marriage advice and one song from each of you.' },
  { name: 'Polttari bingo', cost: 'Free', where: null,
    how: 'The bingo tab has a card of small dares. First full row buys nothing — the loser buys the next round.' },
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

window.BINGO = [
  'A Finn teaches Emma a word', 'Someone says "Kippis!" with us', 'Photo with a stranger in a hat',
  'Emma gets a karaoke round of applause', 'Find a Moomin', 'Someone jumps in the sea',
  'A stranger congratulates the bride', 'Try salmiakki (and survive)', 'Wave back at a tram',
  'Spot another polttarit group', 'Squirrel sighting', 'Emma dances in public',
  'Someone cries (happy)', 'Order in Finnish', 'Get a free sample at the market', 'Everyone in one photo, no selfie stick',
];
