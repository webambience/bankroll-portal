import React, { useState, useMemo, useEffect } from 'react';
import type { CatalogItem } from '../../context/InquiryContext';
import { ProductCard } from './ProductCard';
import './CatalogGrid.css';

const PAGE_SIZE = 8;

// Display order by popularity — Pro-Collar first, Polo second, Midlayer third, rest alphabetical
const CATEGORY_ORDER: Record<string, number> = {
  'Pro-Collar': 1,
  'Polo-Collar': 2,
  'Midlayer': 3,
  'Performance Tee': 4,
  'Base Layer': 5,
  'Jacket': 6,
};

const sortByCategory = (a: string, b: string): number => {
  const orderA = CATEGORY_ORDER[a] ?? 99;
  const orderB = CATEGORY_ORDER[b] ?? 99;
  return orderA - orderB;
};

interface CatalogGridProps {
  products: CatalogItem[];
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ products }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  // Reset pagination whenever the filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter]);

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.apparel_type));
    cats.delete('');
    return ['All', ...Array.from(cats).sort(sortByCategory)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const list = activeFilter === 'All'
      ? [...products]
      : products.filter(p => p.apparel_type === activeFilter);
    return list.sort((a, b) => sortByCategory(a.apparel_type, b.apparel_type));
  }, [products, activeFilter]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = filteredProducts.length > visibleCount;

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
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="show-more-container">
          <button
            className="btn btn-secondary show-more-btn"
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
          >
            Show More ({filteredProducts.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <p>No products found for this category.</p>
        </div>
      )}
    </section>
  );
};

