const fs = require('fs');
const path = require('path');

// 递归查找所有html文件
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // 排除 node_modules 和 .git 目录
      if (file !== 'node_modules' && file !== '.git') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// 清理文件中的所有脚本
function cleanScriptsFromFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const originalHtml = html;
  
  // 查找和删除所有移除页脚的脚本段
  const scriptsToRemove = [
    // 完整脚本匹配
    /<script>\s*\(function\(\) \{\s*\/\/ 更高效地删除页脚元素[\s\S]*?<\/script>/g,
    /<script>\s*function\s*removeFooter[\s\S]*?<\/script>/g,
    /<script>\s*function\s*removeFooterStrict[\s\S]*?<\/script>/g,
    /<script>\s*document\.addEventListener\(['"]DOMContentLoaded['"][\s\S]*?<\/script>/g,
    
    // 更精确的匹配
    /<script>[\s\S]*?Footer_container__kRlyj[\s\S]*?<\/script>/g,
    /<script>[\s\S]*?Gutter_leftGutter__UWO6t[\s\S]*?<\/script>/g,
    /<script>[\s\S]*?Gutter_rightGutter__qUzUU[\s\S]*?<\/script>/g,
    /<script>[\s\S]*?removeElements[\s\S]*?<\/script>/g,
    /<script>[\s\S]*?MutationObserver[\s\S]*?<\/script>/g
  ];
  
  // 逐个应用正则表达式
  for (const regex of scriptsToRemove) {
    html = html.replace(regex, '');
  }
  
  // 只有在文件内容有变化时才写入
  if (html !== originalHtml) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

// 主程序
const rootDir = path.resolve(__dirname);
const htmlFiles = getAllHtmlFiles(rootDir);
let cleanedCount = 0;

htmlFiles.forEach(filePath => {
  try {
    const cleaned = cleanScriptsFromFile(filePath);
    if (cleaned) {
      console.log(`已清理: ${filePath}`);
      cleanedCount++;
    }
  } catch (err) {
    console.error(`处理文件出错: ${filePath}`, err);
  }
});

console.log(`完成! 共清理了 ${cleanedCount} 个文件的脚本。`); 