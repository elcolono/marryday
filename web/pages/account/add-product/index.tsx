import React, {useState} from "react";
import {GetServerSideProps} from 'next';
import Link from "next/link";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Breadcrumb,
    BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Container, Media, Row, Spinner
} from "reactstrap";
import fetchAPIwithSSR from '../../../utils/fetchAPIwithSSR';
import getToken from "../../../utils/getToken";
import AddProductBasicForm from "../components/BasicForm";
import {Form, Formik} from "formik";

import validationSchema from '../products/FormModel/validationSchema';
import bookingFormModel from '../products/FormModel/productFormModel';
import formInitialValues from '../products/FormModel/formInitialValues';
import AddProductDetailsForm from "../components/DetailsForm";
import AddProductImageForm from "../components/ImageForm";
import ProgressBar from "../../../components/ProgressBar";
import {CardElement} from "@stripe/react-stripe-js";
import ApiService from "../../../lib/api";
import addProduct from "../../../api/product/addProduct";
import addProductImage from "../../../api/product/addProductImage";

const steps = ['basics', 'details', 'images'];
const {formId, formField} = bookingFormModel;

export default function AccountAddProduct(pageProps) {

    const {page, loggedUser} = pageProps;
    const [activeStep, setActiveStep] = useState(0);

    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    function _renderStepContent(step) {
        switch (step) {
            case 0:
                return <AddProductBasicForm/>;
            case 1:
                return <AddProductDetailsForm/>;
            case 2:
                return <AddProductImageForm/>
            default:
                return <div>Not Found</div>;
        }
    }

    function _uploadImages(values, actions) {
        values['files'].map(file => {
            addProductImage("test_name", file, "1")
                .then(response => {
                    setActiveStep(activeStep + 1);
                    toast.success("Product was created successful!");
                    actions.setSubmitting(false);
                }).catch(error => {
                toast.error(`${error.response.data}`);
                actions.setSubmitting(false);
            })
        })
    }

    function _submitForm(values, actions) {
        addProduct({
            title: values['title'],
            description: values['description'],
        })
            .then(response => {
                toast.success("Product was created successful!");
                _uploadImages(values, actions);
            }).catch(error => {
            toast.error(`${error.response.data}`);
            actions.setSubmitting(false);
        })
    }

    function _handleSubmit(values, actions) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            console.log(activeStep)
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    return (
        <>
            <ToastContainer/>
            <ProgressBar progress={(100 / steps.length) * (activeStep + 1)}/>

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
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <div>DONE</div>
                        ) : (
                            <Formik
                                initialValues={formInitialValues}
                                validationSchema={currentValidationSchema}
                                onSubmit={_handleSubmit}
                            >
                                {({isSubmitting, values}) => (
                                    <Form id={formId}>
                                        {_renderStepContent(activeStep)}

                                        <Row className="form-block flex-column flex-sm-row">
                                            <Col className="text-center text-sm-left">
                                                {activeStep !== 0 && !isSubmitting && (
                                                    <Button color="link" className="text-muted" onClick={_handleBack}>
                                                        Zurück
                                                    </Button>
                                                )}
                                            </Col>
                                            <Col className="text-center text-sm-right">
                                                <Button
                                                    id="submit-button"
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    color="primary"
                                                    className="px-3"
                                                >
                                                    {isSubmitting ?
                                                        <Spinner size={'sm'}/> : isLastStep ? 'Fertig' : 'Weiter'}
                                                    <i className="fa-chevron-right fa ml-2"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                        <div>{JSON.stringify(values)}</div>

                                    </Form>
                                )}
                            </Formik>
                        )}
                    </React.Fragment>
                </Container>
            </section>
        </>
    )
}


export const getServerSideProps: GetServerSideProps = async ({req, res,}) => {

    const token = getToken(req);
    const loggedUser = await fetchAPIwithSSR('/api/v1/accounts/auth/user/', {
        method: 'GET',
        req: req,
        token: token
    }) ?? {}
    const companies = await fetchAPIwithSSR('/api/v1/profiles/usercompanies/', {
        method: 'GET',
        req: req,
        token: token
    }) ?? {}
    if (loggedUser.email === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return {props: {}}
    }

    const settings = (await fetchAPIwithSSR('/api/page/home', {method: 'GET', req: req})) ?? []
    const pageData = await fetchAPIwithSSR('/api/v2/pages/?type=user_account.AccountProductsPage&fields=seo_title,search_description,heading,description', {method: 'GET'});
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
