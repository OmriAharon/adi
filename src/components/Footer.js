import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import T from 'i18n-react';
import axios from 'axios';
import classnames from 'classnames';
import config from 'config';
import { getLanguage } from '../i18n';
import sr from './ScrollReveal';
import MapWithMarker from './MapWithMarker';
import '../assets/third-party/jquery.backstretch.min';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.blankForm = {
      name: '',
      email: '',
      phoneNumber: '',
      message: ''
    };
    this.state = { ...this.blankForm };
  }

  componentDidMount() {
    // $('footer').backstretch([Bg]);

    const config = (origin = 'top') => ({
      origin,
      duration: 300,
      delay: 200,
      distance: '20px',
      scale: 1,
      easing: 'ease',
    });

    sr.reveal(this.contactMe, config('top'));
    sr.reveal(this.phrase, config('top'));
    sr.reveal(this.form, config('bottom'));
    sr.reveal(this.googleMaps, config('bottom'));
    sr.reveal(this.location, config('left'));
    sr.reveal(this.details, config('right'));
  }

  formatPhoneNumber(number) {
    const isValid = number.search(/^\(?\d{3}\D*\d{3}\D*\d{4}$/);
    if (isValid === 0) {
      var parts = number.match(/^\(?(\d{3})\D*(\d{3})\D*(\d{4})$/);
      return '('+parts[1]+') '+parts[2]+'-'+parts[3];
    }

    return number;
  }

  updateField(field, e) {
    let value = e.target.value;
    if (field === 'phoneNumber') {
      value = this.formatPhoneNumber(value);
    }
    this.setState({
      [field]: value
    })
  }

  submit() {
    if (!this.state.phoneNumber && !this.state.email) {
      this.setState({
        errorMessage: T.translate('VALID_FORM')
      });
    }
    else {
      this.setState({
        sending: true,
        errorMessage: ''
      });

      const { name, email, phoneNumber, message } = this.state;
      axios.post(`${config.CONTACT_ENDPOINT}`, {
        name,
        email,
        phoneNumber,
        message
      })
      .then((response) => {
        this.setState({ sending: false, success: true, ...this.blankForm },
          () => setTimeout(() => {
            this.setState({
              success: undefined
            })
          }, 3000));
        console.log(response);
      })
      .catch((error) => {
        this.setState({ sending: false, success: false, errorMessage: T.translate('FORM_SEND_ERROR') });
        console.log(error);
      });
    }
  }

  getSubmitButtonText() {
    if (this.state.success) {
      return T.translate('FORM_SENT');
    }
    else if (this.state.sending) {
      return T.translate('FORM_SENDING');
    }
    return T.translate('SUBMIT');
  }

  render() {
    const { isRTL } = this.props;
    const footerClasses = classnames('Footer', {
      'Footer--rtl': isRTL
    });
    const footerRowClass = classnames('row', {
      'row--rtl': isRTL
    });
    const errorClasses = classnames('error-message', {
      'error-message-visible': this.state.errorMessage
    });
    const formContainerClass = classnames('col-xs-12', 'lj-form', {
      'col-md-push-1': !isRTL,
      'col-md-5': !isRTL,
      'col-md-6': isRTL
    });
    const formClasses = classnames('contact-us-form', {
      'contact-us-form--rtl': isRTL,
      'pull-right-md': !isRTL,
      'pull-left-md': isRTL
    });
    const googleMapsClasses = classnames('col-xs-12', 'google-maps', {
      'col-md-push-1': !isRTL,
      'col-md-6': !isRTL,
      'col-md-5': isRTL
    });
    const contactDetailsClasses = classnames('col-xs-12', 'col-md-1', 'lj-address', {
      'col-md-pull-11': !isRTL,
      'col-md-push-10': isRTL
    });
    const subtitleClasses = classnames('col-xs-12', 'lj-subtitle', {
      'col-md-offset-3': !isRTL,
      'col-md-pull-3': isRTL,
      'flex-reverse': isRTL
    });
    const googleMapsURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDwylj22KLA5Myvzob5uvoBQ2AQMMbftOg&v=3.exp&libraries=geometry,drawing,places&language=${getLanguage()}`;

    return (
      <footer className={ footerClasses }>
        <div className="container">
          <div className="row">
            <div className={ subtitleClasses }>
              <h3 className="lj-text-center" id="contact-me" ref={ (_) => (this.contactMe = _)}>{ T.translate('CONTACT') }</h3>
            </div>
          </div>

          <div className={ footerRowClass }>
            <div className={ formContainerClass }>
              <form className={ formClasses } ref={ (_) => (this.form = _)}>

                <div className="lj-block-center">
                  <input type="text" value={ this.state.name } name="name" id="name" placeholder={ T.translate('PLACEHOLDER_NAME') } onChange={e => this.updateField('name', e)} />
                </div>

                <div className="lj-block-center">
                  <input type="email" value={ this.state.email } name="email" id="email" placeholder={ T.translate('PLACEHOLDER_EMAIL') } onChange={e => this.updateField('email', e)} />
                </div>

                <div className="lj-block-center">
                  <input type="tel" maxLength={10} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={ this.state.phoneNumber } name="phoneNumber" id="phoneNumber" placeholder={ T.translate('PLACEHOLDER_PHONE') } onChange={e => this.updateField('phoneNumber', e)} />
                </div>

                <div className="lj-block-center">
                  <textarea type="text" value={ this.state.message } name="message" id="message" placeholder={ T.translate('PLACEHOLDER_MESSAGE') } onChange={e => this.updateField('message', e)} />
                </div>

                <div className="lj-block-center">
                  <input type="button" value={ this.getSubmitButtonText() } name="submit" onClick={() => this.submit()} />
                  <span className={errorClasses}>{ this.state.errorMessage }</span>
                </div>

              </form>
            </div>

            <div className={ googleMapsClasses } ref={ (_) => (this.googleMaps = _)} >
              <MapWithMarker
                isRTL={ isRTL }
                googleMapURL={ googleMapsURL }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `380px`, marginTop: '30px' }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>

            <div className={ contactDetailsClasses } ref={ (_) => (this.details = _)}>
              <ul>
                <li><i className="fa-li fa fa-envelope-o"></i>dradigoldshtein@gmail.com</li>
                <li><i className="fa-li fa fa-envelope-o"></i>{ T.translate('LIBI_ADDRESS_1') }, { T.translate('LIBI_ADDRESS_2') }</li>
                {/*<li><i className="fa-li fa fa-facebook hidden-xs"></i></li>*/}
              </ul>
            </div>
          </div>

          {/*<div className="row">*/}
            {/*<div className="col-xs-12 visible-xs lj-mobile-socials">*/}
              {/*<ul>*/}
                {/*<li><a className="fa fa-facebook" href="#"></a></li>*/}
              {/*</ul>*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  isRTL: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isRTL: state.app.language === 'he'
});

export default connect(mapStateToProps)(Footer);
