"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart as serverAddToCart, removeFromCart as serverRemoveFromCart, CartItem } from "@/actions/cart";
import { useSession } from "@/lib/auth-client";

interface CartContextType {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  items: CartItem[];
  itemCount: number;
  addToCart: (productId: string, price: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      setIsLoading(true);
      getCart().then((cart) => {
        setItems(cart.items as any);
        setIsLoading(false);
      });
    } else {
      setItems([]);
      setIsLoading(false);
    }
  }, [session?.user?.id]);

  const addToCart = async (productId: string, price: number, quantity = 1) => {
    // Optimistic UI update
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) => 
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { productId, price, quantity }];
    });
    
    setIsCartOpen(true); // Auto-open cart

    // Server update
    await serverAddToCart(productId, price, quantity);
    
    // Refresh to get full product details
    const cart = await getCart();
    setItems(cart.items as any);
  };

  const removeFromCart = async (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
    await serverRemoveFromCart(productId);
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    
    // Optimistic UI update
    setItems((prev) => prev.map((item) => 
      item.productId === productId ? { ...item, quantity } : item
    ));

    // Server update
    const { updateCartItemQuantity } = await import("@/actions/cart");
    await updateCartItemQuantity(productId, quantity);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      isCartOpen,
      setIsCartOpen,
      items,
      itemCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
