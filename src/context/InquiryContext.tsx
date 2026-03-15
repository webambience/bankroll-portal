import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  apparel_type: string;
  starting_price: string;
  image_front: string;
  image_back: string;
  source_url: string;
}

export interface SavedItem {
  cartId: string;
  item: CatalogItem;
}

interface InquiryContextType {
  savedItems: SavedItem[];
  saveItem: (item: CatalogItem) => void;
  removeItem: (cartId: string) => void;
  clearItems: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const saveItem = (item: CatalogItem) => {
    setSavedItems((prev) => [...prev, { cartId: uuidv4(), item }]);
  };

  const removeItem = (cartId: string) => {
    setSavedItems((prev) => prev.filter((savedItem) => savedItem.cartId !== cartId));
  };

  const clearItems = () => {
    setSavedItems([]);
  };

  return (
    <InquiryContext.Provider value={{ savedItems, saveItem, removeItem, clearItems }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};
