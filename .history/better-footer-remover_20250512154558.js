const fs = require('fs');
const path = require('path');

// 目标类名 - 注意这里我们寻找包含这些类名的元素
const targetClasses = [
  'Footer_container__kRlyj',
  'Gutter_leftGutter__UWO6t',
  'Gutter_rightGutter__qUzUU',
  'Footer_footer__9S97q' // 添加可能相关的其他类名
];

// 更高效的动态删除脚本 - 用 classList.contains 代替完全匹配
const betterRemoveScript = `
<script>
(function() {
  // 更高效地删除页脚元素
  function removeElements() {
    // 使用更灵活的选择器
    const selectors = [
      '.Footer_container__kRlyj', 
      '.Gutter_leftGutter__UWO6t', 
      '.Gutter_rightGutter__qUzUU',
      '.Footer_footer__9S97q',
      'footer',
      '[class*="Footer_"]', 
      '[class*="Gutter_"]'
    ];
    
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        console.log('删除元素:', selector, el);
        el.remove();
      });
    });
  }
  
  // 立即执行
  removeElements();
  
  // 监听DOM变化
  const observer = new MutationObserver(removeElements);
  observer.observe(document.body, { childList: true, subtree: true });
})();
</script>
`;

// 处理HTML文件
function processHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  
  // 移除旧脚本
  html = html.replace(/<script>\s*function\s*removeFooter[\s\S]*?<\/script>/g, '');
  html = html.replace(/<script>\s*function\s*removeFooterStrict[\s\S]*?<\/script>/g, '');
  
  // 在</body>前插入新脚本
  if (html.includes('</body>')) {
    // 如果页面已经有了相似的脚本，就不再添加
    if (!html.includes('removeElements') && !html.includes('[class*="Footer_"]')) {
      html = html.replace('</body>', betterRemoveScript + '</body>');
      console.log('添加新脚本到:', filePath);
    }
  }
  
  fs.writeFileSync(filePath, html, 'utf8');
}

// 主程序
[
  'index.html',
  'about-us.html',
  'blog.html',
  // 添加其他主要页面
].forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    processHtmlFile(filePath);
  }
});

console.log('完成!'); 