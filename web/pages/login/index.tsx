import React, {useEffect, useState} from "react"
import Link from "next/link"
import Router, {useRouter} from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css"

import fetchAPIwithSSR from '../../utils/fetchAPIwithSSR';
import {GetStaticProps} from 'next';
import Cookies from 'js-cookie';

import {
    Container,
    Row,
    Col,
    Button,
    Form,
    Label,
    FormGroup,
    Spinner,
} from "reactstrap"
import Image from "../../components/CustomImage"
import Icon from "../../components/Icon"

import {Formik} from "formik";
import {InputField} from '../../components/FormFields';

import * as Yup from 'yup'
import fetchAPI from "../../utils/fetchAPI";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getStaticProps: GetStaticProps = async () => {
    const settings = await fetchAPIwithSSR('/api/page/home', {method: 'GET'});
    const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=home.SigninPage&fields=seo_title,search_description,heading,description,image', {method: 'GET'});
    const page = pageData?.items[0] ?? null;

    return {
        revalidate: 1,
        props: {
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
            hideFooter: true,
            hideHeader: true,
            noPaddingTop: true,
            searchDescription: page?.meta.search_description ?? null,
        },
    }
}


export default function Index(pageProps) {

    const {page} = pageProps;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const code = router.query["code"] as string
        if (code) {
            const data = {
                access_token: "",
                code: code,
                id_token: ""
            }
            setIsLoading(true)
            fetchAPI('/api/v1/accounts/auth/google/', {
                method: 'POST',
                body: data
            }).then(response => {
                Cookies.set('token', response.key);
                localStorage.setItem('user', response.user);
                Router.push('/account');
                toast.success("Hallo, Willkommen zurück");
                setIsLoading(false);
            }).catch(error => {
                for (var prop in error) {
                    const errorMessage = error[prop][0];
                    toast.error(errorMessage);
                }
                setIsLoading(false);
            })
        }

    }, [router.query])

    return (
        <>
            <ToastContainer/>
            {page ?
                <Container fluid className="px-3">
                    <Row className="min-vh-100">
                        <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
                            <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
                                <div className="mb-5">
                                    <img
                                        src="/assets/img/logos/mowo-spaces-logo.png"
                                        alt="Directory logo"
                                        style={{
                                            maxWidth: "4rem",
                                        }}
                                        className="img-fluid mb-5"
                                    />
                                    <h2>{page.heading && page.heading}</h2>
                                </div>
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string()
                                            .email('Ungültige Email Adresse')
                                            .required('Erforderlich'),
                                        password: Yup.string()
                                            .required('Erforderlich')
                                            .min(8, 'Password is too short - should be 8 chars minimum.')
                                    })}
                                    onSubmit={(values, {setSubmitting, setStatus}) => {
                                        const data = {
                                            "email": values.email,
                                            "password": values.password,
                                        }
                                        fetchAPI('/api/v1/accounts/auth/login/', {
                                            method: 'POST',
                                            body: data
                                        }).then(response => {
                                            Cookies.set('token', response.key);
                                            localStorage.setItem('user', response.user);
                                            Router.push('/account');
                                            toast.success("Hallo, Willkommen zurück");
                                            setSubmitting(false);
                                        }).catch(error => {
                                            for (var prop in error) {
                                                const errorMessage = error[prop][0];
                                                toast.error(errorMessage);
                                            }
                                            setSubmitting(false);
                                        })
                                    }}
                                >
                                    {({
                                          handleSubmit,
                                          isSubmitting,
                                      }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <FormGroup>
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
                                            </FormGroup>
                                            <FormGroup className="mb-4">
                                                <Row>
                                                    <Col>
                                                        <Label for="loginPassword" className="form-label">
                                                            Password
                                                        </Label>
                                                    </Col>
                                                    <Col xs="auto">
                                                        <a href="#" className="form-text small">
                                                            Forgot password?
                                                        </a>
                                                    </Col>
                                                </Row>
                                                <InputField
                                                    name="password"
                                                    id="passworkd"
                                                    type="password"
                                                    placeholder="Password"
                                                    required
                                                />
                                            </FormGroup>
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                size="lg"
                                                color="primary"
                                                block>
                                                {(isSubmitting || isLoading) ? <Spinner size="sm"/> : "Anmelden"}
                                            </Button>
                                        </Form>
                                    )}

                                </Formik>
                                <hr data-content="OR" className="my-3 hr-text letter-spacing-2"/>
                                <Button color="outline-primary" block className="btn-social mb-3">
                                    <i className="fa-2x fa-facebook-f fab btn-social-icon"/>
                                    Connect <span className="d-none d-sm-inline">with Facebook</span>
                                </Button>

                                <Link href={`${process.env.CLIENT_API_URL}/api/v1/accounts/auth/google/url/`}>
                                    <Button color="outline-muted" block
                                            className="btn-social mb-3">
                                        <i className="fa-2x fa-google fab btn-social-icon"/>
                                        Connect <span className="d-none d-sm-inline">with Google</span>
                                    </Button>
                                </Link>

                                <Button color="outline-primary" block className="btn-social mb-3">
                                    <i className="fa-2x fa-twitter fab btn-social-icon"/>
                                    Connect <span className="d-none d-sm-inline">with Twitter</span>
                                </Button>
                                <hr className="my-4"/>
                                <p className="text-center">
                                    <small className="text-muted text-center">
                                        Don't have an account yet?&nbsp;
                                        <Link href="/signup">
                                            <a>Sign Up</a>
                                        </Link>
                                    </small>
                                </p>
                                <Link href="/">
                                    <a className="close-absolute mr-md-5 mr-xl-6 pt-5">
                                        <Icon icon="close-1" className="w-3rem h-3rem"/>
                                    </a>
                                </Link>
                            </div>
                        </Col>
                        <Col md="4" lg="6" xl="7" className="d-none d-md-block">
                            <div className="bg-cover h-100 mr-n3">
                                {page.image &&
                                <Image
                                    src={page.image.meta.download_url}
                                    alt={page.image.title}
                                    className="bg-image"
                                    loading="eager"
                                    layout="fill"
                                    priority={true}
                                />
                                }
                            </div>
                        </Col>
                    </Row>

                </Container> :
                <div>Keine Daten</div>
            }
        </>
    )
}


