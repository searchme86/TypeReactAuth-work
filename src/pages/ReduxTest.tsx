import React from 'react';

import { Provider } from 'react-redux';
import { store } from 'src/store/turorials';
import RepositoriesList from './RepositoriesList';

function ReduxTest() {
  return (
    <Provider store={store}>
      <div className="">
        <h1>Search for a package</h1>
        <RepositoriesList />
      </div>
    </Provider>
  );
}

export default ReduxTest;
