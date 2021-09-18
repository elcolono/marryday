import {GetServerSideProps} from 'next';
import Link from "next/link";
import React, {useState} from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Breadcrumb,
    BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Container, Media, Row, Spinner
} from "reactstrap";
import CardProduct from "../../../components/account/CardProduct";
import Icon from "../../../components/Icon";
import fetchAPIWithSSR from '../../../utils/fetchAPIWithSSR';
import getToken from "../../../utils/getToken";
import isEmpty from 'lodash/isEmpty'
import createProduct from "../../../api/products/createProduct";
import Router from "next/router";

export const accountProductsPath = "/products"


export const getServerSideProps: GetServerSideProps = async (
    {
        req,
        res,
    }
) => {

    const token = getToken(req);
    const loggedUser = await fetchAPIWithSSR('/api/v1/accounts/auth/user/', {
        method: 'GET',
        req: req,
        token: token
    }) ?? {}
    const products = await fetchAPIWithSSR('/api/v1/products/', {
        method: 'GET',
        req: req,
        token: token
    }) ?? []

    if (loggedUser.email === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return {props: {}}
    }

    const settings = (await fetchAPIWithSSR('/api/page/home', {method: 'GET', req: req})) ?? []
    const pageData = await fetchAPIWithSSR('/api/v2/pages/?type=user_account.AccountProductsPage&fields=seo_title,search_description,heading,description', {method: 'GET'});
    const page = pageData?.items[0] ?? null;

    return {
        props: {
            page,
            loggedUser,
            products,
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

export default function AccountProducts(pageProps) {
    const {page, products} = pageProps;
    const [isLoading, setIsLoading] = useState(false);

    const createAndEditProduct = async () => {
        try {
            const emptyProduct = await createProduct()
            await Router.push(`/${emptyProduct.id}`)
        } catch (error) {
            toast.error(error.detail)
        }
    }

    return (
        <>
            <ToastContainer/>
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
                            <div className="text-block">
                                <Row className="mb-3">
                                    <Col sm="9">
                                        <h5>Deine Listing</h5>
                                    </Col>
                                    <Col sm="3" className="text-right">
                                        <Button
                                            color="link"
                                            className="pl-0 text-primary collapsed"
                                            onClick={createAndEditProduct}
                                        >
                                            Hinzufügen
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            {!isEmpty(products) ?
                                <div className="text-block">
                                    <Row>
                                        {products.map((product) => (
                                            <Col
                                                sm="6"
                                                lg="6"
                                                className="mb-30px hover-animate"
                                                key={product.id}
                                            >
                                                <CardProduct data={product}/>
                                            </Col>
                                        ))}
                                    </Row>
                                </div> :
                                <div className="text-block">
                                    <p className="mb-5 text-center">
                                        <img
                                            src="/assets/img/illustration/undraw_through_the_desert_fcin.svg"
                                            width={200}
                                            height={279}
                                            // layout="intrinsic"
                                            alt=""
                                            className="img-fluid"
                                            sizes="(max-width: 576px) 100vw, 530px"
                                        />
                                    </p>
                                    <p className="text-muted text-center">Sorry, leider noch keine Produkte
                                        vorhanden.</p>
                                    <p className="text-muted text-center">
                                        <Button
                                            disabled={isLoading}
                                            color="outline-primary"
                                            className="mb-4"
                                            onClick={createAndEditProduct}
                                        >
                                            {isLoading ? <Spinner size="sm"/> : "Produkt hinzufügen"}
                                        </Button>
                                    </p>
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

