import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import ReactFlagsSelect from 'react-flags-select';
import { setLanguage, getLanguage } from '../i18n';
import { setLanguageInStore } from '../redux/actions/actions';
import Title from './Title';
import Features from './Features';
import Footer from './Footer';
import Bg from '../assets/img/bg.jpg';
import Bg2 from '../assets/img/bg_2.jpg';
import Bg3 from '../assets/img/bg_4.jpg';
import '../assets/third-party/jquery.backstretch.min';

/**
 * @class Main
 */
export class Main extends Component {

  /**
   * Main component constructor.
   * @param props
   */
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    setLanguage(this.props.params.language);

    //TODO: Analytics
    const locale = getLanguage();
    this.country = locale === 'he' ? 'IL' : 'US';
    this.props.setLanguageInStore(locale);
  }

  componentDidMount() {
    $('header').backstretch([Bg, Bg2, Bg3], {duration: 5000, fade: 750});
  }

  onSelectLocale(countryCode) {
    window.location.href = countryCode === 'IL' ? "/" : '/en';
  }

  /**
   * Render method
   * @returns {VDom}
   */
  render() {
    const { isRTL } = this.props;
    const mainContainerClasses = classnames('main-container', {
      'main-container--rtl': isRTL
    });
    const headerClass = classnames('header', {
      'header--rtl': isRTL
    });

    return (
      [<header key="1" className={ headerClass }>
        <ReactFlagsSelect
          countries={["US", "IL"]}
          defaultCountry={ this.country }
          customLabels={{"US": "","IL": ""}}
          showSelectedLabel={false}
          showOptionLabel={false}
          onSelect={this.onSelectLocale} />
        <div className={ mainContainerClasses }>
          <Title />
        </div>
      </header>,
      <Features key="2" />,
      <Footer key="3" />
      ]
    )
  }
}

Main.propTypes = {
  params: PropTypes.object.isRequired,
  setLanguageInStore: PropTypes.func.isRequired,
  isRTL: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isRTL: state.app.language === 'he'
});

export default connect(mapStateToProps, { setLanguageInStore })(withRouter(Main));
