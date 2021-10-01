import React from 'react';
import fetchAPIWithSSR from '../utils/fetchAPIWithSSR';

import {GetStaticProps} from 'next';
import DynamicComponent from "../components/cms/DynamicComponent";

export default function Index(pageProps) {

    const {page, ...rest} = pageProps;
    return (
        <React.Fragment>
            {page?.content.map((section, i) => {
                return <DynamicComponent
                    key={section.id}
                    section={section}
                    {...rest}
                />
            }) ?? null}
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const settings = await fetchAPIWithSSR('/api/page/home', {method: 'GET'});
    const pageData = await fetchAPIWithSSR('/api/v2/pages/?type=home.HomePage&fields=seo_text,content,seo_title,search_description', {method: 'GET'});
    const page = pageData?.items[0] ?? null;
    const productCategories = await fetchAPIWithSSR('/api/v1/products/category/', {method: 'GET'});
    const products = await fetchAPIWithSSR('/api/v1/products/public', {method: 'GET'});

    return {
        revalidate: 1,
        props: {
            page: page,
            products: products,
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
