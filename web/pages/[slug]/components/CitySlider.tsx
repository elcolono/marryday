import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import Swiper from "../../../components/Swiper";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CitySlider = (props) => {
    const { data, cities } = props;
    return (
        <section className={`py-6 ${data.grey_background ? "bg-gray-100" : ""}`}>
            <Container>
                <Row className="mb-5">
                    <Col md="8">
                        {data.subheading && <p className="subtitle text-primary">{data.subheading}</p>}
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
                {cities && (
                    <Swiper
                        className="guides-slider mx-n2 pt-3 pb-5"
                        perView={1}
                        spaceBetween={20}
                        imgCards
                        loop={data.loop_slides}
                        roundLengths
                        md={2}
                        lg={4}
                        xl={5}
                        data={cities}
                    />
                )}
            </Container>
        </section>
    )
}

export default CitySlider;