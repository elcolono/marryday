import React from "react"
import Link from "next/link"
import dynamic from "next/dynamic"

import {
    Container,
    Row,
    Col,
    Media,
    Badge,
} from "reactstrap"
import UseWindowSize from "../../hooks/UseWindowSize"

import data from "../../data/detail-rooms.json"

import SwiperGallery from "../../components/SwiperGallery"
import Gallery from "../../components/Gallery"
import Map from "../../components/Map"
import Image from "../../components/CustomImage"

import { GetServerSideProps } from "next";
import { fetchAPIwithSSR } from "../../lib/api";

const LocationDetail = (props) => {
    const { location } = props
    const size = UseWindowSize()

    const BookingFormWithNoSSR = dynamic(() => import("../../components/BookingForm"), {
        ssr: false
    });

    const groupByN = (n, data) => {
        let result = []
        for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
        return result
    }

    const groupedAmenities = data.amenities && groupByN(4, data.amenities)

    return (
        <React.Fragment>
            <section>
                <SwiperGallery data={location.images} />
                <Container className="py-5">
                    <Row>
                        <Col lg="6">
                            <div className="text-block">
                                <p className="text-primary">
                                    <i className="fa-map-marker-alt fa mr-1" />
                    &nbsp;{data.location && data.location}
                                </p>
                                {location.title && <h1>{location.title}</h1>}
                                {data.category && (
                                    <div className="text-muted text-uppercase mb-4">
                                        {data.category}
                                    </div>
                                )}
                                {data.tags && (
                                    <ul className="list-inline text-sm mb-4">
                                        {data.tags.map((tag) => (
                                            <li key={tag.value} className="list-inline-item mr-3">
                                                <i
                                                    className={`fa fa-${tag.icon} mr-1 text-secondary`}
                                                />{" "}
                                                {tag.value}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <p className="text-muted font-weight-light">
                                    Our garden basement apartment is fully equipped with
                                    everything you need to enjoy your stay. Very comfortable for a
                                    couple but plenty of space for a small family. Close to many
                    wonderful Brooklyn attractions and quick trip to Manhattan.{" "}
                                </p>
                                <h6 className="mb-3">The space</h6>
                                <p className="text-muted font-weight-light">
                                    Welcome to Brooklyn! We are excited to share our wonderful
                                    neighborhood with you. Our modern apartment has a private
                                    entrance, fully equipped kitchen, and a very comfortable queen
                                    size bed. We are happy to accommodate additional guests with a
                                    single bed in the living room, another comfy mattress on the
                                    floor and can make arrangements for small children with a
                    portable crib and highchair if requested.{" "}
                                </p>
            
                            </div>
                            {data.amenities && (
                                <React.Fragment>
                                    <div className="text-block">
                                        <h4 className="mb-4">Amenities</h4>
                                        <Row>
                                            {groupedAmenities &&
                                                groupedAmenities.map((amenityBlock) => (
                                                    <Col key={amenityBlock[0].value} md="6">
                                                        <ul className="list-unstyled text-muted">
                                                            {amenityBlock.map((amenity) => (
                                                                <li key={amenity.value} className="mb-2">
                                                                    <i
                                                                        className={`fa fa-${amenity.icon} text-secondary w-1rem mr-3 text-center`}
                                                                    />
                                                                    <span className="text-sm">
                                                                        {amenity.value}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </Col>
                                                ))}
                                        </Row>
                                    </div>
                                    <div className="text-block">
                                        <h4 className="mb-0">Amenities alternative</h4>
                                        <p className="subtitle text-sm text-primary mb-4">
                                            Alternative amenities display
                      </p>
                                        <ul className="list-inline">
                                            {data.amenities.map((amenity) => (
                                                <li
                                                    key={amenity.value}
                                                    className="list-inline-item mb-2"
                                                >
                                                    <Badge
                                                        pill
                                                        color="light"
                                                        className="p-3 text-muted font-weight-normal"
                                                    >
                                                        {amenity.value}
                                                    </Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </React.Fragment>
                            )}
                            {data.author && (
                                <div className="text-block">
                                    <Media>
                                        <div className="avatar mr-4 avatar-lg overflow-hidden">
                                            <Image
                                                src={`/content/img/avatar/${data.author.avatar}`}
                                                layout="fixed"
                                                width={80}
                                                height={80}
                                                alt={data.author.name}
                                            />
                                        </div>
                                        <Media body>
                                            <p>
                                                <span className="text-muted text-uppercase text-sm">
                                                    Hosted by
                          </span>
                                                <br />
                                                <strong>{data.author.name}</strong>
                                            </p>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: data.author.content,
                                                }}
                                            />
                                            <p className="text-sm">
                                                <Link href="/user-profile">
                                                    <a>
                                                        See{" "}
                                                        {data.author.name.split(" ").slice(0, -1).join(" ")}
                              's 3 other listings{" "}
                                                        <i className="fa fa-long-arrow-alt-right ml-2" />
                                                    </a>
                                                </Link>
                                            </p>
                                        </Media>
                                    </Media>
                                </div>
                            )}
                            <div className="text-block">
                                <h3 className="mb-4">Location</h3>
                                <div className="map-wrapper-300 mb-3">
                                    <Map
                                        className="h-100"
                                        center={[40.732346, -74.0014247]}
                                        circlePosition={[40.732346, -74.0014247]}
                                        circleRadius={500}
                                        zoom={14}
                                    />
                                </div>
                            </div>

                            {data.swiper && (
                                <div className="text-block">
                                    <h3 className="mb-4">Gallery</h3>
                                    <Gallery
                                        rowClasses="ml-n1 mr-n1"
                                        lg="4"
                                        xs="6"
                                        colClasses="px-1 mb-2"
                                        data={data.swiper}
                                    />
                                </div>
                            )}
                        </Col>
                        <Col lg="6">
                            <div
                                style={{ top: "100px" }}
                                className="p-4 shadow ml-lg-4 rounded sticky-top"
                            >
                                <p className="text-muted">
                                    <span className="text-primary h2">
                                        {data.price && data.price}
                                    </span>{" "}
                    per night
                  </p>
                                <hr className="my-4" />
                                <BookingFormWithNoSSR locationSlug={location.slug} />
{/* 
                                <Form
                                    id="booking-form"
                                    method="get"
                                    action="#"
                                    autoComplete="off"
                                    className="form"
                                >
                                    <FormGroup className="mb-4">
                                        <Label for="guests" className="form-label">
                                            Guests *
                      </Label>
                                        <Input type="select" name="guests" id="guests">
                                            <option value="1">1 Guest</option>
                                            <option value="2">2 Guests</option>
                                            <option value="3">3 Guests</option>
                                            <option value="4">4 Guests</option>
                                            <option value="5">5 Guests</option>
                                        </Input>
                                    </FormGroup>
                                    <BookingFormWithNoSSR locationSlug={location.slug} />
                                    <FormGroup>
                                        <Button type="submit" color="primary" block>
                                            Book your stay
                      </Button>
                                    </FormGroup>
                                </Form> */}
                                <p className="text-muted text-sm text-center">
                                    Some additional text can be also placed here.
                  </p>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <p>
                                        <a href="#" className="text-secondary text-sm">
                                            <i className="fa fa-heart" />
                        &nbsp;MoWo Spaces
                      </a>
                                    </p>
                                    <p className="text-muted text-sm">
                                        79 people bookmarked this place{" "}
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* {data.similar && (
                <section className="py-6 bg-gray-100">
                    <Container>
                        <h5 className="mb-0">{data.similar.title}</h5>
                        <p className="subtitle text-sm text-primary mb-4">
                            {data.similar.subtitle}
                        </p>
                        <Swiper
                            className="swiper-container-mx-negative items-slider pb-5"
                            perView={1}
                            spaceBetween={20}
                            loop={true}
                            roundLengths={true}
                            md={2}
                            lg={3}
                            xl={4}
                            data={data.similar.items}
                            cards={true}
                        />
                    </Container>
                </section>
            )} */}
        </React.Fragment>
    )
}

export default LocationDetail



export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
    const location = (await fetchAPIwithSSR(`/api/v1/cowork/location/${params.slug}`, { method: 'GET', req: req })) ?? []
    // const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req })) ?? null
    // const mainMenus = (await fetchAPIwithSSR('/api/main-menus', { method: 'GET', req: req })) ?? []
    // const flatMenus = (await fetchAPIwithSSR('/api/flat-menus', { method: 'GET', req: req })) ?? []
    // const themeSettings = (await fetchAPIwithSSR('/api/theme-settings', { method: 'GET', req: req })) ?? []
    return {
        props: {
            location,
            // user,
            // mainMenus,
            // flatMenus,
            // themeSettings,
            nav: {
                light: true,
                classes: "shadow",
                color: "white",
            },
            title: "Rooms | Category - Map on the top",
        },
    }
}
