import React from "react"
import styles from './Cta.module.scss';

import Link from "next/link"
import Image from "../CustomImage"

import { Container, Button } from "reactstrap"

export default function CTASection({
    image,
    heading,
    description,
    button_href,
    button_text
}) {
    return (
        <section data-testid='cta-section' className="py-7 position-relative dark-overlay">
            <Image
                src={image.url}
                alt={image.title}
                className="bg-image"
                loading="lazy"
                layout="fill"
            />
            <Container>
                <div className="overlay-content text-white py-lg-5">
                    <h2 className="display-3 font-weight-bold text-serif text-shadow">
                        {heading}
                    </h2>
                    <h3 className="mb-5">
                        {description}
                    </h3>
                    {button_href && (
                        <Link href={button_href.slug}>
                            <Button color="light">{button_text}</Button>
                        </Link>
                    )}
                </div>
            </Container>
        </section>

    )
}