import React, { useState, useEffect } from 'react';
import { InquiryProvider } from './context/InquiryContext';
import { CatalogGrid } from './components/Catalog/CatalogGrid';
import { InquiryDrawer } from './components/Inquiry/InquiryDrawer';
import { FloatingCTA } from './components/Inquiry/FloatingCTA';
import catalogData from './data/catalog.json';
import './App.css';

const App: React.FC = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Tell the WordPress parent iframe how tall we actually are
  useEffect(() => {
    const target = document.querySelector('.app-container');
    if (!target) return;
    const observer = new ResizeObserver(() => {
      const height = target.getBoundingClientRect().height;
      window.parent.postMessage({ type: 'resize', height }, '*');
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <InquiryProvider>
      <div className="app-container">
        <main className="main-content">
          <CatalogGrid products={catalogData as any} />
        </main>

        <FloatingCTA onOpenInquiry={() => setIsInquiryOpen(true)} />

        <InquiryDrawer 
          isOpen={isInquiryOpen} 
          onClose={() => setIsInquiryOpen(false)} 
        />
      </div>
    </InquiryProvider>
  );
};

export default App;

