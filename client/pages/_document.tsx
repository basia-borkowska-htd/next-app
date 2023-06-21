import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Next App</title>
      </Head>
      <body className="text-blue-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
