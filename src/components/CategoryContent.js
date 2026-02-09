import React from 'react';

const categoryData = {
  shoes: {
    title: 'Shoes',
    message: 'Welcome to Shoes section.',
    itemCount: 12,
    products: [
      { id: 1, name: 'Running Shoes', price: '$89.99' },
      { id: 2, name: 'Casual Sneakers', price: '$59.99' },
      { id: 3, name: 'Hiking Boots', price: '$129.99' }
    ]
  },
  clothes: {
    title: 'Clothes',
    message: 'Welcome to Clothes section.',
    itemCount: 24,
    products: [
      { id: 1, name: 'T-Shirt', price: '$29.99' },
      { id: 2, name: 'Jeans', price: '$49.99' },
      { id: 3, name: 'Jacket', price: '$99.99' }
    ]
  },
  accessories: {
    title: 'Accessories',
    message: 'Welcome to Accessories section.',
    itemCount: 18,
    products: [
      { id: 1, name: 'Watch', price: '$199.99' },
      { id: 2, name: 'Sunglasses', price: '$79.99' },
      { id: 3, name: 'Belt', price: '$39.99' }
    ]
  }
};

function CategoryContent({ category, onAddToCart }) {
  const data = categoryData[category];
  
  if (!data) return null;

  return (
    <div className="category-content" data-testid={`category-${category}`}>
      <h2 data-testid="category-title">{data.title}</h2>
      <p className="item-counter" data-testid="item-counter">
        {data.itemCount} items available
      </p>
      
      <div className="category-message" data-testid="category-message">
        {data.message}
      </div>
      
      <div className="product-grid" data-testid="product-grid">
        {data.products.map(product => (
          <div key={product.id} className="product-card" data-testid="product-card">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button
              className="add-to-cart-btn"
              data-testid="add-to-cart-button"
              disabled
              onClick={() => onAddToCart(product)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryContent;
