# Deploying abhisekhshakya.com.np — Cloudflare Pages

The site is a Vite + React app. Build output is `dist/` (already verified).

---

## Part 1 — Put the site on Cloudflare Pages (10 minutes, free)

### Option A — direct upload (no GitHub needed)

1. Install the CLI once: `npm install -D wrangler`
2. Log in: `npx wrangler login` (opens your browser, asks to authorize)
3. Build and deploy:
   ```
   npm run build
   npx wrangler pages deploy dist --project-name abhisekh-shakya
   ```
4. You immediately get a live URL like `https://abhisekh-shakya.pages.dev`.
   Open it, check the site, then continue to Part 2.

### Option B — GitHub connected (auto-deploys on every push)

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Build settings: **Framework preset** Vite · **Build command** `npm run build` · **Output directory** `dist`.
4. Save and deploy.

---

## Part 2 — Get abhisekhshakya.com.np (free, from register.com.np)

Personal .np domains are free but **must be based on your own name** —
`abhisekhshakya.com.np` qualifies; a invented brand name would be rejected.

### Before you apply, prepare these

1. **Scan your citizenship certificate** (or passport / licence / voter card).
   PDF or JPEG, **under 200 KB**, sharp and complete — blurry or oversized
   scans are the most common rejection reason.
2. **Cover letter** — scan a signed copy of this (adjust the date):

   > Date: 2026-…-…
   >
   > To,
   > The Hostmaster
   > Mercantile Communications Pvt. Ltd.
   > Durbar Marg, Kathmandu
   >
   > Subject: Application for new domain registration — abhisekhshakya.com.np
   >
   > Dear Sir/Madam,
   >
   > I, Abhisekh Shakya, son of Nanda Kumar Shakya, resident of Lalitpur
   > Metropolitan City, would like to register the domain
   > **abhisekhshakya.com.np** under my name for a personal portfolio website.
   > The domain is based on my own name as per the registration policy. I have
   > enclosed a scanned copy of my citizenship certificate for verification.
   >
   > Thank you.
   >
   > Sincerely,
   > Abhisekh Shakya
   > +977-9869562978 · shakyaabhisekh466@gmail.com

3. **Two working nameservers** — you get these from Cloudflare first (Part 3).

### Application steps

1. Create an account at **register.com.np** — your name exactly as on citizenship.
2. Search `abhisekhshakya.com.np` → apply.
3. Upload the citizenship scan and signed cover letter.
4. Enter the two Cloudflare nameservers (from Part 3).
5. Submit. Approval usually takes hours to a few days.
   They email you; you can also watch status in your dashboard.
   Note: since Dec 2024 domains need periodic **reverification** — keep the
   email valid and respond when asked.

---

## Part 3 — Wire the domain to Cloudflare

1. Cloudflare dashboard → **Add a domain** → enter `abhisekhshakya.com.np`
   → Free plan.
2. Cloudflare assigns you two nameservers, e.g.
   `alex.ns.cloudflare.com` and `bella.ns.cloudflare.com`
   (yours will differ — copy exactly what is shown).
3. Use those two nameservers in the register.com.np application (Part 2, step 4).
4. After the .np registry approves and activates the domain, Cloudflare sees
   the nameservers go live and the zone activates.
5. In your Pages project → **Custom domains** → Set up → `abhisekhshakya.com.np`.
   Cloudflare issues the SSL certificate automatically (usually minutes).
6. Also add `www.abhisekhshakya.com.np` as a second custom domain and let
   Cloudflare redirect it to the apex.

That's it — the portfolio is live on your own name, HTTPS included, for free.

---

## Updating the site later

- Edit anything in `src/`, then `npm run build` and
  `npx wrangler pages deploy dist --project-name abhisekh-shakya`
  (or just `git push` if you chose Option B).
- Photos and the CV live in `public/assets/` — replace a file, rebuild, deploy.
- The CV linked on the site is `public/assets/abhisekh-shakya-cv.pdf`
  (v7, October 2026).

## Notes

- Fonts (Clash Display, General Sans) are self-hosted in `public/fonts/` —
  no third-party font CDN is called. `public/og.png` is the social share card.
- `old-site/` holds the first static version, kept for reference — it is not
  deployed and can be deleted.
