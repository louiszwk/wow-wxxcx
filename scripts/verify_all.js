// scripts/verify_all.js
const fs = require('fs');
const path = require('path');

const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
const pages = [...appJson.pages];
if (appJson.subpackages) {
  appJson.subpackages.forEach(sub => {
    sub.pages.forEach(p => {
      pages.push(path.join(sub.root, p).replace(/\\/g, '/'));
    });
  });
}

console.log('Auditing', pages.length, 'pages in WeChat Mini-program...');

let totalIssues = 0;

pages.forEach(p => {
  const wxmlPath = p + '.wxml';
  const jsPath = p + '.js';

  if (!fs.existsSync(wxmlPath) || !fs.existsSync(jsPath)) {
    console.error(`[ERROR] Missing file for page: ${p}`);
    totalIssues++;
    return;
  }

  const wxmlContent = fs.readFileSync(wxmlPath, 'utf8');
  const jsContent = fs.readFileSync(jsPath, 'utf8');

  // Match bindtap="xxx", catchtap="xxx", etc.
  const handlerRegex = /(?:bind|catch)(?:tap|change|input|blur|submit)=["']([a-zA-Z0-9_]+)["']/g;
  let match;
  while ((match = handlerRegex.exec(wxmlContent)) !== null) {
    const fnName = match[1];
    // check if fnName is defined in jsContent
    const pattern1 = new RegExp('\\b' + fnName + '\\s*\\(');
    const pattern2 = new RegExp('\\b' + fnName + '\\s*:');
    if (!pattern1.test(jsContent) && !pattern2.test(jsContent)) {
      console.warn(`[WARN] Page ${p}: Handler "${fnName}" called in WXML but not defined in JS!`);
      totalIssues++;
    }
  }
  // Check WXSS
  const wxssPath = p + '.wxss';
  if (fs.existsSync(wxssPath)) {
    const wxssContent = fs.readFileSync(wxssPath, 'utf8');
    if (wxssContent.includes('\\')) {
      console.error(`[ERROR] Page ${p}: WXSS contains illegal backslash character!`);
      totalIssues++;
    }
    let braceCount = 0;
    for (let i = 0; i < wxssContent.length; i++) {
      if (wxssContent[i] === '{') braceCount++;
      if (wxssContent[i] === '}') braceCount--;
    }
    if (braceCount !== 0) {
      console.error(`[ERROR] Page ${p}: WXSS unbalanced curly braces!`);
      totalIssues++;
    }
  }
});

if (totalIssues === 0) {
  console.log('✅ ALL PAGES & WXSS VERIFIED: 0 missing handlers, 0 broken bindings, 0 WXSS errors!');
} else {
  console.log(`⚠️ Audit finished with ${totalIssues} issue(s).`);
}
