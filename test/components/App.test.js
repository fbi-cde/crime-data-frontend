import React from 'react';
import ReactDOM from 'react-dom';

import App from '../../src/components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div)
  ReactDOM.render(<App />, div);
});
