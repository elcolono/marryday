import React, {useEffect} from 'react'
import fetchAPIWithSSR from '../../utils/fetchAPIWithSSR';

import {GetStaticProps, GetStaticPaths} from 'next'
import {fetchAPIwithSSR} from "../../lib/api";
import {Col, Container, Row} from "reactstrap";
import Pagination from "../../components/Pagination";
import ResultsTopBar from "../../components/ResultsTopBar";
import Router from 'next/router'
import ProductCard from "../../components/ProductCard";


export default function Categories(pageProps) {
    const {page, params, category} = pageProps;

    useEffect(() => {
        if (params && params.path[1] !== category.slug) {
            Router.push('/categories/1/hochzeit-im-schloss-2')
        }
    }, [params])
    const sortBy = [
        {
            "value": "popular",
            "label": "Most popular"

        },
        {
            "value": "recommended",
            "label": "Recommended"

        },
        {
            "value": "newest",
            "label": "Newest"

        },
        {
            "value": "oldest",
            "label": "Oldest"

        },
        {
            "value": "closest",
            "label": "Closest"

        }
    ]
    return (
        <React.Fragment>
            <Container fluid className="pt-5 pb-3 border-bottom px-lg-5">
                <Row>
                    <Col xl="8">
                        <h1 className="mb-4">{category && category.title && category.title}</h1>
                        <p className="lead text-muted">{category && category.long_description && category.long_description}</p>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="py-5 px-lg-5">
                <Row>
                    <Col lg="12">
                        <ResultsTopBar sortBy={sortBy}/>
                        <Row>
                            {category.products &&
                            category.products.map((product) => (
                                <Col
                                    key={product.id}
                                    sm="6"
                                    xl="4"
                                    className="mb-5 hover-animate"
                                >
                                    <ProductCard data={product}/>
                                </Col>
                            ))}
                        </Row>
                        <pre>{JSON.stringify(category, null, 2)}</pre>
                        <Pagination/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const settings = await fetchAPIWithSSR('/api/page/home', {method: 'GET'});
    const category = await fetchAPIwithSSR(`/api/v1/products/category/${params.path[0]}`)

    return {
        revalidate: 1,
        props: {
            params: params,
            category: category,
            themeSettings: settings?.theme_settings ?? null,
            mainMenus: settings?.main_menus ?? null,
            flatMenus: settings?.flat_menus ?? null,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: category.title ?? null,
            searchDescription: category.short_description ?? null,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await fetchAPIWithSSR('/api/v1/products/category/', {method: 'GET'});
    return {
        paths: categories?.map(
            (category) => {
                return ({
                    params: {
                        path: [category.id.toString(), category.slug]
                    },
                } || [])
            }
        ) ?? [],
        fallback: true,
    }
}
