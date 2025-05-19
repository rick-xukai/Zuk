const fs = require('fs');
const path = require('path');

// 要添加的脚本内容
const scriptContent = `
    <script>
      window.onload = function () {
        setTimeout(() => {
          function modifyShadowDomH1() {
            const allElements = document.querySelectorAll('*');

            allElements.forEach((element) => {
              if (element.shadowRoot) {
                const dialog = element.shadowRoot.querySelector('dialog');

                if (dialog) {
                  const h3 = dialog.querySelector('h3');
                  const a = dialog.querySelector('a');
                  if (h3) {
                    h3.textContent = 'zuk';
                  }
                  if (a) {
                    a.textContent = 'zuk';
                  }
                }
              }
            });
          }
          modifyShadowDomH1();
        }, 1500);

        setTimeout(() => {
          document.title = 'Zuk';

          const link =
            document.querySelector("link[rel~='icon']") ||
            document.createElement('link');

          link.rel = 'icon';
          link.href = '/images/favicon.ico';

          document.head.appendChild(link);

          const desktopLogoContainer = document.querySelector(
            '.DesktopNav_logoContainer__yLiJx'
          );
          const mobileLogoContainer = document.querySelector(
            '.MobileNav_logoWrapper__zEKug'
          );
          const zue3DContainer = document.querySelector(
            '.Zue3D_container__pQWrQ'
          );
          const homeDesktopBg = document.querySelector(
            '.Home_desktopBg__2AtsY'
          );
          const homeLaptopMedia = document.querySelector(
            '.Home_laptopMedia__IPPL1'
          );
          const homePedestalMaskedImage = document.querySelector(
            '.Home_pedestalMaskedImage__Hjbwl'
          );
          const hoverCardsNoiseWrapper = document.querySelector(
            '.HoverCards_noiseWrapper__WEJNP'
          );
          const homeFeatureVideoMask = document.querySelector(
            '.Home_featureVideoMask__3bea8'
          );

          if (mobileLogoContainer) {
            mobileLogoContainer.innerHTML = \`
              <a
                class="MobileNav_logoWrapper__zEKug_new"
                aria-label="Full Zue Logo"
                data-sentry-element="Link"
                data-sentry-source-file="index.tsx"
                href="index.html"
              >
                <svg width="488.40112" height="169.47885" viewBox="0 0 129.22279 44.841281" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg">
                  <defs id="defs1"></defs>
                  <g id="layer1" transform="translate(-72.500923,-744.80227)">
                    <path
                      d="m 75.262405,746.51253 v 1.24966 h 22.244052 l -23.077163,40.40587 h 34.657396 v -1.24968 H 86.842641 l 23.077169,-40.40585 z m 36.740205,27.65926 c 0,8.91428 6.49826,14.82937 16.16235,14.82937 5.74845,0 11.4136,-4.16554 13.74631,-10.08063 v 4.91535 c 0,2.99919 1.16636,4.33218 3.91562,4.33218 h 6.16502 v -41.65553 h -0.41655 l -9.58078,7.74792 -0.0833,20.91108 c -1.66622,5.49852 -5.41522,8.74766 -10.33056,8.74766 -6.08171,0 -9.58077,-3.83231 -9.58077,-10.4972 v -26.90946 h -0.41655 l -9.58078,7.74792 z"
                      id="text1-zu"
                      style="font-size: 86.9017px; font-family: Milky; fill: currentColor; fill-rule: evenodd; stroke-width: 0.312416;"
                      aria-label="zu">
                    </path>
                    
                    <path 
                      d="m 165.73818,746.51253 v 41.65553 h 10.08063 v -18.99631 l 12.24725,18.99631 h 11.29995 l -15.99659,-21.91066 15.99659,-19.74487 h -11.29995 l -12.24725,18.24662 v -18.24662 z"
                      id="text1-k"
                      style="font-size: 86.9017px; font-family: Milky; fill: currentColor; fill-rule: evenodd; stroke-width: 0.312416;"
                      aria-label="k">  
                    </path>
                  </g>
                </svg>
              </a>
            \`;
          }

          if (desktopLogoContainer) {
            desktopLogoContainer.innerHTML = \`
              <a
                class="DesktopNav_logo__Tzy9w_new"
                aria-label="Full Zuk Logo"
                data-sentry-element="Link"
                data-sentry-source-file="index.tsx"
                href="index.html"
              >
                <svg width="488.40112" height="169.47885" viewBox="0 0 129.22279 44.841281" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg">
                  <defs id="defs1"></defs>
                  <g id="layer1" transform="translate(-72.500923,-744.80227)">
                    <path
                      d="m 75.262405,746.51253 v 1.24966 h 22.244052 l -23.077163,40.40587 h 34.657396 v -1.24968 H 86.842641 l 23.077169,-40.40585 z m 36.740205,27.65926 c 0,8.91428 6.49826,14.82937 16.16235,14.82937 5.74845,0 11.4136,-4.16554 13.74631,-10.08063 v 4.91535 c 0,2.99919 1.16636,4.33218 3.91562,4.33218 h 6.16502 v -41.65553 h -0.41655 l -9.58078,7.74792 -0.0833,20.91108 c -1.66622,5.49852 -5.41522,8.74766 -10.33056,8.74766 -6.08171,0 -9.58077,-3.83231 -9.58077,-10.4972 v -26.90946 h -0.41655 l -9.58078,7.74792 z"
                      id="text1-zu"
                      style="font-size: 86.9017px; font-family: Milky; fill: currentColor; fill-rule: evenodd; stroke-width: 0.312416;"
                      aria-label="zu">
                    </path>
                    
                    <path 
                      d="m 165.73818,746.51253 v 41.65553 h 10.08063 v -18.99631 l 12.24725,18.99631 h 11.29995 l -15.99659,-21.91066 15.99659,-19.74487 h -11.29995 l -12.24725,18.24662 v -18.24662 z"
                      id="text1-k"
                      style="font-size: 86.9017px; font-family: Milky; fill: currentColor; fill-rule: evenodd; stroke-width: 0.312416;"
                      aria-label="k">  
                    </path>
                  </g>
                </svg>
              </a>
            \`;
          }

          if (zue3DContainer) {
            zue3DContainer.innerHTML = \`
              <div class="Zue3D_mask__UL60O_new">
                <div class="Zue3D_noise__TTC66"></div>
                <div
                  class="Zue3D_gradient__T8FG6"
                  style="--mouse-x: 0; --mouse-y: 0"
                ></div>
              </div>
            \`;
          }

          if (homeDesktopBg) {
            homeDesktopBg.innerHTML = \`
              <img
                alt=""
                data-sentry-element="NextImage"
                data-sentry-source-file="index.tsx"
                fetchPriority="high"
                width="1920"
                height="1644"
                decoding="async"
                data-nimg="1"
                class="Image_placeholder__uf5AB_new Image_themeLight__GCSlz"
                style="color: transparent"
                sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px"
                src="https://zue.ai/_next/image?url=%2Fimages%2Fnew_hero.webp&w=3840&q=90"
              />
            \`;
          }

          if (homeLaptopMedia) {
            homeLaptopMedia.innerHTML = \`
              <img
                alt="laptop"
                data-sentry-element="NextImage"
                data-sentry-source-file="index.tsx"
                fetchPriority="high"
                width="2560"
                height="1971"
                decoding="async"
                data-nimg="1"
                class="Image_themeLight__GCSlz"
                style="color: transparent"
                sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px"
                src="https://zue.ai/_next/image?url=%2Fimages%2Fzue_laptop.webp&w=3840&q=90"
              />
            \`;
          }

          if (homePedestalMaskedImage) {
            const imgContent = homePedestalMaskedImage.lastElementChild;
            homePedestalMaskedImage.style.maskImage =
              'url("https://zue.ai/images/pedestal-mask.svg")';
            imgContent.innerHTML = \`
              <img
                alt="pedestal"
                data-sentry-element="NextImage"
                data-sentry-source-file="index.tsx"
                fetchPriority="high"
                width="2560"
                height="1199"
                decoding="async"
                data-nimg="1"
                class="Image_themeLight__GCSlz"
                style="color: transparent"
                sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1440px) 1440px"
                src="https://zue.ai/_next/image?url=%2Fimages%2Fzue_pedestal.webp&w=3840&q=90"
              />
            \`;
          }

          if (hoverCardsNoiseWrapper) {
            hoverCardsNoiseWrapper.innerHTML = \`
              <img
                alt=""
                loading="lazy"
                width="1920"
                height="946"
                decoding="async"
                data-nimg="1"
                class="HoverCards_bg__j34Oj HoverCards_activeBg__FKq7b"
                style="color: transparent"
                src="https://zue.ai/_next/image?url=%2Fimages%2Fgradients-new%2F1.webp&w=3840&q=75"
              />
            \`;
          }
        }, 500);
      };
    </script>`;

// 获取当前目录下的所有 HTML 文件
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));

// 处理每个 HTML 文件
htmlFiles.forEach(file => {
  console.log(`Processing ${file}...`);
  
  // 读取文件内容
  let content = fs.readFileSync(file, 'utf8');
  
  // 在 </head> 标签前插入脚本
  content = content.replace('</head>', `${scriptContent}\n</head>`);
  
  // 写回文件
  fs.writeFileSync(file, content, 'utf8');
  
  console.log(`Finished processing ${file}`);
});

console.log('All files have been processed successfully!'); 