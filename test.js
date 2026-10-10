const fs = require('fs');
const content = fs.readFileSync('C:\\\\Users\\\\文康\\\\.gemini\\\\antigravity-ide\\\\brain\\\\9195b5c0-bea2-4567-b2d9-fa1f7b407148\\\\.system_generated\\\\steps\\\\916\\\\content.md', 'utf-8');
const regex = /<div class="h-6 flex justify-center items-center" style="background-color: [^"]*">([SABCD])<\/div>\s*<div class="h-6 flex justify-center items-center" style="[^"]*" title="(\d+) average[^"]*">[^<]*<\/div>\s*<div class="h-6 flex justify-center items-center" style="[^"]*" title="(\d+) top[^"]*">[^<]*<\/div>\s*<div class="h-6 flex justify-center items-center" title="[^"]*" style="[^"]*">([\d,K\.]+)<\/div>.*?<span class="pl-1 capitalize whitespace-nowrap">(.*?)<\/span>/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log(match[1], match[2], match[3], match[4], match[5].trim());
}
