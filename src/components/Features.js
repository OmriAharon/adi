import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import T from 'i18n-react';
import sr from './ScrollReveal';

class Features extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const config = (position, distance = '20px') => ({
      origin: position,
      duration: 300,
      delay: 200,
      distance,
      scale: 1,
      easing: 'ease'
    });

    sr.reveal(this.featureOneA, config(this.props.isRTL ? 'right' : 'left'));
    sr.reveal(this.featureOneB, config(this.props.isRTL ? 'right' : 'left'));
    sr.reveal(this.featureOneC, config(this.props.isRTL ? 'right' : 'left'));
    sr.reveal(this.featureTwoA, config('top', 0));
    sr.reveal(this.featureTwoB, config('bottom', 0));
    sr.reveal(this.featureTwoC, config('bottom', 0));
    sr.reveal(this.featureThreeA, config(this.props.isRTL ? 'left' : 'right'));
    sr.reveal(this.featureThreeB, config(this.props.isRTL ? 'left' : 'right'));
    sr.reveal(this.featureThreeC, config(this.props.isRTL ? 'left' : 'right'));
  }

  getLaughingGas() {
    return <div className="col-sm-4 lj-icon-box lj-text-center">
      <span ref={(_) => (this.featureThreeA = _)}><i className="fa fa-medkit"></i></span>
      <h2 ref={(_) => (this.featureThreeB = _)}>{T.translate('GAS')}</h2>
      <p ref={(_) => (this.featureThreeC = _)}>{T.translate('GAS_DESC')}</p>
    </div>;
  }

  getInstructor() {
    return <div className="col-sm-4 lj-icon-box lj-text-center">
      <span ref={(_) => (this.featureTwoA = _)}><i className="fa fa-user-md"></i></span>
      <h2 ref={(_) => (this.featureTwoB = _)}>{T.translate('INSTRUCTOR')}</h2>
      <p ref={(_) => (this.featureTwoC = _)}>{T.translate('INSTRUCTOR_DESC')}</p>
    </div>;
  }

  getEducation() {
    return <div className="col-sm-4 lj-icon-box lj-text-center">
      <span ref={(_) => (this.featureOneA = _)}><i className="fa fa-graduation-cap"></i></span>
      <h2 ref={(_) => (this.featureOneB = _)}>{T.translate('SCHOOL')}</h2>
      <p ref={(_) => (this.featureOneC = _)}>{T.translate('SCHOOL_DESC')}</p>
    </div>;
  }

  render() {
    const { isRTL } = this.props;
    const featuresClasses = classnames('features', {
      'features--rtl': isRTL
    });
    const featureWrapperClasses = classnames('row', {
      'features-row--rtl': isRTL
    });

    return (
      <div className={featuresClasses}>
        <div className="container">
          <div className={ featureWrapperClasses }>
            {this.getEducation()}

            {this.getInstructor()}

            {this.getLaughingGas()}
          </div>
        </div>
      </div>
    );
  }
}

Features.propTypes = {
  isRTL: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isRTL: state.app.language === 'he'
});

export default connect(mapStateToProps)(Features);
