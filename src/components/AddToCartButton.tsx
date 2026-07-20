"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "./CartContext";

interface AddToCartButtonProps {
  productId: string;
  price: number;
}

export function AddToCartButton({ productId, price }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { addToCart } = useCart();

  const handleAdd = async () => {
    if (!session.data) {
      router.push(`/login?callbackURL=${encodeURIComponent(pathname)}`);
      return;
    }

    if (added) return;
    setIsAdding(true);
    
    await addToCart(productId, price, 1);
    
    setIsAdding(false);
    setAdded(true);
    
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdding || added}
      className={`relative w-full overflow-hidden rounded-full py-4 px-8 flex items-center justify-center font-medium text-lg transition-colors duration-300 ${
        added ? "bg-[#0E5E56] text-white" : "bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white"
      }`}
    >
      <AnimatePresence mode="wait">
        {!isAdding && !added && (
          <motion.div
            key="add"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <span>Add to Cart</span>
            <span className="text-white/50 px-2">•</span>
            <span>${price}</span>
          </motion.div>
        )}
        
        {isAdding && (
          <motion.div
            key="adding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center space-x-2"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <ShoppingBag className="w-5 h-5" />
            </motion.div>
            <span>Adding...</span>
          </motion.div>
        )}
        
        {added && (
          <motion.div
            key="added"
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-2"
          >
            <Check className="w-5 h-5" />
            <span>Added to Cart</span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
