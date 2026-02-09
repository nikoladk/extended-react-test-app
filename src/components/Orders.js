import React, { useState } from 'react';

function Orders() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="orders-page category-content" data-testid="orders-page">
      <h2>Orders</h2>
      
      <div className="empty-orders" data-testid="empty-orders">
        <p data-testid="empty-orders-message">No orders yet.</p>
        
        <button
          className="refresh-btn"
          data-testid="refresh-button"
          onClick={handleRefresh}
          disabled={isLoading}
        >
          {isLoading && <span className="loading-spinner" data-testid="loading-spinner"></span>}
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
}

export default Orders;
