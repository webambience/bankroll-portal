import React from 'react';
import './Hero.css';
import heroBg from '../../assets/hero-bg.png';

export const Hero: React.FC = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          BUILT FOR THE <span className="text-gradient">TABLE</span>
        </h1>
        <p className="hero-subtitle">
          Premium apparel engineered for competitive pool players, APA leagues, and businesses. Every design is a template—apply it to a pro-collar jersey, baselayer, or polo, then customize it for your pool team, billiards venue, or event promotion.
        </p>
        <div className="hero-actions">
          <a href="#catalog" className="btn btn-primary hero-btn">Explore Gear</a>
          <a href="#how-it-works" className="btn btn-outline hero-btn">See Customization Process</a>
        </div>
      </div>
    </section>
  );
};
