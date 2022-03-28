import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initLocalStorage } from './api/storage';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClassDashboard from './pages/ClassDashboard';
import AddClassNote from './pages/AddClassNote';
import UserDashboard from './pages/UserDashboard';

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
        <Route path="/classDashboard" element={<ClassDashboard />}>
          <Route path=":id" element={<ClassDashboard />} />
        </Route>
        <Route path="/addclassnote" element={<AddClassNote />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
