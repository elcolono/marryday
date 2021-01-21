import React from "react"
import Head from "next/head"
import NextNProgress from "../NextNProgress"
import GoogleFonts from "next-google-fonts"

import Header from "./Header"
import Footer from "./Footer"
import SvgIcons from "../SvgIcons"

import CookieConsent from "react-cookie-consent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (pageProps) => {
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
  return (
    <div
      style={{ paddingTop: pageProps.noPaddingTop ? "0" : "72px" }}
      className={pageProps.className}
    >
      {/* Google Fonts - preload & async load to avoid render blocking */}
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:ital,wght@0,300;0,400;0,700;1,400&display=swap" />
      <Head>
        <title>{pageProps.title} - MoWo Spaces</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NextNProgress color="#4E66F8" options={{ showSpinner: false }} />
      {!pageProps.hideHeader && <Header {...headerProps} />}
      <main>{pageProps.children}</main>
      <ToastContainer position="bottom-right" />
      {!pageProps.hideFooter && <Footer {...footerProps} />}
      <SvgIcons />
      <CookieConsent
        // Set cookie Consent True / false
        // Additionally set cookie consent settings 
        buttonText={"Ich stimme zu"}
        style={{
          background: "#f48300",
          zIndex: "1050"
        }}
        buttonStyle={{
          margin: "15px",
          padding: "15px",
          color: "#ffffff",
          border: '1px solid #ffffff',
          fontSize: "15px",
          borderRadius: "50px",
          background: "#f48300",
        }}
      >
        Diese Website verwendet Cookies – nähere Informationen dazu und zu Ihren Rechten als Benutzer finden Sie in unserer Datenschutzerklärung am Ende der Seite.<br />
        Klicken Sie auf „Ich stimme zu“, um Cookies zu akzeptieren und direkt unsere Website besuchen zu können.
      </CookieConsent>
    </div>
  )
}

export default Layout