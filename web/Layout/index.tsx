import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

import SvgIcons from '../components/SvgIcons';
import Cookies from 'js-cookie';
import {FormProvider} from "../components/FormContext";
import isEmpty from 'lodash/isEmpty'

const NextNProgress = dynamic(() => import("../components/NextNProgress"));
const CookieConsent = dynamic(() => import("../components/CookieConsent"));

const Layout = (pageProps) => {

    const [showCookieConsent, setShowCookieConsent] = React.useState(false)
    const {title = "", searchDescription = "", scripts = []} = pageProps

    React.useEffect(() => {
        setTimeout(() => {
            Cookies.get('CookieConsent') ? setShowCookieConsent(false) : setShowCookieConsent(true);
        }, 3000)
    }, [])

    const headerProps = {
        nav: {
            classes: pageProps.nav && pageProps.nav.classes,
            fixed: pageProps.nav && pageProps.nav.fixed,
            color: pageProps.nav && pageProps.nav.color,
            light: pageProps.nav && pageProps.nav.light,
            dark: pageProps.nav && pageProps.nav.dark,
        },
        loggedUser: pageProps.loggedUser,
        headerClasses: pageProps.headerClasses,
        mainMenus: pageProps.mainMenus,
        flatMenus: pageProps.flatMenus,
        themeSettings: pageProps.themeSettings,
    }

    const footerProps = {
        flatMenus: pageProps.flatMenus,
        themeSettings: pageProps.themeSettings,
    }

    function acceptCookies() {
        Cookies.set("CookieConsent", true);
        setShowCookieConsent(false);
    }


    return (
        <div
            style={{paddingTop: pageProps.noPaddingTop ? "0" : "72px"}}
            className={pageProps.className}
        >
            <Head>
                <title>{title}</title>
                <meta name="description" content={searchDescription}></meta>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <NextNProgress startPosition={0.3} stopDelayMs={200} height={3} color="#4E66F8"
                           options={{showSpinner: false}}/>
            {!pageProps.hideHeader && <Header {...headerProps} />}
            <FormProvider>
                <main>{pageProps.children}</main>
            </FormProvider>
            {!pageProps.hideFooter && <Footer {...footerProps} />}
            <SvgIcons/>
            {showCookieConsent && (
                <CookieConsent acceptCookie={acceptCookies}>CookieConsent</CookieConsent>
            )}
            {!isEmpty(scripts) && pageProps.scripts.forEach(script => (
                <script src={script} async></script>
            ))}
        </div>
    )
}

export default Layout;