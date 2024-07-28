import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

function App() {
const routes=(
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />}/>
      <Route path="/dashboard" exact element={<Home />}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<SignUp/>}/>
    </Routes>
  </Router>
);

  return <div>{routes}</div>
}

export default App
