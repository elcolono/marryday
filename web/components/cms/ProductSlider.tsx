import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import Swiper from "../Swiper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductSlider = (props) => {

    const { data, locations } = props;

    return (
        <section className={`py-6 ${data.grey_background ? "bg-gray-100" : ""}`}>
            <Container>
                <Row className="mb-5">
                    <Col md="8">
                        {data.subheading && <p className="subtitle text-secondary">{data.subheading}</p>}
                        {data.heading && <h2>{data.heading}</h2>}
                    </Col>
                    <Col
                        md="4"
                        className="d-lg-flex align-items-center justify-content-end"
                    >
                        <Link href={'/coworking'}>
                            <a className="text-muted text-sm">
                                Alle Locations
                                <FontAwesomeIcon width={10} className={"ml-2"} icon="angle-double-right" />
                            </a>
                        </Link>
                    </Col>
                </Row>
            </Container>
            <Container>
                {locations && <Swiper
                    className="swiper-container-mx-negative pt-3 pb-5"
                    perView={1}
                    spaceBetween={20}
                    roundLengths
                    md={2}
                    lg={3}
                    xl={4}
                    data={locations}
                    cards
                    loop={data.loop_slides}
                />}
            </Container>
        </section>
    )
}

export default ProductSlider