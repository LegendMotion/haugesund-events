# 🗓 Haugesund Events Scraper

Welcome to the **Haugesund Events Scraper**, a lightweight automated project that keeps track of events happening in and around **Haugesund and Haugalandet** 🇳🇴

This is especially built to serve the **REKOM Haugesund** office by displaying upcoming events on a TV screen — helping bar and nightclub managers stay in the loop on what's going on in the region.

---

## 📌 What it does

✅ Scrapes [fjordnorway.com](https://www.fjordnorway.com/no/arrangementer/haugesund-haugalandet) daily for upcoming events  
✅ Extracts title and date  
✅ Outputs a simple, readable `events.html`  
✅ Hosted with GitHub Pages  
✅ Runs automatically via GitHub Actions  
✅ Styled with REKOM branding 🎨

---

## 🖼 Live View

You can see the updated events here:  
📺 [legendmotion.github.io/haugesund-events/events.html](https://legendmotion.github.io/haugesund-events/events.html)

---

## 💼 Use Case: REKOM Haugesund

This project was made for the **REKOM Haugesund** management office.

> 👥 The goal: Provide a quick overview of cultural events, concerts, quizzes, shows and happenings in our area — so all managers across our venues (bars and nightclubs) can plan around it, collaborate on promotions, and stay informed.

The display is shown on a TV screen inside our office, updating every morning automatically.

---

## 📁 Project Structure

```
.
├── scrape.js       # Scraper powered by Puppeteer
├── style.css       # External CSS file (REKOM colors!)
├── events.html     # Auto-generated output
├── scrape.yml      # GitHub Actions workflow
├── package.json
└── README.md
```

---

## ⚙️ GitHub Actions Workflow

The scraper is run automatically every day at **05:00 UTC** using a GitHub Actions workflow defined in `.github/workflows/scrape.yml`.

It:
1. Installs Puppeteer
2. Launches a headless browser
3. Scrapes the site
4. Generates `events.html`
5. Pushes it to the `main` branch
6. GitHub Pages publishes it ✨

---

## 🎨 Styling

Styled using REKOM's brand colors:
- 🟢 Dark Green: `#122C28` (used as background)
- 🟡 Gold: `#E8BC6A`
- 🟤 Cream: `#F6E9D0`

Typography: Uses **Lexend** for modern and readable text.

---

## 🔧 Setup (for devs)

```bash
git clone https://github.com/LegendMotion/haugesund-events.git
cd haugesund-events
npm install
node scrape.js
```

---

## 🤝 Acknowledgements

Built with passion for Haugesund ❤️  
Made by **[LegendMotion](https://github.com/LegendMotion)**

🤖 Scraping assistance by **ChatGPT**  
🧪 Browser automation by **Puppeteer**

---

  
**– Stay updated. Stay ahead.**
