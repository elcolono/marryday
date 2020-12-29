import React from "react"

import { Container, Row, Col } from "reactstrap"

export default function ContentSection({ data }) {
    return (
        <section className="py-6">
            <Container>
                <Row>
                    <Col xl="8" lg="10" className="mx-auto">
                        <h2 className="pb-4">{data.heading}</h2>
                        <div className="lead mb-5" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}