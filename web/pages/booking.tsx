import { useEffect, useState } from 'react'
import { api, fetchAPIwithSSR } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

import { Location, RentObject } from '../lib/interfaces'

import dynamic from "next/dynamic";

import { Form, FormGroup, Label, Input, Spinner, Button } from "reactstrap";

import Layout from '../components/layout'
import Head from 'next/head'
import { GetServerSideProps } from 'next';

export default function Booking({ user, mainMenus, flatMenus, themeSettings }) {

    const [locations, setLocations] = useState<Array<Location>>(undefined)
    const [location, setLocation] = useState<Location>(undefined)
    const [objectType, setObjectType] = useState('desktop')
    const [startTime, setStartTime] = useState(`${new Date().getHours()}:${new Date().getMinutes()}`)
    const [date, setDate] = useState('2020-12-09')
    const [duration, setDuration] = useState(60)
    const [rentObjects, setRentObjects] = useState<Array<RentObject>>(undefined)
    const [rentObject, setRentObject] = useState("")

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!locations) {
            api.get('/cowork/locations/').then((response) => {
                if (response.status == 200) {
                    setLocations(response.data);
                } else {
                    console.log(response)
                }
            })
        }
    }, [])

    useEffect(() => {

        const fetchRentObjects = async () => {
            if (location) {
                try {
                    const response = await api.get(`/cowork/rentobjects?location=${location.id}&type=${objectType}&start=${date}T${startTime}Z&duration=${duration}`)
                    setRentObjects(response.data);
                } catch (error) {
                    console.log(error)
                }
            }
        }

        fetchRentObjects()

    }, [location, objectType, date, startTime, duration])

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            "rent_object": rentObject,
            "start": `${date}T${startTime}Z`,
            "duration": duration
        }
        try {
            await api.post('/cowork/bookings/', data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const handleValueChange = async (value, name) => {
        // Check target value wheter to conditionally make new request
        name == 'objectType' && setObjectType(value)
        name == 'startTime' && setStartTime(value)
        name == 'date' && setDate(value)
        name == 'duration' && setDuration(value)
    }

    const MapWithNoSSR = dynamic(() => import("../components/map"), {
        ssr: false
    });

    const CustomDatePickerWithNoSSR = dynamic(() => import("../components/custom-datepicker"), {
        ssr: false
    });


    return (
        <Layout user={user} mainMenus={mainMenus} flatMenus={flatMenus} themeSettings={themeSettings}>
            <Head>
                <title>Buchung | {CMS_NAME}</title>
                {/* <!-- Seo Meta --> */}
                <meta name="description" content="Listigo | Directory Bootstrap 4 Template" />
                <meta name="keywords" content="listing dashboard, directory panel, listing, responsive directory, directory template, themeforest, listing template, css3, html5" />
            </Head>
            {!user?.id ? (
                <section id="intro_section">
                    <div className="row no-gutters coming-soon">
                        <div className="col-lg-6">
                            <div className="banner-content banner-content-white">
                                <div className="container container-half">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <h1 className="intro-section-title">Ups.</h1>
                                            <div>Sie sind leider nicht angemeldet. Wenn Sie eine Buchung durchführen möchten melden Sie sich bitte an.</div>
                                            <a href="/signin" className="mt-4 btn btn-pill btn-danger"><span>Jetzt anmelden</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 banner inner-banner overlay-banner-ipad hero-about"></div>
                    </div>
                </section>
            ) : (
                    <section id="intro_section">
                        <div className="row no-gutters coming-soon">
                            <div className="col-lg-6 banner inner-banner overlay-banner-ipad">
                                <div id="map">
                                    <MapWithNoSSR locations={locations} />
                                </div>
                                <ul className="mt-5">
                                    {locations && locations.map((location, i) =>
                                        <li key={i} onClick={() => setLocation(location)}>
                                            {location.title} ({location.address}, {location.postcode}, {location.city})
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="col-lg-6 p-5">
                                <div className="row">
                                    <div className="col-md-10">
                                        <h1 className="intro-section-title">{location && location.title}</h1>
                                        <Form onSubmit={handleSubmit} className="pt-3">
                                            <FormGroup tag="fieldset">
                                                {/* <legend>Object Type</legend> */}

                                                <div className="row">
                                                    <div className="col-md-4" onClick={() => handleValueChange('desktop', 'objectType')} >
                                                        <div className="card overflow-hidden dashboard--card bg-danger text-white border-0">
                                                            <div className="dashboard--card__icon"><i className="ion-md-list"></i></div>
                                                            <div className="card-body">
                                                                <h2 className="mb-0 text-white">Desktop</h2>
                                                                <p>Total Listing</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4" onClick={() => handleValueChange('phone', 'objectType')}>
                                                        <div className="card overflow-hidden dashboard--card bg-warning border-0">
                                                            <div className="dashboard--card__icon"><i className="ion-md-star"></i></div>
                                                            <div className="card-body">
                                                                <h2 className="mb-0">Phone</h2>
                                                                <p>Total Reviews</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4" onClick={() => handleValueChange('meeting', 'objectType')}>
                                                        <div className="card overflow-hidden dashboard--card">
                                                            <div className="dashboard--card__icon"><i className="ion-md-bookmark"></i></div>
                                                            <div className="card-body">
                                                                <h2 className="mb-0">Meeting</h2>
                                                                <p>Total Bookmarked</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <CustomDatePickerWithNoSSR />

                                            </FormGroup>

                                            <FormGroup>
                                                <Label>Date</Label>
                                                <Input value={date} onChange={(e) => handleValueChange(e.target.value, 'date')} type="date" />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label>Time</Label>
                                                <Input value={startTime} onChange={(e) => handleValueChange(e.target.value, 'time')} type="time" />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label>Dauer</Label>
                                                <Input value={duration} onChange={(e) => handleValueChange(e.target.value, 'duration')} min={15} max={300} step={15} type="range" />
                                            </FormGroup>

                                            {/* Rent Objects */}
                                            <FormGroup tag="fieldset">
                                                <legend>Rent Objects</legend>
                                                {rentObjects && rentObjects.map((el, i) => (
                                                    <FormGroup key={i} check>
                                                        <Label check>
                                                            <Input onChange={() => setRentObject(String(el.id))} checked={rentObject === `${el.id}`} type="radio" />{' '}
                                                            {el.title} ({el.bookings.map(booking => (`${booking.start} - ${booking.end}`))})
                                        </Label>
                                                    </FormGroup>
                                                ))}
                                            </FormGroup>

                                            {/* BOOKING BUTTON */}
                                            <Button disabled={isLoading && true} type="submit" className="btn btn-danger btn-block">Buchen {isLoading && (<Spinner />)}</Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                )}

            <script src="assets/js/vendors.bundle.js"></script>
            <script src="assets/js/scripts.bundle.js"></script>
        </Layout>
    )
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req })) ?? null
    const mainMenus = (await fetchAPIwithSSR('/api/main-menus', { method: 'GET', req: req })) ?? []
    const flatMenus = (await fetchAPIwithSSR('/api/flat-menus', { method: 'GET', req: req })) ?? []
    const themeSettings = (await fetchAPIwithSSR('/api/theme-settings', { method: 'GET', req: req })) ?? []
    return {
        props: { user, mainMenus, flatMenus, themeSettings },
    }
}
