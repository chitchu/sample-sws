import React from 'react';
import PropTypes from 'prop-types';

import Graph from './Graph';

import './GridItem.css';

const baseUrl = 'https://simplywall.st';
const GridItem = ({
  name,
  exchangeSymbol,
  lastUpdated,
  info: { data: { description, url, logo_url, cover_url, cover_small_url } },
  score
}) => (
  <div className="card">
    <div className="wrapper">
      <div
        className="cover"
        style={{ backgroundImage: `url(${baseUrl}${cover_small_url})` }}
      >
        <img className="logo" src={`${baseUrl}${logo_url}`} alt="Logo" />
      </div>
      <div className="heading">
        <a href={url} target="_blank" rel="noopener noreferrer" title={name}>
          <h2>{name}</h2>
        </a>
      </div>
      <Graph {...score.data} max={6} />
      <div className="meta">
        <p>
          <small>{exchangeSymbol}</small>
        </p>
        <p>
          <small>{description}</small>
        </p>
      </div>
    </div>
  </div>
);

GridItem.propTypes = {
  name: PropTypes.string.isRequired,
  exchangeSymbol: PropTypes.string,
  lastUpdated: PropTypes.number,
  info: PropTypes.shape({
    data: PropTypes.shape({
      description: PropTypes.string,
      industry: PropTypes.shape({
        name: PropTypes.string
      }),
      currency: PropTypes.string,
      address: PropTypes.string,
      url: PropTypes.string,
      logo_url: PropTypes.string,
      cover_url: PropTypes.string,
      cover_small_url: PropTypes.string
    })
  }),
  score: PropTypes.shape({
    data: PropTypes.shape({
      value: PropTypes.number,
      income: PropTypes.number,
      health: PropTypes.number,
      past: PropTypes.number,
      future: PropTypes.number,
      total: PropTypes.number
    })
  })
};

export default GridItem;
