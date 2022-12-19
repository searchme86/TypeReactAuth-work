import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Editor from '../../pages/Editor';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import LayOut from './Layout.config';
import LinkPage from '../../pages/LinkPage';
import Unauthorized from '../../pages/Unauthorized';
import Admin from '../../pages/Admin';
import Lounge from '../../pages/Lounge';
import Missing from '../../pages/Missing';
import ReduxTest from 'src/pages/ReduxTest';
import WrapCounter from 'src/store/base/WrapCounter';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LayOut />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/linkPage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/lounge" element={<Lounge />} />
        {/*  */}
        <Route path="/redux" element={<ReduxTest />} />
        <Route path="/test" element={<WrapCounter />} />
        {/*  */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default Router;
