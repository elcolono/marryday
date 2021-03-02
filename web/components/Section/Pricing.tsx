import React from "react"

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
} from "reactstrap"

import Link from 'next/link';

export default function PricingSection({ data }) {
    return (
        <section className="py-6">
            <Container>
                <Row>
                    {data.pricings &&
                        data.pricings.map((column, index) => (
                            <Col key={index} lg="4">
                                <Card className={`mb-5 mb-lg-0 border-0 ${index === 1 ? "card-highlight shadow-lg" : "shadow"}`}>
                                    {index === 1 && <div className="card-status bg-primary" />}
                                    <CardBody>
                                        <h2 className="text-base subtitle text-center text-primary py-3">
                                            {column.heading}
                                        </h2>
                                        <p className="text-muted text-center">
                                            <span className="h1 text-dark">{column.price}</span>
                                            <span className="ml-2">{column.suffix}</span>
                                        </p>
                                        <hr />
                                        <div className="text-muted" dangerouslySetInnerHTML={{ __html: column.description }}></div>

                                        <ul className="fa-ul my-4">
                                            {column.items.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className={`mb-3 ${item.status ? "" : "text-muted"
                                                        }`}
                                                >
                                                    {item.status ? (
                                                        <span className="fa-li text-primary">
                                                            <i className="fas fa-check" />
                                                        </span>
                                                    ) : (
                                                            <span className="fa-li">
                                                                <i className="fas fa-times" />
                                                            </span>
                                                        )}
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="text-center">
                                            <Link href={`/locations`} passHref>
                                                <a>
                                                    <Button color="outline-primary">
                                                        Auswählen
                                                    </Button>
                                                </a>
                                            </Link>
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </section>
    )
}
