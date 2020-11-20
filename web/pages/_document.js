import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="assets/js/vendors.bundle.js"></script>
          <script src="assets/js/scripts.bundle.js"></script>
        </body>
      </Html>
    )
  }
}
