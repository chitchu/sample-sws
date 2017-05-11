import React from 'react';
import GridContainer from './components/GridContainer';
import NotifyScrollPosition from './components/hoc/NotifyScrollPosition';
const GridWithScrollLoading = NotifyScrollPosition(GridContainer);
// import GridList from './components/GridList';
// import mock from './mock.json';
import './App.css';

const App = () => (
  <div className="container">
    {/*<GridList items={mock.data} />*/}
    <GridWithScrollLoading loadStrategy="default" />
  </div>
);

export default App;
