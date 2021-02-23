import React from "react";
import Layout from "../components/Layout";

import "../scss/style.default.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faWifi, faPrint, faFan, faLock, faShower, faBars, faSearch, faTimes, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faBars, faSearch, faTimes, faWifi, faPrint, faFan, faLock, faShower, faAngleDoubleRight);

const App = ({ Component, pageProps }) => {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

// This default export is required in a new `pages/_app.js` file.
export default App;
