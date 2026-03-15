import React, { useState } from 'react';
import { useInquiry } from '../../context/InquiryContext';
import { FiX, FiTrash2, FiArrowRight } from 'react-icons/fi';
import './InquiryDrawer.css';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({ isOpen, onClose }) => {
  const { savedItems, removeItem, clearItems } = useInquiry();
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    email: '',
    phone: '',
    quantity: '',
    customizationDetails: ''
  });
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('submitting');
    
    const payload = {
      ...formData,
      savedDesigns: savedItems.map(item => item.item.title)
    };

    try {
      // Simulate API Call storing to DB and triggering notification webhook
      console.log('--- NEW INQUIRY SUBMITTED TO DB ---');
      console.log(JSON.stringify(payload, null, 2));
      console.log('--- NOTIFICATION TRIGGERED TO CLICKUP ---');
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency
      setSubmitState('success');
      clearItems();
      
      // Reset after 3 seconds and close
      setTimeout(() => {
        setSubmitState('idle');
        onClose();
        setFormData({
          organization: '', contactName: '', email: '', phone: '', quantity: '', customizationDetails: ''
        });
      }, 3000);

    } catch (error) {
      setSubmitState('error');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className={`inquiry-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Your Custom Inquiry</h2>
          <button className="close-btn" onClick={onClose}><FiX size={24} /></button>
        </div>

        <div className="drawer-content">
          {submitState === 'success' ? (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h3>Inquiry Received</h3>
              <p>Your request has been logged. Our design team will contact you within 24 hours to discuss next steps.</p>
            </div>
          ) : savedItems.length === 0 ? (
            <div className="empty-cart-state">
              <p>You haven't saved any designs yet.</p>
              <button className="btn btn-primary" onClick={onClose}>Browse Catalog</button>
            </div>
          ) : (
            <div className="inquiry-layout">
              <div className="saved-items-section">
                <h3>Selected Designs ({savedItems.length})</h3>
                <div className="items-list">
                  {savedItems.map(saved => (
                    <div key={saved.cartId} className="cart-item">
                      <img src={saved.item.image_front || saved.item.image_back} alt={saved.item.title} className="cart-item-img" />
                      <div className="cart-item-details">
                        <h4>{saved.item.title}</h4>
                        <span className="cart-item-type">{saved.item.apparel_type}</span>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(saved.cartId)} aria-label="Remove item">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h3>Order Details</h3>
                <form onSubmit={handleSubmit} className="inquiry-form">
                  <div className="form-group">
                    <label>Organization / Team Name</label>
                    <input required name="organization" value={formData.organization} onChange={handleChange} placeholder="e.g. Metro Pool League" />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Contact Name</label>
                      <input required name="contactName" value={formData.contactName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Estimated Quantity</label>
                      <input required name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} placeholder="e.g. 15" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address</label>
                      <input required name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Customization Needs</label>
                    <textarea 
                      required 
                      name="customizationDetails" 
                      value={formData.customizationDetails} 
                      onChange={handleChange} 
                      placeholder="Colors, Logos, Names/Numbers required..."
                      rows={4}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn" 
                    disabled={submitState === 'submitting'}
                  >
                    {submitState === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
                    <FiArrowRight />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
