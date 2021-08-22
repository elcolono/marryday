import React from "react";
import Layout from "../Layout";

import "../scss/style.default.scss";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faWifi, faPrint, faFan, faLock, faShower, faBars, faSearch, faTimes, faAngleDoubleRight, faCalendar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faBars, faSearch, faTimes, faWifi, faPrint, faFan, faLock, faShower, faAngleDoubleRight, faCalendar, faChevronLeft, faChevronRight);

const App = ({ Component, pageProps }) => {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  )
}

// This default export is required in a new `pages/_app.js` file.
export default App;
