# Concierge Healthcare Coordination — Website

A lightweight, static marketing site for Concierge Healthcare Coordination. Built with plain HTML, CSS, and JavaScript — no build step required. Ready to deploy on Vercel via GitHub.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Single-page site (hero, about, services, offerings, how-it-works, team, contact) |
| `styles.css` | All styling, responsive layout, typography |
| `script.js` | Mobile nav toggle, smooth scroll, contact-form mailto handler |
| `vercel.json` | Cache headers + basic security headers |
| `.gitignore` | Standard ignores |

## Local preview

Open `index.html` in a browser, or run a local server:

```bash
# Python 3
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to Vercel via GitHub

1. Create a new GitHub repository and push these files to it:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:<your-user>/<your-repo>.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new> and import the GitHub repo.
3. When Vercel asks for framework settings, choose **Other** (or let it auto-detect — there is no build step).
   - Build Command: *(leave blank)*
   - Output Directory: *(leave blank — Vercel will serve the repo root)*
4. Click **Deploy**. Your site will be live within ~30 seconds.
5. Optional: add a custom domain under the project's **Domains** tab.

## How the contact form works

The form uses a `mailto:` link that pre-fills the user's email client with their
inquiry and sends it to `info@conciergecareconsultants.org`. This keeps the site
fully static — no server needed.

If you'd like a server-backed form later, Vercel supports serverless functions
(e.g. `/api/contact.js`) that can forward submissions via a service like
Resend, SendGrid, or Formspree. I can wire that up when you're ready.

## Editing content

All site copy lives in `index.html`. Contact details (email, phone, service
area) appear in three places — search for `info@conciergecareconsultants.org`,
`410`, and `Baltimore` to update everything.

The color palette is defined as CSS variables at the top of `styles.css`
(`--teal-900`, `--accent-600`, etc.), so restyling is a one-file edit.
