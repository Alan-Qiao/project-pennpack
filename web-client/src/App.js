import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initLocalStorage } from './api/storage';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClassDashboard from './pages/ClassDashboard';
import AddClassNote from './pages/AddClassNote';
import UserDashboard from './pages/UserDashboard';
import JoinClass from './pages/JoinClass';
import CreateClass from './pages/CreateClass';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

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
        <Route path="/classdashboard/:id" element={<ClassDashboard />} />
        <Route path="/classdashboard/:id/addclassnote" element={<AddClassNote />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/joinclass" element={<JoinClass />} />
        <Route path="/createclass" element={<CreateClass />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
