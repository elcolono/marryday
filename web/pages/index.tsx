import React from 'react';
import fetchAPIWithSSR from '../utils/fetchAPIWithSSR';

import {GetStaticProps} from 'next';
import DynamicComponent from "../components/cms/DynamicComponent";

export default function Index(pageProps) {

    const {page, productCategories} = pageProps;
    return (
        <React.Fragment>
            {page?.content.map((section, i) => {
                return <DynamicComponent
                    key={section.id}
                    section={section}
                    productCategories={productCategories}
                />
            }) ?? null}
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const settings = await fetchAPIWithSSR('/api/page/home', {method: 'GET'});
    const pageData = await fetchAPIWithSSR('/api/v2/pages/?type=home.HomePage&fields=seo_text,content,seo_title,search_description', {method: 'GET'});

    const productCategories = await fetchAPIWithSSR('/api/v1/products/category/', {method: 'GET'});
    const cities = await fetchAPIWithSSR('/api/v1/products/cities/', {method: 'GET'});
    const locations = await fetchAPIWithSSR('/api/v1/products/locations/', {method: 'GET'});

    const page = pageData?.items[0] ?? null;

    return {
        revalidate: 1,
        props: {
            locations: locations,
            cities: cities,
            page: page,
            productCategories: productCategories ?? null,
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
