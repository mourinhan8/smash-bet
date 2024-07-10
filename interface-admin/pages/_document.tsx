import Document, { Head, Html, Main, NextScript } from "next/document";

import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* <link rel="icon" href="/svg/logo.svg" /> */}
          <link href="https://api.fontshare.com/css?f[]=cabinet-grotesk@800&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />          
        </body>
      </Html>
    );
  }
}

export default MyDocument;
