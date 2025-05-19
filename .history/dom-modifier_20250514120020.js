// 添加样式来隐藏页面
function addHideStyles() {
  // 立即添加内联样式到 head 中，确保在页面加载最开始就生效
  const immediateStyle = document.createElement('style');
  immediateStyle.textContent = `
    body {
      visibility: hidden !important;
      opacity: 0 !important;
      transition: opacity 0.3s ease-in-out;
    }
  `;
  document.head.insertBefore(immediateStyle, document.head.firstChild);

  // 添加完整的样式
  const style = document.createElement('style');
  style.textContent = `
    body {
      visibility: hidden !important;
      opacity: 0 !important;
      transition: opacity 0.3s ease-in-out;
    }
    body.modifications-complete {
      visibility: visible !important;
      opacity: 1 !important;
    }
    /* 确保在页面加载过程中内容不会闪烁 */
    html {
      visibility: hidden;
    }
    html.modifications-complete {
      visibility: visible;
    }
  `;
  document.head.appendChild(style);
}

// 创建一个函数来执行所有DOM修改
function modifyDOM() {
  console.log('执行 DOM 修改...');

  // 修改页面标题和图标
  document.title = 'Zuk';
  const link =
    document.querySelector("link[rel~='icon']") ||
    document.createElement('link');
  link.rel = 'icon';
  link.href = '/images/favicon.ico';
  document.head.appendChild(link);

  // 替换文本内容
  function walkAndReplaceText(node) {
    // 跳过脚本和样式标签
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      if (tagName === 'script' || tagName === 'style') {
        return;
      }
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      // 使用正则表达式进行大小写不敏感的替换
      if (text.toLowerCase().includes('zue')) {
        node.textContent = text.replace(/zue/gi, 'zuk');
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // 处理 input 和 textarea 的 value 属性
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        if (node.value && node.value.toLowerCase().includes('zue')) {
          node.value = node.value.replace(/zue/gi, 'zuk');
        }
      }

      // 处理 placeholder 属性
      if (node.placeholder && node.placeholder.toLowerCase().includes('zue')) {
        node.placeholder = node.placeholder.replace(/zue/gi, 'zuk');
      }

      // 处理 title 属性
      if (node.title && node.title.toLowerCase().includes('zue')) {
        node.title = node.title.replace(/zue/gi, 'zuk');
      }

      // 处理 alt 属性
      if (node.alt && node.alt.toLowerCase().includes('zue')) {
        node.alt = node.alt.replace(/zue/gi, 'zuk');
      }

      // 递归处理子节点
      for (let child of node.childNodes) {
        walkAndReplaceText(child);
      }
    }
  }

  // 修改 shadow DOM
  const allElements = document.querySelectorAll('*');
  allElements.forEach((element) => {
    if (element.shadowRoot) {
      const dialog = element.shadowRoot.querySelector('dialog');
      if (dialog) {
        const h3 = dialog.querySelector('h3');
        const a = dialog.querySelector('a');
        if (h3) h3.textContent = 'zuk';
        if (a) a.textContent = 'zuk';
      }
    }
  });

  // 更新各个容器的内容
  const mobileLogoContainer = document.querySelector(
    '.MobileNav_logoWrapper__zEKug'
  );
  const desktopLogoContainer = document.querySelector(
    '.DesktopNav_logoContainer__yLiJx'
  );
  const zuk3DContainer = document.querySelector('.Zue3D_container__pQWrQ');
  const homeDesktopBg = document.querySelector('.Home_desktopBg__2AtsY');
  const homeLaptopMedia = document.querySelector('.Home_laptopMedia__IPPL1');
  const homePedestalMaskedImage = document.querySelector(
    '.Home_pedestalMaskedImage__Hjbwl'
  );
  const hoverCardsNoiseWrapper = document.querySelector(
    '.HoverCards_noiseWrapper__WEJNP'
  );
  const homeFeatureVideoMask = document.querySelector(
    '.Home_featureVideoMask__3bea8'
  );
  const desktopNavRightTabs = document.querySelector(
    '.DesktopNav_rightTabs__ZNHO2'
  );

  if (mobileLogoContainer) {
    mobileLogoContainer.innerHTML = `
    <a class="MobileNav_logoWrapper__zEKug_new" aria-label="Full zuk Logo" data-sentry-element="Link" data-sentry-source-file="index.tsx" href="https://zuk.ac/">
      <svg width="488.40112" height="169.47885" viewBox="0 0 129.22279 44.841281" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg">
        <defs id="defs1"></defs>
        <g id="layer1" transform="translate(-72.500923,-744.80227)">
          <path d="m 75.262405,746.51253 v 1.24966 h 22.244052 l -23.077163,40.40587 h 34.657396 v -1.24968 H 86.842641 l 23.077169,-40.40585 z m 36.740205,27.65926 c 0,8.91428 6.49826,14.82937 16.16235,14.82937 5.74845,0 11.4136,-4.16554 13.74631,-10.08063 v 4.91535 c 0,2.99919 1.16636,4.33218 3.91562,4.33218 h 6.16502 v -41.65553 h -0.41655 l -9.58078,7.74792 -0.0833,20.91108 c -1.66622,5.49852 -5.41522,8.74766 -10.33056,8.74766 -6.08171,0 -9.58077,-3.83231 -9.58077,-10.4972 v -26.90946 h -0.41655 l -9.58078,7.74792 z" id="text1-zu" style="font-size: 86.9017px; font-family: Milky; fill: currentColor; fill-rule: evenodd; stroke-width: 0.312416;" aria-label="zu"></path>
          <path d="m 165.73818,746.51253 v 41.65553 h 10.08063 v -18.99631 l 12.24725,18.99631 h 11.29995 l -15.99659,-21.91066 15.99659,-19.74487 h -11.29995 l -12.24725,18.24662 v -18.24662 z" id="text1-k" style="font-size: 86.9017px; font-family: Milky; fill: currentColor; fill-rule: evenodd; stroke-width: 0.312416;" aria-label="k"></path>
        </g>
      </svg>
    </a>`;
  }

  if (desktopLogoContainer) {
    desktopLogoContainer.innerHTML = `
    <a class="DesktopNav_logo__Tzy9w_new" aria-label="Full Zuk Logo" data-sentry-element="Link" data-sentry-source-file="index.tsx" href="https://zuk.ac/">
      <svg width="488.40112" height="169.47885" viewBox="0 0 129.22279 44.841281" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg">
        <defs id="defs1"></defs>
        <g id="layer1" transform="translate(-72.500923,-744.80227)">
          <path d="m 75.262405,746.51253 v 1.24966 h 22.244052 l -23.077163,40.40587 h 34.657396 v -1.24968 H 86.842641 l 23.077169,-40.40585 z m 36.740205,27.65926 c 0,8.91428 6.49826,14.82937 16.16235,14.82937 5.74845,0 11.4136,-4.16554 13.74631,-10.08063 v 4.91535 c 0,2.99919 1.16636,4.33218 3.91562,4.33218 h 6.16502 v -41.65553 h -0.41655 l -9.58078,7.74792 -0.0833,20.91108 c -1.66622,5.49852 -5.41522,8.74766 -10.33056,8.74766 -6.08171,0 -9.58077,-3.83231 -9.58077,-10.4972 v -26.90946 h -0.41655 l -9.58078,7.74792 z" id="text1-zu" style="font-size: 86.9017px; font-family: Milky; fill: currentColor; fill-rule: evenodd; stroke-width: 0.312416;" aria-label="zu"></path>
          <path d="m 165.73818,746.51253 v 41.65553 h 10.08063 v -18.99631 l 12.24725,18.99631 h 11.29995 l -15.99659,-21.91066 15.99659,-19.74487 h -11.29995 l -12.24725,18.24662 v -18.24662 z" id="text1-k" style="font-size: 86.9017px; font-family: Milky; fill: currentColor; fill-rule: evenodd; stroke-width: 0.312416;" aria-label="k"></path>
        </g>
      </svg>
    </a>`;
  }

  if (zuk3DContainer) {
    zuk3DContainer.innerHTML = `
    <div class="Zue3D_mask__UL60O_new">
      <div class="Zue3D_noise__TTC66"></div>
      <div class="Zue3D_gradient__T8FG6" style="--mouse-x: 0; --mouse-y: 0"></div>
    </div>`;
  }

  if (homeDesktopBg) {
    homeDesktopBg.innerHTML = `
    <img alt="" data-sentry-element="NextImage" data-sentry-source-file="index.tsx" fetchPriority="high" width="1920" height="1644" decoding="async" data-nimg="1" class="Image_placeholder__uf5AB_new Image_themeLight__GCSlz" style="color: transparent" sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px" src="https://zue.ai/_next/image?url=%2Fimages%2Fnew_hero.webp&w=3840&q=90" />`;
  }

  if (homeLaptopMedia) {
    homeLaptopMedia.innerHTML = `
    <img alt="laptop" data-sentry-element="NextImage" data-sentry-source-file="index.tsx" fetchPriority="high" width="2560" height="1971" decoding="async" data-nimg="1" class="Image_themeLight__GCSlz" style="color: transparent" sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px" src="https://zue.ai/_next/image?url=%2Fimages%2Fzue_laptop.webp&w=3840&q=90" />`;
  }

  if (homePedestalMaskedImage) {
    const imgContent = homePedestalMaskedImage.lastElementChild;
    homePedestalMaskedImage.style.maskImage =
      'url("https://zue.ai/images/pedestal-mask.svg")';
    imgContent.innerHTML = `
    <img alt="pedestal" data-sentry-element="NextImage" data-sentry-source-file="index.tsx" fetchPriority="high" width="2560" height="1199" decoding="async" data-nimg="1" class="Image_themeLight__GCSlz" style="color: transparent" sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px" src="https://zue.ai/_next/image?url=%2Fimages%2Fzue_pedestal.webp&w=3840&q=90" />`;
  }

  if (hoverCardsNoiseWrapper) {
    hoverCardsNoiseWrapper.innerHTML = `
    <img alt="" loading="lazy" width="1920" height="946" decoding="async" data-nimg="1" class="HoverCards_bg__j34Oj HoverCards_activeBg__FKq7b" style="color: transparent" src="https://zue.ai/_next/image?url=%2Fimages%2Fgradients-new%2F1.webp&w=3840&q=75" />`;
  }

  if (
    desktopNavRightTabs &&
    !desktopNavRightTabs.querySelector('.twitter-button-added')
  ) {
    desktopNavRightTabs.insertAdjacentHTML(
      'beforeend',
      `
    <div class="twitter-button-added">
      <button class="DesktopNav_tab__0rFZ8">
        <a href="https://x.com/ZUK_MCPAI" target="_blank" rel="noopener noreferrer" class="Footer_socialIconLink__YYgZK undefined" aria-label="Zuk's Twitter page">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-sentry-element="svg" data-sentry-component="TwitterIconAlt" data-sentry-source-file="index.tsx">
            <path d="M21.8496 22.7227H20.2051L9.4668 8.68359H11.2324L21.8496 22.7227Z" fill="currentColor" data-sentry-element="path" data-sentry-source-file="index.tsx"></path>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8359 32 32 24.8369 32 16C32 7.16309 24.8359 0 16 0C7.16406 0 0 7.16309 0 16C0 24.8369 7.16406 32 16 32ZM24.2168 7H21.248L16.3555 12.5918L12.125 7H6L13.3203 16.5713L6.38281 24.5H9.35352L14.707 18.3818L19.3867 24.5H25.3594L17.7305 14.4131L24.2168 7Z" fill="currentColor" data-sentry-element="path" data-sentry-source-file="index.tsx"></path>
          </svg>
        </a>
      </button>
    </div>`
    );
  }

  if (homeFeatureVideoMask) {
    homeFeatureVideoMask.innerHTML = `
    <div>
      <img src="/images/big-logo.jpg" alt="big-logo" width="1920" height="1080" />
    </div>`;
  }

  if (document.documentElement) {
    document.documentElement.style.setProperty(
      'background',
      'var(--theme-bg)',
      'important'
    );
  }

  // 执行文本替换
  walkAndReplaceText(document.body);
}

// 显示页面
function showPage() {
  document.documentElement.classList.add('modifications-complete');
  document.body.classList.add('modifications-complete');
}

// 等待所有资源加载完成
function waitForAllResources() {
  return new Promise((resolve) => {
    let attempts = 0;
    const maxAttempts = 20; // 最多等待 2 秒

    const checkScripts = () => {
      attempts++;
      const scripts = Array.from(document.getElementsByTagName('script'));
      const nextScripts = scripts.filter(
        (script) =>
          script.src &&
          (script.src.includes('_next/static') ||
            script.src.includes('_next/data') ||
            script.src.includes('_next/script'))
      );

      // 检查所有 Next.js 脚本是否都已加载完成
      const allLoaded = nextScripts.every(
        (script) =>
          script.readyState === 'complete' ||
          script.readyState === 'loaded' ||
          script.readyState === 'interactive'
      );

      if (allLoaded || attempts >= maxAttempts) {
        resolve();
      } else {
        setTimeout(checkScripts, 100);
      }
    };

    checkScripts();
  });
}

// 主函数
async function init() {
  console.log('初始化开始...');

  try {
    // 添加隐藏样式
    addHideStyles();

    // 等待所有资源加载完成
    console.log('开始等待资源加载...');
    await waitForAllResources();

    console.log('资源加载完成，开始执行修改...');

    // 执行修改
    modifyDOM();

    // 使用 MutationObserver 监听后续的 DOM 变化
    console.log('设置 DOM 观察器...');
    const observer = new MutationObserver((mutations, obs) => {
      modifyDOM();

      // 如果已经执行了多次，就停止观察
      if (window.modifyDOMCount > 5) {
        console.log('达到最大执行次数，停止观察');
        obs.disconnect();
        // 显示页面
        showPage();
      }
      window.modifyDOMCount = (window.modifyDOMCount || 0) + 1;
    });

    // 开始观察
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // 设置超时，确保页面最终会显示
    setTimeout(() => {
      showPage();
    }, 2000);

    console.log('初始化完成');
  } catch (error) {
    console.error('初始化过程中发生错误:', error);
    // 即使出错也尝试执行修改
    console.log('尝试执行基本修改...');
    modifyDOM();
    // 显示页面
    showPage();
  }
}

// 确保在页面完全加载后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// 作为备份，在 window load 事件中也执行一次
window.addEventListener('load', init);
