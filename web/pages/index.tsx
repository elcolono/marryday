import React from 'react';
import fetchAPIwithSSR from '../utils/fetchAPIwithSSR';

import {GetStaticProps} from 'next';
import DynamicComponent from "./[slug]/components/DynamicComponent";

export default function Index(pageProps) {

    const {page} = pageProps;
    return (
        <React.Fragment>
            {page?.content.map((section, i) => {
                return <DynamicComponent section={section} key={section.id}/>
            }) ?? null}
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const settings = await fetchAPIwithSSR('/api/page/home', {method: 'GET'});
    const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=home.HomePage&fields=seo_text,content,seo_title,search_description', {method: 'GET'});
    const cities = await fetchAPIwithSSR('/api/v1/products/cities/', {method: 'GET'});
    const locations = await fetchAPIwithSSR('/api/v1/products/locations/', {method: 'GET'});

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
