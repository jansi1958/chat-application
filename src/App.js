import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './Pages/Register';
import Login from './Pages/Login'
import Chat from './Pages/Chat';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Chat />} exact />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
