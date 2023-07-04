import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en">
    <Head>
      <title>Next App</title>
      <meta name="description" content="Application to control your weight" />
    </Head>
    <body className="text-blue-300">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
