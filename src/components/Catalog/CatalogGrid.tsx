import React, { useState, useMemo } from 'react';
import type { CatalogItem } from '../../context/InquiryContext';
import { ProductCard } from './ProductCard';
import './CatalogGrid.css';

interface CatalogGridProps {
  products: CatalogItem[];
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ products }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.apparel_type));
    // Remove empty categories if any exist
    cats.delete('');
    return ['All', ...Array.from(cats)].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'All') return products;
    return products.filter(p => p.apparel_type === activeFilter);
  }, [products, activeFilter]);

  return (
    <section id="catalog" className="catalog-section">
      <div className="catalog-header">
        <h2 className="section-title">The <span className="text-gradient">Catalog</span></h2>
        <p className="section-subtitle">Select your base. Customize everything.</p>
      </div>

      <div className="filter-container">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <p>No products found for this category.</p>
        </div>
      )}
    </section>
  );
};
