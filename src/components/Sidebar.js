import React from 'react';

function Sidebar({ currentPage, onNavigate, onLogout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'profile', label: 'Profile' },
    { id: 'orders', label: 'Orders' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <aside className="sidebar" data-testid="sidebar">
      <div className="sidebar-header">
        <h2>Shop App</h2>
      </div>
      
      <nav className="sidebar-menu" data-testid="sidebar-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
            data-testid={`menu-${item.id}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      
      <button
        className="logout-button"
        data-testid="logout-button"
        onClick={onLogout}
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
