import React from "react"

import {Container} from "reactstrap"
import Swiper from "../Swiper";
import CardTestimonial from "../CardTestimonial";

export default function TestimonialSlider(props) {
    const {
        heading,
        subheading,
        testimonials,
        loop_slides,
        grey_background
    } = props

    return (
        <section className="py-7">
            <Container>
                <div className="text-center">
                    <p className="subtitle text-primary">
                        {subheading}
                    </p>
                    <h2 className="mb-5">{heading}</h2>
                </div>
                {testimonials && (
                    <Swiper
                        className="swiper-container pt-2 pb-5"
                        perView={1}
                        spaceBetween={20}
                        imgCards
                        loop={loop_slides}
                        roundLengths
                        md={1}
                        lg={2}
                        xl={2}
                    >
                        {testimonials.map((element, index) =>
                            <div key={element.id} className="h-auto px-2">
                                <CardTestimonial data={element}/>
                            </div>
                        )}
                    </Swiper>
                )}
            </Container>
        </section>
    )
}