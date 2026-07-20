"use client";

import { useEffect, useState } from "react";
import { getUserOrders, deleteUserOrder } from "@/actions/orders";
import { Package, Trash2, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    const data = await getUserOrders();
    setOrders(data);
    setIsLoading(false);
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    
    try {
      await deleteUserOrder(orderId);
      // Optimistic remove
      setOrders(orders.filter(o => o._id !== orderId));
    } catch (e) {
      console.error(e);
      alert("Failed to cancel order");
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium tracking-tight text-gray-900">Order History</h1>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4 bg-gray-50 rounded-3xl border border-gray-100">
          <Package className="w-16 h-16 opacity-20" />
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap gap-6 justify-between items-center">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order Placed</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-sm font-medium text-gray-900">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Ship To</p>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {order.shippingAddress}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Order #</p>
                    <p className="text-sm font-medium text-gray-900">...{order._id.slice(-8)}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-medium text-[#0E5E56] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0E5E56] animate-pulse" />
                    {order.status}
                  </h3>
                  <button 
                    onClick={() => handleCancelOrder(order._id)}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 font-medium bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Cancel Order
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200 shrink-0">
                        {item.product?.imageUrl && (
                          <Image src={item.product.imageUrl} alt="Product" fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.product?.name || item.productId}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} • ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
