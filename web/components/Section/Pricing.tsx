import React from "react"

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
} from "reactstrap"


export default function PricingSection({ data }) {
    return (
        <section className="py-6">
            <Container>
                <Row>
                    {data.pricings &&
                        data.pricings.map((column, index) => (
                            <Col key={index} lg="4">
                                <Card
                                    className={`mb-5 mb-lg-0 border-0 ${index === 1 ? "card-highlight shadow-lg" : "shadow"
                                        }`}
                                >
                                    {index === 1 && <div className="card-status bg-primary" />}
                                    <CardBody>
                                        <h2 className="text-base subtitle text-center text-primary py-3">
                                            {column.heading}
                                        </h2>
                                        <p className="text-muted text-center">
                                            <span className="h1 text-dark">€ {column.price}</span>
                                            <span className="ml-2">/ Stunde</span>
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
                                            <Button href="#" color="outline-primary">
                                                Select
                        </Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </section>
        // <section className="section">
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-xl-6 col-lg-8 col-md-11">
        //                 <h2 className="section-title"><span>{data.heading}</span></h2>
        //             </div>
        //         </div>
        //         <div className="row align-items-end">
        //             <div className="col-lg-3 pb-4">
        //                 {/* <h4 className="mb-3">Free Plan</h4> */}
        //                 <div className="mb-4" dangerouslySetInnerHTML={{ __html: data.description }}></div>
        //                 <img src={process.env.CLIENT_API_URL + data.image.url} alt=""></img>
        //                 {/* <a href="#" className="btn btn-danger">Register</a> */}
        //             </div>
        //             <div className="col-lg-9">
        //                 <div className="row no-gutters">

        //                     {data.pricings.map((pricing) => (
        //                         <div className="col-md-4 price-card">
        //                             <div className="price-card-header">
        //                                 <h4 className="mb-3">{pricing.heading}</h4>
        //                                 <span className="price"><span>€{pricing.price}</span>/{pricing.type == 'hourly' ? "Stunde" : "Tag"}</span>
        //                             </div>
        //                             <div className="price-text mb-4" dangerouslySetInnerHTML={{ __html: pricing.description }}>
        //                             </div>
        //                             {/* <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>
        //                             <ul className="price-text">
        //                                 <li>Neque porro quisquam est qui dolorem</li>
        //                                 <li>Ut enim ad minima veniam</li>
        //                                 <li>Quis autem vel eum iure</li>
        //                                 <li>Et harum quidem rerum facilis est et expedita distinctio.</li>
        //                             </ul> */}
        //                             <a href="/contact" className="btn btn-danger">Get in Touch</a>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    )
}
