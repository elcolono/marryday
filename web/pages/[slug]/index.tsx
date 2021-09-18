import React from 'react'
import fetchAPIwithSSR from '../../utils/fetchAPIwithSSR';

import {GetStaticProps, GetStaticPaths} from 'next'
import DynamicComponent from "./components/DynamicComponent";

export default function SubPage(pageProps) {
    const {page} = pageProps;
    return (
        <React.Fragment>
            {page?.content.map((section, i) => {
                console.log(section);
                return <DynamicComponent section={section} key={i}/>
            }) ?? null}
        </React.Fragment>
    )
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const settings = await fetchAPIwithSSR('/api/page/home', {method: 'GET'});
    const page = await fetchAPIwithSSR(`/api/v2/pages/find/?html_path=${params.slug}`, {method: 'GET'});
    const cities = await fetchAPIwithSSR('/api/v1/products/cities/', {method: 'GET'});
    const locations = await fetchAPIwithSSR('/api/v1/products/locations/', {method: 'GET'});

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
    const pages = await fetchAPIwithSSR('/api/v2/pages', {method: 'GET'});
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
        ) ?? [{params: {slug: 'signin'}}],
        fallback: true,
    }
}
