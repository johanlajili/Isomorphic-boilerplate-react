import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../shared/compodfnents/App';

hydrate(
  (
    <Router>
      <App pokemon={window.__PRELOADED_STATE__} />
    </Router>),
  document.getElementById('root'),
);
