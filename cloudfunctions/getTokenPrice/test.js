const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.wowhead.com/guide/classes/death-knight/blood/bis-gear').then(r => {
  const $ = cheerio.load(r.data);
  const items = [];
  $('table').first().find('tr').each((i, el) => {
    const cols = $(el).find('td');
    if (cols.length > 1) {
      const slot = $(cols[0]).text().trim();
      const item = $(cols[1]).text().trim();
      items.push({slot, item});
    }
  });
  console.log(items);
}).catch(console.error);
