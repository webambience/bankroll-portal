import React, { useState } from 'react';
import { InquiryProvider } from './context/InquiryContext';
import { Navbar } from './components/Layout/Navbar';
import { HowItWorks } from './components/Education/HowItWorks';
import { CatalogGrid } from './components/Catalog/CatalogGrid';
import { InquiryDrawer } from './components/Inquiry/InquiryDrawer';
import { FloatingCTA } from './components/Inquiry/FloatingCTA';
import catalogData from './data/catalog.json';
import './App.css';

const App: React.FC = () => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <InquiryProvider>
      <div className="app-container">
        <Navbar />
        
        <main className="main-content">
          <HowItWorks />
          <CatalogGrid products={catalogData as any} />
        </main>

        <FloatingCTA onOpenInquiry={() => setIsInquiryOpen(true)} />

        <InquiryDrawer 
          isOpen={isInquiryOpen} 
          onClose={() => setIsInquiryOpen(false)} 
        />
        
        <footer className="footer">
          <div className="footer-content">
            <p>BET ON YOURSELF.</p>
            <p className="copyright">&copy; {new Date().getFullYear()} Bank Roll Culture - Premium Billiard Apparel</p>
          </div>
        </footer>
      </div>
    </InquiryProvider>
  );
};

export default App;
