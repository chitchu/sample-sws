import React from 'react';
import PropTypes from 'prop-types';

import './Graph.css';

import GraphBar from './GraphBar';
const Graph = ({ value, income, health, past, future, total, max }) => {
  return (
    <div className="graph">
      <ul>
        <li className="value">
          <GraphBar value={value} max={max} />
          <div className="content">
            <small>Value:</small> <small>
              {value}
            </small>
          </div>
        </li>
        <li className="income">
          <GraphBar value={income} max={max} />
          <div className="content">
            <small>Income:</small> <small>{income}</small>
          </div>
        </li>
        <li className="health">
          <GraphBar value={health} max={max} />
          <div className="content">
            <small>Health:</small> <small>{health}</small>
          </div>
        </li>
        <li className="past">
          <GraphBar value={past} max={max} />
          <div className="content">
            <small>Past:</small> <small>{past}</small>
          </div>
        </li>
        <li className="future">
          <GraphBar value={future} max={max} />
          <div className="content">
            <small>Future:</small> <small>{future}</small>
          </div>
        </li>
      </ul>
    </div>
  );
};
Graph.propTypes = {
  value: PropTypes.number,
  income: PropTypes.number,
  health: PropTypes.number,
  past: PropTypes.number,
  future: PropTypes.number,
  total: PropTypes.number,
  max: PropTypes.number.isRequired
};
export default Graph;
