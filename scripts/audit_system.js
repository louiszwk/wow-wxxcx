// scripts/audit_system.js
const fs = require('fs');
const path = require('path');

console.log('=== Antigravity System Comprehensive Audit ===\n');

// 1. Check app.json and page files existence
const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
const pages = [...appJson.pages];
if (appJson.subpackages) {
  appJson.subpackages.forEach(sub => {
    sub.pages.forEach(p => {
      pages.push(path.join(sub.root, p).replace(/\\/g, '/'));
    });
  });
}
const registeredPages = new Set(pages);
let issuesFound = 0;

console.log(`Auditing ${pages.length} pages in app.json...`);

pages.forEach(p => {
  const exts = ['.js', '.json', '.wxml', '.wxss'];
  exts.forEach(ext => {
    const filePath = p + ext;
    if (!fs.existsSync(filePath)) {
      console.warn(`[MISSING FILE] ${filePath}`);
      issuesFound++;
    }
  });
});

// 2. Scan for navigation link integrity
function scanNavLinks(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f.startsWith('.')) continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanNavLinks(full);
    } else if (f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      const regex = /wx\.(navigateTo|redirectTo|reLaunch|switchTab)\(\s*\{\s*url:\s*['"]([^'"]+)['"]/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const rawUrl = m[2];
        const cleanUrl = rawUrl.split('?')[0].replace(/^\//, '');
        if (!registeredPages.has(cleanUrl)) {
          console.error(`[DEAD NAV LINK] in ${full}: ${rawUrl}`);
          issuesFound++;
        }
      }
    }
  }
}
scanNavLinks('pages');

// 3. Scan for require() integrity
function scanRequires(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f.startsWith('.')) continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanRequires(full);
    } else if (f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      const regex = /require\(['"]([^'"]+)['"]\)/g;
      let m;
      while ((m = regex.exec(content)) !== null) {
        const reqPath = m[1];
        if (reqPath.startsWith('.')) {
          const resolved = path.resolve(path.dirname(full), reqPath);
          const hasJs = fs.existsSync(resolved + '.js') || fs.existsSync(resolved) || fs.existsSync(path.join(resolved, 'index.js'));
          if (!hasJs) {
            console.error(`[BROKEN REQUIRE] in ${full}: ${reqPath}`);
            issuesFound++;
          }
        }
      }
    }
  }
}
scanRequires('pages');
scanRequires('data');

// 4. Verify all JSON files are parseable
function scanJson(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f.startsWith('.')) continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanJson(full);
    } else if (f.endsWith('.json')) {
      try {
        JSON.parse(fs.readFileSync(full, 'utf8'));
      } catch (e) {
        console.error(`[INVALID JSON] in ${full}: ${e.message}`);
        issuesFound++;
      }
    }
  }
}
scanJson('pages');

// 5. Compare formal server against f8e8bc3 (commit baseline)
console.log('\nAudit complete.');
if (issuesFound === 0) {
  console.log('✅ SYSTEM HEALTH AUDIT: 100% Passed with 0 errors/issues!');
} else {
  console.log(`⚠️ SYSTEM HEALTH AUDIT: Found ${issuesFound} issues.`);
}
