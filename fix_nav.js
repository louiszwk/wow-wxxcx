const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const pages = fs.readdirSync(pagesDir);

pages.forEach(page => {
  const pageDir = path.join(pagesDir, page);
  if (!fs.statSync(pageDir).isDirectory()) return;

  const jsFile = path.join(pageDir, `${page}.js`);
  const wxmlFile = path.join(pageDir, `${page}.wxml`);
  const wxssFile = path.join(pageDir, `${page}.wxss`);

  if (fs.existsSync(jsFile)) {
    let jsContent = fs.readFileSync(jsFile, 'utf8');
    
    // Add to data if not exists
    if (!jsContent.includes('navBarHeight:')) {
      jsContent = jsContent.replace(/data:\s*\{/, 'data: {\n    navBarHeight: 0,\n    menuButtonTop: 0,\n    menuButtonHeight: 0,');
    }

    // Add to onLoad
    if (!jsContent.includes('app.globalData.navBarHeight')) {
      jsContent = jsContent.replace(/(onLoad(?:\s*(?:function\s*)?\([\w\s,]*\))?\s*\{)/, 
        `$1\n    const app = getApp();\n    if (app.globalData) {\n      this.setData({\n        navBarHeight: app.globalData.navBarHeight,\n        menuButtonTop: app.globalData.menuButtonTop,\n        menuButtonHeight: app.globalData.menuButtonHeight\n      });\n    }\n`
      );
    }
    
    fs.writeFileSync(jsFile, jsContent, 'utf8');
  }

  if (fs.existsSync(wxmlFile)) {
    let wxmlContent = fs.readFileSync(wxmlFile, 'utf8');
    
    // For nav-header
    if (wxmlContent.includes('class="nav-header"')) {
      wxmlContent = wxmlContent.replace(/<view class="nav-header" bindtap="navigateBack">/g, 
        `<view class="nav-header" bindtap="navigateBack" style="margin-top: {{menuButtonTop}}px; height: {{menuButtonHeight}}px; line-height: {{menuButtonHeight}}px;">`
      );
    }
    
    // For bis-detail nav-back
    if (wxmlContent.includes('class="nav-back"')) {
      wxmlContent = wxmlContent.replace(/<view class="nav-back" bindtap="navigateBack">/g, 
        `<view class="nav-back" bindtap="navigateBack" style="margin-top: {{menuButtonTop}}px; height: {{menuButtonHeight}}px; line-height: {{menuButtonHeight}}px;">`
      );
    }
    
    // For index header
    if (page === 'index') {
       wxmlContent = wxmlContent.replace(/<view class="header">/g, 
         `<view class="header" style="padding-top: {{navBarHeight}}px;">`
       );
    }
    
    fs.writeFileSync(wxmlFile, wxmlContent, 'utf8');
  }

  if (fs.existsSync(wxssFile)) {
    let wxssContent = fs.readFileSync(wxssFile, 'utf8');
    
    // Remove conflicting margin/padding from nav-header
    wxssContent = wxssContent.replace(/padding:\s*40px\s*0\s*20px;/g, 'padding: 0 0 20px;'); // token, news, bis
    wxssContent = wxssContent.replace(/margin-top:\s*-10rpx;/g, ''); // topmeta, meta, loot
    wxssContent = wxssContent.replace(/padding:\s*20rpx\s*60rpx\s*20rpx\s*10rpx;/g, 'padding: 0 60rpx 0 10rpx;');
    
    // Index header
    if (page === 'index') {
       wxssContent = wxssContent.replace(/padding:\s*100rpx\s*40rpx;/g, 'padding: 0 40rpx 40rpx;');
    }
    
    fs.writeFileSync(wxssFile, wxssContent, 'utf8');
  }
});
console.log('Done modifying files for nav bar adjustments.');
