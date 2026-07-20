# American Foster Futures Website

A professional, accessible static website for American Foster Futures (AFF) — a national 501(c)(3) nonprofit dedicated to empowering foster youth through advocacy, education, housing, and transitioning support.

## Project Structure

american-foster-futures-website/
├── index.html          # Home / Landing page
├── about.html          # About the organization, Board, History, Values
├── foundation-program.html  # Programs (dropdown; no overview page)
├── get-involved.html        # Contact, Get Involved, Volunteer, Donate forms
├── donate.html         # Dedicated donation options page
├── case-for-support.html  # Full Case for Support (donors & partners)
├── README.md
└── assets/             # images, logo, board photos, stock imagery

## Quick Start

Simply open `index.html` in any modern browser. All styling uses Tailwind CSS via CDN — no build step or dependencies required.

For production:
- Add real logo and photography
- Donation form on donate.html is powered by Zeffy embed (campaign: donate-to-change-lives-18130)
- Add real images for board members and impact
- Connect forms to Formspree, Netlify Forms, or backend
- Deploy to Netlify, Vercel, GitHub Pages, or traditional hosting

## Content Sources

Content is based on:
- American Foster Futures Bylaws (adopted May 15, 2025)
- Business Plan
- Website Design and Text document
- Articles of Incorporation and related filings

## Key Pages / Sections (per design doc)

- Home: Rotating hero, Mission, Youth Impact, Programs teaser, Partners, Stats (3), Donate CTAs, Footer
- About: Board of Directors (Stephen M. Benavides, Ronni Kasper), History, Publications, Financials, AFF in the News
- Programs and Services: National Housing, Education, College Support, Employment, Federal & State-by-State Advocacy, Resources
- Our Approach / Get Involved: Advocacy, Services, Coaching, Donate, Volunteer, Careers, Wish List
- Contact: Info, Map embed, Socials

## Deployment

This is a pure static site (HTML + Tailwind via CDN, no build step). Perfect for Vercel.

### 1. Initialize Git & Push to GitHub (exact commands)

Open **PowerShell** and run:

```powershell
cd "C:\Users\steph\american-foster-futures-website"
git init
git add .
git commit -m "Initial commit: American Foster Futures website"
```

Create the repo on GitHub:
1. Go to https://github.com/new
2. Repository name: `american-foster-futures`
3. Visibility: Public
4. **Do NOT** check "Add a README file"
5. Click "Create repository"

Back in PowerShell (replace `YOUR_USERNAME`):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/american-foster-futures.git
git branch -M main
git push -u origin main
```

(If prompted for password, use a GitHub Personal Access Token: https://github.com/settings/tokens — give it `repo` scope.)

### 2. Deploy to Vercel (exact next steps)

1. Go to https://vercel.com and log in with your GitHub account.
2. Click the **"Add New..."** button → **"Project"**.
3. Find and select the `american-foster-futures` repository.
4. Vercel will auto-detect it as a static site:
   - **Framework Preset**: Other (or leave blank)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Click **"Deploy"**.
6. Your site will be live in ~30 seconds at something like:
   `https://american-foster-futures-abc123.vercel.app`

### After Deployment
- Visit the URL and test all links (home, about dropdown, programs, get-involved, donate, etc.).
- In Vercel dashboard → your project → **Settings → Domains** to add a custom domain later.
- To redeploy: just `git push` — Vercel auto-deploys on push to main.

## Next Steps / TODO

- [ ] Source or design official logo + brand colors
- [ ] Collect high-quality photos (youth (with consent), events, board headshots)
- [ ] Flesh out full board member bios + headshots
- [ ] Gather partner logos and links
- [ ] Real testimonials / youth impact statements (with permission)
- [ ] Add actual financials / 990 links when available
- [ ] SEO, analytics, accessibility audit (WCAG)
- [ ] Add blog / news section

## Contact

Mailing Address: 307 White Oaks Dr., Irving, TX 75060

Email: info@americanfosterfutures.org

---

Built with ❤️ for foster youth futures. Every young person deserves the chance to thrive.
