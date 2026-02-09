import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [logoutMessage, setLogoutMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
    setLogoutMessage('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setLogoutMessage('GoodBuy.');
    setDarkMode(false);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`} data-testid="app">
      {isLoggedIn ? (
        <Dashboard 
          username={username} 
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
      ) : (
        <Login onLogin={handleLogin} logoutMessage={logoutMessage} />
      )}
    </div>
  );
}

export default App;
