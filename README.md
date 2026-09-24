# QR Digital Menu

## Run
    npm install
    npm run dev        # open the local link it prints

## Build for hosting (Vercel / Netlify)
    npm run build      # output is in /dist

## Edit your menu
Everything (name, logo, categories, items, prices, images, footer info) is in `src/menuData.js`.
Put your logo in `public/` and set `STORE.logo` to "/logo.png".

## Compress photos
Put originals in `raw-images/`, run `npm run images`, then use "/images/<name>.webp" in menuData.js.
