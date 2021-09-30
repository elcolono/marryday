import React from "react";
import Layout from "../Layout";

import "../scss/style.default.scss";
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faCoffee,
    faWifi,
    faPrint,
    faFan,
    faLock,
    faShower,
    faBars,
    faSearch,
    faTimes,
    faAngleDoubleRight,
    faCalendar,
    faChevronLeft,
    faChevronRight,
    faCrosshairs,
    faQuoteRight
} from '@fortawesome/free-solid-svg-icons';

library.add(faCoffee, faBars, faSearch, faTimes, faWifi, faPrint, faFan, faLock, faShower, faAngleDoubleRight,
    faCalendar, faChevronLeft, faChevronRight, faCrosshairs, faQuoteRight);

const App = ({Component, pageProps}) => {
    return (
        <Layout {...pageProps}>
            <Component {...pageProps} />
        </Layout>
    )
}

export default App;
