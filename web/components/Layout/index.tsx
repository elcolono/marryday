import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

import SvgIcons from '../SvgIcons';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const NextNProgress = dynamic(() => import("../NextNProgress"));
const CookieConsent = dynamic(() => import("../CookieConsent"));

const Layout = (pageProps) => {

  const [showCookieConsent, setShowCookieConsent] = React.useState(false)

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
      style={{ paddingTop: pageProps.noPaddingTop ? "0" : "72px" }}
      className={pageProps.className}
    >
      {/* Google Fonts - preload & async load to avoid render blocking */}
      <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content={pageProps.searchDescription}></meta>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header {...headerProps} />
      <NextNProgress startPosition={0.3} stopDelayMs={200} height={3} color="#4E66F8" options={{ showSpinner: false }} />
      <main>{pageProps.children}</main>
      <Footer {...footerProps} />
      <SvgIcons />
      {showCookieConsent && (
        <CookieConsent acceptCookie={acceptCookies}>CookieConsent</CookieConsent>
      )}
    </div>
  )
}

export default Layout;