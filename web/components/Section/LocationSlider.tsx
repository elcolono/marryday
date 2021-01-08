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
        <section className={`py-6 ${props.greyBackground ? "bg-gray-100" : ""}`}>
            <Container>
                <div className="text-center pb-lg-4">
                    {data.subheading && <p className="subtitle text-secondary">{data.subheading}</p>}
                    {data.heading && <h2 className="mb-5">{data.heading}</h2>}
                </div>
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
                <div className="text-center mt-5">
                    <Link href="/locations">
                        <a className="btn btn-outline-primary">Alle Standorte</a>
                    </Link>
                </div>
            </Container>
        </section>
    )
}

export default LocationSlider