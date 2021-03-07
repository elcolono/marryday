import React from "react"
import Link from "next/link"

import {
    Container,
    Row,
    Col,
    Button,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap"

import Map from "../../components/Map"

import format from "date-fns/format"
import differenceInMinutes from "date-fns/differenceInMinutes"

import { GetServerSideProps } from "next"
import { fetchAPIwithSSR } from "../../lib/api"

const UserBooking = (props) => {

    const { booking } = props;

    return (
        <Container fluid>
            {booking &&
                <Row>
                    <Col lg="7" xl="5" className="px-4 pb-4 pl-xl-5 pr-xl-5 my-5">
                        {/* <pre>{JSON.stringify(booking, null, 2)}</pre> */}
                        <Breadcrumb listClassName="pl-0  justify-content-start">
                            <BreadcrumbItem>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>MoWo Booking</BreadcrumbItem>
                        </Breadcrumb>

                        <div className="text-block">
                            <p className="subtitle">{format(new Date(booking.start), 'EEEE MMM dd')} - {format(new Date(booking.end), 'EEEE MMM dd')}</p>
                            <h1 className="hero-heading mb-3">{booking.rent_object}</h1>
                        </div>
                        <div className="text-block">
                            <h6 className="mb-4">{differenceInMinutes(new Date(booking.end), new Date(booking.start))} minutes in {booking.location.title}</h6>
                            <Row className="mb-3">
                                <Col md="6" className="d-flex align-items-center mb-3 mb-md-0">
                                    <div className="date-tile mr-3">
                                        <div className="text-uppercase">
                                            <span className="text-sm">
                                                {format(new Date(booking.start), 'MMM')}
                                            </span>
                                            <br />
                                            <strong className="text-lg">{format(new Date(booking.start), 'dd')}</strong>
                                        </div>
                                    </div>
                                    <p className="text-sm mb-0">
                                        {format(new Date(booking.start), 'EEEE')} check-in
                                        <br />
                                        {format(new Date(booking.start), 'hh aaa')} ({format(new Date(booking.start), 'k:mm')})
                                    </p>
                                </Col>
                                <Col md="6" className="d-flex align-items-center">
                                    <div className="date-tile mr-3">
                                        <div className="text-uppercase">
                                            <span className="text-sm">
                                                {format(new Date(booking.end), 'MMM')}
                                            </span>
                                            <br />
                                            <strong className="text-lg">{format(new Date(booking.end), 'dd')}</strong>
                                        </div>
                                    </div>
                                    <p className="text-sm mb-0">
                                        {format(new Date(booking.end), 'EEEE')} check-out
                                        <br />
                                        {format(new Date(booking.end), 'hh aaa')} ({format(new Date(booking.end), 'k:mm')})
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <div className="text-block">
                            <Row>
                                <Col xs="sm">
                                    <h6>Address</h6>
                                    <p className="text-muted">{booking.location.formatted_address}</p>
                                </Col>

                                <Col xs="sm">
                                    <h6>Phone</h6>
                                    <p className="text-muted">{booking.location.public_phone}</p>
                                </Col>
                            </Row>
                        </div>

                        <div className="text-block d-print-none">
                            <Button
                                color="link"
                                onClick={() => window.print()}
                                className="pl-0"
                            >
                                <i className="fa fa-print mr-2" />
                        Print
                      </Button>
                        </div>
                    </Col>
                    <Col lg="5" xl="7" className="map-side-lg px-lg-0">
                        <Map
                            className="map-full shadow-left"
                            center={[booking.location.geometry.location.lat, booking.location.geometry.location.lng]}
                            markerPosition={[booking.location.geometry.location.lat, booking.location.geometry.location.lng]}
                            zoom={18}
                            scrollWheelZoom={false}
                            geoJSON={false}
                        />
                    </Col>
                </Row>
            }</Container>
    )
}

export default UserBooking

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    // const booking = (await fetchAPIwithSSR(`/api/v1/cowork/booking/${params.bookingId}`, { method: 'GET', req: req })) ?? []
    const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
    const booking = (await fetchAPIwithSSR(`/api/v1/cowork/booking/${params.bookingUuid}`, { method: 'GET', req: req })) ?? []

    return {
        props: {
            booking,
            themeSettings: settings.theme_settings,
            mainMenus: settings.main_menus,
            flatMenus: settings.flat_menus,
            // user,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: "Buchungsbestätigung",
        },
    }
}
