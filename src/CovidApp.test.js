import React from 'react';
import ReactDOM from 'react-dom';
import CovidApp from './CovidApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CovidApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
