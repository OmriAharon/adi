import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 32.111995, lng: 34.797505 }}
  >
    <Marker
      position={{ lat: 32.111995, lng: 34.797505 }}
    />
  </GoogleMap>
));

export default MapWithMarker;
