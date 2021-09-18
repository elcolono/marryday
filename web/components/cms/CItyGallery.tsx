import React from "react"

import Link from "next/link"

import { Container, Row, Col, Button } from "reactstrap"

import Image from "../CustomImage"
import ApiService from "../../lib/api"

const CityGallery = (props) => {


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
        <section className="pt-6">
            <Container>
                <Row className="mb-6">
                    <Col lg="12">
                        <h2>{data.heading}</h2>
                        <p className="text-muted mb-0">{data.description}</p>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    {cities && cities.map((city, index) => (
                        <Col
                            xs="6"
                            lg="4"
                            xl="3"
                            className={`px-0 ${index === cities.length
                                ? "d-none d-lg-block d-xl-none"
                                : ""
                                }`}
                            key={index}
                        >
                            <div
                                style={{ minHeight: "400px" }}
                                className="d-flex align-items-center dark-overlay hover-scale-bg-image"
                            >
                                {/* Loading eager set for IE compatibility */}
                                <Image
                                    src={city.preview_image.image}
                                    alt={city.title}
                                    layout="fill"
                                    className="bg-image"
                                    loading="lazy"
                                />
                                <div className="p-3 p-sm-5 text-white z-index-20">
                                    <h4 className="h2">{city.title}</h4>
                                    {/* <p className="mb-4">Her comes subtitle</p> */}
                                    <Link href={`/locations`}>
                                        <Button
                                            // href={`/city/${city.slug}`}
                                            color="link"
                                            className="text-reset pl-0 stretched-link text-decoration-none"
                                        >
                                            Mehr erfahren
                                            <i className="fa fa-chevron-right ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default CityGallery;