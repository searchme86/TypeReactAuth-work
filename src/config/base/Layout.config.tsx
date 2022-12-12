import React from 'react';
import { Outlet } from 'react-router';

function LayOut() {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
}

export default LayOut;
