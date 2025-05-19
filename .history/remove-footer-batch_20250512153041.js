const fs = require('fs');
const path = require('path');

// 需要处理的class
const targetClasses = [
  'Footer_container__kRlyj',
  'Gutter_leftGutter__UWO6t',
  'Gutter_rightGutter__qUzUU',
];

// 更强力的动态移除脚本
const removeScript = `\n<script>\nfunction removeFooter() {\n  document.querySelectorAll('.Footer_container__kRlyj, .Gutter_leftGutter__UWO6t, .Gutter_rightGutter__qUzUU').forEach(el => el.remove());\n}\nremoveFooter();\nconst observer = new MutationObserver(removeFooter);\nobserver.observe(document.body, { childList: true, subtree: true });\n</script>\n`;

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

// 删除包含目标class的元素（不要求顺序）
function removeTargetElements(html) {
  // 匹配class属性包含任意目标class的标签
  const classRegex = new RegExp(`<([a-zA-Z0-9]+)([^>]*class=["'][^"']*(?:${targetClasses.join('|')})[^"']*["'][^>]*)>([\s\S]*?)<\/\\1>`, 'gi');
  return html.replace(classRegex, '');
}

function processHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  // 1. 删除静态元素
  html = removeTargetElements(html);
  // 2. 插入移除脚本
  if (!html.includes('MutationObserver') && html.includes('</body>')) {
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