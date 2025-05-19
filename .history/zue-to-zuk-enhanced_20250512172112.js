// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 替换文本的函数
    function replaceZueWithZuk() {
        // 获取所有可能包含文本的元素
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, td, th, label, button, input[type="text"], input[type="submit"], input[type="button"]');
        
        textElements.forEach(element => {
            // 排除链接和特定元素
            if (!element.closest('a') && !element.closest('script') && !element.closest('style')) {
                // 处理元素的所有文本节点
                const walker = document.createTreeWalker(
                    element,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );

                let node;
                while (node = walker.nextNode()) {
                    // 检查父元素是否是链接
                    if (!node.parentElement.closest('a')) {
                        // 替换文本
                        node.textContent = node.textContent.replace(/ZUE/gi, 'ZUK');
                    }
                }
            }
        });

        // 处理输入框的占位符文本
        document.querySelectorAll('input[placeholder]').forEach(input => {
            if (input.placeholder.includes('ZUE')) {
                input.placeholder = input.placeholder.replace(/ZUE/gi, 'ZUK');
            }
        });

        // 处理按钮文本
        document.querySelectorAll('button').forEach(button => {
            if (button.textContent.includes('ZUE')) {
                button.textContent = button.textContent.replace(/ZUE/gi, 'ZUK');
            }
        });
    }

    // 初始执行
    replaceZueWithZuk();

    // 监听DOM变化，处理动态加载的内容
    const observer = new MutationObserver(function(mutations) {
        let shouldReplace = false;
        
        // 检查是否有相关的变化
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                shouldReplace = true;
            }
        });

        if (shouldReplace) {
            replaceZueWithZuk();
        }
    });

    // 配置观察选项
    const config = { 
        childList: true,    // 观察目标子节点的变化
        subtree: true,      // 观察所有后代节点
        characterData: true // 观察文本内容的变化
    };

    // 开始观察document.body
    observer.observe(document.body, config);

    // 定期检查（处理某些特殊情况）
    setInterval(replaceZueWithZuk, 1000);
}); 