import React from "react"

import Link from "next/link"

import {
    Container,
    Row,
    Col,
} from "reactstrap"

import Image from "../CustomImage"

const HeroSection = ({ data }) => {
    return (
        <section className="position-relative py-6">
            <Image
                src={data.image.url}
                alt="test"
                className="bg-image"
                loading="lazy"
                layout="fill"
            />
            <Container>
                <Row>
                    <Col lg="6">
                        <div className="bg-white rounded-lg shadow p-5">
                            {/* {JSON.stringify(data)} */}
                            {data.subheading &&
                                <strong className="text-uppercase text-secondary d-inline-block mb-2 text-sm">
                                    {data.subheading}
                                </strong>
                            }
                            <h2 className="mb-3">{data.heading}</h2>
                            <p className="text-muted">{data.description}</p>
                            {data.button_link &&
                                <Link href={`/${data.button_link.slug}`}>
                                    <a className="p-0 btn btn-link">
                                        {data.button_text}{" "}
                                        <i className="fa fa-long-arrow-alt-right" />
                                    </a>
                                </Link>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HeroSection;