import Layout from '../components/layout'
import Head from 'next/head'
import { fetchAPI } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import HeroSection from '../components/hero-section'
import ContentSection from '../components/content-section'
import CounterSection from '../components/counter-section'
import CTASection from '../components/cta-section'
import ServiceSection from '../components/service-section'
import TeamSection from '../components/team-section'
import HeadingSection from '../components/heading-section'

export default function Home({ preview, allContent, mainMenus, flatMenus }) {
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
                    if (section.type == 'page_heading_section_block') return <HeadingSection key={i} data={section.value} />
                    if (section.type == 'hero_section_block') return <HeroSection key={i} data={section.value} />
                    if (section.type == 'content_section_block') return <ContentSection key={i} data={section.value} />
                    if (section.type == 'counter_section_block') return <CounterSection key={i} data={section.value} />
                    if (section.type == 'cta_section_block') return <CTASection key={i} data={section.value} />
                    if (section.type == 'service_section_block') return <ServiceSection key={i} data={section.value} />
                    if (section.type == 'team_section_block') return <TeamSection key={i} data={section.value} />
                })}

            </Layout>
            {/* {JSON.stringify(allContent)}
            {JSON.stringify(mainMenus[0].menu_items)}
            {JSON.stringify(flatMenus)} */}
        </>
    )
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export async function getServerSideProps({ params, preview = false }) {
    const allContent = (await fetchAPI(`/api/v2/pages/find/?html_path=${params.slug}`, { method: 'GET' })) ?? []
    const mainMenus = (await fetchAPI('/api/main-menus', { method: 'GET' })) ?? []
    const flatMenus = (await fetchAPI('/api/flat-menus', { method: 'GET' })) ?? []
    return {
        props: { preview, allContent, mainMenus, flatMenus },
    }
}
