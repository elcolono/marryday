import React from "react"

import Select from "react-select"

import {
  Container,
  Row,
  Col,
  Form,
  Label,
  Button,
} from "reactstrap"

import Pagination from "../components/Pagination"
import Map from "../components/Map"

import ResultsTopBar from "../components/ResultsTopBar"
import CardRoom from "../components/CardRoom"

import data from "../data/category-2-rooms.json"
import geoJSON from "../data/rooms-geojson.json"
import { GetServerSideProps } from "next"
import { fetchAPIwithSSR } from "../lib/api"

// export async function getStaticProps() {
//   return {
//     props: {
//       nav: {
//         light: true,
//         classes: "shadow",
//         color: "white",
//       },
//       title: "Rooms | Category - Map on the top",
//     },
//   }
// }

const Category2Rooms = (props) => {

  const { locations, user, mainMenus, flatMenus, themeSettings } = props

  const [hoverCard, setHoverCard] = React.useState(null)
  const onCardEnter = (id) => {
    setHoverCard(id)
  }
  const onCardLeave = () => {
    setHoverCard(null)
  }
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg="6" className="py-4 p-xl-5">
            <Form>
              <Row>
                <Col md="6" lg="12" className="mb-4">
                  <Label for="form_type" className="form-label">
                    Home type
                  </Label>
                  <Select
                    instanceId="typeSelect"
                    inputId="form_type"
                    name="type"
                    id="form_type"
                    options={data.type && data.type}
                    isMulti
                    className=""
                    classNamePrefix="selectpicker"
                  />
                </Col>
              </Row>

              <Row>
                <Col sm="6" className="mb-4 order-2 order-sm-1">
                  <Button type="submit" color="primary">
                    <i className="fas fa-search mr-1" />
                    Search
                  </Button>
                </Col>

              </Row>
            </Form>
            <hr className="my-4" />
            <ResultsTopBar sortBy={data.sortby} />
            <Row>
              {locations &&
                locations.map((location) => (
                  <Col
                    key={location.title}
                    sm="6"
                    className="mb-5 hover-animate"
                    onMouseEnter={() => onCardEnter(location.id)}
                    onMouseLeave={() => onCardLeave()}
                  >
                    <CardRoom data={location} />
                  </Col>
                ))}
            </Row>
            <Pagination />
          </Col>
          <Col lg="6" className="map-side-lg pr-lg-0">
            <Map
              className="map-full shadow-left"
              center={[40.732346, -74.0014247]}
              zoom={14}
              geoJSON={geoJSON}
              hoverCard={hoverCard}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Category2Rooms


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const locations = (await fetchAPIwithSSR('/api/v1/cowork/locations/', { method: 'GET', req: req })) ?? []
  const user = (await fetchAPIwithSSR('/api/v1/rest-auth/user/', { method: 'GET', req: req })) ?? null
  const mainMenus = (await fetchAPIwithSSR('/api/main-menus', { method: 'GET', req: req })) ?? []
  const flatMenus = (await fetchAPIwithSSR('/api/flat-menus', { method: 'GET', req: req })) ?? []
  const themeSettings = (await fetchAPIwithSSR('/api/theme-settings', { method: 'GET', req: req })) ?? []
  return {
    props: { locations, user, mainMenus, flatMenus, themeSettings },
  }
}
