const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('https://www.fjordnorway.com/no/arrangementer/haugesund-haugalandet', {
    waitUntil: 'networkidle'
  });

  const events = await page.$$eval('[data-testid="cards-list"] > div', divs =>
    divs.map(el => {
      const title = el.querySelector('h3')?.innerText.trim() || 'Ukjent arrangement';
      const date = el.querySelector('[data-testid="date"]')?.innerText.trim() || '';
      const location = el.querySelector('[data-testid="location"]')?.innerText.trim() || '';
      return { title, date, location };
    })
  );

  let html = `<html><head>
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
    <style>
      body { background: #121212; color: white; font-family: 'Lexend', sans-serif; padding: 2rem; }
      h1 { font-size: 2rem; margin-bottom: 1rem; }
      .event { margin-bottom: 1.5rem; }
      .title { font-size: 1.2rem; font-weight: bold; }
      .meta { font-size: 0.9rem; color: #bbb; }
    </style></head><body><h1>Kommende arrangementer i Haugesund</h1>`;

  if (events.length === 0) {
    html += `<p>Ingen arrangementer funnet.</p>`;
  } else {
    for (const e of events) {
      html += `<div class="event">
        <div class="title">${e.title}</div>
        <div class="meta">${e.date} – ${e.location}</div>
      </div>`;
    }
  }

  html += '</body></html>';

  fs.writeFileSync('events.html', html);
  await browser.close();
})();
