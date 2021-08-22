import React from "react"
import Link from "next/link"

import fetchAPIwithSSR from '../../../utils/fetchAPIwithSSR';
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

import Icon from "../../../components/Icon"
import { InputField } from "../../../components/FormFields";
import { Formik } from "formik";

import * as Yup from 'yup'
import fetchAPI from "../../../utils/fetchAPI";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getToken from "../../../utils/getToken";


export default function UserPersonal(pageProps) {

    const { page } = pageProps;

    const [profileCollapse, setProfileCollapse] = React.useState(false)
    const [accountCollapse, setAccountCollapse] = React.useState(false)

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
                                            <h5>Dein Profil</h5>
                                        </Col>
                                        <Col sm="3" className="text-right">
                                            <Button
                                                color="link"
                                                className="pl-0 text-primary collapsed"
                                                onClick={() => setProfileCollapse(!profileCollapse)}
                                            >
                                                Bearbeiten
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Media className="text-sm text-muted">
                                        <i className="fa fa-address-book fa-fw mr-2" />
                                        <Media body className="mt-n1">
                                            {company.company_name}
                                        </Media>
                                    </Media>
                                    <Collapse isOpen={profileCollapse}>
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={company}
                                            validationSchema={Yup.object({
                                                company_name: Yup.string()
                                                    .required('Erforderlich')
                                                    .min(2, 'Company name is too short - should be 2 chars minimum.'),
                                            })}
                                            onSubmit={(values, { setSubmitting }) => {
                                                const token = getToken();
                                                fetchAPI(`/api/v1/profiles/company/${company.id}/`, { method: 'PUT', body: values, token: token }).then(response => {
                                                    toast.success("Erfolgreich gespeichert");
                                                    setCompany(response);
                                                    setSubmitting(false);
                                                }).catch(error => {
                                                    for (var prop in error) {
                                                        const errorMessage = error[prop][0];
                                                        toast.error(errorMessage);
                                                    }
                                                    setSubmitting(false);
                                                })
                                            }}>
                                            {({
                                                handleSubmit,
                                                isSubmitting,
                                            }) => (
                                                <Form onSubmit={handleSubmit}>
                                                    <Row className="pt-4">

                                                        <Col md="6" className="form-group">
                                                            <Label for="first_name" className="form-label">
                                                                Firmenname
                                                        </Label>
                                                            <InputField
                                                                name="company_name"
                                                                id="company_name"
                                                                type="text"
                                                                placeholder="Google"
                                                                autoComplete="off"
                                                                required
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Button
                                                        disabled={isSubmitting}
                                                        type="submit"
                                                        color="outline-primary"
                                                        className="mb-4">
                                                        {isSubmitting ? <Spinner size="sm" /> : "Speichern"}
                                                    </Button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </Collapse>
                                </div>
                            }
                            {user &&
                                <div className="text-block">
                                    <Row className="mb-3">
                                        <Col sm="9">
                                            <h5>Dein Konto</h5>
                                        </Col>
                                        <Col sm="3" className="text-right">
                                            <Button
                                                color="link"
                                                className="pl-0 text-primary collapsed"
                                                onClick={() => setAccountCollapse(!accountCollapse)}
                                            >
                                                Bearbeiten
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Media className="text-sm text-muted">
                                        <i className="fa fa-address-book fa-fw mr-2" />
                                        <Media body className="mt-n1">
                                            {user.first_name} {user.last_name}
                                            <br />
                                            {user.email}
                                        </Media>
                                    </Media>
                                    <Collapse isOpen={accountCollapse}>
                                        <Formik
                                            enableReinitialize={true}
                                            initialValues={user}
                                            validationSchema={Yup.object({
                                                email: Yup.string()
                                                    .email('Ungültige Email Adresse')
                                                    .required('Erforderlich'),
                                                first_name: Yup.string()
                                                    .required('Erforderlich')
                                                    .min(2, 'Firstname is too short - should be 2 chars minimum.'),
                                                last_name: Yup.string()
                                                    .required('Erforderlich')
                                                    .min(2, 'Lastname is too short - should be 2 chars minimum.')
                                            })}
                                            onSubmit={(values, { setSubmitting }) => {
                                                const token = getToken();
                                                fetchAPI(`/api/v1/accounts/user/${user.id}/`, { method: 'PUT', body: values, token: token }).then(response => {
                                                    toast.success("Erfolgreich gespeichert");
                                                    setUser(response);
                                                    setSubmitting(false);
                                                }).catch(error => {
                                                    for (var prop in error) {
                                                        const errorMessage = error[prop][0];
                                                        toast.error(errorMessage);
                                                    }
                                                    setSubmitting(false);
                                                })
                                            }}>
                                            {({
                                                handleSubmit,
                                                isSubmitting,
                                            }) => (
                                                <Form onSubmit={handleSubmit}>
                                                    <Row className="pt-4">

                                                        <Col md="6" className="form-group">
                                                            <Label for="first_name" className="form-label">
                                                                Vorname
                                                            </Label>
                                                            <InputField
                                                                name="first_name"
                                                                id="first_name"
                                                                type="text"
                                                                placeholder="Max"
                                                                autoComplete="off"
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md="6" className="form-group">
                                                            <Label for="last_name" className="form-label">
                                                                Nachname
                                                            </Label>
                                                            <InputField
                                                                name="last_name"
                                                                id="last_name"
                                                                type="text"
                                                                placeholder="Mustermann"
                                                                autoComplete="off"
                                                                required
                                                            />
                                                        </Col>
                                                        <Col md="6" className="form-group">
                                                            <Label for="email" className="form-label">
                                                                Email Adresse
                                                            </Label>
                                                            <InputField
                                                                name="email"
                                                                id="email"
                                                                type="email"
                                                                placeholder="name@address.com"
                                                                autoComplete="off"
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
    const companies = await fetchAPIwithSSR('/api/v1/profiles/usercompanies/', { method: 'GET', req: req, token: token }) ?? {}
    if (loggedUser.email === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return { props: {} }
    }

    const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
    const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=user_account.AccountProfilePage&fields=seo_title,search_description,heading,description', { method: 'GET' });
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
