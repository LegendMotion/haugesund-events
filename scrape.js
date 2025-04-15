const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.fjordnorway.com/no/arrangementer/haugesund-haugalandet', {
    waitUntil: 'networkidle2',
    timeout: 0
  });

  await page.waitForSelector('[data-testid="teaser-list"] a');

  const events = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('[data-testid="teaser-list"] a'));
    return anchors.slice(0, 5).map(a => {
      const title = a.querySelector('[data-testid="teaser-title"]')?.textContent?.trim() || 'Uten tittel';
      const link = a.href;
      const time = a.querySelector('time')?.getAttribute('datetime') || null;
      return { title, link, time };
    });
  });

  const html = `<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <title>Kommende Arrangementer</title>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --brand-dark: #20322F;
      --brand-light: #F7ECDA;
      --brand-accent: #E8C070;
    }
    body {
      margin: 0;
      font-family: 'Lexend', sans-serif;
      background-color: var(--brand-dark);
      color: var(--brand-light);
      padding: 20px;
      font-size: 1.5em;
    }
    h1 {
      font-size: 2.2em;
      color: var(--brand-accent);
      margin-bottom: 0.5em;
    }
    .event {
      margin-bottom: 1.2em;
      border-left: 4px solid var(--brand-accent);
      padding-left: 15px;
    }
    .event-title {
      font-weight: 500;
      color: var(--brand-light);
      text-decoration: none;
    }
    .event-time {
      font-size: 0.9em;
      color: var(--brand-accent);
    }
    a { text-decoration: none; }
  </style>
</head>
<body>
  <h1>Haugesund-arrangementer</h1>
  ${events.map(ev => `
    <div class="event">
      <a href="${ev.link}" class="event-title" target="_blank">${ev.title}</a><br>
      <span class="event-time">${ev.time ? new Date(ev.time).toLocaleString('no-NO', { dateStyle: 'medium', timeStyle: 'short' }) : 'Ukjent tidspunkt'}</span>
    </div>
  `).join('')}
</body>
</html>`;

  fs.writeFileSync('events.html', html);
  await browser.close();
})();
