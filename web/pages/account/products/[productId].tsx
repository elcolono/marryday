import React, {useState} from "react";
import {GetServerSideProps} from 'next';
import Link from "next/link";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Breadcrumb, BreadcrumbItem, Button, Col, Container, Row, Spinner} from "reactstrap";
import fetchAPIWithSSR from '../../../utils/fetchAPIWithSSR';
import getToken from "../../../utils/getToken";
import AddProductBasicForm from "../../../components/account/BasicForm";
import {Form, Formik} from "formik";

import validationSchema from '../../../config/ProductFormModel/validationSchema';
import bookingFormModel from '../../../config/ProductFormModel/productFormModel';
import AddProductImageForm from "../../../components/account/ImageForm";
import ProgressBar from "../../../components/ProgressBar";
import addProductImage from "../../../api/products/addProductImage";
import isEmpty from "lodash/isEmpty"
import AutoSave from "../../../components/forms/AutoSave";
import updateProduct from "../../../api/products/updateProduct";
import Router, {useRouter} from "next/router";
import {accountPath} from "../index";
import {accountProductsPath} from "./index";
import FormFieldsGenerator from "../../../components/forms/FormFieldsGenerator";

const steps = ['basics', 'details', 'location', 'images',];
const {formId} = bookingFormModel;

import productDetailFields from '../../../config/product_detail_fields.json'
import productBasicFields from '../../../config/product_basic_fields.json'

import LocationForm from "../../../components/account/LocationForm";

export const getServerSideProps: GetServerSideProps = async (
    {
        params,
        req,
    }
) => {
    const token = getToken(req);
    const loggedUser = await fetchAPIWithSSR('/api/v1/accounts/auth/user/', {
        method: 'GET',
        req: req,
        token: token
    }) ?? {}
    const product = (await fetchAPIWithSSR(`/api/v1/products/${params.productId}/`, {
        method: 'GET',
        req: req,
        token: token
    })) ?? {}
    const categories = (await fetchAPIWithSSR('/api/v1/products/category/', {
        method: 'GET',
        req: req,
    }))

    const settings = (await fetchAPIWithSSR('/api/page/home', {method: 'GET', req: req})) ?? []
    const pageData = await fetchAPIWithSSR('/api/v2/pages/?type=user_account.AccountProductsPage&fields=seo_title,search_description,heading,description', {method: 'GET'});
    const page = pageData?.items[0] ?? null;

    return {
        props: {
            page,
            product,
            categories,
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
            scripts: ["https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=places&v=weekly"]
        },
    }
}

export default function AccountUpdateProduct(pageProps) {
    const {page, product, categories} = pageProps;

    const router = useRouter()
    const activeStep = router.query['step']
        ? parseInt(router.query['step'] as string)
        : 0
    const isLastStep = activeStep === steps.length - 1;
    const currentValidationSchema = validationSchema[activeStep];
    const formInitialValues = product

    function _renderStepContent(step, values) {
        const selectedCategory = categories.find(category => category.id == values.category) ?? 'default'
        switch (step) {
            case 0:
                return <FormFieldsGenerator data={productBasicFields["default"]}/>;
            case 1:
                return <FormFieldsGenerator data={productDetailFields[selectedCategory.slug]}/>;
            case 2:
                return <LocationForm/>
            case 3:
                return <AddProductImageForm/>
            default:
                return <div>Not Found</div>;
        }
    }


    async function _submitForm(values, actions) {
        try {
            await updateProduct(values);
            toast.success("Successfully saved!", {autoClose: 1500});
            actions.setSubmitting(false);
        } catch (error) {
            toast.error(error.detail)
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        Router.push(`${accountPath}${accountProductsPath}/${product.id}?step=${activeStep - 1}`)
    }

    function _handleFurther() {
        if (isLastStep) {
            Router.push(`${accountPath}${accountProductsPath}`)
        } else {
            Router.push(`${accountPath}${accountProductsPath}/${product.id}?step=${activeStep + 1}`)
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
                        <BreadcrumbItem>
                            <Link href="/account/products/">
                                <a>Products</a>
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
                                {({isSubmitting, values, isValid}) => (
                                    <Form id={formId}>
                                        {_renderStepContent(activeStep, values)}

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
                                        <pre>{JSON.stringify(isValid, null, 2)}</pre>
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

