import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleAuthForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="App">
      {showLogin ? <Login /> : <Register />}
      <button onClick={toggleAuthForm}>
        {showLogin ? 'Go to Register' : 'Go to Login'}
      </button>
    </div>
  );
};

export default App;
