import Head from 'next/head'
import { fetchAPIwithSSR } from '../lib/api'
import { CMS_NAME } from '../lib/constants'
import HeroSection from '../components/Section/HeroSection'
import ContentSection from '../components/Section/Content'
import CounterSection from '../components/Section/counter-section'
import CTASection from '../components/Section/Cta'
import ServiceSection from '../components/Section/Services'
import TeamSection from '../components/Section/team-section'
import HeadingSection from '../components/Section/Heading'
import ComingSoonSection from '../components/Section/ComingSoon'
import FAQSection from '../components/Section/Faq'
import MapSection from '../components/Section/Map'
import LocationSlider from '../components/Section/LocationSlider'
import CityGallery from '../components/Section/CItyGallery'

import { GetServerSideProps } from 'next'

export default function Index(pageProps) {

  const { page } = pageProps;
  return (
    <>
      <Head>
        <title>{page.title} {CMS_NAME}</title>
        {/* <!-- Seo Meta --> */}
        <meta name="description" content="Listigo | Directory Bootstrap 4 Template" />
        <meta name="keywords" content="listing dashboard, directory panel, listing, responsive directory, directory template, themeforest, listing template, css3, html5" />
      </Head>
      {/* <CityGallery /> */}
      {page.content.map((section, i) => {
        if (section.type == 'page_heading_section_block') return <HeadingSection key={i} title={page.title} data={section.value} />
        if (section.type == 'map_section_block') return <MapSection key={i} data={section.value} />
        if (section.type == 'location_slider_section_block') return <LocationSlider key={i} data={section.value} />
        if (section.type == 'city_gallery_section_block') return <CityGallery key={i} data={section.value} />
        if (section.type == 'hero_section_block') return <HeroSection key={i} data={section.value} />
        if (section.type == 'content_section_block') return <ContentSection key={i} data={section.value} />
        if (section.type == 'counter_section_block') return <CounterSection key={i} data={section.value} />
        if (section.type == 'cta_section_block') return <CTASection key={i} data={section.value} />
        if (section.type == 'service_section_block') return <ServiceSection key={i} data={section.value} />
        if (section.type == 'team_section_block') return <TeamSection key={i} data={section.value} />
        if (section.type == 'comingsoon_section_block') return <ComingSoonSection key={i} data={section.value} />
        if (section.type == 'faq_section_block') return <FAQSection key={i} data={section.value} />
      })}
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
  const page = (await fetchAPIwithSSR('/api/v2/pages/?type=home.HomePage&fields=seo_text,content', { method: 'GET', req: req })) ?? []
  // const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req })) ?? null
  return {
    props: {
      page: page.items[0],
      themeSettings: settings.theme_settings,
      mainMenus: settings.main_menus,
      flatMenus: settings.flat_menus,
      // user,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Rooms | Category - Map on the top",
    },
  }
}