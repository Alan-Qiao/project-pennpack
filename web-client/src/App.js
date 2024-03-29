import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initLocalStorage } from './api/storage';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClassDashboard from './pages/ClassDashboard';
import ClassDay from './pages/ClassDay';
import UserDashboard from './pages/UserDashboard';
import JoinClass from './pages/JoinClass';
import CreateClass from './pages/CreateClass';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import AddClassDay from './pages/AddClassDay';

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
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/classdashboard/:name" element={<ClassDashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/joinclass" element={<JoinClass />} />
        <Route path="/createclass" element={<CreateClass />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/classdashboard/:name/addClassDay" element={<AddClassDay />} />
        <Route path="/classday/:id" element={<ClassDay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
