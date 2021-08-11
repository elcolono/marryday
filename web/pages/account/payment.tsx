import React, { useEffect, useState } from 'react';
import Link from "next/link"

import fetchAPIwithSSR from '../../utils/fetchAPIwithSSR';
import { GetServerSideProps } from 'next';

import {
    Container,
    Row,
    Col,
    Button,
    Collapse,
    Form,
    Label,
    Media,
    Card,
    CardHeader,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    Spinner,
} from "reactstrap"

import Icon from "../../components/Icon"
import { InputField } from "../../components/FormFields";
import { Formik } from "formik";
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchAPI from "../../utils/fetchAPI";
import getToken from "../../utils/getToken";


export default function UserPayment(pageProps) {

    const { page, loggedUser, paymentAccounts } = pageProps;
    const paymentAccount = paymentAccounts ? paymentAccounts[0] : null;

    const [isLoading, setIsLoading] = useState(false);
    const [creditcardCollapse, setCreditcardCollapse] = useState(false)


    useEffect(() => {
        console.log(loggedUser)
    }, [])

    const create_stripe_account_and_open_onboarding_link = async () => {
        setIsLoading(true);
        const token = getToken();
        const body = {
            "payment_account_pk": paymentAccount.id,
            "country": 'at'
        }

        if (!paymentAccount.stripe_account) {
            try {
                await fetchAPI("/api/v1/payments/create-stripe-account/", { method: 'POST', body, token: token });
            } catch (error) {
                toast.error(error.message);
            }
        }
        try {
            let response = await fetchAPI("/api/v1/payments/create-account-links/", { method: 'POST', body, token: token });
            const newWindow = window.open(response.data.account_links.url, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null;
        } catch (error) {
            const errorMessage = error.message.length <= 50 ? error.message : "Ups, something went wrong";
            toast.error(errorMessage);
        }
        setIsLoading(false);
    }

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
                            {loggedUser.is_company &&
                                <div className="text-block">
                                    <Row className="mb-3">
                                        <Col sm="9">
                                            <h5>Dein Bankkonto</h5>
                                        </Col>
                                    </Row>
                                    <div className="text-sm text-muted">
                                        {page.stripe_account_description && (
                                            <p>
                                                {page.stripe_account_description}
                                            </p>
                                        )}
                                        <Button disabled={isLoading} onClick={create_stripe_account_and_open_onboarding_link} color="primary" className="mr-4">
                                            {isLoading && (<Spinner size='sm' />)} Stripe-Konto {paymentAccount.stripe_account ? 'bearbeiten' : 'anlegen'}
                                        </Button>
                                    </div>
                                </div>
                            }
                            {loggedUser.is_visitor &&
                                <div className="text-block">
                                    <Row className="mb-3">
                                        <Col sm="9">
                                            <h5>Deine Kreditkarte</h5>
                                        </Col>
                                        <Col sm="3" className="text-right">
                                            <Button
                                                color="link"
                                                className="pl-0 text-primary collapsed"
                                                onClick={() => setCreditcardCollapse(!creditcardCollapse)}
                                            >
                                                Bearbeiten
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Media className="text-sm text-muted">
                                        <i className="fa fa-address-book fa-fw mr-2" />
                                        <Media body className="mt-n1">
                                            {loggedUser.first_name} {loggedUser.last_name}
                                            <br />
                                            {loggedUser.email}
                                        </Media>
                                    </Media>
                                    <Collapse isOpen={creditcardCollapse}>
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={loggedUser}
                                            validationSchema={Yup.object({
                                                card_name: Yup.string()
                                                    .required('Erforderlich'),
                                                card_number: Yup.string()
                                                    .required('Erforderlich')
                                                    .min(2, 'Firstname is too short - should be 2 chars minimum.'),
                                                last_name: Yup.string()
                                                    .required('Erforderlich')
                                                    .min(2, 'Lastname is too short - should be 2 chars minimum.')
                                            })}
                                            onSubmit={(values, { setSubmitting }) => {
                                                const token = getToken();
                                                // fetchAPI(`/api/v1/accounts/user/${user.id}/`, { method: 'PUT', body: values, token: token }).then(response => {
                                                //     toast.success("Erfolgreich gespeichert");
                                                //     setUser(response);
                                                //     setSubmitting(false);
                                                // }).catch(error => {
                                                //     for (var prop in error) {
                                                //         const errorMessage = error[prop][0];
                                                //         toast.error(errorMessage);
                                                //     }
                                                //     setSubmitting(false);
                                                // })
                                            }}>
                                            {({
                                                handleSubmit,
                                                isSubmitting,
                                            }) => (
                                                <Form onSubmit={handleSubmit}>
                                                    <Row className="pt-4">

                                                        <Col md="6" className="form-group">
                                                            <Label for="card_name" className="form-label">
                                                                Kartenname
                                                            </Label>
                                                            <InputField
                                                                name="card_name"
                                                                id="card_name"
                                                                type="text"
                                                                placeholder="Max Mustermann"
                                                                autoComplete="off"
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md="6" className="form-group">
                                                            <Label for="card_number" className="form-label">
                                                                Kartennummer
                                                            </Label>
                                                            <InputField
                                                                name="card_number"
                                                                id="card_number"
                                                                type="number"
                                                                placeholder="AT34252345234"
                                                                autoComplete="off"
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md="4" className="form-group">
                                                            <Label for="expiry-date" className="form-label">
                                                                Expery Date
                                                            </Label>
                                                            <InputField
                                                                name="expiry-date"
                                                                id="expiry-date"
                                                                type="text"
                                                                placeholder="123"
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md="4" className="form-group">
                                                            <Label for="cvv" className="form-label">
                                                                CVC/CVV
                                                            </Label>
                                                            <InputField
                                                                name="cvv"
                                                                id="cvv"
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md="4" className="form-group">
                                                            <Label for="zip" className="form-label">
                                                                ZIP
                                                            </Label>
                                                            <InputField
                                                                name="zip"
                                                                id="zip"
                                                                type="text"
                                                                placeholder="123"
                                                                required
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        disabled={isSubmitting}
                                                        type="submit"
                                                        color="outline-primary"
                                                        className=" mb-4">
                                                        {isSubmitting ? <Spinner size="sm" /> : "Speichern"}
                                                    </Button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Collapse>
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
    const paymentAccounts = await fetchAPIwithSSR('/api/v1/payments/payment-accounts/', { method: 'GET', req: req, token: token }) ?? []
    if (loggedUser.email === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return { props: {} }
    }

    const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
    const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=user_account.AccountPaymentPage&fields=seo_title,search_description,heading,description,stripe_account_description', { method: 'GET' });
    const page = pageData?.items[0] ?? null;

    return {
        props: {
            page,
            loggedUser,
            paymentAccounts,
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
