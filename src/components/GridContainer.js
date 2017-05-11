import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getGrid } from '../services';

import GridList from './GridList';
import LoadingAnimation from './LoadingAnimation';
import EOF from './EOF';

class GridContainer extends Component {
  state = {
    isLoading: true,
    isEof: false,
    items: [],
    offset: 0
  };

  static propTypes = {
    viewableItems: PropTypes.number
  };

  static defaultProps = {
    viewableItems: 12
  };

  async componentDidMount() {
    const { data: { data, meta: { real_total_records } } } = await getGrid(
      this.state.offset,
      this.props.viewableItems
    );
    this.setState(() => ({
      items: data,
      offset: data.length,
      isLoading: false,
      isEof: real_total_records === data.length
    }));
  }

  loadNext = size => {
    if (this.state.isLoading || this.state.isEof) return; //noop if loading or eof, Todo: maybe good idea to queue???
    getGrid(this.state.offset, size || this.props.viewableItems)
      .then(({ data: { data, meta: { real_total_records } } }) => {
        this.setState(prevState => ({
          items: prevState.items.concat([...data]),
          offset: prevState.items.length + data.length,
          isLoading: false,
          isEof: real_total_records === prevState.items.length + data.length
        }));
      })
      .catch(console.error);

    this.setState(() => ({ isLoading: true }));
  };
  render() {
    return (
      <div>
        <GridList items={this.state.items} />
        {this.state.isLoading && !this.state.isEof && <LoadingAnimation />}
        {this.state.isEof && <EOF />}
      </div>
    );
  }
}

export default GridContainer;
