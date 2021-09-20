import React from "react"

import {
    Container,
    Row,
    Col,
} from "reactstrap"
import Icon from "../Icon"
import Image from "../CustomImage"

export default function ServiceSection(props) {
    const {heading, subheading, services, layout, grey_background} = props;
    return (

        <section className={`py-6 ${grey_background ? "bg-gray-100" : ""}`}>
            <Container>
                <div className="text-center pb-lg-4">
                    {subheading && <p className="subtitle text-secondary">
                        {subheading}
                    </p>}
                    <h2 className="mb-5">{heading}</h2>
                </div>
                <Row>
                    {services && services.map((service, index) => (
                        <Col
                            key={index}
                            md="4"
                            className="mb-3 mb-lg-0 text-center"
                        >
                            <div className="px-0 px-lg-3">
                                {layout == "service_with_icon" && (
                                    <div className="icon-rounded bg-primary-light mb-3">
                                        <Icon
                                            icon={service.icon}
                                            className="text-primary w-2rem h-2rem"
                                        /></div>
                                )}
                                {layout == "service_with_image" && (
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
        </section>
    )
}
