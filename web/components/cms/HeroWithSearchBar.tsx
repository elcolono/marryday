import React from "react"
import dynamic from "next/dynamic";
import {
    Container,
    Row,
    Col,
} from "reactstrap"

import Image from "../CustomImage"

const SearchBar = dynamic(() => import("../SearchBar"));

function HeroWithSearchBar(props) {
    const {
        image,
        heading,
        subheading,
        productCategories,
        use_search,
        use_location_filter,
        use_product_category_filter
    } = props
    return (
        <section className="hero-home">
            <Image
                src={image.url ?? "/assets/img/illustration/undraw_through_the_desert_fcin.svg"}
                alt={image.title}
                className="bg-image"
                layout="fill"
                priority
            />
            <Container className="py-6 py-md-7 text-white z-index-20">
                <Row>
                    <Col xl="10">
                        ´ <div className="text-center text-lg-left">
                        <p className="subtitle letter-spacing-4 mb-2 text-secondary text-shadow">
                            {subheading}
                        </p>
                        <h1 className="display-4 font-weight-bold text-shadow">
                            {heading}
                        </h1>
                    </div>
                        <SearchBar
                            options={productCategories}
                            use_search={use_search}
                            use_location_filter={use_location_filter}
                            use_product_category_filter={use_product_category_filter}
                            className="mt-5 p-3 p-lg-1 pl-lg-4"
                            btnClassName="rounded-xl"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default HeroWithSearchBar;