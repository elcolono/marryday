import React from "react"


import {GetStaticPaths, GetStaticProps} from "next";
import {fetchAPIwithSSR} from "../../lib/api";
import fetchAPIWithSSR from "../../utils/fetchAPIWithSSR";

export default function ProductDetail(props) {
    return (
        <React.Fragment>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </React.Fragment>
    )
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const settings = await fetchAPIWithSSR('/api/page/home', {method: 'GET'});
    const product = await fetchAPIwithSSR(`/api/v1/products/${params.path[0]}`)

    return {
        revalidate: 1,
        props: {
            params: params,
            product: product,
            themeSettings: settings?.theme_settings ?? null,
            mainMenus: settings?.main_menus ?? null,
            flatMenus: settings?.flat_menus ?? null,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: product.title ?? null,
            searchDescription: product.short_description ?? null,
        },
    }
}


export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetchAPIWithSSR('/api/v1/products/', {method: 'GET'});
    return {
        paths: products?.map(
            (product) => {
                return ({
                    params: {
                        path: [product.id.toString(), product.slug]
                    },
                } || [])
            }
        ) ?? [],
        fallback: true,
    }
}


