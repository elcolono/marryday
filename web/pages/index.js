import Layout from '../components/layout'
import Container from '../components/container'
import Head from 'next/head'
import { fetchAPI } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import HeadingSection from '../components/heading-section'

export default function Home({ preview, allContent, mainMenus, flatMenus }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="assets/css/vendors.bundle.css" type="text/css" />
          <link rel="stylesheet" href="assets/css/styles.bundle.css" type="text/css" />
        </Head>
        <Container>
          {allContent.items[0].content.map((section, i) => {
            if (section.type == 'page_heading_section_block') return <HeadingSection key={i} />
          })}

          {JSON.stringify(allContent.items[0].content)}

          <div>Main Menus</div>
          {JSON.stringify(mainMenus)}
          <div>Flat Menus</div>
          {JSON.stringify(flatMenus)}
        </Container>
      </Layout>
    </>
  )
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps({ preview = false }) {
  const allContent = (await fetchAPI('/api/v2/pages/?type=home.HomePage&fields=seo_text,content', { method: 'GET' })) ?? []
  const mainMenus = (await fetchAPI('/api/main-menus', { method: 'GET' })) ?? []
  const flatMenus = (await fetchAPI('/api/flat-menus', { method: 'GET' })) ?? []
  return {
    props: { preview, allContent, mainMenus, flatMenus },
  }
}
