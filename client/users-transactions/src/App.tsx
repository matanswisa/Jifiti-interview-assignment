import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
// import { Application, createApiClient } from './api/api';
import './App.css';



import { createApiClient } from './api/api';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import ApplicationTable from './pages/ApplicationsTable';
import TransactionsTable from './pages/TransactionsTable';

export const api = createApiClient();

function App() {


  return (
    <Content>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<ApplicationTable />}></Route>
            <Route path="/transactions" element={<TransactionsTable />}></Route>
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