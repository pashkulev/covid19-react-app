import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CovidApp from './CovidApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CovidApp />, document.getElementById('root'));
registerServiceWorker();
