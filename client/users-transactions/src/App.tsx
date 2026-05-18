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
            <Route path="/transactions/:userId" element={<TransactionsTable />}></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </Content>
  );
}

export default App;

const Content = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(20, 184, 166, 0.14), transparent 30rem),
    linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
`
