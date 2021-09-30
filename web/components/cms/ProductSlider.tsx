import React from "react";
import Link from "next/link";
import {Container, Row, Col} from "reactstrap";
import Swiper from "../Swiper";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import CardProduct from "../CardProduct";

const ProductSlider = (props) => {

    const {
        heading,
        subheading,
        products,
        loop_slides,
        grey_background
    } = props

    return (
        <section className={`py-6 ${grey_background ? "bg-gray-100" : ""}`}>
            <Container>
                <Row className="mb-5">
                    <Col md="8">
                        {subheading && <p className="subtitle text-secondary">{subheading}</p>}
                        {heading && <h2>{heading}</h2>}
                    </Col>
                    <Col
                        md="4"
                        className="d-lg-flex align-items-center justify-content-end"
                    >
                        <Link href={'/coworking'}>
                            <a className="text-muted text-sm">
                                Alle Locations
                                <FontAwesomeIcon width={10} className={"ml-2"} icon="angle-double-right"/>
                            </a>
                        </Link>
                    </Col>
                </Row>
            </Container>
            <Container>
                {products && (
                    <Swiper
                        className="swiper-container-mx-negative pt-3 pb-5"
                        perView={1}
                        spaceBetween={20}
                        roundLengths
                        md={2}
                        lg={3}
                        xl={4}
                        cards
                        loop={loop_slides}
                    >
                        {products.map((element, index) =>
                            <div key={element.id} className="h-auto px-2">
                                <CardProduct data={element}/>
                            </div>
                        )}
                    </Swiper>
                )}
            </Container>
        </section>
    )
}

export default ProductSlider