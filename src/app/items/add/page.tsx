import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createItem } from "@/actions/items";
import { ShieldCheck, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AddItemPage() {
  // 1. STRICT ROUTE PROTECTION
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/items/manage" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#0E5E56] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to My Items
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/5">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-6 h-6 text-[#0E5E56]" />
            <h1 className="text-2xl font-medium tracking-tight text-gray-900">Warranty Registration</h1>
          </div>
          <p className="text-gray-500 mb-8">Register your purchased Aerio items to activate your warranty.</p>

          {/* 2. THE FORM */}
          <form action={createItem} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Device Model (Title)</label>
              <select 
                id="title"
                name="title" 
                required
                defaultValue="" 
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#0E5E56]/20 focus:ring-2 focus:ring-[#0E5E56]/10 outline-none transition-all text-gray-700 appearance-none cursor-pointer"
              >
                <option value="" disabled>Select a device model...</option>
                <option value="Aerio Nano">Aerio Nano</option>
                <option value="Aerio Core">Aerio Core</option>
                <option value="Aerio Max">Aerio Max</option>
                <option value="Aerio Pro">Aerio Pro</option>
                <option value="Aerio Nursery">Aerio Nursery</option>
                <option value="Aerio Outdoor">Aerio Outdoor</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="shortDescription" className="text-sm font-medium text-gray-700">Purchased From (Short Description)</label>
              <input 
                type="text" 
                id="shortDescription"
                name="shortDescription" 
                placeholder="e.g. Amazon, Best Buy, or Aerio Store" 
                required 
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#0E5E56]/20 focus:ring-2 focus:ring-[#0E5E56]/10 outline-none transition-all text-gray-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="fullDescription" className="text-sm font-medium text-gray-700">Serial Number (Full Description)</label>
              <textarea 
                id="fullDescription"
                name="fullDescription" 
                placeholder="Enter the 12-digit serial number found on the bottom of the device..." 
                rows={4}
                required 
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#0E5E56]/20 focus:ring-2 focus:ring-[#0E5E56]/10 outline-none transition-all text-gray-700 resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="purchaseDate" className="text-sm font-medium text-gray-700">Date of Purchase</label>
              <input 
                type="date" 
                id="purchaseDate"
                name="purchaseDate" 
                required 
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#0E5E56]/20 focus:ring-2 focus:ring-[#0E5E56]/10 outline-none transition-all text-gray-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">Receipt Photo (Optional Image URL)</label>
              <input 
                type="url" 
                id="imageUrl"
                name="imageUrl" 
                placeholder="https://..." 
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-[#0E5E56]/20 focus:ring-2 focus:ring-[#0E5E56]/10 outline-none transition-all text-gray-700"
              />
            </div>

            {/* 3. SUBMIT BUTTON */}
            <button 
              type="submit" 
              className="mt-4 flex items-center justify-center gap-2 w-full py-4 bg-[#0E5E56] hover:bg-[#0A4A43] text-white rounded-xl font-medium transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              Submit Registration
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
