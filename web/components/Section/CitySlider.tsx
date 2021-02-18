import React from "react"
import Link from "next/link"
import { Container, Row, Col } from "reactstrap"

import Swiper from "../Swiper"

import ApiService from "../../lib/api"

const CitySlider = (props) => {

    const { data } = props;

    const [cities, setCities] = React.useState(null)

    React.useEffect(() => {
        ApiService.fetchCities().then(response => {
            setCities(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

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
                        {data.button_link && (
                            <Link href={data.button_link.slug}>
                                <a className="text-muted text-sm">
                                    {data.button_text}
                                    <i className="fas fa-angle-double-right ml-2" />
                                </a>
                            </Link>
                        )}
                    </Col>
                </Row>
                {cities && (
                    // <div>{JSON.stringify(cities)}</div>
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