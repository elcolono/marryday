import { GetServerSideProps } from 'next';
import Link from "next/link";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Breadcrumb,
    BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Container, Media, Row
} from "reactstrap";
import geoJSON from "../../../api/mock/rooms-geojson.json";
import CardRoom from "../../../components/CardRoom";
import Icon from "../../../components/Icon";
import fetchAPIwithSSR from '../../../utils/fetchAPIwithSSR';
import getToken from "../../../utils/getToken";

export default function UserProductss(pageProps) {

    const { page } = pageProps;

    const [user, setUser] = React.useState(pageProps.loggedUser)
    const [company, setCompany] = React.useState(pageProps.companies[0])

    return (
        <>
            <ToastContainer />
            <section className="py-5">
                <Container>
                    <Breadcrumb listClassName="pl-0  justify-content-start">
                        <BreadcrumbItem>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link href="/account">
                                <a>Account</a>
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{page.title && page.title}</BreadcrumbItem>
                    </Breadcrumb>
                    <h1 className="hero-heading mb-0">{page.heading && page.heading}</h1>
                    <p className="text-muted mb-5">{page.description && page.description}</p>
                    <Row>
                        <Col lg="7">
                            {company &&
                                <div className="text-block">
                                    <Row className="mb-3">
                                        <Col sm="9">
                                            <h5>Dein Listing</h5>
                                        </Col>
                                        <Col sm="3" className="text-right">
                                            <Link href="/account/add-product">
                                                <Button
                                                    color="link"
                                                    className="pl-0 text-primary collapsed"
                                                    onClick={() => console.log("Add Produkt")}
                                                >
                                                    Hinzufügen
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <Media className="text-sm text-muted">
                                        <i className="fa fa-address-book fa-fw mr-2" />
                                        <Media body className="mt-n1">
                                            {company.company_name}
                                        </Media>
                                    </Media>
                                </div>
                            }
                            {user &&
                                <div className="text-block">
                                <Row>
                                  {geoJSON.features.map((listing) => (
                                    <Col
                                      sm="6"
                                      lg="4"
                                      className="mb-30px hover-animate"
                                      key={listing.properties.name}
                                    >
                                      <CardRoom data={listing.properties} />
                                    </Col>
                                  ))}
                                </Row>
                              </div>
                            }
                        </Col>
                        <Col md="6" lg="4" className="ml-lg-auto">
                            <Card className="border-0 shadow">
                                <CardHeader className="bg-primary-light py-4 border-0">
                                    <Media className="align-items-center">
                                        <Media body>
                                            <h4 className="h6 subtitle text-sm text-primary">
                                                What info is shared with others?
                                            </h4>
                                        </Media>
                                        <Icon
                                            icon="identity-1"
                                            className="svg-icon-light w-3rem h-3rem ml-3 text-primary"
                                        />
                                    </Media>
                                </CardHeader>
                                <CardBody className="p-4">
                                    <p className="text-muted text-sm card-text">
                                        Directory only releases contact information for hosts and
                                        guests <strong>after a reservation is confirmed</strong>.
                                    </p>
                                    <p className="text-muted text-sm card-text">
                                        Amet nisi eiusmod minim commodo sit voluptate aute ut quis ea
                                        veniam sunt proident ex.{" "}
                                        <strong>Exercitation culpa laboris</strong> consequat fugiat
                                        non ipsum veniam Lorem aliqua deserunt tempor elit veniam.
                                    </p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res, }) => {

    const token = getToken(req);
    const loggedUser = await fetchAPIwithSSR('/api/v1/accounts/auth/user/', { method: 'GET', req: req, token: token }) ?? {}
    const companies = await fetchAPIwithSSR('/api/v1/profiles/usercompanies/', { method: 'GET', req: req, token: token }) ?? {}
    if (loggedUser.email === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return { props: {} }
    }

    const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
    const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=user_account.AccountProductsPage&fields=seo_title,search_description,heading,description', { method: 'GET' });
    const page = pageData?.items[0] ?? null;

    return {
        props: {
            page,
            loggedUser,
            companies,
            themeSettings: settings.theme_settings,
            mainMenus: settings.main_menus,
            flatMenus: settings.flat_menus,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: page?.meta?.seo_title,
        },
    }
}
