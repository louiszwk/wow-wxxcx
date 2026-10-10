const fs = require('fs');
const html = fs.readFileSync('d:/file/weixinxcx-w/cloudfunctions/getTokenPrice/wow_news2.html', 'utf8');

const regex = /<img[^>]*src="([^"]+)"[^>]*>[\s\S]*?<div class="title">([^<]+)<\/div>[\s\S]*?<div class="desc">([^<]+)<\/div>[\s\S]*?<a href="([^"]+)"><\/a>/g;

let match;
let count = 0;
while((match = regex.exec(html)) !== null && count < 10) {
  console.log('Title:', match[2].trim());
  console.log('Desc:', match[3].trim());
  console.log('Link:', match[4]);
  console.log('---');
  count++;
}
