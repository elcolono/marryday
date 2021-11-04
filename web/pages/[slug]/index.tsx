import React from 'react'
import fetchAPIWithSSR from '../../utils/fetchAPIWithSSR';

import {GetStaticProps, GetStaticPaths} from 'next'
import DynamicComponent from "../../components/cms/DynamicComponent";

export default function SubPage(pageProps) {
    const {page} = pageProps;
    return (
        <React.Fragment>
            {page?.content.map((section, i) => {
                return <DynamicComponent section={section} key={i}/>
            }) ?? null}
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const settings = await fetchAPIWithSSR('/api/page/home', {method: 'GET'});
    const pageData = await fetchAPIWithSSR(`/api/v2/pages/?type=home.SubPage&fields=*&slug=${params.slug}`, {method: 'GET'});
    const page = pageData?.items[0] ?? 0;
    const cities = await fetchAPIWithSSR('/api/v1/products/cities/', {method: 'GET'});
    const locations = await fetchAPIWithSSR('/api/v1/products/locations/', {method: 'GET'});

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
    const pages = await fetchAPIWithSSR('/api/v2/pages/?type=home.SubPage', {method: 'GET'});
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
        ) ?? [],
        fallback: true,
    }
}
