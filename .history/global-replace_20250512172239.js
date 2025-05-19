// 全局文本替换脚本
(function() {
    // 替换文本的函数
    function replaceText() {
        // 使用 TreeWalker 遍历所有文本节点
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // 排除脚本和样式中的文本
                    if (node.parentElement.closest('script') || 
                        node.parentElement.closest('style') ||
                        node.parentElement.closest('a')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes('ZUE')) {
                node.textContent = node.textContent.replace(/ZUE/gi, 'ZUK');
            }
        }

        // 处理输入框的占位符
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

    // 立即执行一次
    replaceText();

    // 监听DOM变化
    const observer = new MutationObserver(function(mutations) {
        let shouldReplace = false;
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                shouldReplace = true;
            }
        });
        if (shouldReplace) {
            replaceText();
        }
    });

    // 配置观察选项
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    // 定期检查
    setInterval(replaceText, 1000);
})(); 