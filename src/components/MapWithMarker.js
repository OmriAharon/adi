import React, { Component } from 'react';
import T from 'i18n-react';
import { findDOMNode } from 'react-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import KlalitImg from '../assets/img/klalit.jpg';
import Claliteng from '../assets/img/Clalit-eng.png';
import MaccabiDent from '../assets/img/MaccabiDent.png';

class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);

    this.state ={
      maccabbiIsOpen: false,
      klalitIsOpen: false,
      libbylaIsOpen: false
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

  toggleLibby() {
    this.setState({ libbylaIsOpen: !this.state.libbylaIsOpen })
  }

  _maccabi() {
    return <Marker
      onClick={() => this.toggleMaccabbi()}
      position={{lat: 32.112995, lng: 34.797505}}
    >
      { this.state.maccabbiIsOpen && <InfoWindow onCloseClick={() => this.toggleMaccabbi()}>
        <div>
          <a href="https://www.maccabi-dent.com/%D7%94%D7%9E%D7%A8%D7%A4%D7%90%D7%95%D7%AA-%D7%A9%D7%9C%D7%A0%D7%95/?clinic=%D7%AA%D7%9C+%D7%90%D7%91%D7%99%D7%91+%D7%A8%D7%9E%D7%AA+%D7%90%D7%91%D7%99%D7%91"
             target="_blank"
             rel="noreferrer noopener">
            <img src={ MaccabiDent } />
          </a>
          <div>{ T.translate('MACCABI_ADDRESS_1') }</div>
          <div>{ T.translate('MACCABI_ADDRESS_2') }</div>
          <div>{ T.translate('MACCABI_ADDRESS_3') }</div>
          <div>{ T.translate('MACCABI_PHONE') }</div>
        </div>
      </InfoWindow> }
    </Marker>;
  }

  _klalit() {
    return <Marker
      onClick={() => this.toggleKlalit()}
      position={{lat: 32.117479, lng: 34.804296}}>
      { this.state.klalitIsOpen && <InfoWindow onCloseClick={() => this.toggleKlalit()}>
        <div>
          <a href="https://www.clalit.co.il/he/sefersherut/pages/clinicdetails.aspx?ddeptcode=865073"
             target="_blank"
             rel="noreferrer noopener">
            <img src={ this.props.isRTL ? KlalitImg : Claliteng } style={{margin: '0 0 10px 0'}} />
          </a>
          <div>{ T.translate('KLALIT_ADDRESS_1') }</div>
          <div>{ T.translate('KLALIT_ADDRESS_2') }</div>
          <div>{ T.translate('KLALIT_ADDRESS_3') }</div>
          <div>{ T.translate('KLALIT_PHONE') }</div>
        </div>
      </InfoWindow> }
    </Marker>;
  }

  _private() {
    return <Marker
      onClick={() => this.toggleLibby()}
      position={{lat: 32.120662, lng: 34.792730}}>
      { this.state.libbylaIsOpen && <InfoWindow onCloseClick={() => this.toggleLibby()}>
        <div>
          <a href="https://www.drcarmi.co.il/" target="_blank" rel="noreferrer noopener">{ T.translate('LIBI') }</a>
          <div>{ T.translate('LIBI_ADDRESS_1') }</div>
          <div>{ T.translate('LIBI_ADDRESS_2') }</div>
          <div>{ T.translate('LIBI_PHONE') }</div>
        </div>
      </InfoWindow> }
    </Marker>;
  }

  render() {
    return (<GoogleMap
      defaultZoom={13}
      defaultCenter={{lat: 32.120662, lng: 34.792730}}
    >
      {/*{ this._maccabi() }*/}
      {/*{ this._klalit() }*/}
      { this._private() }
    </GoogleMap>);
  }
}

const MapWithMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMapComponent {...props}/>
));

export default MapWithMarker;
