const puppeteer = require('puppeteer');
const path = require('path');

const SAVE_DIR = path.resolve(__dirname);
const URL = 'http://127.0.0.1:3333/index.html';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to', URL);
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 30000 });

  console.log('Waiting 4 seconds for fonts and assets...');
  await sleep(4000);

  // Screenshot 1: Hero section (scroll 0)
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
  const hero = path.join(SAVE_DIR, 'hero_final.png');
  await page.screenshot({ path: hero, fullPage: false });
  console.log('✅ Saved:', hero);

  // Screenshot 2: scroll 1000
  await page.evaluate(() => window.scrollTo(0, 1000));
  await sleep(2000);
  const s1000 = path.join(SAVE_DIR, 'scroll_1000.png');
  await page.screenshot({ path: s1000, fullPage: false });
  console.log('✅ Saved:', s1000);

  // Screenshot 3: scroll 2200
  await page.evaluate(() => window.scrollTo(0, 2200));
  await sleep(2000);
  const s2200 = path.join(SAVE_DIR, 'scroll_2200.png');
  await page.screenshot({ path: s2200, fullPage: false });
  console.log('✅ Saved:', s2200);

  // Screenshot 4: scroll 4000
  await page.evaluate(() => window.scrollTo(0, 4000));
  await sleep(2000);
  const s4000 = path.join(SAVE_DIR, 'scroll_4000.png');
  await page.screenshot({ path: s4000, fullPage: false });
  console.log('✅ Saved:', s4000);

  // Screenshot 5: bottom
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(2000);
  const sBottom = path.join(SAVE_DIR, 'scroll_bottom.png');
  await page.screenshot({ path: sBottom, fullPage: false });
  console.log('✅ Saved:', sBottom);

  await browser.close();
  console.log('\nAll screenshots saved to:', SAVE_DIR);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
