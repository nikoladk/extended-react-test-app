import React from 'react';

function Header({ username, notificationCount, cartCount }) {
  return (
    <header className="header" data-testid="header">
      <div className="welcome-text" data-testid="welcome-message">
        Welcome, {username}!
      </div>
      
      <div className="header-icons">
        <button className="icon-button" data-testid="notification-bell">
          🔔
          <span className="notification-badge" data-testid="notification-count">
            {notificationCount}
          </span>
        </button>
        
        <button className="icon-button" data-testid="cart-icon">
          🛒
          <span className="cart-badge" data-testid="cart-count">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
