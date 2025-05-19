// 等待Next.js hydration完成的脚本
(function() {
    // 检查Next.js hydration是否完成
    function isHydrated() {
        // 检查是否存在Next.js特有的属性
        return document.documentElement.hasAttribute('data-nextjs-root') ||
               document.querySelector('[data-nextjs-scroll-focus-boundary]') !== null;
    }

    // 等待Next.js hydration完成
    function waitForHydration() {
        return new Promise((resolve) => {
            if (isHydrated()) {
                resolve();
                return;
            }

            // 创建观察器监听DOM变化
            const observer = new MutationObserver((mutations, obs) => {
                if (isHydrated()) {
                    obs.disconnect();
                    resolve();
                }
            });

            // 开始观察
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true
            });

            // 设置超时，防止无限等待
            setTimeout(() => {
                observer.disconnect();
                resolve();
            }, 5000);
        });
    }

    // 执行自定义操作
    function customizePage() {
        console.log('[自定义脚本] 开始执行');

        // 1. 删除页脚相关元素
        const footerSelectors = [
            '.Footer_container__kRlyj',
            '.Gutter_leftGutter__UWO6t',
            '.Gutter_rightGutter__qUzUU',
            '.Footer_footer__9S97q',
            'footer',
            '[class*="Footer_"]',
            '[class*="Gutter_"]'
        ];

        footerSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                console.log(`[自定义脚本] 删除元素: ${selector}`);
                el.remove();
            });
        });

        // 2. 修改样式
        const styleOverrides = `
            /* 隐藏页脚相关元素 */
            .Footer_container__kRlyj,
            .Gutter_leftGutter__UWO6t,
            .Gutter_rightGutter__qUzUU,
            .Footer_footer__9S97q,
            footer,
            [class*="Footer_"],
            [class*="Gutter_"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                position: absolute !important;
                overflow: hidden !important;
                z-index: -9999 !important;
            }

            /* 在这里添加其他样式覆盖 */
        `;

        // 添加样式
        const styleElement = document.createElement('style');
        styleElement.textContent = styleOverrides;
        document.head.appendChild(styleElement);

        // 3. 监听动态加载的内容
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    shouldUpdate = true;
                }
            });

            if (shouldUpdate) {
                // 重新执行删除操作
                footerSelectors.forEach(selector => {
                    document.querySelectorAll(selector).forEach(el => el.remove());
                });
            }
        });

        // 配置观察选项
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('[自定义脚本] 初始化完成');
    }

    // 主函数
    async function init() {
        try {
            // 等待Next.js hydration完成
            await waitForHydration();
            console.log('[自定义脚本] Next.js hydration 完成');
            
            // 执行自定义操作
            customizePage();
            
            // 定期检查（处理某些特殊情况）
            setInterval(customizePage, 1000);
        } catch (error) {
            console.error('[自定义脚本] 初始化失败:', error);
        }
    }

    // 启动脚本
    init();
})(); 