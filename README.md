# Helsinki, Emma edition

Trip plan + map for 2–4 October 2026. Live at **https://southocean.github.io/emma-bachelorette/**.

- `data.js` — every place, both plans, the packing list, bingo squares and bills. Edit this to change the site.
- `app.js` / `styles.css` / `index.html` — the page (vanilla JS + Leaflet, no build step).
- Local preview: `node tools/serve.js` → http://localhost:5178

Push to `main` and GitHub Pages redeploys in about a minute.

## Two modes

The site opens on the trip as it happened (`ACTUAL`, pink: Plan, Gallery, Swish). The 📜 button
in the header switches to the original plan (`PLAN`, blue: Plan, Bingo, Packing, Budget).

## Adding things after the trip

- **Photos on an activity:** `python tools/media.py activate photo1.png photo2.jpg ...` resizes them into
  `media/activate/`, makes the square thumbnails, strips the metadata (GPS included) and prints the
  `media: [...]` line to put on that place in `data.js`. They show on the card and in the Gallery.
- **A bill (Swish tab):** an entry in `BILLS`:
  `{ by: 'jane', what: 'Allas tickets', eur: 96, date: '2026-10-03', photo: 'media/bills/allas.jpg' }`.
  Split evenly between all four unless `for: ['tracy', 'jane', 'nam']` says otherwise.
