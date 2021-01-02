import React from "react"

import {
    Container,
    Row,
    Col,
} from "reactstrap"

import Icon from "../Icon"

export default function ServiceSection({ data }) {
    return (

        <section className="py-6">
            <Container>
                <div className="text-center pb-lg-4">
                    {data.subheading && <p className="subtitle text-secondary">
                        {data.subheading}
                    </p>}
                    <h2 className="mb-5">{data.heading}</h2>
                </div>
                <Row>
                    {data.services && data.services.map((service, i) => (
                        <Col key={i} md="4" className="text-center text-md-left mb-4 mb-md-0">
                            {data.layout == "service_with_icon" && (
                                <div className="icon-rounded mb-4 bg-primary-light">
                                    <Icon
                                        icon="map-location-1"
                                        className="w-2rem h-2rem text-primary"
                                    />
                                </div>
                            )}
                            {data.layout == "service_with_image" && (
                                <div className="icon-image-rounded mb-4 bg-primary-light">
                                    <img src={service.image.url} alt=""></img>
                                </div>
                            )}
                            <h3 className="h5">{service.heading}</h3>
                            <p className="text-muted">
                                {service.description}
                            </p>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section >

    )
}
