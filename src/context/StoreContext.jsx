import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { PRODUCTS } from '../data/products';

// Global shop state: cart, wishlist, orders, toasts — all persisted to localStorage.
const StoreContext = createContext(null);

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read('forge_cart', [])); // [{id, qty}]
  const [wishlist, setWishlist] = useState(() => read('forge_wishlist', [])); // [id]
  const [orders, setOrders] = useState(() => read('forge_orders', [])); // [order]
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  useEffect(() => { localStorage.setItem('forge_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('forge_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('forge_orders', JSON.stringify(orders)); }, [orders]);

  const toast = (msg) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };

  const productById = (id) => PRODUCTS.find((p) => p.id === id);

  const addToCart = (id, qty = 1, silent = false) => {
    setCart((c) => {
      const found = c.find((i) => i.id === id);
      if (found) return c.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...c, { id, qty }];
    });
    if (!silent) toast('Added to cart');
  };

  const setQty = (id, qty) => {
    setCart((c) =>
      qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  const removeFromCart = (id) => {
    setCart((c) => c.filter((i) => i.id !== id));
    toast('Removed from cart');
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (id) => {
    setWishlist((w) => {
      if (w.includes(id)) {
        toast('Removed from wishlist');
        return w.filter((x) => x !== id);
      }
      toast('Saved to wishlist');
      return [...w, id];
    });
  };

  const moveToCart = (id) => {
    addToCart(id, 1, true);
    setWishlist((w) => w.filter((x) => x !== id));
    toast('Moved to cart');
  };

  const placeOrder = (order) => {
    setOrders((o) => [order, ...o]);
    setCart([]);
  };

  const cartDetailed = useMemo(
    () =>
      cart
        .map((i) => ({ ...i, product: productById(i.id) }))
        .filter((i) => i.product),
    [cart]
  );

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartValue = useMemo(
    () => cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cartDetailed]
  );

  const value = {
    cart, cartDetailed, cartCount, cartValue,
    wishlist, orders, toasts,
    addToCart, setQty, removeFromCart, clearCart,
    toggleWishlist, moveToCart, placeOrder, toast, productById,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
