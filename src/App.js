import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initLocalStorage } from './api/storage';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  useEffect(() => {
    initLocalStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
