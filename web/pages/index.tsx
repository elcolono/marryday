import React from 'react';
import fetchAPIwithSSR from '../utils/fetchAPIwithSSR';
import HeroLocationSearchSection from '../components/Section/HeroLocationSearchSection';
import CitySlider from '../components/Section/CitySlider';
import CTASection from '../components/Section/Cta';
import ServiceSection from '../components/Section/Services';
import FAQSection from '../components/Section/Faq';
import LocationSlider from '../components/Section/LocationSlider';

import { GetStaticProps } from 'next'

export default function Index(pageProps) {

  const { page, cities, locations } = pageProps;
  return (
    <React.Fragment>
      {page?.content.map((section, i) => {
        if (section.type == 'hero_location_search_section_block') return <HeroLocationSearchSection key={i} data={section.value} />
        if (section.type == 'city_slider_section_block') return <CitySlider key={i} data={section.value} cities={cities} />
        if (section.type == 'location_slider_section_block') { return <LocationSlider key={i} data={section.value} locations={locations} /> }
        if (section.type == 'cta_section_block') return <CTASection key={i} data={section.value} />
        if (section.type == 'service_section_block') return <ServiceSection key={i} data={section.value} />
        if (section.type == 'faq_section_block') return <FAQSection key={i} data={section.value} />
      }) ?? <div>Noch Keine Daten</div>}
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const settings = await fetchAPIwithSSR('/api/page/home', { method: 'GET' });
  const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=home.HomePage&fields=seo_text,content,seo_title,search_description', { method: 'GET' });
  const cities = await fetchAPIwithSSR('/api/v1/cowork/cities/', { method: 'GET' });
  const locations = await fetchAPIwithSSR('/api/v1/cowork/locations/', { method: 'GET' });

  const page = pageData?.items[0] ?? null;

  return {
    revalidate: 1,
    props: {
      locations: locations,
      cities: cities,
      page: page,
      themeSettings: settings?.theme_settings ?? null,
      mainMenus: settings?.main_menus ?? null,
      flatMenus: settings?.flat_menus ?? null,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: page?.meta.seo_title ?? null,
      searchDescription: page?.meta.search_description ?? null,
    },
  }
}
