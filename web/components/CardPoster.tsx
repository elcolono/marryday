import React from "react"
import Link from "next/link"

import {Card, CardBody, CardTitle, CardText} from "reactstrap"
import Image from "./CustomImage"

const CardPoster = (props) => {
    const data = props.data
    return (
        <Card className="card-poster gradient-overlay hover-animate mb-4 mb-lg-0">
            <Link href={`/categories/${data.id}/${data.slug}`}>
                <a className="tile-link"/>
            </Link>
            {/* Loading eager set for IE compatibility */}
            <Image
                src={data.images.find(image => image.is_thumbnail).image}
                layout="fill"
                className="bg-image"
                alt="Card image"
                loading="eager"
                sizes="(max-width: 576px) 100vw, 530px"
            />
            <CardBody className="card-body overlay-content">
                <CardTitle tag="h6" className="card-title text-shadow text-uppercase">
                    {data.title}
                </CardTitle>
                <CardText className="card-text text-sm">{data.short_description}</CardText>
            </CardBody>
        </Card>
    )
}

export default CardPoster
