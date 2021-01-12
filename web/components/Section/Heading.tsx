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

export default function HeadingSection({ data, title }) {
    return (
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
        //                             <nav aria-label="breadcrumb">
        //                                 <ol className="breadcrumb">
        //                                     <li className="breadcrumb-item"><a href="/">Home</a></li>
        //                                     <li className="breadcrumb-item active" aria-current="page">{title}</li>
        //                                 </ol>
        //                             </nav>
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
    )
}