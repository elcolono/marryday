import React from "react"
import Link from "next/link"
import { Map, Marker, Popup, TileLayer, Tooltip, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from 'leaflet'

import isEmpty from 'lodash/isEmpty'

const MapLeaflet = (props) => {
  const tileLayers = [
    {
      tiles: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW93by1vcHMiLCJhIjoiY2tpa3JqaGtrMGNxMDJ4cGswY3RuOW1kbCJ9.F2VRDymeDiTfpXOuH_ih5Q",
      attribution: "Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
    },
  ]

  const [hover, setHover] = React.useState(false)
  const [focus, setFocus] = React.useState(false)

  const icon = L.icon({
    iconUrl: "/assets/svg/marker.svg",
    shadowUrl: "",
    iconRetinaUrl: "/assets/svg/marker.svg",
    iconSize: [25, 37.5],
    popupAnchor: [0, -18],
    tooltipAnchor: [0, 19],
  })

  const highlightIcon = L.icon({
    iconUrl: "/assets/svg/marker-hover.svg",
    shadowUrl: "",
    iconRetinaUrl: "/assets/svg/marker-hover.svg",
    iconSize: [25, 37.5],
    popupAnchor: [0, -18],
    tooltipAnchor: [0, 19],
  })

  const markers =
    props.locations &&
    props.locations.map((location) => [
      location.geometry.location.lat,
      location.geometry.location.lng,
    ])

  const bounds =
    props.bounds &&
    props.bounds.map((location) => [
      location.geometry.location.lat,
      location.geometry.location.lng,
    ])

  return (
    <Map
      center={props.center && props.center}
      zoom={props.zoom}
      scrollWheelZoom={focus}
      className={props.className}
      dragging={props.dragging}
      tap={props.tap}
      bounds={!isEmpty(props.bounds) ? bounds : markers}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <TileLayer
        url={tileLayers[0].tiles}
        attribution={tileLayers[0].attribution}
      />
      {props.locations &&
        props.locations.map((location) => {
          const data = location
          return (
            <Marker
              key={data.slug}
              icon={icon}
              // opacity={0}
              position={
                [
                  data.geometry.location.lat,
                  data.geometry.location.lng
                ]}
              onMouseOver={() => {
                setHover(data.slug)
              }}
              onMouseOut={() => {
                setHover(false)
              }}
            >
              {hover === data.slug || props.hoverCard === data.slug &&
                <Tooltip
                  permanent={true}
                  interactive={true}
                  direction="top"
                  className={`map-custom-tooltip ${hover === data.slug || props.hoverCard === data.slug
                    ? "active"
                    : ""
                    }`}
                >
                  {data.title}
                </Tooltip>
              }
              <Popup className="map-custom-popup" maxWidth="600" minWidth="200">
                <div className="popup-rental">
                  {data.preview_image ? (
                    <div
                      className={`image d-none d-md-block`}
                      style={{
                        backgroundImage: `url(${data.preview_image.image})`
                      }}
                    />
                  ) : (
                    <div className="image" />
                  )}
                  <div className="text">
                    {data.slug && data.title && (
                      <h6>
                        <Link href={`/coworking/${data.slug}`}>
                          <a>{data.title}</a>
                        </Link>
                      </h6>
                    )}
                    {data.vicinity && (
                      <p className="text-muted mb-1">{data.vicinity}</p>
                    )}
                    {/* <div className="text-xs">
                    <Stars stars={data.stars} />
                  </div> */}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      {
        props.markerPosition && (
          <Marker position={props.markerPosition} icon={icon} />
        )
      }
      {
        props.circlePosition && (
          <Circle
            center={props.circlePosition}
            color={"#4E66F8"}
            fillColor={"#8798fa"}
            opacity={0.5}
            radius={props.circleRadius}
            weight={2}
          />
        )
      }
    </Map >
  )
}

export default MapLeaflet
