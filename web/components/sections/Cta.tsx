import React from "react"

import Link from "next/link"
import Image from "../CustomImage"

import { Container, Button } from "reactstrap"

export default function CTASection({ data }) {
    return (
        <section className="py-7 position-relative dark-overlay">
            {/* Loading eager set for IE compatibility */}
            <img
                src={data.image.url}
                alt=""
                className="bg-image"
                loading="eager"
            />
            <Container>
                <div className="overlay-content text-white py-lg-5">
                    <h3 className="display-5 font-weight-bold text-serif text-shadow mb-5">
                        {data.description}
                    </h3>
                    <Link href={data.button_link}>
                        <Button color="light">{data.button}</Button>
                    </Link>
                </div>
            </Container>
        </section>

    )
}