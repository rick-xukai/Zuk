// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 替换文本的函数
    function replaceZueWithZuk() {
        // 获取所有可能包含文本的元素
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, td, th, label, button, input[type="text"], input[type="submit"], input[type="button"]');
        
        textElements.forEach(element => {
            // 排除链接和特定元素
            if (!element.closest('a') && !element.closest('script') && !element.closest('style')) {
                // 检查元素是否包含文本
                if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                    // 替换文本
                    element.textContent = element.textContent.replace(/ZUE/gi, 'ZUK');
                }
            }
        });
    }

    // 初始执行
    replaceZueWithZuk();

    // 监听DOM变化，处理动态加载的内容
    const observer = new MutationObserver(function(mutations) {
        replaceZueWithZuk();
    });

    // 配置观察选项
    const config = { 
        childList: true,    // 观察目标子节点的变化
        subtree: true,      // 观察所有后代节点
        characterData: true // 观察文本内容的变化
    };

    // 开始观察document.body
    observer.observe(document.body, config);
}); 