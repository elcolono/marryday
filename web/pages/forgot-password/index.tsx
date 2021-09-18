import React, {useEffect, useState} from "react"
import Link from "next/link"
import Router, {useRouter} from "next/router";
import "@fortawesome/fontawesome-free/css/all.min.css"

import fetchAPIWithSSR from '../../utils/fetchAPIWithSSR';
import {GetStaticProps} from 'next';
import Cookies from 'js-cookie';

import {Button, Col, Container, Form, FormGroup, Label, Row, Spinner,} from "reactstrap"
import Image from "../../components/CustomImage"
import Icon from "../../components/Icon"

import {Formik} from "formik";
import {InputField} from '../../components/forms';

import * as Yup from 'yup'
import fetchAPI from "../../utils/fetchAPI";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getStaticProps: GetStaticProps = async () => {
    const settings = await fetchAPIWithSSR('/api/page/home', {method: 'GET'});
    const pageData = await fetchAPIWithSSR('/api/v2/pages/?type=home.SigninPage&fields=seo_title,search_description,heading,description,image', {method: 'GET'});
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
                                    <div className="text-muted" dangerouslySetInnerHTML={{__html: page.description}}>
                                    </div>
                                </div>
                                <Formik
                                    initialValues={{
                                        email: '',
                                    }}
                                    validationSchema={Yup.object({
                                        email: Yup.string()
                                            .email('Ungültige Email Adresse')
                                            .required('Erforderlich'),
                                    })}
                                    onSubmit={(values, {setSubmitting, setStatus}) => {
                                        const data = {
                                            "email": values.email,
                                        }
                                        fetchAPI('/api/v1/accounts/forgot-password/', {
                                            method: 'POST',
                                            body: data
                                        }).then(response => {
                                            for (var prop in response) {
                                                const errorMessage = response[prop];
                                                toast.success(errorMessage);
                                            }
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
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                size="lg"
                                                color="primary"
                                                block>
                                                {isSubmitting ? <Spinner size="sm"/> : "Reset password"}
                                            </Button>
                                        </Form>
                                    )}

                                </Formik>

                                <hr className="my-4"/>
                                <p className="text-center">
                                    <small className="text-muted text-center">
                                        Don't have an account yet?&nbsp;
                                        <Link href="/login">
                                            <a>Login</a>
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


