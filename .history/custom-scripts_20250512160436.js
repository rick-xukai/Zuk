// 全站自定义JavaScript - 在DOM完全加载后执行
(function() {
  // DOM完全加载后操作元素的主函数 
  function customizeWebsite() {
    console.log('[自定义脚本] 开始执行');
    
    // 1. 删除页脚相关元素
    removeElementsBySelectors([
      '.Footer_container__kRlyj', 
      '.Gutter_leftGutter__UWO6t', 
      '.Gutter_rightGutter__qUzUU',
      '.Footer_footer__9S97q',
      'footer',
      '[class*="Footer_"]', 
      '[class*="Gutter_"]'
    ]);
    
    // 2. 设置MutationObserver以处理动态加载的元素
    setupDOMObserver();
    
    console.log('[自定义脚本] 初始清理完成');
  }
  
  // 根据选择器列表删除元素
  function removeElementsBySelectors(selectors) {
    selectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          console.log(`[自定义脚本] 找到 ${elements.length} 个 "${selector}" 元素`);
          elements.forEach(el => el.remove());
        }
      } catch (err) {
        console.error(`[自定义脚本] 删除 "${selector}" 元素出错:`, err);
      }
    });
  }
  
  // 设置MutationObserver监听DOM变化
  function setupDOMObserver() {
    // 要移除的选择器列表
    const targetSelectors = [
      '.Footer_container__kRlyj', 
      '.Gutter_leftGutter__UWO6t', 
      '.Gutter_rightGutter__qUzUU',
      '.Footer_footer__9S97q',
      'footer',
      '[class*="Footer_"]', 
      '[class*="Gutter_"]'
    ];
    
    // 创建一个观察器实例
    const observer = new MutationObserver(function(mutations) {
      let needsCleaning = false;
      
      // 检查是否添加了新节点
      mutations.forEach(mutation => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          needsCleaning = true;
        }
      });
      
      // 如果有新节点，运行清理
      if (needsCleaning) {
        console.log('[自定义脚本] 检测到DOM变化，重新清理');
        removeElementsBySelectors(targetSelectors);
      }
    });
    
    // 配置观察选项
    const config = { 
      childList: true, // 观察目标子节点的变化
      subtree: true    // 观察所有后代节点
    };
    
    // 开始观察document.body
    observer.observe(document.body, config);
    console.log('[自定义脚本] DOM观察器已设置');
  }
  
  // 当DOM内容加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', customizeWebsite);
  } else {
    // 如果DOM已经加载完成，立即执行
    customizeWebsite();
  }
  
  // 确保在window.onload后也执行一次，处理所有资源（图片等）加载后可能出现的动态内容
  window.addEventListener('load', function() {
    setTimeout(customizeWebsite, 500); // 延迟500ms再次执行，确保处理晚期渲染的元素
  });
})(); 