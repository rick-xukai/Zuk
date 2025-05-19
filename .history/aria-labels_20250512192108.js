// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 定义需要添加aria-label的元素和对应的标签
  const ariaLabels = {
    // 导航元素
    'nav': 'Main navigation',
    'button[aria-expanded]': 'Toggle navigation menu',
    
    // 主要内容区域
    'main': 'Main content',
    'article': 'Article content',
    
    // 表单元素
    'input[type="text"]': 'Text input field',
    'input[type="email"]': 'Email input field',
    'input[type="tel"]': 'Telephone input field',
    'textarea': 'Text area input',
    'button[type="submit"]': 'Submit button',
    
    // 图片
    'img[alt=""]': 'Decorative image',
    
    // 链接
    'a[href^="tel:"]': 'Call phone number',
    'a[href^="mailto:"]': 'Send email',
    
    // 社交媒体图标
    'a[href*="facebook"]': 'Visit our Facebook page',
    'a[href*="twitter"]': 'Visit our Twitter page',
    'a[href*="linkedin"]': 'Visit our LinkedIn page',
    
    // 功能按钮
    'button[aria-label="Close"]': 'Close dialog',
    'button[aria-label="Menu"]': 'Open menu',
    
    // 搜索相关
    'input[type="search"]': 'Search input field',
    'button[type="search"]': 'Search button',
    
    // 页脚元素
    'footer': 'Page footer',
    'footer a': 'Footer link'
  };

  // 添加aria-label的函数
  function addAriaLabels() {
    for (const [selector, label] of Object.entries(ariaLabels)) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (!element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', label);
        }
      });
    }
  }

  // 创建MutationObserver来监听DOM变化
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        addAriaLabels();
      }
    });
  });

  // 配置observer
  const config = {
    childList: true,
    subtree: true
  };

  // 开始观察
  observer.observe(document.body, config);

  // 初始添加aria-labels
  addAriaLabels();
}); 