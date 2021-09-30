import React from "react";
import Link from "next/link";
import {Container, Row, Col} from "reactstrap";
import Swiper from "../Swiper";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import CardPoster from "../CardPoster";

const TopicSlider = (props) => {
    const {
        heading,
        subheading,
        productCategories,
        loop_slides,
        grey_background
    } = props

    return (
        <section className={`py-6 ${grey_background ? "bg-gray-100" : ""}`}>
            <Container>
                <Row className="mb-5">
                    <Col md="8">
                        {subheading && <p className="subtitle text-primary">{subheading}</p>}
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
                {productCategories && (
                    <Swiper
                        className="guides-slider mx-n2 pt-3 pb-5"
                        perView={1}
                        spaceBetween={20}
                        imgCards
                        loop={loop_slides}
                        roundLengths
                        md={2}
                        lg={4}
                        xl={5}
                    >
                        {productCategories.map((element, index) =>
                            <div key={element.id} className="h-auto px-2">
                                <CardPoster data={element}/>
                            </div>
                        )}
                    </Swiper>
                )}
            </Container>
        </section>
    )
}

export default TopicSlider;