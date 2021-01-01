import React from "react"
import Layout from "../components/Layout"
import objectFitImages from "object-fit-images"

import "@fortawesome/fontawesome-free/css/all.min.css"

import "../scss/style.default.scss"

const App = ({ Component, pageProps }) => {
  React.useEffect(() => {
    objectFitImages()
  }, [])

  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

// This default export is required in a new `pages/_app.js` file.
export default App
