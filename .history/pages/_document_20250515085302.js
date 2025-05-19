import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              visibility: hidden !important;
              opacity: 0 !important;
              transition: opacity 0.3s ease-in-out;
            }
            body.modifications-complete {
              visibility: visible !important;
              opacity: 1 !important;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 