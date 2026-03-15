import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

import logo from '../../assets/logo.png';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={logo} alt="Bank Roll Culture" className="brand-logo" />
        </div>

        {/* Desktop Links */}
        <div className="navbar-links desktop-only">
          <a href="#how-it-works" className="nav-link">How Customization Works</a>
          <a href="#catalog" className="nav-link">Catalog</a>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Mobile Toggle */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#how-it-works" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>How Customization Works</a>
          <a href="#catalog" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Catalog</a>
        </div>
      )}
    </nav>
  );
};
