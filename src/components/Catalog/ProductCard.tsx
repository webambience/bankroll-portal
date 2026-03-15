import React, { useState } from 'react';
import type { CatalogItem } from '../../context/InquiryContext';
import { useInquiry } from '../../context/InquiryContext';
import { FiPlus, FiCheck } from 'react-icons/fi';
import './ProductCard.css';

interface ProductCardProps {
  product: CatalogItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { saveItem } = useInquiry();

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    saveItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const hasBackImage = Boolean(product.image_back) && product.image_back !== "" && product.image_back !== " " && product.image_back !== product.image_front;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image_front} 
          alt={product.title} 
          className={`product-image ${hasBackImage ? 'front-image' : ''}`}
          loading="lazy"
        />
        {hasBackImage && (
          <img 
            src={product.image_back} 
            alt={`${product.title} Back`} 
            className="product-image back-image"
            loading="lazy"
          />
        )}
        <div className="product-category-badge">{product.apparel_type}</div>
        
        <button 
          className={`btn btn-primary save-btn ${isAdded ? 'added' : ''}`}
          onClick={handleSave}
          aria-label="Add to Inquiry"
        >
          {isAdded ? <FiCheck size={20} /> : <FiPlus size={20} />}
          <span className="save-btn-text">{isAdded ? 'Added' : 'Add to Inquiry'}</span>
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">Starting at ${product.starting_price}</p>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
};
