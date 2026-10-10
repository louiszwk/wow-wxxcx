const axios = require('axios');
const Parser = require('rss-parser');

async function test() {
  try {
    const response = await axios.get('https://www.wowhead.com/news/rss/all', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*; q=0.8'
      },
      timeout: 8000
    });
    
    console.log('Status:', response.status);
    const parser = new Parser();
    const feed = await parser.parseString(response.data);
    console.log('Fetched titles:');
    feed.items.slice(0, 3).forEach(item => {
      console.log('-', item.title);
    });
  } catch(e) {
    console.error('Error:', e.message);
  }
}
test();
