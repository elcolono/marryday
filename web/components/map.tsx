import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";

const Map = ({ locations }) => {

  const handleCLick = () => {
    console.log("clicked")
  }
  useEffect(() => {
    console.log("Map rendered")
  }, [])

  return (
    // <div className="mt-5 pt-5">{JSON.stringify(locations)}</div>

    <MapContainer
      center={[48.2082, 16.3738]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibW93by1vcHMiLCJhIjoiY2tpa3JqaGtrMGNxMDJ4cGswY3RuOW1kbCJ9.F2VRDymeDiTfpXOuH_ih5Q`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
      {locations && locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]} animate={true}>
          <Popup>Hey ! I live here</Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default Map;