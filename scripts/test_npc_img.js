const https = require('https');

https.get('https://www.wowhead.com/npc=188244', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const iconMatch = data.match(/"icon":"([^"]+)"/);
    const ogImg = data.match(/property="og:image" content="([^"]+)"/);
    console.log('iconMatch:', iconMatch ? iconMatch[1] : null);
    console.log('ogImg:', ogImg ? ogImg[1] : null);
  });
}).on('error', err => console.log('err:', err.message));
