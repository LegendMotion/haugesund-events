# Haugesund Events Scraper 🎤🎸

📍 **Automatically scrapes upcoming events in Haugesund** from [fjordnorway.com](https://www.fjordnorway.com/no/arrangementer/haugesund-haugalandet), and publishes them as a public webpage, refreshed daily via GitHub Actions.

> Used to help local bars and nightclubs stay ahead of the city's buzz 🕺🍻

---

## 🌐 Live View

🖥️ [View the latest events list](https://legendmotion.github.io/haugesund-events/events.html)  
(*auto-updated every day at 05:00 UTC*)

---

## ⚙️ How It Works

1. `scrape.js` uses [Puppeteer](https://pptr.dev/) to open the events page
2. It extracts the **top 5 events**, including:
   - 🎫 Event title
   - 🕒 Date & time
   - 🔗 Link to more info
3. The output is a styled `events.html` file
4. GitHub Actions runs daily to update the file and commit it to `main`
5. GitHub Pages serves the final result

---

## 📦 Tech Stack

- [Node.js](https://nodejs.org/)
- [Puppeteer](https://pptr.dev/) (headless Chrome)
- [GitHub Actions](https://github.com/features/actions)
- [GitHub Pages](https://pages.github.com/)

---

## 🛠️ Usage

### Run manually (for testing):

\`\`\`bash
npm install puppeteer
node scrape.js
\`\`\`

This will generate a local `events.html` file.

### Customize or contribute?

Feel free to fork, adapt, and use in your own town!

---

## 💡 Why This Exists

We use this at the office to keep track of how **busy Haugesund will be**, especially across our bars and nightclubs. It’s like a local radar for nightlife, concerts, and culture.

---

## 📖 License

This project is open-source under the [MIT License](LICENSE).

Feel free to reuse, remix, or improve it!

---

## 👤 Creator

Built with ❤️ by [@LegendMotion](https://github.com/LegendMotion)  
If you use this or build something cool on top of it, let me know!
