import Layout from '../components/layout'
import Container from '../components/container'
import Head from 'next/head'
import { fetchAPI } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import HeroSection from '../components/hero-section'
import ContentSection from '../components/content-section'
import CounterSection from '../components/counter-section'
import CTASection from '../components/cta-section'
import ServiceSection from '../components/service-section'
import TeamSection from '../components/team-section'

export default function Home({ preview, allContent, mainMenus, flatMenus }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
          {/* <!-- Seo Meta --> */}
          <meta name="description" content="Listigo | Directory Bootstrap 4 Template" />
          <meta name="keywords" content="listing dashboard, directory panel, listing, responsive directory, directory template, themeforest, listing template, css3, html5" />
        </Head>
          {allContent.items[0].content.map((section, i) => {
            if (section.type == 'page_heading_section_block') return <HeroSection key={i} />
            if (section.type == 'content_section_block') return <ContentSection key={i} />
            if (section.type == 'counter_section_block') return <CounterSection key={i} />
            if (section.type == 'cta_section_block') return <CTASection key={i} />
            if (section.type == 'service_section_block') return <ServiceSection key={i} />
            if (section.type == 'team_section_block') return <TeamSection key={i} />
          })}

          {/* {JSON.stringify(allContent.items[0].content)}
          {JSON.stringify(mainMenus)}
          {JSON.stringify(flatMenus)} */}
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
