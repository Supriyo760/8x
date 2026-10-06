import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { supabaseService } from '../../services/supabase';
import { promoService } from '../../services/promos';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  ShoppingBag,
  ExternalLink,
  Ban,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  MapPin
} from 'lucide-react';

export const OrdersDashboard: React.FC = () => {
  const { orders, cancelOrder, updateOrderStatus, addToCart, setActiveView, showToast } = useApp();
  const [isSeedingSupabase, setIsSeedingSupabase] = useState(false);
  const [isCreatingPromo, setIsCreatingPromo] = useState(false);
  const [customPromoCode, setCustomPromoCode] = useState('');
  const [customPromoDiscount, setCustomPromoDiscount] = useState('25');
  const [customPromoPrimeOnly, setCustomPromoPrimeOnly] = useState(false);

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'ordered': return 0;
      case 'processing': return 1;
      case 'out_for_delivery': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const STAGES: Array<Order['status']> = ['ordered', 'processing', 'out_for_delivery', 'delivered'];
  const STAGE_LABELS = ['Ordered', 'Processing', 'Out for Delivery', 'Delivered'];

  const handleAdvanceOrder = (order: Order) => {
    const currentIndex = getStepIndex(order.status);
    if (currentIndex < STAGES.length - 1 && currentIndex >= 0) {
      const nextStatus = STAGES[currentIndex + 1];
      updateOrderStatus(order.id, nextStatus);
    }
  };

  const handleSeedDatabase = async () => {
    setIsSeedingSupabase(true);
    const res = await supabaseService.seedProductsToSupabase();
    setIsSeedingSupabase(false);
    if (res.success) {
      showToast(`Successfully synced ${res.count} benchmark products to Supabase!`);
    } else {
      showToast(`Supabase Notice: ${res.error || 'Check table schema'}`);
    }
  };

  const handleSaveCustomPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPromoCode.trim()) return;

    const discountVal = parseInt(customPromoDiscount, 10) || 10;
    const ok = promoService.createCustomPromo({
      code: customPromoCode.trim().toUpperCase(),
      type: 'percentage',
      value: discountVal,
      description: `${discountVal}% off with code ${customPromoCode.trim().toUpperCase()}`,
      requiresPrime: customPromoPrimeOnly,
      isActive: true
    });

    if (ok) {
      showToast(`Custom promo "${customPromoCode.trim().toUpperCase()}" created successfully!`);
      setCustomPromoCode('');
      setIsCreatingPromo(false);
    }
  };

  return (
    <div className="app-container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <button
        onClick={() => setActiveView('home')}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--amazon-link)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginBottom: '1.25rem'
        }}
      >
        <ArrowLeft size={16} />
        <span>Return to shopping</span>
      </button>

      {/* Header & Cloud Control Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f1111' }}>
            Your Orders & Live Shipment Tracker
          </h1>
          <span style={{ fontSize: '0.9rem', color: '#565959' }}>
            {orders.length} order{orders.length !== 1 ? 's' : ''} placed • Live Carrier AMZL Telemetry Active
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsCreatingPromo(!isCreatingPromo)}
            className="btn-secondary btn-press"
            style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <Tag size={14} color="#007185" />
            <span>{isCreatingPromo ? 'Close Promo Creator' : 'Create Custom Coupon'}</span>
          </button>

          <button
            onClick={handleSeedDatabase}
            disabled={isSeedingSupabase}
            className="btn-press"
            style={{
              fontSize: '0.82rem',
              padding: '0.5rem 0.95rem',
              backgroundColor: '#e7f7fc',
              border: '1px solid #007185',
              color: '#007185',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: isSeedingSupabase ? 'wait' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={15} />
            <span>{isSeedingSupabase ? 'Syncing...' : 'Sync Catalog to Supabase Cloud'}</span>
          </button>
        </div>
      </div>

      {/* Dynamic Promo Code Creator Form */}
      {isCreatingPromo && (
        <form
          onSubmit={handleSaveCustomPromo}
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #007185',
            borderRadius: '10px',
            padding: '1.25rem',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 12px rgba(0, 113, 133, 0.1)'
          }}
          className="view-fade-in"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
            <Sparkles size={18} color="#007185" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f1111' }}>
              Create Dynamic Promo Code
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Promo Code Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SPECIAL30"
                value={customPromoCode}
                onChange={(e) => setCustomPromoCode(e.target.value.toUpperCase())}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Discount Percentage (%)
              </label>
              <input
                type="number"
                min={1}
                max={90}
                value={customPromoDiscount}
                onChange={(e) => setCustomPromoDiscount(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1.5rem' }}>
              <input
                type="checkbox"
                id="primeOnly"
                checked={customPromoPrimeOnly}
                onChange={(e) => setCustomPromoPrimeOnly(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#007185' }}
              />
              <label htmlFor="primeOnly" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f1111', cursor: 'pointer' }}>
                Requires Prime Member
              </label>
            </div>
          </div>

          <button type="submit" className="btn-add-cart" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>
            Save & Activate Promo
          </button>
        </form>
      )}

      {orders.length === 0 ? (
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '10px', 
            padding: '3.5rem 1.5rem', 
            textAlign: 'center',
            border: '1px solid var(--amazon-border)'
          }}
        >
          <Package size={52} color="#cbd5e1" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f1111', marginBottom: '0.5rem' }}>
            No orders found
          </h3>
          <p style={{ color: '#565959', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            Looks like you haven't placed an order yet. Select an item and experience the frictionless checkout!
          </p>
          <button
            onClick={() => setActiveView('catalog')}
            className="btn-add-cart"
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map(order => {
            const currentStep = getStepIndex(order.status);
            const isCancelled = order.status === 'cancelled';
            const isDelivered = order.status === 'delivered';

            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: '1px solid var(--amazon-border)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                {/* Order Meta Header */}
                <div 
                  style={{ 
                    backgroundColor: '#f8fafc', 
                    padding: '1rem 1.5rem', 
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    fontSize: '0.82rem'
                  }}
                >
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ color: '#565959', display: 'block' }}>ORDER PLACED</span>
                      <strong style={{ color: '#0f1111' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </strong>
                    </div>

                    <div>
                      <span style={{ color: '#565959', display: 'block' }}>TOTAL</span>
                      <strong style={{ color: '#0f1111' }}>${order.total.toFixed(2)}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#565959', display: 'block' }}>SHIP TO</span>
                      <strong style={{ color: '#007185' }}>{order.shippingAddress.fullName}</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#565959', display: 'block' }}>ORDER # {order.id}</span>
                    <span style={{ color: '#007185', fontWeight: 600 }}>Tracking: {order.trackingNumber}</span>
                  </div>
                </div>

                {/* 4-Stage Shipment Tracking Stepper with Carrier Telemetry */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Truck size={20} color="#007185" />
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: isCancelled ? '#cc0c39' : '#0f1111' }}>
                        {isCancelled 
                          ? 'Order Cancelled' 
                          : isDelivered 
                            ? 'Delivered • Handed to Resident / Front Porch' 
                            : `Estimated Delivery: ${order.estimatedDeliveryDate}`}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {order.promoCodeApplied && (
                        <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#15803d', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                          Code {order.promoCodeApplied} Applied
                        </span>
                      )}

                      {/* Advance Carrier Telemetry Button */}
                      {!isCancelled && !isDelivered && (
                        <button
                          onClick={() => handleAdvanceOrder(order)}
                          className="btn-press"
                          style={{
                            backgroundColor: '#e7f7fc',
                            border: '1px solid #007185',
                            color: '#007185',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          title="Simulate carrier dispatch progress"
                        >
                          <ArrowRight size={13} />
                          <span>Simulate Next Carrier Stage</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {!isCancelled && (
                    <div>
                      <div style={{ position: 'relative', margin: '1rem 0' }}>
                        <div 
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            position: 'relative',
                            zIndex: 2
                          }}
                        >
                          {STAGE_LABELS.map((stage, sIdx) => {
                            const isDone = sIdx <= currentStep;
                            const isCurrent = sIdx === currentStep;

                            return (
                              <div key={stage} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                <div 
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    backgroundColor: isDone ? '#16a34a' : '#e2e8f0',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '0.8rem',
                                    boxShadow: isCurrent ? '0 0 0 4px rgba(22, 163, 74, 0.2)' : 'none'
                                  }}
                                >
                                  {isDone ? <CheckCircle2 size={18} /> : sIdx + 1}
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: isDone ? 700 : 500, color: isDone ? '#0f1111' : '#94a3b8' }}>
                                  {stage}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Connecting Line */}
                        <div 
                          style={{
                            position: 'absolute',
                            top: '16px',
                            left: '5%',
                            right: '5%',
                            height: '3px',
                            backgroundColor: '#e2e8f0',
                            zIndex: 1
                          }}
                        >
                          <div 
                            style={{
                              width: `${(currentStep / (STAGE_LABELS.length - 1)) * 100}%`,
                              height: '100%',
                              backgroundColor: '#16a34a',
                              transition: 'width 0.5s ease'
                            }}
                          />
                        </div>
                      </div>

                      {/* Live GPS / Hub Location Snapshot */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#565959', backgroundColor: '#f8fafc', padding: '6px 12px', borderRadius: '6px', marginTop: '0.75rem' }}>
                        <MapPin size={14} color="#007185" />
                        <span>Carrier: <strong>Amazon Logistics (AMZL)</strong> • Hub: Seattle Metro Sorting Facility (WA) • Telemetry Status: <strong>{STAGE_LABELS[currentStep] || 'In Transit'}</strong></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items in the Order */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {order.items.map((item, iIdx) => (
                    <div 
                      key={iIdx} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        gap: '1rem',
                        paddingBottom: iIdx !== order.items.length - 1 ? '1rem' : 0,
                        borderBottom: iIdx !== order.items.length - 1 ? '1px solid #f1f5f9' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', flexShrink: 0 }}>
                          <img src={item.product.images[0]} alt={item.product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f1111' }}>{item.product.title}</div>
                          <div style={{ fontSize: '0.78rem', color: '#565959' }}>
                            Qty: {item.quantity} {item.selectedVariant && `• ${item.selectedVariant.label}`}
                          </div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f1111' }}>
                            ${((item.product.price + (item.selectedVariant?.priceModifier || 0)) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(item.product, item.selectedVariant, item.quantity);
                        }}
                        className="btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                      >
                        <ShoppingBag size={14} />
                        <span>Buy again</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Footer Actions */}
                <div 
                  style={{ 
                    padding: '0.75rem 1.5rem', 
                    backgroundColor: '#f8fafc', 
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                  }}
                >
                  <button
                    onClick={() => showToast(`Invoice #${order.id}.pdf download initiated`)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--amazon-link)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>View invoice</span>
                    <ExternalLink size={12} />
                  </button>

                  {!isCancelled && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      style={{
                        background: 'none',
                        border: '1px solid #d5d9d9',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        color: '#b12704',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Ban size={13} />
                      <span>Cancel order</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
