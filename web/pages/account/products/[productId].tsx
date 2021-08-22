import React, {useState} from "react";
import {GetServerSideProps} from 'next';
import Link from "next/link";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Breadcrumb, BreadcrumbItem, Button, Col, Container, Row, Spinner} from "reactstrap";
import fetchAPIWithSSR from '../../../utils/fetchAPIwithSSR';
import getToken from "../../../utils/getToken";
import AddProductBasicForm from "../../add-product/components/BasicForm";
import {Form, Formik} from "formik";

import validationSchema from '../products/FormModel/validationSchema';
import bookingFormModel from '../products/FormModel/productFormModel';
import AddProductDetailsForm from "../../add-product/components/DetailsForm";
import AddProductImageForm from "../../add-product/components/ImageForm";
import ProgressBar from "../../../components/ProgressBar";
import addProductImage from "../../../api/products/addProductImage";
import isEmpty from "lodash/isEmpty"
import AutoSave from "../../../components/FormFields/AutoSave";
import updateProduct from "../../../api/products/updateProduct";
import Router from "next/router";
import {accountPath} from "../index";
import {accountProductsPath} from "./index";

const steps = ['basics', 'details', 'images'];
const {formId} = bookingFormModel;

export default function AccountUpdateProduct(pageProps) {

    const {page, product} = pageProps;
    const [activeStep, setActiveStep] = useState(0);

    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;
    const formInitialValues = product

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

    async function uploadImages(images, productId: string) {
        for await (const image of images) {
            if (!image.uuid) {
                await addProductImage(
                    "test_name",
                    image,
                    productId
                )
            }
        }
    }

    async function _submitForm(values, actions) {
        try {
            console.log('submitForm')
            await updateProduct(values);
            await uploadImages(values['images'], values['id']);
            toast.success("Product was updated successful!");
            actions.setSubmitting(false);
        } catch (error) {
            toast.error(error.detail)
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    function _handleFurther() {
        if (isLastStep) {
            Router.push(`${accountPath}${accountProductsPath}`)
        } else {
            setActiveStep(activeStep + 1);
        }
    }

    if (isEmpty(product)) {
        return <div>No Product</div>
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
                                onSubmit={_submitForm}
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
                                                    color="primary"
                                                    className="px-3"
                                                    onClick={_handleFurther}
                                                >
                                                    {isSubmitting ?
                                                        <Spinner size={'sm'}/> : isLastStep ? 'Fertig' : 'Weiter'}
                                                    <i className="fa-chevron-right fa ml-2"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                        <AutoSave debounceMs={1000}/>
                                        <pre>{JSON.stringify(values, null, 2)}</pre>
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


export const getServerSideProps: GetServerSideProps = async ({
                                                                 params,
                                                                 req,
                                                                 res,
                                                             }) => {
    const token = getToken(req);
    const loggedUser = await fetchAPIWithSSR('/api/v1/accounts/auth/user/', {
        method: 'GET',
        req: req,
        token: token
    }) ?? {}
    const product = (await fetchAPIWithSSR(`/api/v1/products/${params.productId}/vendor/`, {
        method: 'GET',
        req: req,
        token: token
    })) ?? {}

    const settings = (await fetchAPIWithSSR('/api/page/home', {method: 'GET', req: req})) ?? []
    const pageData = await fetchAPIWithSSR('/api/v2/pages/?type=user_account.AccountProductsPage&fields=seo_title,search_description,heading,description', {method: 'GET'});
    const page = pageData?.items[0] ?? null;

    return {
        props: {
            page,
            product,
            loggedUser,
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
