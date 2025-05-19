const fs = require('fs');
const path = require('path');

// 精确匹配的class
const targetClasses = [
  'Footer_container__kRlyj',
  'Gutter_leftGutter__UWO6t',
  'Gutter_rightGutter__qUzUU',
];

// 动态移除脚本（只移除class精确等于的元素）
const removeScript = `\n<script>\nfunction removeFooterStrict() {\n  const classes = ['Footer_container__kRlyj','Gutter_leftGutter__UWO6t','Gutter_rightGutter__qUzUU'];\n  classes.forEach(cls => {\n    document.querySelectorAll('*[class]').forEach(el => {\n      if (el.className.trim() === cls) el.remove();\n    });\n  });\n}\nremoveFooterStrict();\nconst observer = new MutationObserver(removeFooterStrict);\nobserver.observe(document.body, { childList: true, subtree: true });\n</script>\n`;

// 递归查找所有html文件
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// 删除class精确等于目标class的元素
function removeStrictClassElements(html) {
  targetClasses.forEach(cls => {
    // 匹配class精确等于cls的标签
    const reg = new RegExp(`<([a-zA-Z0-9]+)([^>]*class=["']${cls}["'][^>]*)>([\s\S]*?)<\/\\1>`, 'g');
    html = html.replace(reg, '');
  });
  return html;
}

function processHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  // 1. 删除静态元素
  html = removeStrictClassElements(html);
  // 2. 插入移除脚本
  if (!html.includes('removeFooterStrict') && html.includes('</body>')) {
    html = html.replace('</body>', removeScript + '</body>');
  }
  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Processed:', filePath);
}

// 主程序
const rootDir = path.resolve(__dirname);
const htmlFiles = getAllHtmlFiles(rootDir);
htmlFiles.forEach(processHtmlFile);
console.log('批量处理完成！');
