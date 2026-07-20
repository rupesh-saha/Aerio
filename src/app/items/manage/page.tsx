"use client";

import { useEffect, useState } from "react";
import { getUserItems, deleteItem } from "@/actions/items";
import { ShieldCheck, Plus, Trash2, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ManageItemsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const data = await getUserItems();
      setItems(data);
    } catch (error) {
      // If unauthorized, the action will throw, or we can just redirect
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to remove this warranty registration?")) return;
    try {
      await deleteItem(itemId);
      setItems(items.filter(item => item._id !== itemId));
    } catch (e) {
      alert("Failed to delete item.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0E5E56] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-8 h-8 text-[#0E5E56]" />
              <h1 className="text-3xl font-medium tracking-tight text-gray-900">My Registered Items</h1>
            </div>
            <p className="text-gray-500">Manage your device warranties and registrations.</p>
          </div>
          <Link 
            href="/items/add"
            className="flex items-center gap-2 px-6 py-3 bg-[#0E5E56] hover:bg-[#0A4A43] text-white rounded-full font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Register New Device
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400 gap-4 bg-white rounded-3xl border border-black/5 shadow-sm">
            <ShieldCheck className="w-16 h-16 opacity-20" />
            <p className="text-lg">You have no registered devices yet.</p>
            <Link href="/items/add" className="text-[#0E5E56] font-medium hover:underline mt-2">
              Register a device now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
                {item.imageUrl ? (
                  <div className="relative h-48 bg-gray-100 border-b border-gray-100">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-32 bg-gray-50 border-b border-gray-100 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-gray-300" />
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium text-gray-900">{item.title}</h3>
                  </div>
                  
                  <div className="mb-6 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Purchased From</p>
                      <p className="text-sm text-gray-700">{item.shortDescription}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Serial Number</p>
                      <p className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded inline-block">{item.fullDescription}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Purchase Date</p>
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(item.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs font-medium bg-[#0E5E56]/10 text-[#0E5E56] px-3 py-1 rounded-full">
                      Warranty Active
                    </span>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove Registration"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
