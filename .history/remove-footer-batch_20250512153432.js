const fs = require('fs');
const path = require('path');

// 需要处理的class
const targetClasses = [
  'Footer_container__kRlyj',
  'Gutter_leftGutter__UWO6t',
  'Gutter_rightGutter__qUzUU',
];

// 移除脚本
const removeScript = `\n<script>\ndocument.addEventListener('DOMContentLoaded', function() {\n  document.querySelectorAll('.Footer_container__kRlyj, .Gutter_leftGutter__UWO6t, .Gutter_rightGutter__qUzUU').forEach(el => el.remove());\n});\n</script>\n`;

// 递归查找所有html文件
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
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

// 删除包含目标class的元素
function removeTargetElements(html) {
  // 构造正则，匹配包含任意目标class的标签
  const classPattern = targetClasses.map((cls) => `(?=.*${cls})`).join('');
  const regex = new RegExp(
    `<([a-zA-Z0-9]+)([^>]*class=["'][^"']*${classPattern}[^"']*["'][^>]*)>([\s\S]*?)<\/\\1>`,
    'g'
  );
  return html.replace(regex, '');
}

function processHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  // 1. 删除静态元素
  targetClasses.forEach((cls) => {
    // 匹配带有该class的任意标签（简单处理，适合静态导出）
    const reg = new RegExp(
      `<([a-zA-Z0-9]+)([^>]*class=["'][^"']*${cls}[^"']*["'][^>]*)>([\s\S]*?)<\/\\1>`,
      'g'
    );
    html = html.replace(reg, '');
  });
  // 2. 插入移除脚本
  if (!html.includes('document.querySelectorAll') && html.includes('</body>')) {
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
