import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';

describe('<App/>', () => {
  it('renders without crashing', () => {
    const result = shallow(<App />);
    expect(toJson(result)).toMatchSnapshot();
  });
});
