const fs = require('fs');
const path = require('path');

// 读取自定义脚本内容
const scriptContent = fs.readFileSync('nextjs-customizer.js', 'utf8');

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

// 向HTML文件注入脚本
function injectScriptToFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // 检查文件是否已包含脚本
    if (html.includes('nextjs-customizer.js')) {
        console.log(`跳过 ${filePath} - 已包含脚本`);
        return false;
    }
    
    // 创建内联脚本标签
    const scriptTag = `<script>${scriptContent}</script>`;
    
    // 在</body>标签前插入脚本
    const updatedHtml = html.replace('</body>', `${scriptTag}\n</body>`);
    
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
        const updated = injectScriptToFile(filePath);
        if (updated) {
            console.log(`已更新: ${filePath}`);
            updatedCount++;
        }
    } catch (err) {
        console.error(`处理文件出错: ${filePath}`, err);
    }
});

console.log(`完成! 已向 ${updatedCount} 个HTML文件注入Next.js自定义脚本。`); 