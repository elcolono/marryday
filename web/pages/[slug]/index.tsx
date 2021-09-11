import React from 'react'
import fetchAPIwithSSR from '../../utils/fetchAPIwithSSR';

import HeadingSection from './components/Heading';

import { GetStaticProps, GetStaticPaths } from 'next'
import ContentSection from './components/Content';
import PricingSection from './components/Pricing';
import ContactSection from './components/Contact';
import ServiceSection from './components/Services';
import CTASection from './components/Cta';
import TextWithImage from './components/TextWithImage';

export default function SubPage(pageProps) {
  const { page } = pageProps;
  return (
    <React.Fragment>
      {page?.content.map((section, i) => {
        if (section.type == 'page_heading_section_block') return <HeadingSection key={i} title={page.title} data={section.value} />
        if (section.type == 'content_section_block') return <ContentSection key={i} data={section.value} />
        if (section.type == 'pricing_section_block') return <PricingSection key={i} data={section.value} />
        if (section.type == 'contact_section_block') return <ContactSection key={i} title={page.title} data={section.value} />
        if (section.type == 'service_section_block') return <ServiceSection key={i} data={section.value} />
        if (section.type == 'cta_section_block') return <CTASection key={i} {...section.value} />
        if (section.type == 'text_with_image_section_block') return <TextWithImage key={i} data={section.value} />
      }) ?? <div>Noch Keine Daten</div>}
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const settings = await fetchAPIwithSSR('/api/page/home', { method: 'GET' });
  const page = await fetchAPIwithSSR(`/api/v2/pages/find/?html_path=${params.slug}`, { method: 'GET' });
  const cities = await fetchAPIwithSSR('/api/v1/products/cities/', { method: 'GET' });
  const locations = await fetchAPIwithSSR('/api/v1/products/locations/', { method: 'GET' });

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

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await fetchAPIwithSSR('/api/v2/pages', { method: 'GET' });
  return {
    paths: pages?.items.map(
      (item) => {
        const slug = item.meta.slug;
        return ({
          params: {
            slug,
          },
        } || [])
      }
    ) ?? [{ params: { slug: 'signin' } }],
    fallback: true,
  }
}