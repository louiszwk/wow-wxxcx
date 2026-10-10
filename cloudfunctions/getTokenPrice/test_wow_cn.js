const axios = require('axios');
const cheerio = require('cheerio');

async function test() {
  const r = await axios.get('https://wow.blizzard.cn/news');
  const $ = cheerio.load(r.data);
  const items = [];
  $('.News-item, .news-item').each((i, el) => {
    items.push($(el).text().trim().replace(/\s+/g, ' '));
  });
  console.log('News found:', items.slice(0,5));
}
test();
