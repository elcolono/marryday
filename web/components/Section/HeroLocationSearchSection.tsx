import React from "react"
import dynamic from "next/dynamic";
import {
    Container,
    Row,
    Col,
} from "reactstrap"

import Image from "../CustomImage"

const SearchBar = dynamic(() => import("../SearchBar"));

function HeroLocationSearchSection({ data, cities }) {
    return (
        <section className="hero-home" >
            <Image
                src={data.image.url}
                alt={data.image.title}
                className="bg-image"
                layout="fill"
                priority
            />
            <Container className="py-6 py-md-7 text-white z-index-20">
                <Row>
                    <Col xl="10">
                        {data && (
                            <div className="text-center text-lg-left">
                                <p className="subtitle letter-spacing-4 mb-2 text-secondary text-shadow">
                                    {data.subheading}
                                </p>
                                <h1 className="display-3 font-weight-bold text-shadow">
                                    {data.heading}
                                </h1>
                            </div>
                        )}
                        <SearchBar
                            options={cities}
                            className="mt-5 p-3 p-lg-1 pl-lg-4"
                            btnClassName="rounded-xl"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HeroLocationSearchSection;