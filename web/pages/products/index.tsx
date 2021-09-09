import React from "react"
import { CMS_NAME } from "../../lib/constants"

import {
  Container,
  Row,
  Col,
} from "reactstrap"

import Map from "../../components/Map"
import CardLocation from "../../components/CardLocation"

import { GetServerSideProps } from "next"
import { fetchAPIwithSSR } from "../../lib/api"
import CardProduct from "../account/products/components/CardProduct"

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const products = (await fetchAPIwithSSR('/api/v1/products/public/', { method: 'GET', req: req })) ?? []
  const settings = (await fetchAPIwithSSR('/api/page/home', { method: 'GET', req: req })) ?? []
  return {
    props: {
      products,
      themeSettings: settings.theme_settings,
      mainMenus: settings.main_menus,
      flatMenus: settings.flat_menus,
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Standorte",
    },
  }
}

const Category2Rooms = (props) => {

  const { products } = props

  const [hoverCard, setHoverCard] = React.useState(null)
  const onCardEnter = (slug) => {
    setHoverCard(slug)
  }
  const onCardLeave = () => {
    setHoverCard(null)
  }
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg="6" className="py-4 p-xl-5">
            <Row>
              {products &&
                products.map((location) => (
                  <Col
                    key={location.title}
                    sm="6"
                    className="mb-5 hover-animate"
                    onMouseEnter={() => onCardEnter(location.slug)}
                    onMouseLeave={() => onCardLeave()}
                  >
                    <CardProduct data={location} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col lg="6" className="map-side-lg pr-lg-0">
            <Map
              className="map-full shadow-left"
              center={[40.732346, -74.0014247]}
              zoom={14}
              locations={products}
              hoverCard={hoverCard}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Category2Rooms



