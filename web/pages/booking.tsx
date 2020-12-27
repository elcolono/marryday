import { useEffect, useState } from 'react'
import { api, fetchAPIwithSSR } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

import { Location, RentObject } from '../lib/interfaces'

import dynamic from "next/dynamic";

import Layout from '../components/Layout'
import Head from 'next/head'
import { GetServerSideProps } from 'next';
import BookingForm from '../components/booking-form';

export default function Booking({ user, mainMenus, flatMenus, themeSettings }) {

    const [location, setLocation] = useState<Location>(undefined)

    const MapWithNoSSR = dynamic(() => import("../components/map"), {
        ssr: false
    });
    const BookingFormWithNoSSR = dynamic(() => import("../components/booking-form"), {
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
                    <BookingFormWithNoSSR />
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
