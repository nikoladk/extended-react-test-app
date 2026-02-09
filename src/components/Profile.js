import React, { useState } from 'react';

function Profile({ username }) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('admin@example.com');
  const [originalEmail, setOriginalEmail] = useState('admin@example.com');
  const [message, setMessage] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalEmail(email);
    setMessage('');
  };

  const handleSave = () => {
    setIsEditing(false);
    setOriginalEmail(email);
    setMessage('Profile updated successfully.');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEmail(originalEmail);
    setMessage('');
  };

  return (
    <div className="profile-page category-content" data-testid="profile-page">
      <h2>Profile</h2>
      
      <div className="profile-field">
        <label htmlFor="profile-username">Username</label>
        <input
          type="text"
          id="profile-username"
          data-testid="profile-username"
          value={username}
          disabled
          readOnly
        />
      </div>
      
      <div className="profile-field">
        <label htmlFor="profile-email">Email</label>
        <input
          type="email"
          id="profile-email"
          data-testid="profile-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      
      <div className="profile-buttons">
        {!isEditing ? (
          <button
            className="edit-btn"
            data-testid="edit-button"
            onClick={handleEdit}
          >
            Edit
          </button>
        ) : (
          <>
            <button
              className="save-btn"
              data-testid="save-button"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="cancel-btn"
              data-testid="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      
      {message && (
        <div className="profile-message" data-testid="profile-message">
          {message}
        </div>
      )}
    </div>
  );
}

export default Profile;
