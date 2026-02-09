import React, { useState } from 'react';

function Login({ onLogin, logoutMessage }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    if (password.length < 6) {
      setError('Password is too short.');
      return;
    }

    // Check credentials
    if (username === 'admin' && password === 'password123') {
      onLogin(username);
    } else {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      
      if (newFailedAttempts >= 3) {
        setIsLocked(true);
        setError('Account locked.');
      } else {
        setError('Try again.');
      }
    }
  };

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-container">
        <h1>Login</h1>
        
        {logoutMessage && (
          <div className="logout-message" data-testid="logout-message">
            {logoutMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              data-testid="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={isLocked}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                data-testid="password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isLocked}
              />
              <button
                type="button"
                className="toggle-password"
                data-testid="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            data-testid="login-button"
            disabled={isLocked}
          >
            Login
          </button>

          {error && (
            <div className="error-message" data-testid="error-message">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
