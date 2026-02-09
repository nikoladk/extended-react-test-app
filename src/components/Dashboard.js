import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import CategoryContent from './CategoryContent';
import Profile from './Profile';
import Orders from './Orders';
import Settings from './Settings';
import Toast from './Toast';

function Dashboard({ username, onLogout, darkMode, onToggleDarkMode }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState(null);
  const [successMessage, setSuccessMessage] = useState('You made it!');

  const categories = ['Shoes', 'Clothes', 'Accessories'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.toLowerCase());
    setCurrentPage('dashboard');
  };

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    setToast('Item added to cart.');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page !== 'dashboard') {
      setSelectedCategory(null);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile username={username} />;
      case 'orders':
        return <Orders />;
      case 'settings':
        return <Settings darkMode={darkMode} onToggleDarkMode={onToggleDarkMode} />;
      case 'dashboard':
      default:
        return (
          <>
            {successMessage && (
              <div className="category-content" style={{ marginBottom: '20px' }}>
                <div className="category-message" data-testid="success-message">
                  {successMessage}
                </div>
              </div>
            )}
            {selectedCategory && (
              <CategoryContent 
                category={selectedCategory} 
                onAddToCart={handleAddToCart} 
              />
            )}
          </>
        );
    }
  };

  return (
    <div className="dashboard" data-testid="dashboard">
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onLogout={onLogout}
      />
      
      <div className="main-content">
        <Header 
          username={username} 
          notificationCount={3} 
          cartCount={cartCount} 
        />
        
        <div className="category-buttons" data-testid="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category.toLowerCase() ? 'active' : ''}`}
              data-testid={`category-btn-${category.toLowerCase()}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="content-area" data-testid="content-area">
          {renderContent()}
        </div>
      </div>
      
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default Dashboard;
