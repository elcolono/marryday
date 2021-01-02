import React from "react"

import { Container, Nav, NavItem, NavLink } from "reactstrap"
import Map from "../Map"
import ApiService from "../../lib/api"

import filter from 'lodash/filter'


const MapSection = ({ data }) => {

    const [locations, setLocations] = React.useState(null)
    const [cities, setCities] = React.useState(null)

    const [selectedCity, setSelectedCity] = React.useState(null)

    React.useEffect(() => {
        ApiService.fetchLocations().then(response => {
            setLocations(response.data);
        }).catch(error => {
            console.log(error)
        })
        ApiService.fetchCities().then(response => {
            setCities(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <React.Fragment>
            <section>
                <div className="map-wrapper-450">
                    <Map
                        center={[40.732346, -74.0014247]}
                        className="h-100"
                        zoom={14}
                        locations={locations}
                        bounds={filter(locations, { 'city': { 'id': selectedCity } })}
                    />
                </div>
            </section>

            <section className="py-5 bg-gray-100 shadow">
                <Container>
                    {/* <h1>{data.title && data.title}</h1> */}
                    <h1>{data.heading}</h1>
                    <p className="lead mb-5">{data.description}</p>
                    {cities && (
                        <React.Fragment>
                            <h5>Standorte</h5>
                            <Nav className="nav-pills-custom">
                                {cities.map((city, index) => (
                                    <NavItem key={city.title} >
                                        <NavLink
                                            onClick={() => setSelectedCity(city.id)}
                                            className={city.id === selectedCity ? "active" : ""}
                                        >
                                            {city.title}
                                        </NavLink>
                                    </NavItem>
                                ))}
                            </Nav>
                        </React.Fragment>
                    )}
                </Container>
            </section>
        </React.Fragment>
    )
}

export default MapSection;
