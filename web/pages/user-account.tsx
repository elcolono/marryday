import React from "react"
import Link from "next/link"

import fetchAPIwithSSR from '../utils/fetchAPIwithSSR';
import { GetServerSideProps } from 'next';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
} from "reactstrap"
import Icon from "../components/Icon";


export default function UserAccount() {


    const data = {
        "title": "Your account",
        "subtitle": "Manage your account and settings here.",
        "cards": [
            {
                "title": "Personal info",
                "link": "#",
                "icon": "identity-1",
                "content": "Provide personal details and how we can reach you"
            },
            {
                "title": "Login & security",
                "link": "#",
                "icon": "password-1",
                "content": "Update your password and secure your account"
            },
            {
                "title": "Payments & payouts",
                "link": "#",
                "icon": "pay-by-card-1",
                "content": "Review payments, payouts, coupons, gift cards, and taxes"
            },
            {
                "title": "Notifications",
                "link": "#",
                "icon": "chat-app-1",
                "content": "Choose notification preferences and how you want to be contacted"
            },
            {
                "title": "Privacy & sharing",
                "link": "#",
                "icon": "diary-1",
                "content": "Control connected apps, what you share, and who sees it"
            },
            {
                "title": "Global preferences",
                "link": "#",
                "icon": "mix-1",
                "content": "Set your default language, currency, and timezone"
            }
        ]
    }

    return (
        <section className="py-5">
            <Container>
                <Breadcrumb listClassName="pl-0  justify-content-start">
                    <BreadcrumbItem>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Account</BreadcrumbItem>
                </Breadcrumb>

                <h1 className="hero-heading mb-0">Dein Konto</h1>
                <p className="text-muted mb-5">Verwalten hier dein Konto und deine Einstellungen.</p>
                <Row>
                    {data.cards.map((card) => (
                        <Col xs="6" md="4" className="mb-30px" key={card.title}>
                            <Card className="h-100 border-0 shadow hover-animate">
                                <CardBody>
                                    <div className="icon-rounded bg-secondary-light mb-3">
                                        <Icon
                                            icon={card.icon}
                                            className="text-secondary w-2rem h-2rem"
                                        />
                                    </div>
                                    <CardTitle className="mb-3" tag="h5">
                                        <Link href={card.link}>
                                            <a className="text-decoration-none text-dark stretched-link">
                                                {card.title}
                                            </a>
                                        </Link>
                                    </CardTitle>
                                    <CardText className="text-muted text-sm">
                                        {card.content}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
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
