import React from "react"

import { Container, Row, Col } from "reactstrap"


export default function FAQSection({ data }) {
    return (
        <section className="py-6">
            <Container>
                <div className="py-4">
                    <h2 className="mb-5 text-primary">{data.heading}</h2>
                    <Row>
                        {data.faqs && data.faqs.map((faq, i) => (
                            <Col md="6" key={i}>
                                <h5>{faq.heading}</h5>
                                <p className="text-muted mb-4">
                                    {faq.content}
                                </p>
                            </Col>
                        ))}
                    </Row>
                </div>

            </Container>
        </section>

    )
}