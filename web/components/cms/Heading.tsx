import React from "react"

import Link from "next/link"

import {
    Container,
    Row,
    Col,
    Button,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap"

import Image from "../CustomImage"


export default function HeadingSection({ data, title }) {
    return data.layout == "with_background" &&
        <section className="hero py-6 py-lg-7 text-white dark-overlay">
            {/* {JSON.stringify(data)} */}
            {data.image && (
                <Image
                    src={data.image.url}
                    alt={data.image.title}
                    className="bg-image"
                    loading="lazy"
                    layout="fill"
                />
            )}
            <Container className="overlay-content">
                <Breadcrumb listClassName="text-white justify-content-center no-border mb-0">
                    <BreadcrumbItem>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{title && title}</BreadcrumbItem>
                </Breadcrumb>

                <h1 className="hero-heading">{data.heading && data.heading}</h1>
                <Row>
                    <Col xl="8" className="mx-auto">
                        <p className="text-lg text-white mb-5">
                            {data.description && data.description}
                        </p>
                        <p className="mb-0">

                            {data.primary_button_link &&
                                <Link href={`/${data.primary_button_link.slug}`}>
                                    <Button color="primary" className="mr-4">
                                        {data.primary_button_text}
                                    </Button>
                                </Link>}

                            {data.secondary_button_link &&
                                <Link href={`/${data.secondary_button_link.slug}`}>
                                    <Button color="outline-primary" className="mr-4">
                                        {data.secondary_button_text}
                                    </Button>
                                </Link>}
                        </p>
                    </Col>
                </Row>
            </Container>
        </section > || data.layout == "without_background" &&
        <section className="hero py-5 py-lg-7">
            <Container className="position-relative">
                <Breadcrumb listClassName="pl-0  justify-content-center">
                    <BreadcrumbItem>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{title}</BreadcrumbItem>
                </Breadcrumb>

                <h1 className="hero-heading">{data.heading && data.heading}</h1>
                <Row>
                    <Col xl="8" className="mx-auto">
                        <p className="text-lg text-muted mb-5">
                            {data.description && data.description}
                        </p>
                        <p className="mb-0">

                            {data.primary_button_link &&
                                <Link href={`/${data.primary_button_link.slug}`}>
                                    <Button color="primary" className="mr-4">
                                        {data.primary_button_text}
                                    </Button>
                                </Link>}

                            {data.secondary_button_link &&
                                <Link href={`/${data.secondary_button_link.slug}`}>
                                    <Button color="outline-primary" className="mr-4">
                                        {data.secondary_button_text}
                                    </Button>
                                </Link>}
                        </p>
                    </Col>
                </Row>
            </Container>
        </section >
}