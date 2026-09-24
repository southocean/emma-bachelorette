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
  // ───────── In the plan (activities, then the logistics pins) ─────────
  {
    id: 'bauchladen', name: 'Narinkkatori — Emma\'s belly-tray shop', cat: 'make', lat: 60.1692, lng: 24.9328,
    hook: 'Bauchladen: Emma wears a vendor\'s tray and sells silly things to strangers',
    what: 'A German bachelorette tradition: the bride wears a vendor\'s tray of tiny things (sweets, lucky charms, silly items) and sells them to strangers to fund the night. Narinkkatori is the big open square outside Kamppi, busy with Saturday shoppers and 2 minutes from Quê Em. Emma is the saleswoman; the rest of you are her marketing team. Everything she earns goes into a jar that pays for the first round at karaoke.',
    cost: '≈ €5 stock (shared)', costPP: 5, time: '1 h', energy: 3,
    tips: [
      'Build the tray at home after breakfast: a shoebox lid, a ribbon or scarf round her neck, an "Emma\'s Last Sale" sign.',
      'Stock it from any K-Market or Alepa: Fazer Blue minis, salmiakki (sold as a dare), lollipops, cheap hair ties, lucky pennies.',
      'Sell things only Emma can do too: "a line of any song, sung by the bride — €2" and "a 30-second portrait of you — €2".',
      'No shots or any alcohol: selling alcohol without a licence is illegal in Finland. Keep it to sweets and silliness.',
      'Stay on the open square, not inside the mall, and keep it small and friendly. Finns know polttarit groups and usually play along.',
      'If there is stock left, the tray comes out again on Vaasankatu before karaoke.',
    ],
  },
  {
    id: 'queem', name: 'Quê Em', cat: 'eat', lat: 60.1682, lng: 24.9342,
    hook: 'Sat dinner: à la carte · Sun lunch: the €29.90 Vietnamese buffet',
    what: 'The reason for the trip, visited twice. Saturday dinner is à la carte, a first taste of the kitchen. Sunday lunch is the weekend buffet: bánh mì, phở, summer rolls, noodle and rice dishes, desserts and drinks, all you can eat for €29.90. It comes on Sunday on purpose: nothing physical follows it, just coffee, a monument and the flight. It is 2 minutes from Narinkkatori and next to Kamppi metro.',
    cost: 'à la carte ≈ €15–25 · buffet €29.90', costPP: 30, time: '1–1.5 h', energy: 1,
    tips: [
      'Buffet: Sat 11:00–15:00 and Sun 11:00–16:00 only. Evenings are à la carte; there is no dinner buffet.',
      'Their website and booking page call the buffet "Brunch", so pick that when booking Sunday.',
      'Opening hours: Sat 12–23, Sun 12–22, last orders an hour before closing. The site lists the buffet from 11:00 but the doors from 12:00, so confirm the time when you book.',
      'Book both tables: Saturday 20:00 (dinner) and Sunday 13:15 (buffet). Online at tableonline.fi, or 050 468 6661 / info@queem.fi. Kansakoulukatu 1.',
    ],
    url: 'https://queem.fi/en/menu/brunch/',
  },
  {
    id: 'activate', name: 'Activate Itis — the game', cat: 'make', lat: 60.2107, lng: 25.0823,
    hook: 'One hour of active gaming rooms: jump, climb, dodge and solve as a team of 4',
    what: 'A physical game centre: you move through rooms of short challenges where the floor, walls and lights are the game, jumping, hiding, climbing and solving puzzles together. One session is 60 minutes, for teams of 2–5, so the four of you play as one team. It is in the Itis shopping centre in Itäkeskus, 15 minutes east by metro.',
    cost: '≈ €20–30 (check)', costPP: 25, time: '1 h', energy: 3,
    tips: [
      'Open Sat 10–22 (Sun 10/11–20/21, sources differ). Book a slot online so the four of you play together.',
      'Itis Bulevardi, 2nd floor. Metro to Itäkeskus; the mall is right by the station.',
      'Sporty shoes and clothes you can move in. Lunch is just before, so keep it light.',
      'Contact: +358 50 375 6709, itis@activategames.fi.',
    ],
    url: 'https://playactivate.fi/en/itis',
  },
  {
    id: 'suomenlinna', name: 'Suomenlinna — champagne spray & dance video', cat: 'make', lat: 60.1406, lng: 24.9862,
    hook: 'Sea-fortress cliffs + open Baltic: the two videos of the trip',
    what: 'An 18th-century island fortress with grassy ramparts, tunnels, cannons and cliffs straight onto the open sea. Walk the blue route to the far end (Kustaanmiekka / King\'s Gate area) and film both videos there: the champagne spray on the rocks with nothing but sea behind Emma, and the 20-second dance on the ramparts. Then wander back slowly to the ferry.',
    cost: 'Free (bottle from Alko)', costPP: 0, time: '1.5 h', energy: 2,
    tips: [
      'The spray: phone in slow-mo, low angle, Emma facing the light, shake ~10 s, thumb over the top, pop and aim UP, not at people. Take a second from behind her.',
      'The dance: Emma picks the song; learn the 20 seconds on the ferry over. Film wide on the ramparts, phone propped on a bag, 0.5× lens.',
      'Toilets and cafés are near the main quay; there is little at the far end.',
      'Wear shoes that can handle wet rock.',
    ],
    url: 'https://www.suomenlinna.fi/en/',
  },
  {
    id: 'kotiharju', name: 'Kotiharju Sauna — the bridal sauna', cat: 'sauna', lat: 60.1868, lng: 24.9537,
    hook: 'Morsiussauna: the old Finnish bride\'s sauna, in the city\'s last wood-fired public sauna',
    what: 'The trip\'s traditional Finnish ritual: morsiussauna, the bridal sauna. Before a wedding the bride\'s women took her to the sauna to "wash off" her maiden life. She was whisked with a birch vihta, given marriage advice, sung to, and scrubbed (traditionally with a paste of egg, salt and flour, if you dare). Kotiharju is Helsinki\'s last wood-heated public sauna, open since 1928 in Kallio, and it rents out a private sauna, so you can do it properly: songs, advice, the vihta, no strangers. It is also the day\'s rest before the evening.',
    cost: '≈ €20 (private sauna) · public €16', costPP: 20, time: '1h45', energy: 1,
    tips: ['Book the private sauna for ~17:45 (open Tue–Sun 14–20, closed Mondays).', 'Maid of honour is the "head bather": she whisks Emma with the vihta.', 'Each person brings one piece of real marriage advice and one song for Emma.', 'Bring towels and water; people cool off on the pavement outside in towels, which is normal here.'],
    url: 'https://www.kotiharjunsauna.fi/en',
  },
  {
    id: 'saigonese', name: 'The Saigonese — Home Kitchen & Coffee', cat: 'eat', lat: 60.1674, lng: 24.9265,
    hook: 'Our friend\'s Vietnamese kitchen: vegan phở, curry, steamed buns',
    what: 'A cosy Vietnamese home kitchen and coffee place run by a friend of Nam\'s, with nearly half the menu vegan: vegan phở, curry, steamed buns and summer rolls, plus Vietnamese coffee. Saturday lunch, 5 minutes from Narinkkatori and next to Kamppi metro for Activate.',
    cost: '≈ €15–20', costPP: 18, time: '1 h', energy: 1,
    tips: ['Open Sat 12–21, Sun 12–19. Book for 12:00 when it opens, and let them know you are four.', 'Lapinlahdenkatu 21, Kamppi. Phone 046 598 9104.'],
    url: 'https://the-saigonese.com/food-menu/',
  },
  {
    id: 'populus', name: 'Populus — karaoke', cat: 'night', lat: 60.1893, lng: 24.9530,
    hook: 'One of Helsinki\'s oldest karaoke bars — locals, not tourists',
    what: 'Finland takes karaoke seriously: people pick songs with care, the crowd cheers everyone, and a good performer becomes the bar\'s hero for the night, which is exactly Emma\'s natural habitat. Populus is an old-school Kallio karaoke bar. No entry fee; put your names on the list early on a Saturday.',
    cost: 'Free entry · drinks ≈ €8–10 each', costPP: 20, time: 'All night', energy: 3,
    tips: ['Queue a group song AND an Emma solo as soon as you arrive: Saturday lists get long.', 'Learn one Finnish song chorus (e.g. an Irwin Goodman or Kaija Koo classic) and the room will adopt you.', 'If the night keeps going: Wallis on Katajanokka is open until 4:30 with sea views (on the map).'],
  },
  {
    id: 'herring', name: 'Baltic Herring Market — opening day', cat: 'eat', lat: 60.1676, lng: 24.9526,
    hook: 'Helsinki\'s oldest festival (since 1743) opens the day you leave',
    what: 'The Baltic Herring Market opens in Market Square on Sunday 4 October. Fishing boats from the archipelago moor at the quay and sell herring every way possible: fried, pickled in dozens of flavours, on rye bread. Do the herring tasting challenge (see Moments) and browse the archipelago bread and craft stalls. Keep it to tasting: the Quê Em buffet is at lunch.',
    cost: '≈ €5–10 tasting', costPP: 8, time: '1h15', energy: 1,
    tips: ['Open Sun 9–19. Go before 12 for the least crowded stalls.', 'Fried herring (paistetut silakat) is the classic, if you want a proper plate after all.', 'Until 10 Oct, ten Helsinki restaurants also have herring specials on the menu.'],
    url: 'https://silakkamarkkinat.fi/en/',
  },
  {
    id: 'uspenski', name: 'Uspenski Cathedral', cat: 'see', lat: 60.1686, lng: 24.9597,
    hook: 'Red-brick Orthodox cathedral on a rock, 5 min from the market',
    what: 'The biggest Orthodox church in Western Europe, with golden domes and a view over the harbour from its rocky hill. A quick, free, calm stop after the market.',
    cost: 'Free', costPP: 0, time: '20 min', energy: 1,
    tips: ['Opening hours on Sundays can be limited because of services; the view from the terrace is always open.'],
  },
  {
    id: 'senate', name: 'Helsinki Cathedral & Senate Square', cat: 'see', lat: 60.1697, lng: 24.9522,
    hook: 'The white cathedral on top of the most famous stairs in Finland',
    what: 'The white, green-domed Lutheran cathedral above Senate Square, Helsinki\'s postcard view. Climb the big staircase, look inside (free, calm, five minutes), and take the group photo from the bottom of the steps.',
    cost: 'Free', costPP: 0, time: '30 min', energy: 1,
    tips: ['Sunday morning services mean visitors usually get in from around midday; the steps and square are always open.'],
  },
  {
    id: 'regatta', name: 'Café Regatta — letters to future Emma', cat: 'make', lat: 60.1790, lng: 24.9115,
    hook: 'Tiny red seaside cabin, huge cinnamon buns, candles & blankets outside',
    what: 'The trip\'s slow ending. A tiny red wooden café by the water, famous for cinnamon buns and outdoor fire pits. Each of you writes a short letter to Emma, sealed, to be opened on her first wedding anniversary. Coffee and a bun, blankets, the sea: this is where the weekend lands softly.',
    cost: '≈ €5–8', costPP: 6, time: '1 h', energy: 1,
    tips: ['Bring 4 envelopes and a pen (or buy postcards at the market).', 'It is popular. If the queue is long, go to the Sibelius Monument first and come back.', 'Some sausage-grilling fire pits outside are free to use.'],
  },
  {
    id: 'sibelius', name: 'Sibelius Monument', cat: 'see', lat: 60.1821, lng: 24.9131,
    hook: '600 steel pipes in a park — the last group photo',
    what: 'The monument to Jean Sibelius, a wave of 600 welded steel pipes in Sibelius Park, 5 minutes from Café Regatta. Last group photo of the trip.',
    cost: 'Free', costPP: 0, time: '15 min', energy: 1,
    tips: ['Tram or bus back to the centre takes ~20 min.'],
  },
  {
    id: 'fazer', name: 'Fazer Café Kluuvikatu', cat: 'eat', lat: 60.1686, lng: 24.9477,
    hook: 'Last coffee + Fazer chocolate to take home',
    what: 'Fazer blue chocolate is the Finnish gift. The flagship café is a pretty, central last stop, 10 minutes\' walk from the station, and the shop sells the chocolate you will bring home.',
    cost: '≈ €5–12', costPP: 8, time: '45 min', energy: 1,
    tips: ['Check Sunday opening hours before you go.'],
  },

  // logistics pins: on the map, but only as lines between activities in the plan
  {
    id: 'ferry', name: 'Market Square — the Suomenlinna ferry', cat: 'practical', lat: 60.1670, lng: 24.9536,
    hook: 'Where the Suomenlinna ferry leaves: the harbour square',
    what: 'Kauppatori, Helsinki\'s harbour square: market stalls, the Havis Amanda fountain, the Old Market Hall and the SkyWheel are all here, and on Sunday it is where the Herring Market happens. The Suomenlinna ferry is regular public transport and leaves from the east corner of the square, so the HSL day ticket covers it. The 15-minute crossing is a sightseeing cruise in itself: stand outside for the view back at the city.',
    cost: 'Included in the HSL day ticket', costPP: 0, time: '15 min each way', energy: 1,
    tips: ['Ferries run every 20–40 min. Check the times in the HSL app, especially the one back (~17:00).', 'Toilets: the Old Market Hall, 2 minutes away.'],
    url: 'https://www.hsl.fi/en',
  },
  {
    id: 'alko', name: 'Alko Arkadia (the bubbles run)', cat: 'practical', lat: 60.1693, lng: 24.9345,
    hook: 'Buy the champagne-spray bottle here, the ONLY kind of shop that sells it',
    what: 'Finnish supermarkets only sell drinks up to 8%, so real sparkling wine comes from Alko, the state shop. A cava or crémant for spraying costs €10–15. Alko is open Mon–Fri 9–21 and Sat 9–18, and CLOSED ON SUNDAY. You land after it closes on Friday, so go on Saturday morning: this one is across the street from Narinkkatori.',
    cost: '≈ €3–4 (one bottle ÷ 4)', costPP: 4, time: '15 min', energy: 1,
    tips: ['Buy two: one to spray, one to actually drink.', 'Pick one with a proper cork, not a screw cap: the pop is the shot.'],
    url: 'https://www.alko.fi/en',
  },
  {
    id: 'airport', name: 'Helsinki Airport (HEL)', cat: 'practical', lat: 60.3172, lng: 24.9633,
    hook: 'Land Fri 22:35 · fly home Sun 21:15 · I/P train to the centre, ~30 min',
    what: 'Flights: Stockholm ARN 20:40 → HEL 22:35 on Friday 2 Oct, and HEL 21:15 → ARN on Sunday 4 Oct (the hour back is the time difference). Any I or P commuter train links the airport and Central Station, every ~10 minutes until late. You need an ABC-zone ticket, bought in the HSL app before boarding.',
    cost: '≈ €4.50 each way', costPP: 4.5, time: '30 min', energy: 1,
    tips: ['Download the HSL app before you fly.', 'Sunday: aim to be at the airport by ~19:45, so the train from Central Station around 19:00.'],
    url: 'https://www.hsl.fi/en',
  },
  {
    id: 'station', name: 'Central Station', cat: 'practical', lat: 60.1710, lng: 24.9414,
    hook: 'Bag lockers on Sunday; airport trains every ~10 min',
    what: 'Check out in the morning and leave bags in the station\'s lockers so Sunday is hands-free, then collect them for the airport train.',
    cost: 'Lockers ≈ €4–6', costPP: 0, time: '15 min', energy: 1,
    tips: ['ABC-zone ticket needed for the airport.'],
  },
  {
    id: 'itakeskus', name: 'Itäkeskus metro', cat: 'practical', lat: 60.2102, lng: 25.0796,
    hook: 'Metro stop for Itis and Activate, ~15 min from Kamppi',
    what: 'Any eastbound metro from Kamppi goes to Itäkeskus in about 15 minutes; the Itis shopping centre is right by the station.',
    cost: 'Included in the HSL day ticket', costPP: 0, time: '15 min', energy: 1, tips: [],
  },

  // ───────── Alternatives ─────────
  {
    id: 'oodi', name: 'Oodi — Urban Workshop', cat: 'make', lat: 60.1738, lng: 24.9383,
    hook: 'Free badge makers, vinyl cutter & heat press — make team merch',
    what: 'Helsinki\'s central library is also a free makerspace. Book the button-badge machine and the vinyl cutter + heat press and make merch yourselves: badges with Emma\'s face, iron-on slogans on thrifted tees or tote bags. The machines are free; you only pay for materials. The building itself (the wooden wave, the top-floor "book heaven") is worth seeing too.',
    cost: '≈ €2–5 materials', costPP: 4, time: '1.5 h', energy: 1,
    tips: ['Book slots in advance on varaamo.hel.fi (search "Oodi"). Some devices need a library card: check the booking terms, or ask staff on the day.', 'Opens 10:00 on Saturday.'],
    url: 'https://oodihelsinki.fi/en/services/urban-workshop/',
  },
  {
    id: 'kallioeats', name: 'Kallio cheap eats (Vaasankatu / Helsinginkatu)', cat: 'eat', lat: 60.1861, lng: 24.9519,
    hook: 'Helsinki\'s cheapest good food and bars, 3 min from the sauna',
    what: 'Kallio is the old working-class district turned bar-and-student quarter. Food here is cheap: pizza, ramen, kebab, Nepalese, Finnish bar food. A late snack before or after karaoke.',
    cost: '≈ €12–18', costPP: 15, time: '1 h', energy: 1,
    tips: ['Vaasankatu is the lively bar street; Helsinginkatu and Fleminginkatu have the food.'],
  },
  {
    id: 'nom', name: 'NOM Vietnamese Kitchen', cat: 'eat', lat: 60.1628, lng: 24.9418,
    hook: 'Another Vietnamese restaurant, in the Design District',
    what: 'A backup if Quê Em is fully booked. NOM on Iso Roobertinkatu also has a weekend menu.',
    cost: '≈ €20–30', costPP: 25, time: '1 h', energy: 1,
    tips: ['Iso Roobertinkatu is a pedestrian street full of little shops.'],
    url: 'https://www.nomvietnamesekitchen.fi/',
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
    hook: 'Helsinki\'s oldest café (1852) — breakfast & pastries',
    what: 'Classic Finnish bakery-café on Bulevardi. Good for a proper sit-down breakfast if you want one instead of eating in.',
    cost: '≈ €8–20', costPP: 12, time: '45 min', energy: 1, tips: [],
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
    cost: 'Free entry · drinks', costPP: 15, time: '1–2 h', energy: 3, tips: [],
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
    what: 'Streets full of small design shops, vintage stores and cafés between Iso Roobertinkatu and the Esplanade. Good for a slow browse.',
    cost: 'Free to browse', costPP: 0, time: '1 h', energy: 1, tips: ['UFF and other second-hand shops for cheap finds.'],
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
    cost: 'Free (profit!)', costPP: 0, time: '15 min', energy: 3, tips: ['Between the Herring Market and Senate Square on Sunday.'],
  },
];

// The day-by-day plan. Three kinds of step:
//   { t, act: placeId, do }             an activity: numbered, on the map, has a card
//   { t, go: text, icon, place?, open? } logistics: a thin line between activities.
//                                        `place` puts it on the route; `open: true` makes
//                                        it clickable (only the ferry, which has a card)
//   { t, note: text }                   a plain line (breakfast, sleep)
// Any step can carry costPP (+ label) to override or add to the per-person budget.
window.PLAN = {
  fri: {
    label: 'Fri 2 Oct', title: 'Land',
    steps: [
      { t: '22:35', go: 'Land at HEL · I/P train to Central Station, ~30 min (ABC ticket)', icon: '✈️', place: 'airport', costPP: 4.5, label: 'Airport train' },
      { t: 'Night', note: 'Check in, veil on Emma, sleep. Saturday is long.' },
    ],
  },
  sat: {
    label: 'Sat 3 Oct', title: 'The big day',
    steps: [
      { t: '09:30', note: 'Breakfast at home, build Emma\'s tray.' },
      { t: '10:30', go: 'Alko Arkadia for the bubbles (opens 9:00, closed Sunday)', icon: '🛒', place: 'alko', costPP: 4, label: 'Bubbles' },
      { t: '10:45', act: 'bauchladen', do: 'Emma sells her tray to Saturday shoppers.' },
      { t: '12:00', act: 'saigonese', do: 'Lunch at our friend\'s Vietnamese vegan kitchen.' },
      { t: '13:10', go: 'Metro Kamppi → Itäkeskus, 15 min · buy the HSL day ticket', icon: '🚇', place: 'itakeskus', costPP: 11, label: 'HSL day ticket' },
      { t: '13:45', act: 'activate', do: 'One hour of Activate, the four of us as one team.' },
      { t: '14:55', go: 'Metro back to the centre, walk to Market Square', icon: '🚇' },
      { t: '15:20', go: 'Ferry to Suomenlinna from Market Square', icon: '⛴️', place: 'ferry', open: true },
      { t: '15:40', act: 'suomenlinna', do: 'Film both on the sea cliffs, then wander back.' },
      { t: '17:00', go: 'Ferry back to Market Square, tram to Kallio', icon: '⛴️', place: 'ferry', open: true },
      { t: '17:45', act: 'kotiharju', do: 'Vihta, advice and one song each for Emma.' },
      { t: '19:35', go: 'Metro Sörnäinen → Kamppi, ~15 min', icon: '🚇' },
      { t: '20:00', act: 'queem', do: 'Dinner à la carte: a first taste before tomorrow\'s buffet.', cost: 'à la carte ≈ €15–25', costPP: 20 },
      { t: '21:30', go: 'Metro Kamppi → Sörnäinen, walk up to Populus', icon: '🚇' },
      { t: '22:00', act: 'populus', do: 'Karaoke: Emma\'s solo, the group number.' },
    ],
  },
  sun: {
    label: 'Sun 4 Oct', title: 'Herring & home',
    steps: [
      { t: '10:00', go: 'Check out · bags into the Central Station lockers', icon: '🧳', place: 'station', costPP: 5, label: 'Lockers' },
      { t: '10:30', act: 'herring', do: 'Opening day: a light tasting, save room for the buffet.' },
      { t: '11:50', act: 'uspenski', do: 'Up the hill for the harbour view.' },
      { t: '12:20', act: 'senate', do: 'The cathedral, the steps, the group photo.' },
      { t: '12:50', go: 'Tram or a 20-min walk to Kamppi · buy an ABC day ticket (covers the airport)', icon: '🚋', costPP: 12.8, label: 'HSL ABC day ticket' },
      { t: '13:15', act: 'queem', do: 'The €29.90 Vietnamese buffet, finally.', cost: '€29.90 buffet', costPP: 30 },
      { t: '14:45', go: 'Tram to Töölö, ~15 min', icon: '🚋' },
      { t: '15:00', act: 'regatta', do: 'Cinnamon buns and letters to future Emma.' },
      { t: '16:05', act: 'sibelius', do: 'The last group photo.' },
      { t: '16:30', go: 'Tram back to the centre, ~20 min', icon: '🚋' },
      { t: '17:00', act: 'fazer', do: 'Last coffee + chocolate to take home.' },
      { t: '18:45', go: 'Bags from the lockers · train ~19:00 · at HEL by ~19:45 · flight 21:15', icon: '✈️', place: 'airport' },
    ],
  },
};

// Small, cheap rituals that make the trip. Shown in the Moments tab.
window.MOMENTS = [
  { name: 'The champagne spray', cost: '€3–4 each', where: 'suomenlinna',
    how: 'Slow-mo, low angle, sea behind Emma. Shake ~10 s, pop up and away. Do two takes: front and from behind.' },
  { name: 'The dance video', cost: 'Free', where: 'suomenlinna',
    how: 'Emma picks the song; learn 20 seconds of choreography on the ferry over; film it on the ramparts right after the spray. Play it at the wedding.' },
  { name: 'Emma\'s belly-tray shop', cost: '≈ €5', where: 'bauchladen',
    how: 'The German Bauchladen: Emma sells sweets, charms and "one sung line, €2" to strangers. The jar pays for the first karaoke round.' },
  { name: 'Morsiussauna', cost: '≈ €20', where: 'kotiharju',
    how: 'The real Finnish bridal sauna ritual: vihta whisking, one piece of marriage advice and one song from each of you.' },
  { name: 'Polttari bingo', cost: 'Free', where: null,
    how: 'The bingo tab has a card of small dares. First full line picks Emma\'s next karaoke song.' },
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
