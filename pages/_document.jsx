import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
          <meta name="theme-color" content="#052e2b" />
          <style>{`
            body { font-family: 'Poppins','Nunito',ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol",sans-serif; }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
