import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { GlobalHeader } from './components/navigation/GlobalHeader';
import { GlobalFooter } from './components/navigation/GlobalFooter';
import { DeliveryModal } from './components/navigation/DeliveryModal';
import { HeroCarousel } from './components/home/HeroCarousel';
import { CategoryGridCards } from './components/home/CategoryGridCards';
import { DealsSlider } from './components/home/DealsSlider';
import { CatalogView } from './components/catalog/CatalogView';
import { ProductDetailView } from './components/pdp/ProductDetailView';
import { CartView } from './components/checkout/CartView';
import { CartDrawer } from './components/checkout/CartDrawer';
import { OrdersDashboard } from './components/checkout/OrdersDashboard';
import { ComparisonDock } from './components/overlays/ComparisonDock';
import { ComparisonModal } from './components/overlays/ComparisonModal';
import { QuickPeekDrawer } from './components/overlays/QuickPeekDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { Toast } from './components/common/Toast';

const MainContent: React.FC = () => {
  const { activeView, selectedProduct } = useApp();

  return (
    <main style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <div key={activeView} className="view-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {activeView === 'home' && (
          <>
            <HeroCarousel />
            <CategoryGridCards />
            <DealsSlider />
          </>
        )}

        {activeView === 'catalog' && <CatalogView />}

        {activeView === 'pdp' && (
          selectedProduct ? <ProductDetailView product={selectedProduct} /> : <CatalogView />
        )}

        {activeView === 'cart' && <CartView />}

        {activeView === 'orders' && <OrdersDashboard />}
      </div>

      {/* Global Overlays */}
      <ComparisonDock />
      <ComparisonModal />
      <QuickPeekDrawer />
      <CartDrawer />
      <DeliveryModal />
      <AuthModal />
      <Toast />
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
        <GlobalHeader />
        <MainContent />
        <GlobalFooter />
      </div>
    </AppProvider>
  );
}
