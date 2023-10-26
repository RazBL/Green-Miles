import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Admin from './components/admin';
import UsersList from './components/UsersList';
import AdminContextProvidewr from './contexts/AdminContext';

function App() {

  return (
    <AdminContextProvidewr>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </Router>
    </AdminContextProvidewr>
  );
}

export default App;