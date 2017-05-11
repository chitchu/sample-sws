import React from 'react';
import PropTypes from 'prop-types';

import './GraphBar.css';
const hexToRgb = hex => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const modHex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(modHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null;
};

const maxRGB = hexToRgb('#92C7A3');
const minRGB = hexToRgb('#444444');
const diffR = maxRGB.r - minRGB.r;
const diffG = maxRGB.g - minRGB.g;
const diffB = maxRGB.b - minRGB.b;

const getColour = percentage => {
  const { r, g, b } = minRGB;
  return `rgb(${Math.floor(r + diffR * percentage)}, ${Math.floor(g + diffG * percentage)}, ${Math.floor(b + diffB * percentage)})`;
};

const GraphBar = ({ value, max }) => {
  return (
    <div
      className="bar"
      style={{
        width: `${value / max * 100}%`,
        backgroundColor: getColour(value / max)
      }}
    />
  );
};

GraphBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default GraphBar;
