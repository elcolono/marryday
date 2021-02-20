import React from "react"
import dynamic from "next/dynamic";
import {
    Container,
    Row,
    Col,
} from "reactstrap"

import Image from "../CustomImage"

const SearchBar = dynamic(() => import("../SearchBar"));

function HeroLocationSearchSection({ data }) {
    return (
        <section className="hero-home" >
            <Image
               width={1350}
               height={900}
               src={data.image.url}
               alt={data.image.title}
               className="bg-image"
            //    loading="eager"
               layout="fill"
            //    sizes="(max-width:991px) 50vw, 240px"
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
                        {data.show_searchbar && (
                            <SearchBar
                                options={data.searchOptions}
                                className="mt-5 p-3 p-lg-1 pl-lg-4"
                                btnClassName="rounded-xl"
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HeroLocationSearchSection;