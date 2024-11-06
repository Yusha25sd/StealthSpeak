import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <meta name="google-site-verification" content="xvskkePTf1ruCMyeNnrOF2Va1x2O7rWaGOtf5B97BSY" />
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
