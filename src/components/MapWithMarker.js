import React, { Component } from 'react';
import T from 'i18n-react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);

    this.state ={
      maccabbiIsOpen: false,
      klalitIsOpen: false,
      mashtelaIsOpen: false
    };

    this.toggleMaccabbi = this.toggleMaccabbi.bind(this);
    this.toggleKlalit = this.toggleKlalit.bind(this);
  }

  toggleMaccabbi() {
    this.setState({ maccabbiIsOpen: !this.state.maccabbiIsOpen })
  }

  toggleKlalit() {
    this.setState({ klalitIsOpen: !this.state.klalitIsOpen })
  }

  toggleMashtela() {
    this.setState({ mashtelaIsOpen: !this.state.mashtelaIsOpen })
  }

  render() {
    console.log(this.props);
    return (<GoogleMap
      defaultZoom={13}
      defaultCenter={{lat: 32.113797, lng: 34.816565}}
    >
      <Marker
        onClick={() => this.toggleMaccabbi()}
        position={{lat: 32.111995, lng: 34.797505}}
      >
        { this.state.maccabbiIsOpen && <InfoWindow onCloseClick={() => this.toggleMaccabbi()}><div>Test</div></InfoWindow> }
      </Marker>
      <Marker
        onClick={() => this.toggleKlalit()}
        position={{lat: 32.117479, lng: 34.804296}}>
        { this.state.klalitIsOpen && <InfoWindow onCloseClick={() => this.toggleKlalit()}><div>Test</div></InfoWindow> }
      </Marker>
      <Marker
        onClick={() => this.toggleMashtela()}
        position={{lat: 32.126473, lng: 34.829789}}>
        { this.state.mashtelaIsOpen && <InfoWindow onCloseClick={() => this.toggleMashtela()}>
          <div>
            <a href="https://www.asafrana.dental/" target="_blank" rel="noreferrer noopener">{ T.translate('HAMASHTELA') }</a>
            <div>{ T.translate('HAMASHTELA_ADDRESS_1') }</div>
            <div>{ T.translate('HAMASHTELA_ADDRESS_2') }</div>
            { this.props.isRTL && <div>{ T.translate('HAMASHTELA_ADDRESS_3') }</div> }
          </div>
        </InfoWindow> }
      </Marker>
    </GoogleMap>);
  }
}

const MapWithMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMapComponent {...props}/>
));

export default MapWithMarker;
