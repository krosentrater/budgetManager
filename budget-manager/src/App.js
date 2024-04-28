import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import Public from './components/Public.js';
import Navbar from './components/Navbar.js';

function App() {
  return (
    <BrowserRouter>
    <header>
      <Navbar />
    </header>
      <main>
        <Routes>
          <Route index element={<Home />} /> 
          <Route path='/budget-creator' element={<Public />} />
          {/* <Route path='/account-creation' element={<Signup />} /> */}
          {/* Add new routes like above examples */}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
