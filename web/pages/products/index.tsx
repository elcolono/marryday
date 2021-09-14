import React from "react"

import UseWindowSize from "../../hooks/UseWindowSize"
import isEmpty from "lodash/isEmpty"

import {
    Container,
    Row,
    Col, Form, Label,
} from "reactstrap"

import "react-dates/initialize"
import Map from "../../components/Map"
import {DateRangePicker} from "react-dates"
import CardProduct from "../account/products/components/CardProduct"

import {GetServerSideProps} from "next"
import {fetchAPIwithSSR} from "../../lib/api"

export const getServerSideProps: GetServerSideProps = async ({req}) => {
    const products = (await fetchAPIwithSSR('/api/v1/products/public/', {method: 'GET', req: req})) ?? []
    const settings = (await fetchAPIwithSSR('/api/page/home', {method: 'GET', req: req})) ?? []
    return {
        props: {
            products,
            themeSettings: settings.theme_settings,
            mainMenus: settings.main_menus,
            flatMenus: settings.flat_menus,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: "Standorte",
        },
    }
}

const Products = (props) => {
    const size = UseWindowSize()
    const {products} = props
    const [hoverCard, setHoverCard] = React.useState(null)
    const [range, setRange] = React.useState([
        {startDate: new Date()},
        {endDate: ""},
    ])
    const [dateFocused, setDateFocused] = React.useState(range.startDate)

    const onCardEnter = (slug) => {
        setHoverCard(slug)
    }
    const onCardLeave = () => {
        setHoverCard(null)
    }
    return (
        <React.Fragment>
            <Container fluid>
                {!isEmpty(products) && (
                    <Row>
                        <Col lg="6" className="py-4 p-xl-5">
                            <h2 className="mb-4">Stay on Manhattan, NY</h2>
                            <hr className="my-4"/>
                            <Form>
                                <Row>
                                    <Col md="6" className="mb-4 z-index-20">
                                        <Label for="form_dates" className="form-label">
                                            Dates
                                        </Label>
                                        <br/>
                                        <DateRangePicker
                                            startDate={range.startDate}
                                            startDateId="fromDate"
                                            endDate={range.endDate}
                                            endDateId="toDate"
                                            block={true}
                                            onDatesChange={({startDate, endDate}) =>
                                                setRange({startDate, endDate})
                                            }
                                            focusedInput={dateFocused}
                                            onFocusChange={(dateFocused) => setDateFocused(dateFocused)}
                                            orientation={size.width < 400 ? "vertical" : "horizontal"}
                                        />
                                    </Col>
                                </Row>
                            </Form>
                            <hr className="my-4"/>
                            <Row>
                                {products.map((location) => (
                                    <Col
                                        key={location.title}
                                        sm="6"
                                        className="mb-5 hover-animate"
                                        onMouseEnter={() => onCardEnter(location.slug)}
                                        onMouseLeave={() => onCardLeave()}
                                    >
                                        <CardProduct data={location}/>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col lg="6" className="map-side-lg pr-lg-0">
                            <Map
                                className="map-full shadow-left"
                                center={[40.732346, -74.0014247]}
                                zoom={14}
                                locations={products.map(product => product.location)}
                                hoverCard={hoverCard}
                            />
                        </Col>
                    </Row>
                )}
            </Container>
        </React.Fragment>
    )
}

export default Products



