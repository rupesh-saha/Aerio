import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, Settings, LogOut, ShieldCheck } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-12 flex justify-center">
      <div className="w-full max-w-6xl px-6 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 sticky top-32">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-6 px-4">
              My Account
            </h2>
            <nav className="flex flex-col gap-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 hover:text-[#0E5E56] transition-colors font-medium">
                <LayoutDashboard className="w-5 h-5" /> Overview
              </Link>
              <Link href="/dashboard/cart" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 hover:text-[#0E5E56] transition-colors font-medium">
                <ShoppingBag className="w-5 h-5" /> Manage Cart
              </Link>
              <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 hover:text-[#0E5E56] transition-colors font-medium">
                <Package className="w-5 h-5" /> Order History
              </Link>
              <Link href="/items/manage" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 hover:text-[#0E5E56] transition-colors font-medium">
                <ShieldCheck className="w-5 h-5" /> Warranty Items
              </Link>
              <div className="my-2 border-t border-gray-100" />
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 transition-colors font-medium opacity-50 cursor-not-allowed pointer-events-none">
                <Settings className="w-5 h-5" /> Settings
              </Link>
              <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-medium text-left mt-2">
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-black/5 min-h-[600px]">
          {children}
        </main>
        
      </div>
    </div>
  );
}
