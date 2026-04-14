import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import TableModal from './TableModal';
import FloatingCart from './FloatingCart';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [tableModalOpen, setTableModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar
        onOpenTableModal={() => setTableModalOpen(true)}
        onOpenCart={() => setCartOpen(true)}
      />
      <Breadcrumb />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingCart onClick={() => setCartOpen(true)} cartOpen={cartOpen} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <TableModal isOpen={tableModalOpen} onClose={() => setTableModalOpen(false)} />
    </div>
  );
}
