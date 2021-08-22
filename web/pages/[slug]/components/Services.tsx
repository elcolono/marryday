import React from "react"

import {
    Container,
    Row,
    Col,
} from "reactstrap"
import Icon from "../../../components/Icon"
import Image from "../../../components/CustomImage"

export default function ServiceSection({ data }) {
    return (

        <section className={`py-6 ${data.grey_background ? "bg-gray-100" : ""}`}>
            <Container>
                <div className="text-center pb-lg-4">
                    {data.subheading && <p className="subtitle text-secondary">
                        {data.subheading}
                    </p>}
                    <h2 className="mb-5">{data.heading}</h2>
                </div>
                <Row>
                    {data.services && data.services.map((service, i) => (
                        <Col
                            key={service.heading}
                            md="4"
                            className="mb-3 mb-lg-0 text-center"
                        >
                            <div className="px-0 px-lg-3">
                                {data.layout == "service_with_icon" && (
                                    <div className="icon-rounded bg-primary-light mb-3">
                                        <Icon
                                            icon={service.icon}
                                            className="text-primary w-2rem h-2rem"
                                        />                                    </div>
                                )}
                                {data.layout == "service_with_image" && (
                                    <div className="icon-image-rounded mb-4 bg-primary-light position-relative">
                                        <Image
                                            src={service.image.url}
                                            className="bg-image"
                                            loading="lazy"
                                            layout="fill"
                                            alt={service.title}
                                            sizes="(max-width:576px) 100vw, 350px"
                                            quality="100"
                                        />
                                    </div>
                                )}
                                <h3 className="h5">{service.heading}</h3>
                                <p className="text-muted">
                                    {service.description}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section >
    )
}
