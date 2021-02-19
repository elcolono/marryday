import React from 'react';
import { fetchAPIwithSSR } from '../lib/api';
import HeroSection from '../components/Section/HeroSection';
import HeroLocationSearchSection from '../components/Section/HeroLocationSearchSection';
import ContentSection from '../components/Section/Content';
import CounterSection from '../components/Section/counter-section';
import CTASection from '../components/Section/Cta';
import ServiceSection from '../components/Section/Services';
import TeamSection from '../components/Section/team-section';
import HeadingSection from '../components/Section/Heading';
import ComingSoonSection from '../components/Section/ComingSoon';
import FAQSection from '../components/Section/Faq';
import MapSection from '../components/Section/Map';
import LocationSlider from '../components/Section/LocationSlider';
import CityGallery from '../components/Section/CItyGallery';
import CitySlider from '../components/Section/CitySlider';

import { GetServerSideProps } from 'next'

export const config = {
  unstable_runtimeJS: false,
};

export default function Index(pageProps) {

  const { page } = pageProps;
  return (
    <React.Fragment>
      {page.content.map((section, i) => {
        if (section.type == 'page_heading_section_block') return <HeadingSection key={i} title={page.title} data={section.value} />
        if (section.type == 'map_section_block') return <MapSection key={i} data={section.value} />
        if (section.type == 'location_slider_section_block') return <LocationSlider key={i} data={section.value} />
        if (section.type == 'city_gallery_section_block') return <CityGallery key={i} data={section.value} />
        if (section.type == 'city_slider_section_block') return <CitySlider key={i} data={section.value} />
        if (section.type == 'hero_section_block') return <HeroSection key={i} data={section.value} />
        if (section.type == 'hero_location_search_section_block') return <HeroLocationSearchSection key={i} data={section.value} />
        if (section.type == 'content_section_block') return <ContentSection key={i} data={section.value} />
        if (section.type == 'counter_section_block') return <CounterSection key={i} data={section.value} />
        if (section.type == 'cta_section_block') return <CTASection key={i} data={section.value} />
        if (section.type == 'service_section_block') return <ServiceSection key={i} data={section.value} />
        if (section.type == 'team_section_block') return <TeamSection key={i} data={section.value} />
        if (section.type == 'comingsoon_section_block') return <ComingSoonSection key={i} data={section.value} />
        if (section.type == 'faq_section_block') return <FAQSection key={i} data={section.value} />
      })}
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
  const pageData = (await fetchAPIwithSSR('/api/v2/pages/?type=home.HomePage&fields=seo_text,content,seo_title,search_description', { method: 'GET', req: req })) ?? []
  // const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req })) ?? null
  const page = pageData.items[0]
  return {
    props: {
      page: page,
      themeSettings: settings.theme_settings,
      mainMenus: settings.main_menus,
      flatMenus: settings.flat_menus,
      // user,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: page.meta.seo_title,
      searchDescription: page.meta.search_description,
    },
  }
}
