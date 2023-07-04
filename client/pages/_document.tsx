import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en">
    <Head>
      <meta name="description" content="Application to control your weight" />
    </Head>
    <title>Next App</title>
    <body className="text-blue-300">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
