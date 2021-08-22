import React from "react"

import { Container, Row, Col } from "reactstrap"
import Image from "../../../components/CustomImage"

export default function TextWithImage({ data }) {
    return (
        <section className={`${data.padding_top && 'pt-6'} ${data.padding_bottom && 'pb-6'} ${data.grey_background && 'bg-gray-100'}`}>
            <Container>
                <Row className="d-flex">
                    <Col lg="6" className={`text-center text-lg-left m-auto ${data.layout == 'text_right' && 'order-2'}`}>
                        <p className="subtitle text-secondary">
                            {data.subheading}
                        </p>
                        <p className="text-lg">{data.heading}</p>
                        <p className="text-muted mb-0">{data.description}</p>
                    </Col>
                    <Col
                        lg="6"
                    >
                        <Image
                            src={data.image.url}
                            alt={data.title}
                            width={data.image_width}
                            height={data.image_height}
                            layout="responsive"
                            loading="lazy"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}