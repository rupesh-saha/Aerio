"use client";

import { useCart } from "@/components/CartContext";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { checkoutCart } from "@/actions/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartManagementPage() {
  const { items, removeFromCart, updateQuantity, isLoading, setIsCartOpen } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await updateQuantity(productId, quantity);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await checkoutCart();
      setIsCartOpen(false);
      router.push("/dashboard/orders");
    } catch (e) {
      console.error(e);
      alert("Failed to checkout. Cart might be empty.");
      setIsCheckingOut(false);
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading cart...</div>;
  }

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-gray-900">Manage Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4 bg-gray-50 rounded-3xl border border-gray-100">
          <ShoppingBag className="w-16 h-16 opacity-20" />
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 items-center">
                <div className="relative w-24 h-24 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                  {item.product?.imageUrl && (
                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-lg">{item.product?.name || 'Loading...'}</h3>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
                  <button 
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center font-medium text-gray-700">{item.quantity}</span>
                  <button 
                    onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="w-24 text-right">
                  <p className="font-medium text-gray-900 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button
                  onClick={() => {
                    removeFromCart(item.productId);
                    setTimeout(() => router.refresh(), 300); // give context time to sync
                  }}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8 flex flex-col items-end">
            <div className="flex justify-between w-full max-w-sm mb-4 text-lg text-gray-700">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full max-w-sm py-4 bg-[#0E5E56] hover:bg-[#0A4A43] text-white rounded-full font-medium transition-colors shadow-md disabled:opacity-50"
            >
              {isCheckingOut ? "Processing Checkout..." : "Simulate Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
