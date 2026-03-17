import React from 'react';
import { useInquiry } from '../../context/InquiryContext';
import { FiFileText } from 'react-icons/fi';
import './FloatingCTA.css';

interface FloatingCTAProps {
  onOpenInquiry: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenInquiry }) => {
  const { savedItems } = useInquiry();

  // Detect if we're embedded inside a WordPress iframe
  const isInIframe = typeof window !== 'undefined' && window !== window.parent;

  if (savedItems.length === 0) return null;

  return (
    <div className={`floating-cta-container${isInIframe ? ' iframe-mode' : ''}`}>
      <button className="btn btn-primary floating-cta-btn" onClick={onOpenInquiry}>
        <div className="cta-icon-wrapper">
          <FiFileText size={20} />
          <span className="cta-badge">{savedItems.length}</span>
        </div>
        <span className="cta-text">Submit Customization Inquiry ({savedItems.length} Added)</span>
      </button>
    </div>
  );
};
