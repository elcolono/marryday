import React from "react"
import dynamic from "next/dynamic"

import {
    Button,
    Container,
    Row,
    Col,
    Media,
    CardHeader,
    CardBody,
    CardFooter,
} from "reactstrap"

import SwiperGallery from "../../../components/SwiperGallery"
import Gallery from "../../../components/Gallery"
import Map from "../../../components/Map"
import Icon from '../../../components/Icon';
import BottomNav from '../../../Layout/BottomNav'

import { GetServerSideProps } from "next";
import { fetchAPIwithSSR } from "../../../lib/api";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js/pure";
import Cookies from 'js-cookie';

import OpeningHoursTable from "../../../components/OpeningHoursTable"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LocationDetail = (props) => {
    const { location } = props
    const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY, { locale: 'de' });


    const [isDesktop, setIsDesktop] = React.useState(false)
    const [acceptedCookies, setAcceptedCookies] = React.useState(undefined)

    React.useEffect(() => {
        setAcceptedCookies(Cookies.get('CookieConsent'))
        setIsDesktop(window.innerWidth > 991)
    })

    const BookingWithNoSSR = dynamic(() => import("./components"), {
        ssr: false
    });


    return (
        <React.Fragment>
            <section>
                <SwiperGallery data={location.images} />
                <Container className="py-5">
                    <Row>
                        <Col lg={location.booking_type == "linking" ? '7' : '6'}>
                            {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}

                            <div className="text-block">
                                <p className="text-primary">
                                    <i className="fa-map-marker-alt fa mr-1" />
                                    &nbsp;{location.formatted_address}
                                </p>
                                {location.title && <h1>{location.title}</h1>}
                                {/* <div className="text-muted text-uppercase mb-4">
                                    MoWo Original
                                </div> */}
                                <div className="text-muted-html" dangerouslySetInnerHTML={{ __html: location.description }}></div>
                            </div>

                            <div className="text-block">
                                <h4 className="mb-4">Ausstattung</h4>
                                <Row>
                                    <Col md="6">
                                        <ul className="list-unstyled text-muted">
                                            {location.amenities.slice(0, 3).map((amenity) => (
                                                <li key={amenity.type} className="mb-2">
                                                    <FontAwesomeIcon width={10} className={'text-secondary w-1rem mr-3 text-center'} icon={amenity.icon} />
                                                    <span className="text-sm">
                                                        {!amenity.value && <del>{amenity.label}</del> || amenity.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Col>
                                    <Col md="6">
                                        <ul className="list-unstyled text-muted">
                                            {location.amenities.slice(3, 6).map((amenity) => (
                                                <li key={amenity.type} className="mb-2">
                                                    <FontAwesomeIcon width={10} className={'text-secondary w-1rem mr-3 text-center'} icon={amenity.icon} />
                                                    <span className="text-sm">
                                                        {!amenity.value && <del>{amenity.label}</del> || amenity.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Col>
                                </Row>
                            </div>


                            {location.opening_hour_periods && location.booking_type == "booking" && (
                                <div className="text-block">
                                    <h3 className="mb-4">Öffnungszeiten</h3>
                                    <OpeningHoursTable openingHours={location.opening_hour_periods} />
                                </div>
                            )}

                            {location.geometry && (
                                <div className="text-block">
                                    <h3 className="mb-4">Karte</h3>
                                    <div className="map-wrapper-300 mb-3">
                                        <Map
                                            className="h-100"
                                            markerPosition={[location.geometry.location.lat, location.geometry.location.lng]}
                                            center={[location.geometry.location.lat, location.geometry.location.lng]}
                                            // circlePosition={[location.lat, location.lng]}
                                            // circleRadius={500}
                                            zoom={14}
                                            scrollWheelZoom={false}
                                            geoJSON={false}
                                        />
                                    </div>
                                </div>
                            )}

                            {location.images && (
                                <div className="text-block">
                                    <h3 className="mb-4">Gallery</h3>
                                    <Gallery
                                        rowClasses="ml-n1 mr-n1"
                                        lg="4"
                                        xs="6"
                                        colClasses="px-1 mb-2"
                                        data={location.images}
                                    />
                                </div>
                            )}
                        </Col>
                        <Col lg={location.booking_type == "linking" ? '5' : '6'}>
                            <div
                                style={{ top: "100px" }}
                                className="shadow ml-lg-4 rounded sticky-top"
                            >
                                {location.booking_type == "booking" && isDesktop && acceptedCookies &&
                                    <React.Fragment>
                                        <Elements stripe={stripePromise}>
                                            <BookingWithNoSSR locationSlug={location.slug} prices={location.prices} />
                                        </Elements>
                                        <CardFooter className="bg-primary-light py-4 border-0">
                                            <Media className="align-items-center">
                                                <Media body>
                                                    <h6 className="text-primary">Flexible – kostenlose Stornierung</h6>
                                                    <p className="text-sm text-primary opacity-8 mb-0">
                                                        Storniere deine Buchung 24 Stunden vor Beginn deines MoWo Termins. {' '}
                                                        <a href="#" className="text-reset">Mehr erfahren</a>
                                                    </p>
                                                </Media>
                                                <Icon
                                                    icon="diploma-1"
                                                    className="svg-icon-light w-3rem h-3rem ml-2 text-primary"
                                                />
                                            </Media>
                                        </CardFooter>
                                    </React.Fragment>
                                }

                                {location.booking_type == "linking" && location.opening_hour_periods && (
                                    <div className="text-block">
                                        <CardHeader className="bg-gray-100 py-4 border-0">
                                            <Media className="align-items-center">
                                                <Media body>
                                                    <p className="subtitle text-sm text-primary">
                                                        Besuchen Sie uns
                                                    </p>
                                                    <h4 className="mb-0">Öffnungszeiten </h4>
                                                </Media>
                                                <Icon
                                                    icon="wall-clock-1"
                                                    className="svg-icon-light w-3rem h-3rem ml-3 text-muted"
                                                />
                                            </Media>
                                        </CardHeader>
                                        <CardBody>
                                            <OpeningHoursTable openingHours={location.opening_hour_periods} />
                                            <div className="text-center mt-4">
                                                <Button target="_blank" href={location.website} color="primary" block>
                                                    {/* <i className="far fa-paper-plane mr-2" /> */}
                                                    Besuch buchen
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </div>
                                )}

                            </div>
                        </Col>
                    </Row>
                </Container>
                {location.booking_type == "booking" && !isDesktop && acceptedCookies && <BottomNav>
                    <Elements stripe={stripePromise}>
                        <BookingWithNoSSR locationSlug={location.slug} prices={location.prices} />
                    </Elements>
                </BottomNav>}
            </section>

        </React.Fragment>
    )
}

export default LocationDetail



export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const location = (await fetchAPIwithSSR(`/api/v1/cowork/location/${params.slug}`, { method: 'GET', req: req })) ?? []
    const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
    return {
        props: {
            location,
            themeSettings: settings.theme_settings,
            mainMenus: settings.main_menus,
            flatMenus: settings.flat_menus,
            // user,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: location.title,
        },
    }
}
