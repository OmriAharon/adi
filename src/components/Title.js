import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import T from 'i18n-react';
import sr from './ScrollReveal'

class Title extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const config = {
      origin: 'top',
      duration: 1000,
      delay: 500,
      distance: '20px',
      scale: 1,
      easing: 'ease',
    };
    const paragraphConfig = {
      origin: 'top',
      duration: 1000,
      delay: 1000,
      distance: '10px',
      scale: 1,
      easing: 'ease'
    };
    const contactMeConfig = {
      origin: 'bottom',
      duration: 1000,
      delay: 1500,
      distance: '20px',
      scale: 1,
      easing: 'ease'
    };

    sr.reveal(this.overlay, config);
    sr.reveal(this.mainTitle, config);
    sr.reveal(this.paragraph, paragraphConfig);
    sr.reveal(this.contactMe, contactMeConfig);
  }

  scrollToContactMe() {
    $('html,body').animate({
        scrollTop: $("#contact-me").offset().top},
      700);
  }

  render() {
    const { isRTL } = this.props;
    const titleContainerClasses = classnames('Title-container', {
      'Title-container--rtl': isRTL
    });
    const titleClasses = classnames({
      'lj-text-right': isRTL
    });
    const paragraphContainerClasses = classnames('col-xs-8', 'col-xs-offset-2', 'lj-title-paragraph', {
      'lj-title-paragraph--rtl': isRTL
    });
    const paragraphClasses = classnames('lj-text-left', 'hero-desc', {
      'lj-text-right': isRTL
    });
    const contactClasses = classnames('contact-me-container', {
      'contact-me-container--rtl': isRTL
    });

    return (
      <div className={ titleContainerClasses }>
        <div className="Title-overlay" ref={ (_) => (this.overlay = _)} />
        <div key="1" className="row">
          <div className="col-xs-12 lj-title" ref={ (_) => (this.mainTitle = _)}>
            <h1 className={ titleClasses }><span>{ T.translate('DR') + ' ' }</span>{ T.translate('NAME') }</h1>
          </div>
        </div>

        <div key="2" className="row">
          <div className={ paragraphContainerClasses }>
            <p className={ paragraphClasses } ref={ (_) => (this.paragraph = _)}>
              { T.translate('DESC_LINE') }
            </p>
          </div>
        </div>

        <div key="3" className="row">
          <div className="col-xs-12 lj-header-button lj-block-center">
            <div className={ contactClasses } ref={ (_) => (this.contactMe = _)}>
              <a onClick={ () => this.scrollToContactMe() }>
                { T.translate('CONTACT') }
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Title.propTypes = {
  isRTL: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isRTL: state.app.language === 'he'
});

export default connect(mapStateToProps)(Title);
