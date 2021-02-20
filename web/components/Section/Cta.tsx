import React from "react"

import Link from "next/link"
import Image from "../CustomImage"

import { Container, Button } from "reactstrap"

export default function CTASection({ data }) {
    return (
        <section className="py-7 position-relative dark-overlay">
            {/* Loading eager set for IE compatibility */}
            <Image
                width={1350}
                height={900}
                src={data.image.url}
                alt={data.image.title}
                className="bg-image"
                loading="eager"
                layout="fill"
                sizes="(max-width:991px) 50vw, 240px"
            />
            <Container>
                <div className="overlay-content text-white py-lg-5">
                    <h2 className="display-3 font-weight-bold text-serif text-shadow">
                        {data.heading}
                    </h2>
                    <h3 className="mb-5">
                        {data.description}
                    </h3>
                    {data.button_href && (
                        <Link href={data.button_href.slug}>
                            <Button color="light">{data.button_text}</Button>
                        </Link>
                    )}
                </div>
            </Container>
        </section>

    )
}