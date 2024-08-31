import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="google-site-verification" content="l4Rj7RvbWhkai55xypVGOioTVdDoHBQ0KBkJ2tl7jXs" />
          {/* Other meta tags, styles, or scripts can go here */}
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
