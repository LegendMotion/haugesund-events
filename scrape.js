const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.fjordnorway.com/no/arrangementer/haugesund-haugalandet', {
    waitUntil: 'networkidle',
    timeout: 60000
  });

  // Vent på at arrangementene faktisk vises
  await page.waitForSelector('.results article', { timeout: 15000 });

  const events = await page.evaluate(() => {
    const items = document.querySelectorAll('.results article');
    return Array.from(items).map(item => {
      const title = item.querySelector('h3')?.innerText || 'Uten tittel';
      const time = item.querySelector('time')?.innerText || '';
      return { title, time };
    });
  });

  const html = `
  <!DOCTYPE html>
  <html lang="no">
  <head>
    <meta charset="UTF-8">
    <title>Arrangementer i Haugesund</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
    <style>
      body {
        background: #121212;
        color: white;
        font-family: 'Lexend', sans-serif;
        padding: 2rem;
      }
      h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
        color: #ffde59;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #333;
      }
      .date {
        font-size: 0.9rem;
        color: #999;
      }
    </style>
  </head>
  <body>
    <h1>Kommende arrangementer i Haugesund</h1>
    <ul>
      ${events.map(e => `<li><strong>${e.title}</strong><br><span class="date">${e.time}</span></li>`).join('')}
    </ul>
  </body>
  </html>
  `;

  fs.writeFileSync('events.html', html);
  await browser.close();
})();
