import React from "react"

import fetchAPIwithSSR from '../utils/fetchAPIwithSSR';
import { GetServerSideProps } from 'next';

import {
    Container,
    Row,
    Col,

} from "reactstrap"


export default function Dashboard() {

    return (
        <Container fluid className="px-3">
            <Row className="min-vh-100">
                <Col md="8" lg="6" xl="5" className="d-flex align-items-center">
                    <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
                        Dashboard
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params, req, res, }) => {
    const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req })) ?? []
    if (user.email === undefined) {
        res.setHeader("location", "/login");
        res.statusCode = 302;
        res.end();
        return { props: {} }
    }
    const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []

    return {
        props: {
            user,
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
