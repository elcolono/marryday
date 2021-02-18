import React from "react"
import Link from "next/link"
import { Container, Row, Col } from "reactstrap"

import Swiper from "../Swiper"

// import data from "../data/lastminute.json"
// import geoJSON from "../data/rooms-geojson.json"
import ApiService from "../../lib/api"

const LocationSlider = (props) => {

    const { data } = props;

    const [locations, setLocations] = React.useState(null)

    React.useEffect(() => {
        ApiService.fetchLocations().then(response => {
            setLocations(response.data);
        }).catch(error => {
            console.log(error)
        })
    }, [])

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
                    loop
                />}
                {/* <div className="text-center mt-5">
                    <Link href="/coworking">
                        <a className="btn btn-outline-primary">Alle Standorte</a>
                    </Link>
                </div> */}
            </Container>
        </section>
    )
}

export default LocationSlider