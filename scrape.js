const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://www.fjordnorway.com/no/arrangementer/haugesund-haugalandet', {
    waitUntil: 'networkidle0',
    timeout: 60000
  });

  try {
    await page.waitForSelector('a.group.block.analytics-categorylist-item', { timeout: 20000 });
  } catch (e) {
    console.warn('Fant ikke arrangementer – kanskje ingen tilgjengelige akkurat nå.');
  }

  const events = await page.evaluate(() => {
    const items = document.querySelectorAll('a.group.block.analytics-categorylist-item');
    return Array.from(items).map(item => {
      const title = item.querySelector('h2')?.innerText || 'Uten tittel';
      const time = item.querySelector('.text-sm')?.innerText || '';
      const link = item.href?.startsWith('http') ? item.href : `https://www.fjordnorway.com${item.getAttribute('href')}`;
      return { title, time, link };
    });
  });

const html = `
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <title>Arrangementer i Haugesund</title>
  <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
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
