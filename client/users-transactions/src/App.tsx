import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
// import { Application, createApiClient } from './api/api';
import './App.css';
import ApplicationTable from './pages/ApplicationsTable';


import { createApiClient } from './api/api';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import ApplicationInfo from './pages/ApplicationInfo';

export const api = createApiClient();

function App() {


  return (
    <Content>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<ApplicationInfo />}></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </Content>
  );
}

export default App;

const Content = styled.div`
  width:100vw;
  height:100vh;
`