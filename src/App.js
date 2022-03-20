import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ClassDashboard from './pages/ClassDashboard';
import ClassNote from './pages/ClassNote';

function App() {

  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/classDashboard" element={<ClassDashboard />} />
        <Route path="/classNote" element={<ClassNote />} />
      </Routes>
    </BrowserRouter>,
    document.getElementById('root'),
  );
}

export default App;