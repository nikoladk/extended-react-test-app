import React from 'react';

function Toast({ message, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast" data-testid="toast-message">
      {message}
    </div>
  );
}

export default Toast;
