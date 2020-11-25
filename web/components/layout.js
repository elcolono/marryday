import Header from './header'
import Footer from './footer'
import Meta from './meta'
import Sidebar from './sidebar'
import ScrollTop from './scroll-top'
import CookieConsent from "react-cookie-consent";

export default function Layout({ preview, mainMenus, children }) {
  return (
    <>
      <Meta />
      <div id="wrapper">
        <Header mainMenus={mainMenus} />
        {children}
        <Footer />
        <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        <ScrollTop />
        <Sidebar mainMenus={mainMenus} />
      </div>
    </>
  )
}