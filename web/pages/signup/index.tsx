import React from "react"
import Link from "next/link"

import fetchAPIWithSSR from '../../utils/fetchAPIWithSSR';
import { GetStaticProps } from 'next';

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

import { Formik } from "formik";
import { InputField } from '../../components/forms';

import * as Yup from 'yup'
import fetchAPI from "../../utils/fetchAPI";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup(pageProps) {

  const { page } = pageProps;

  return (
    <>
      <ToastContainer />
      {page ?
        <Container fluid className="px-3">
          <Row className="min-vh-100">
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
            <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
              <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
                <div className="mb-4">
                  <h2>{page.heading && page.heading}</h2>
                  <p className="text-muted">
                    {page.description && page.description}
                  </p>
                </div>
                <Formik
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmpassword: '',
                  }}
                  validationSchema={Yup.object({
                    firstName: Yup.string().required('Erforderlich'),
                    lastName: Yup.string().required('Erforderlich'),
                    email: Yup.string()
                      .email('Ungültige Email Adresse')
                      .required('Erforderlich'),
                    password: Yup.string()
                      .required('Erforderlich')
                      .min(8, 'Password is too short - should be 8 chars minimum.')
                      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                    confirmpassword: Yup.string()
                      .required('Erforderlich')
                      .oneOf([Yup.ref('password'), null], 'Passwords must match')
                  })}
                  onSubmit={(values, { setSubmitting, setStatus }) => {
                    console.log(values);
                    const data = {
                      "email": values.email,
                      "first_name": values.firstName,
                      "last_name": values.lastName,
                      "password1": values.password,
                      "password2": values.confirmpassword,
                      "is_company": true,
                      "is_visitor": false
                    }
                    fetchAPI('/api/v1/rest-auth/registration/', { method: 'POST', body: data }).then(response => {
                      toast.success("Glückwunsch! Ihre Registrierung war erfolgreich. Bitte bestätigen Sie noch Ihren Bestätigungslink.");
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
                      <Row>
                        <Col sm="6">
                          <FormGroup>
                            <Label for="name" className="form-label">
                              Vorname *
                        </Label>
                            <InputField
                              name={"firstName"}
                              fullWidth
                              placeholder="Vorname eingeben"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="6">
                          <FormGroup>
                            <Label for="surname" className="form-label">
                              Nachname *
                        </Label>
                            <InputField
                              name={"lastName"}
                              fullWidth
                              placeholder="Nachname eingeben"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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
                        <Label for="password" className="form-label">
                          Password
                </Label>
                        <InputField
                          name="password"
                          id="passworkd"
                          type="password"
                          placeholder="Password"
                          required
                        />
                      </FormGroup>
                      <FormGroup className="mb-4">
                        <Label for="loginPassword2" className="form-label">
                          Confirm your password
                </Label>
                        <InputField
                          name="confirmpassword"
                          id="confirmpassword"
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
                        {isSubmitting ? <Spinner size="sm" /> : "Registrieren"}
                      </Button>
                    </Form>
                  )}

                </Formik>
                <hr className="my-4" />
                <p className="text-sm text-muted">
                  By signing up you agree to Directory's{" "}
                  <a href="#">Terms and Conditions</a> and{" "}
                  <a href="#">Privacy Policy</a>.
            </p>
                <Link href="/">
                  <a className="close-absolute mr-md-5 mr-xl-6 pt-5">
                    <Icon icon="close-1" className="w-3rem h-3rem" />
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container> :
        <div>Noch keine Daten</div>
      }
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const settings = await fetchAPIWithSSR('/api/page/home', { method: 'GET' });
  const pageData = await fetchAPIWithSSR('/api/v2/pages/?type=home.SignupPage&fields=seo_title,search_description,heading,description,image', { method: 'GET' });
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
      searchDescription: page?.meta.search_description ?? null,
    },
  }
}

