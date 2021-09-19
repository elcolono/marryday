import React from "react"

import { Formik } from 'formik'
import * as Yup from 'yup'
import ApiService from '../../lib/api';
import { toast } from 'react-toastify';

import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Button,
} from "reactstrap"

import { InputField } from '../forms';

import Icon from "../Icon"

const ContactSection = ({ data, title }) => {
    return (
        <React.Fragment>
            <section className="py-6">
                <Container>
                    <Row>
                        {data.contacts && data.contacts.map((contact, i) => (
                            <Col key={i} className="text-center mb-4 mb-md-0">
                                <div className="icon-rounded mb-4 bg-primary-light">
                                    <Icon
                                        icon={contact.type == "email" && "mail-1" || contact.type == "phone" && "iphone-1"}
                                        className="w-2rem h-2rem text-primary" />
                                </div>
                                <h3 className="h5">{contact.heading}</h3>
                                <p className="text-muted">{contact.content}</p>
                                <p className="text-muted">
                                    <strong>
                                        {contact.type == "email" && <a href={`mailto:${contact.data}`}>{contact.data}</a>}
                                        {contact.type == "phone" && <a href={`tel:${contact.data}`}>{contact.data}</a>}
                                    </strong>
                                </p>
                            </Col>
                        ))}

                    </Row>
                </Container>
            </section>
            <section className="py-6 bg-gray-100">
                <Container>
                    <h2 className="h4 mb-5">Kontaktformular</h2>
                    <Row>
                        <Col md="7" className="mb-5 mb-md-0">
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    messageNote: ''
                                }}
                                validationSchema={Yup.object({
                                    firstName: Yup.string().required('Erforderlich'),
                                    lastName: Yup.string().required('Erforderlich'),
                                    email: Yup.string()
                                        .email('Ungültige Email Adresse')
                                        .required('Erforderlich'),
                                })}
                                onSubmit={(values, { setSubmitting, setStatus }) => {
                                    ApiService.addContact(values)
                                        .then(response => {
                                            toast.success("Erfolgreich angemeldet!");
                                            setSubmitting(false);

                                        }).catch(error => {
                                            toast.error(`${error.response.data}`);
                                            setSubmitting(false);
                                        })
                                }}
                            >
                                {({
                                    handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }) => (

                                    <Form onSubmit={handleSubmit}>
                                        <div className="controls">
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
                                                    Email-Adresse *
                                            </Label>
                                                <InputField
                                                    type="email"
                                                    name="email"
                                                    fullWidth
                                                    placeholder="E-Mail eingeben"
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="message" className="form-label">
                                                    Nachricht
                                            </Label>
                                                <InputField
                                                    type="textarea"
                                                    rows="4"
                                                    name="messageNote"
                                                    placeholder="Nachricht eingeben"
                                                />
                                            </FormGroup>
                                            <Button
                                                disabled={isSubmitting}
                                                type="submit"
                                                color="outline-primary">
                                                Nachricht senden
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                        <Col md="5">
                            <div className="pl-lg-4">
                                {data.content && (
                                    <p className="text-muted">{data.content}</p>
                                )}
                                {data.social && (
                                    <div className="social">
                                        <ul className="list-inline">
                                            {data.social.map((icon) => (
                                                <li key={icon.icon} className="list-inline-item">
                                                    <a
                                                        href={icon.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <i className={`fab fa-${icon.icon}`} />
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>


    )
}

export default ContactSection;