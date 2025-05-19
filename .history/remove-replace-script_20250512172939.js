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

// 从HTML文件中删除替换脚本
function removeScriptFromFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    const originalHtml = html;
    
    // 删除完整的替换脚本
    html = html.replace(/<script>\/\/ 全局文本替换脚本[\s\S]*?<\/script>/g, '');
    
    // 如果内容有变化才写入
    if (html !== originalHtml) {
        fs.writeFileSync(filePath, html, 'utf8');
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
        const updated = removeScriptFromFile(filePath);
        if (updated) {
            console.log(`已清理: ${filePath}`);
            updatedCount++;
        }
    } catch (err) {
        console.error(`处理文件出错: ${filePath}`, err);
    }
});

console.log(`完成! 已从 ${updatedCount} 个HTML文件中删除替换脚本。`); 