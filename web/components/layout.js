import Header from './header'
import Footer from './footer'
import Meta from './meta'
import Sidebar from './sidebar'
import ScrollTop from './scroll-top'

export default function Layout({ preview, mainMenus, children }) {
  return (
    <>
      <Meta />
      <div id="wrapper">
        <Header mainMenus={mainMenus} />
        {children}
        <Footer />
        <ScrollTop />
        <Sidebar mainMenus={mainMenus} />
      </div>
    </>
  )
}