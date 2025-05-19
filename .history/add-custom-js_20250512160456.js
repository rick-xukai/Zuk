const fs = require('fs');
const path = require('path');

// 递归查找所有HTML文件
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // 排除 node_modules 和 .git 目录
      if (file !== 'node_modules' && file !== '.git' && file !== '.history') {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// 向HTML文件添加自定义JavaScript链接
function addCustomJsToFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  
  // 检查文件是否已包含自定义JS链接
  if (html.includes('custom-scripts.js')) {
    console.log(`跳过 ${filePath} - 已包含自定义JS`);
    return false;
  }
  
  // 获取相对路径 - 计算相对于当前文件的路径
  let relativePath = path.relative(path.dirname(filePath), process.cwd());
  // 确保路径有正确的分隔符格式
  relativePath = relativePath.replace(/\\/g, '/');
  // 如果是当前目录，就设置为.
  if (relativePath === '') {
    relativePath = '.';
  }
  
  // 创建JS链接标签
  const jsLink = `<script src="${relativePath}/custom-scripts.js" defer></script>`;
  
  // 在</body>标签前插入JS链接
  const updatedHtml = html.replace('</body>', `${jsLink}\n</body>`);
  
  // 如果内容有变化才写入
  if (html !== updatedHtml) {
    fs.writeFileSync(filePath, updatedHtml, 'utf8');
    return true;
  }
  
  return false;
}

// 主程序
const rootDir = path.resolve(__dirname);
const htmlFiles = getAllHtmlFiles(rootDir);
let updatedCount = 0;

htmlFiles.forEach(filePath => {
  try {
    const updated = addCustomJsToFile(filePath);
    if (updated) {
      console.log(`已更新: ${filePath}`);
      updatedCount++;
    }
  } catch (err) {
    console.error(`处理文件出错: ${filePath}`, err);
  }
});

console.log(`完成! 已向 ${updatedCount} 个HTML文件添加自定义JS链接。`); 