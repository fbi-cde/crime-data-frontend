import React from 'react';
import ReactDOM from 'react-dom';

import Sandbox from '../../src/components/Sandbox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div)
  ReactDOM.render(<Sandbox />, div);
});
