import React from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
      

    </div>
  )
}

export default App