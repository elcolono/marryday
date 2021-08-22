import React from "react"
import Link from "next/link"

import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Media,
} from "reactstrap"

import Stars from "../../../../components/Stars"
import Image from "../../../../components/CustomImage"
import Icon from "../../../../components/Icon"
import {accountPath} from "../../index";
import {accountProductsPath} from "../index";

const CardProduct = (props) => {
    const data = props.data
    return (
        <Card className="h-100 border-0 shadow">
            <div className="card-img-top overflow-hidden gradient-overlay">
                <Image
                    src="/assets/img/illustration/undraw_through_the_desert_fcin.svg"
                    width={1350}
                    height={900}
                    alt={data.name}
                    layout="responsive"
                    loading={props.eager ? "eager" : "lazy"}
                    className="img-fluid"
                    sizes="(max-width:576px) 100vw, (max-width:991px) 50vw, (max-width:1199px) 30vw, 250px"
                />
                <Link href={`${accountPath}${accountProductsPath}/${data.id}`}>
                    <a className="tile-link"/>
                </Link>
                <div className="card-img-overlay-top text-right">
                    <a className="card-fav-icon position-relative z-index-40" href="#">
                        <Icon icon="close-1" className="text-white"/>
                    </a>
                </div>
            </div>
            <CardBody className="d-flex align-items-center">
                <div className="w-100">
                    <CardTitle tag="h6">
                        <Link href="/detail-rooms">
                            <a className="text-decoration-none text-dark">{data.title}</a>
                        </Link>
                    </CardTitle>
                    <CardSubtitle className="d-flex mb-3">
                        <p className="flex-grow-1 mb-0 text-muted text-sm">
                            {data.subtitle}
                        </p>
                        <p className="flex-shrink-1 mb-0 card-stars text-xs text-right">
                        </p>
                    </CardSubtitle>
                    <CardText className="text-muted">
                        <span className="h4 text-primary">${data.price}</span>
                        &nbsp;per night
                    </CardText>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardProduct
