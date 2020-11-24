import Layout from '../components/layout'
import Head from 'next/head'
import { fetchAPIwithSSR } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import HeroSection from '../components/hero-section'
import ContentSection from '../components/content-section'
import CounterSection from '../components/counter-section'
import CTASection from '../components/cta-section'
import ServiceSection from '../components/service-section'
import TeamSection from '../components/team-section'
import HeadingSection from '../components/heading-section'
import PricingSection from '../components/pricing-section'

export default function SubPage({ preview, allContent, mainMenus, flatMenus }) {
  return (
    <>
      <Layout preview={preview} mainMenus={mainMenus}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
          {/* <!-- Seo Meta --> */}
          <meta name="description" content="Listigo | Directory Bootstrap 4 Template" />
          <meta name="keywords" content="listing dashboard, directory panel, listing, responsive directory, directory template, themeforest, listing template, css3, html5" />
        </Head>
        {allContent.content.map((section, i) => {
          if (section.type == 'page_heading_section_block') return <HeadingSection key={i} title={allContent.title} data={section.value} />
          if (section.type == 'hero_section_block') return <HeroSection key={i} data={section.value} />
          if (section.type == 'content_section_block') return <ContentSection key={i} data={section.value} />
          if (section.type == 'counter_section_block') return <CounterSection key={i} data={section.value} />
          if (section.type == 'cta_section_block') return <CTASection key={i} data={section.value} />
          if (section.type == 'service_section_block') return <ServiceSection key={i} data={section.value} />
          if (section.type == 'team_section_block') return <TeamSection key={i} data={section.value} />
          if (section.type == 'pricing_section_block') return <PricingSection key={i} data={section.value} />
        })}
        {/* {JSON.stringify(allContent.items[0].content)} */}
        {/* {JSON.stringify(mainMenus[0].menu_items)} */}
        {/* {JSON.stringify(flatMenus)} */}
        <script src="assets/js/vendors.bundle.js"></script>
        <script src="assets/js/scripts.bundle.js"></script>
      </Layout>
    </>
  )
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps({ params, preview = false }) {
    const allContent = (await fetchAPIwithSSR(`/api/v2/pages/find/?html_path=${params.slug}`, { method: 'GET' })) ?? []
    const mainMenus = (await fetchAPIwithSSR('/api/main-menus', { method: 'GET' })) ?? []
    const flatMenus = (await fetchAPIwithSSR('/api/flat-menus', { method: 'GET' })) ?? []
    return {
        props: { preview, allContent, mainMenus, flatMenus },
    }
}
