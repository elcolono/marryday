import React from "react"
import Link from "next/link"

import fetchAPIwithSSR from '../../utils/fetchAPIwithSSR';
import { GetServerSideProps } from 'next';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap"
import Icon from "../../components/Icon";
import getToken from "../../utils/getToken";


export default function UserAccount(pageProps) {

    const { page } = pageProps;

    return (
        <section className="py-5">
            <Container>
                <Breadcrumb listClassName="pl-0  justify-content-start">
                    <BreadcrumbItem>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{page.title}</BreadcrumbItem>
                </Breadcrumb>

                <h1 className="hero-heading mb-0">{page.heading}</h1>
                <p className="text-muted mb-5">{page.description}</p>
                <Row>
                    {page.cards.map((cardProps) => {
                        const card = cardProps.value;
                        return <Col xs="6" md="4" className="mb-30px" key={card.title}>
                            <Card className="h-100 border-0 shadow hover-animate">
                                <CardBody>
                                    <div className="icon-rounded bg-secondary-light mb-3">
                                        <Icon
                                            icon={card.icon}
                                            className="text-secondary w-2rem h-2rem"
                                        />
                                    </div>
                                    <CardTitle className="mb-3" tag="h5">
                                        <Link href={`${page.meta.slug}/${card.link.slug}`}>
                                            <a className="text-decoration-none text-dark stretched-link">
                                                {card.title}
                                            </a>
                                        </Link>
                                    </CardTitle>
                                    <CardText className="text-muted text-sm">
                                        {card.content}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    })}
                </Row>
            </Container>
        </section>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res, }) => {

    const token = getToken(req);
    const loggedUser = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req, token: token })) ?? []
    if (loggedUser.email === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return { props: {} }
    }
    
    const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
    const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=home.UserAccount&fields=seo_title,search_description,heading,description,cards', { method: 'GET' });
    const page = pageData?.items[0] ?? null;

    return {
        props: {
            page,
            loggedUser,
            themeSettings: settings.theme_settings,
            mainMenus: settings.main_menus,
            flatMenus: settings.flat_menus,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: page?.meta.seo_title ?? null,
        },
    }
}


