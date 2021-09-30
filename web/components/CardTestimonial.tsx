import React from "react"
import Image from "./CustomImage"

import {Card} from "reactstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const CardTestimonial = (props) => {
    const data = props.data
    return (
        <Card className="testimonial rounded-lg shadow border-0">
            <div className="testimonial-avatar">
                <Image
                    src={data.image.url}
                    width={80}
                    height={80}
                    layout="fixed"
                    alt={data.image.title}
                    className="img-fluid"
                />
            </div>
            <div className="text">
                <div className="testimonial-quote">
                    <FontAwesomeIcon width={25} icon="quote-right"/>
                    <i className="fas fa-quote-right"/>
                </div>
                <p className="testimonial-text">{data.content}</p>
                <strong>{data.name}</strong>
            </div>
        </Card>
    )
}

export default CardTestimonial
