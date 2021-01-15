import React from "react"

import {
    Container,
    Row,
    Col,
} from "reactstrap"


import Icon from "../Icon"

const ContactSection = ({ data, title }) => {
    return (
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
    )
}

export default ContactSection;