import {Formik} from "formik";
import getToken from "../../utils/getToken";
import {Button, Form, Spinner} from "reactstrap";
import FormFieldsGenerator from "./FormFieldsGenerator";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import fetchAPI from "../../utils/fetchAPI";
import {toast} from "react-toastify";

const createYupSchema = (schema, config) => {
    const {id, validationType, validations = []} = config;
    if (!yup[validationType]) {
        return schema;
    }
    let validator = yup[validationType]();
    validations.forEach(validation => {
        const {params, type} = validation;
        if (!validator[type]) {
            return;
        }
        validator = validator[type](...params);
    });
    schema[id] = validator;
    return schema;
}


export default function FormGenerator(props) {
    const {formData} = props;
    const [values, setValues] = useState({});
    const reducedInputs = formData.formBlocks.reduce((acc, curVal) => acc.concat(curVal.inputs), []);

    useEffect(() => {
        const fetchValues = async (asyncUrl) => {
            const token = getToken()
            const response = await fetchAPI(
                asyncUrl,
                {
                    token: token
                }
            )
            setValues(response)
        }
        fetchValues(formData['GET']).catch(error => {
            toast.error(error.detail ?? "Something went wrong.")
        })
    }, [])

    reducedInputs.forEach(item => {
        setValues[item.id] = item.value || "";
    });

    const yepSchema = reducedInputs.reduce(createYupSchema, {});
    const validateSchema = yup.object().shape(yepSchema);

    return (
        <Formik
            enableReinitialize={true}
            initialValues={values}
            validationSchema={validateSchema}
            onSubmit={(values, {setSubmitting}) => {
                const token = getToken();

                const formValues = new FormData();
                if (formData.isForm) {
                    const image = values['image']
                    console.log(values['image'])
                    formValues.append("image", image, 'Das ist ein Filetitle')
                }

                fetchAPI(`${formData['PUT']}${values['id']}/`, {
                    method: 'PUT',
                    token: token,
                    isForm: formData.isForm,
                    mediaType: formData.isForm && 'multipart/form-data; boundary=----WebKitFormBoundary',
                    body: formData.isForm ? formValues : values,
                }).then(response => {
                    toast.success("Erfolgreich gespeichert");
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
                  values
              }) => (
                <Form onSubmit={handleSubmit}>
                    <FormFieldsGenerator data={formData}/>
                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        color="outline-primary"
                        className=" mb-4">
                        {isSubmitting ? <Spinner size="sm"/> : "Speichern"}
                    </Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    )
}