import Head from 'next/head'
import { fetchAPIwithSSR } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import HeroSection from '../components/Section/HeroSection'
import ContentSection from '../components/Section/Content'
import CounterSection from '../components/Section/counter-section'
import CTASection from '../components/Section/Cta'
import ServiceSection from '../components/Section/Services'
import TeamSection from '../components/Section/team-section'
import HeadingSection from '../components/Section/heading-section'
import PricingSection from '../components/Section/pricing-section'
import ContactSection from '../components/Section/contact-section'
import FAQSection from '../components/Section/Faq'
import LoginSection from '../components/Section/Login'

export default function SubPage({ user, allContent, mainMenus, flatMenus, themeSettings }) {
  return (
    <>
      <Head>
        <title>{allContent.title} | {CMS_NAME}</title>

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
        if (section.type == 'contact_section_block') return <ContactSection key={i} title={allContent.title} data={section.value} />
        if (section.type == 'faq_section_block') return <FAQSection key={i} data={section.value} />
        if (section.type == 'login_section_block') return <LoginSection key={i} data={section.value} />
      })}
    </>
  )
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps({ params, req }) {
  const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { req: req })) ?? null
  const allContent = (await fetchAPIwithSSR(`/api/v2/pages/find/?html_path=${params.slug}`, { method: 'GET' })) ?? []
  const mainMenus = (await fetchAPIwithSSR('/api/main-menus', { method: 'GET' })) ?? []
  const flatMenus = (await fetchAPIwithSSR('/api/flat-menus', { method: 'GET' })) ?? []
  const themeSettings = (await fetchAPIwithSSR('/api/theme-settings', { method: 'GET' })) ?? []
  return {
    props: { user, allContent, mainMenus, flatMenus, themeSettings },
  }
}
