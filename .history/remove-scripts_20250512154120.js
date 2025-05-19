const fs = require('fs');
const path = require('path');

// 需要删除的脚本内容（精确匹配）
const scriptToRemove = [
  `<script>
function removeFooter() {
  document.querySelectorAll('.Footer_container__kRlyj, .Gutter_leftGutter__UWO6t, .Gutter_rightGutter__qUzUU').forEach(el => el.remove());
}
removeFooter();
const observer = new MutationObserver(removeFooter);
observer.observe(document.body, { childList: true, subtree: true });
</script>`,
  // 包含可能有的其他变体版本
  `<script>
function removeFooterStrict() {
  const classes = ['Footer_container__kRlyj','Gutter_leftGutter__UWO6t','Gutter_rightGutter__qUzUU'];
  classes.forEach(cls => {
    document.querySelectorAll('*[class]').forEach(el => {
      if (el.className.trim() === cls) el.remove();
    });
  });
}
removeFooterStrict();
const observer = new MutationObserver(removeFooterStrict);
observer.observe(document.body, { childList: true, subtree: true });
</script>`,
  // 原始DOMContentLoaded版本
  `<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.Footer_container__kRlyj, .Gutter_leftGutter__UWO6t, .Gutter_rightGutter__qUzUU').forEach(el => el.remove());
});
</script>`
];

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

function processHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let originalHtml = html;
  
  // 删除所有可能的脚本变体
  scriptToRemove.forEach(script => {
    // 处理可能的空格和换行符变化
    const escapedScript = script
      .replace(/\s+/g, '\\s*') // 处理空格和换行符
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 转义正则特殊字符
      
    const regex = new RegExp(escapedScript, 'g');
    html = html.replace(regex, '');
  });
  
  // 更简单的备用方法：删除包含MutationObserver或removeFooter的script标签
  html = html.replace(/<script>\s*function\s*removeFooter[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>\s*function\s*removeFooterStrict[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>\s*document\.addEventListener\(['"]DOMContentLoaded['"][\s\S]*?<\/script>/g, '');
  
  // 只有在发生变化时才写入文件
  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('清理脚本:', filePath);
  }
}

// 主程序
const rootDir = path.resolve(__dirname);
const htmlFiles = getAllHtmlFiles(rootDir);
let count = 0;
htmlFiles.forEach(filePath => {
  try {
    processHtmlFile(filePath);
    count++;
  } catch (err) {
    console.error(`处理文件失败: ${filePath}`, err);
  }
});
console.log(`完成! 处理了 ${count} 个文件。`); 