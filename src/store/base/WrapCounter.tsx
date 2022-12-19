import React from 'react';
import { Provider } from 'react-redux';
import Counter from './features/counter/Counter';
import { store } from './store';

function WrapCounter() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

export default WrapCounter;
