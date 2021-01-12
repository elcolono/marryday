import React from "react"

import Link from "next/link"

import {
    Container,
    Row,
    Col,
} from "reactstrap"

import Image from "../CustomImage"


const HerSection = ({ data }) => {
    return (
        // <section id="intro_section">
        //     <div className="row no-gutters">
        //         <div className="col-lg-6">
        //             {/* <!-- Begin | Inner Banner Content [[ Find at scss/frameworks/base/banner.scss ]] --> */}
        //             <div className="inner-banner-content banner-content-white">
        //                 <div className="container container-half">
        //                     <div className="row">
        //                         <div className="col-md-10">
        //                             <h1 className="intro-section-title">{data.heading}</h1>
        //                             <p>{data.description}</p>
        //                             <a href={data.button_link} className="btn btn-pill btn-danger btn-icon">{data.button}</a>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             {/* <!-- End | Inner Banner Content --> */}
        //         </div>
        //         {/* <!-- Inner Banner [[ Find at scss/frameworks/base/banner.scss ]] --> */}
        //         <div style={data.image ? { backgroundImage: `url(${process.env.CLIENT_API_URL + data.image.url})` } : null} className="col-lg-6 banner inner-banner overlay-banner-ipad hero-about"></div>
        //     </div>
        // </section>

        <section className="position-relative py-6">
            <img
                src={data.image.url}
                alt="Alt text"
                className="bg-image"
            />
            {/* <Image
                src={process.env.CLIENT_API_URL + data.image.url}
                alt="test"
                className="bg-image"
                loading="eager"
                layout="fill"
                priority={true}
            /> */}
            <Container>
                <Row>
                    <Col lg="6">
                        <div className="bg-white rounded-lg shadow p-5">
                            {data.subheading &&
                                <strong className="text-uppercase text-secondary d-inline-block mb-2 text-sm">
                                    {data.subheading}
                                </strong>
                            }
                            <h2 className="mb-3">{data.heading}</h2>
                            <p className="text-muted">{data.description}</p>
                            <Link href="/blog/[slug]" as={data.button_link}>
                                <a className="p-0 btn btn-link">
                                    Mehr erfahren{" "}
                                    <i className="fa fa-long-arrow-alt-right" />
                                </a>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HerSection;