import React, { Component } from 'react';
import PropTypes from 'prop-types';

const NotifyScrollPosition = WrappedComponent =>
  class NotifyScrollPosition extends Component {
    static propTypes = {
      loadStrategy: PropTypes.oneOf(['lazy', 'aggressive', 'default'])
    };

    static defaultProps = {
      loadStrategy: 'default'
    };

    prevScrollPosition = 0;

    documentHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    }

    resolveScrollPosition = () => {
      const currentScrollPos =
        window.pageYOffset + document.documentElement.clientHeight;
      const currentDocumentHeight = this.documentHeight();
      const viewportHeight = window.innerHeight;
      const aggressiveBreakpoint = currentDocumentHeight - viewportHeight;
      const defaultBreakpoint = currentDocumentHeight - viewportHeight * 0.75;

      let scrollVelocity;
      const loadAction = this.Wrapped.loadNext;
      if (
        currentScrollPos > aggressiveBreakpoint &&
        this.props.loadStrategy === 'aggressive'
      ) {
        scrollVelocity = currentScrollPos - this.prevScrollPosition;
        this.Wrapped && loadAction(1 * (scrollVelocity > 100) && 36);
      } else if (
        currentScrollPos > defaultBreakpoint &&
        this.props.loadStrategy === 'default'
      ) {
        scrollVelocity = currentScrollPos - this.prevScrollPosition;
        this.Wrapped && loadAction(1 * (scrollVelocity > 100) && 24);
      } else if (
        currentScrollPos === currentDocumentHeight &&
        this.props.loadStrategy === 'lazy'
      ) {
        this.Wrapped && loadAction();
      }
      this.prevScrollPosition = currentScrollPos;
    };
    componentDidMount() {
      window.addEventListener('scroll', this.resolveScrollPosition);
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.resolveScrollPosition);
    }
    render() {
      return (
        <WrappedComponent ref={ref => (this.Wrapped = ref)} {...this.props} />
      );
    }
  };

export default NotifyScrollPosition;
