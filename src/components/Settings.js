import React, { useState } from 'react';

function Settings({ darkMode, onToggleDarkMode }) {
  const [language, setLanguage] = useState('EN');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    setMessage('Settings saved.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="settings-page category-content" data-testid="settings-page">
      <h2>Settings</h2>
      
      <div className="setting-item">
        <label htmlFor="dark-mode-toggle">Dark Mode</label>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id="dark-mode-toggle"
            data-testid="dark-mode-toggle"
            checked={darkMode}
            onChange={onToggleDarkMode}
          />
          <span className="toggle-slider"></span>
        </div>
      </div>
      
      <div className="setting-item">
        <label htmlFor="language-select">Language</label>
        <select
          id="language-select"
          className="language-select"
          data-testid="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="EN">English</option>
          <option value="DE">Deutsch</option>
          <option value="FR">Français</option>
        </select>
      </div>
      
      <button
        className="save-settings-btn"
        data-testid="save-settings-button"
        onClick={handleSave}
      >
        Save settings
      </button>
      
      {message && (
        <div className="settings-message" data-testid="settings-message">
          {message}
        </div>
      )}
    </div>
  );
}

export default Settings;
