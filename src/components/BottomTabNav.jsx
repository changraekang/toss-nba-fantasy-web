import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BottomTabNav.css';

const BottomTabNav = () => {
  const location = useLocation();

  const tabs = [
    { path: '/', label: 'My Team', icon: '👥' },
    { path: '/rankings', label: 'Rankings', icon: '🏆' },
    { path: '/rules', label: 'Rules', icon: '📋' },
    { path: '/community', label: 'Community', icon: '💬' },
  ];

  return (
    <nav className="bottom-tab-nav">
      <div className="tab-container">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`tab-item ${isActive ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNav;
