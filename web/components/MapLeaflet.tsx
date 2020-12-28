import React from "react"
import Link from "next/link"
import { Map, Marker, Popup, TileLayer, Tooltip, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
// import L from 'leaflet'

const MapLeaflet = (props) => {
  const tileLayers = [
    {
      tiles: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW93by1vcHMiLCJhIjoiY2tpa3JqaGtrMGNxMDJ4cGswY3RuOW1kbCJ9.F2VRDymeDiTfpXOuH_ih5Q",
      attribution: "Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
    },
    {
      tiles:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
    },
    {
      tiles: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      tiles:
        "https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png",
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      tiles: "https://mapserver.mapy.cz/base-m/{z}-{x}-{y}",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://seznam.cz">Seznam.cz, a.s.</a>',
    },
    {
      tiles: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
    },
    {
      tiles: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia maps</a>',
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
      location.lat,
      location.lng,
    ])

  return (
    <Map
      center={props.center && props.center}
      zoom={props.zoom}
      scrollWheelZoom={focus}
      className={props.className}
      dragging={props.dragging}
      tap={props.tap}
      bounds={props.locations ? markers : null}
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
          return props.popupVenue ? (
            <Marker
              key={data.slug}
              position={[
                data.lat,
                data.lng,
              ]}
              onMouseOver={() => {
                setHover(data.slug)
              }}
              onMouseOut={() => {
                setHover(false)
              }}
              icon={
                hover === data.slug || props.hoverCard === data.slug
                  ? highlightIcon
                  : icon
              }
            >
              <Popup className="map-custom-popup" maxWidth="600" minWidth="200">
                <div className="popup-venue">
                  {data.images ? (
                    <div
                      className={`image d-none d-md-block`}
                      style={{
                        backgroundImage: data.image[0].image,
                      }}
                    />
                  ) : (
                      <div className="image" />
                    )}
                  <div className="text">
                    {data.name && (
                      <h6>
                        <Link href={data.link}>
                          <a>{data.title}</a>
                        </Link>
                      </h6>
                    )}
                    {data.about && <p>{data.about}</p>}
                    {data.address && (
                      <p className="text-muted mb-1">{data.address}</p>
                    )}
                    {data.email && (
                      <p className="text-muted mb-1">
                        <i className="fas fa-envelope-open fa-fw text-dark mr-2" />
                        <a href={`mailto:${data.email}`}>{data.email}</a>
                      </p>
                    )}
                    {data.phone && (
                      <p className="text-muted mb-1">
                        <i className="fa fa-phone fa-fw text-dark mr-2" />
                        {data.phone}
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : (
              <Marker
                key={data.slug}
                icon={icon}
                opacity={0}
                position={[
                  data.lat,
                  data.lng,
                ]}
                onMouseOver={() => {
                  setHover(data.slug)
                }}
                onMouseOut={() => {
                  setHover(false)
                }}
              >
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

                <Popup className="map-custom-popup" maxWidth="600" minWidth="200">
                  <div className="popup-rental">
                    {data.images ? (
                      <div
                        className={`image d-none d-md-block`}
                        style={{
                          backgroundImage: `url(${data.images[0].image})`
                        }}
                      />
                    ) : (
                        <div className="image" />
                      )}
                    <div className="text">
                      {data.title && (
                        <h6>
                          <Link href="/demo">
                            <a>{data.title}</a>
                          </Link>
                        </h6>
                      )}
                      {data.address && (
                        <span>{data.address}</span>
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
      {props.markerPosition && (
        <Marker position={props.markerPosition} icon={icon} />
      )}
      {props.circlePosition && (
        <Circle
          center={props.circlePosition}
          color={"#4E66F8"}
          fillColor={"#8798fa"}
          opacity={0.5}
          radius={props.circleRadius}
          weight={2}
        />
      )}
    </Map>
  )
}

export default MapLeaflet
