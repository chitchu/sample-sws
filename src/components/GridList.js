import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GridItem from './GridItem';

import './GridList.css';

class GridList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        exchange_symbol: PropTypes.string,
        last_updated: PropTypes.number,
        info: PropTypes.object,
        score: PropTypes.object,
        unique_symbol: PropTypes.string
      })
    ).isRequired
  };
  render() {
    const { items } = this.props;
    return (
      <div className="grid-list">
        {items.map(
          ({
            id,
            name,
            exchange_symbol,
            last_updated,
            info,
            score,
            unique_symbol
          }) => (
            <GridItem
              key={id}
              name={name}
              exchangeSymbol={exchange_symbol}
              lastUpdated={last_updated}
              info={info}
              score={score}
              unique_symbol={unique_symbol}
            />
          )
        )}
      </div>
    );
  }
}

export default GridList;
