import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => (
  <Html lang="en">
    <Head>
      <meta name="description" content="Application to control your weight" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
    </Head>
    <title>Next App</title>
    <body className="text-blue-300">
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
