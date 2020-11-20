import Header from './header'
import Footer from './footer'
import Meta from './meta'
import Sidebar from './sidebar'
import ScrollTop from './scroll-top'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div id="wrapper">
        <Header />
        {children}
        <Footer />
        <ScrollTop />
        <Sidebar />
      </div>
    </>
  )
}