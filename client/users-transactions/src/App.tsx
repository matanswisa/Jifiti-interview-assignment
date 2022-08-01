import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
// import { Application, createApiClient } from './api/api';
import './App.css';
import ApplicationTable from './pages/ApplicationsTable';




function App() {


  return (
    <div className="App">
      <ApplicationTable />
    </div>
  );
}

export default App;
