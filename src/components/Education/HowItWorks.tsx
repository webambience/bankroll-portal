import React from 'react';
import './HowItWorks.css';
import { FiTarget, FiEdit3, FiSend, FiPackage } from 'react-icons/fi';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <FiTarget size={32} />,
      title: 'Select a Template',
      description: 'Find a base design pattern that fits your brand or team\'s style from our extensive catalog.'
    },
    {
      icon: <FiEdit3 size={32} />,
      title: 'Apply & Customize',
      description: 'Apply the pattern to any apparel type (Pro-Collar, Baselayer, Polo). Customize for your pool team, pool hall, or promotional event.'
    },
    {
      icon: <FiSend size={32} />,
      title: 'Get a Quote',
      description: 'Add designs to your inquiry list and submit a structured request detailing your specific logo or color needs.'
    },
    {
      icon: <FiPackage size={32} />,
      title: 'We Build It',
      description: 'Our team reviews your request, finalized the design with you, and delivers premium gear.'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="hiw-header">
        <h2 className="section-title">How It <span className="text-gradient">Works</span></h2>
        <p className="section-subtitle">We handle the design. You handle the hustle.</p>
      </div>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">0{index + 1}</div>
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
