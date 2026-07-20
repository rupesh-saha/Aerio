"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/types";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL state as the source of truth
  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "All";
  const urlPage = parseInt(searchParams.get("page") || "1", 10);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Local state for the search input to allow debouncing without lag
  const [searchInput, setSearchInput] = useState(urlSearch);
  
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const categories = ["All", "Compact", "Flagship", "Commercial", "Nursery", "Outdoor"];

  const updateUrl = useCallback((newSearch: string, newCategory: string, newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newSearch) params.set("search", newSearch);
    else params.delete("search");
    
    if (newCategory !== "All") params.set("category", newCategory);
    else params.delete("category");
    
    params.set("page", newPage.toString());
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  // Handle Search Input Debounce -> Updates URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== urlSearch) {
        updateUrl(searchInput, urlCategory, 1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, urlSearch, urlCategory, updateUrl]);

  // Fetch data whenever the URL changes
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: urlPage.toString(),
        limit: "6",
      });
      
      if (urlSearch) queryParams.append("search", urlSearch);
      if (urlCategory !== "All") queryParams.append("category", urlCategory);

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${queryParams.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      
      const data = await res.json();
      setProducts(data.data);
      setTotalPages(data.totalPages);
      setTotalItems(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [urlSearch, urlCategory, urlPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6 md:px-12 lg:px-24 text-[#1C1C1E]">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-8xl font-light tracking-tight mb-6">
            Breathe <span className="text-[#0E5E56] font-normal">Better.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">
            Discover our meticulously engineered collection of premium air purifiers, designed to seamlessly blend into your beautiful home.
          </p>
        </header>

        {/* Challenge 1: Basic Task Search & Category Filtering */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-black/5">
          <div className="relative w-full md:w-96 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search air purifiers..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#0E5E56]/20 transition-all text-gray-700"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto relative">
            <Filter className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <select
              value={urlCategory}
              onChange={(e) => updateUrl(urlSearch, e.target.value, 1)}
              className="w-full md:w-48 appearance-none pl-12 pr-10 py-3 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-[#0E5E56]/20 transition-all text-gray-700 cursor-pointer font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="absolute right-4 pointer-events-none">
              <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="min-h-[500px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0E5E56] rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 text-gray-400 bg-white rounded-3xl border border-black/5">
              <p className="text-lg">No purifiers found matching your search.</p>
              <button 
                onClick={() => { setSearchInput(""); updateUrl("", "All", 1); }}
                className="mt-4 text-[#0E5E56] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {products.map((product) => (
                <Link
                  key={product._id}
                  href={`/shop/${product.slug}`}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5"
                >
                  <div className="relative aspect-[4/5] bg-[#F5F5F7] overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-[#1C1C1E]">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-normal tracking-tight">{product.name}</h2>
                      <span className="text-lg font-medium">${product.price}</span>
                    </div>

                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Coverage</p>
                        <p className="text-sm font-medium">{product.specs.coverageSqFt} sq ft</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Noise</p>
                        <p className="text-sm font-medium">{product.specs.noiseLevelDb} dB</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Challenge 3: Server-Side Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center justify-center gap-4">
            <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">
              Showing {(urlPage - 1) * 6 + 1} to {Math.min(urlPage * 6, totalItems)} of {totalItems} items
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateUrl(urlSearch, urlCategory, Math.max(1, urlPage - 1))}
                disabled={urlPage === 1}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => updateUrl(urlSearch, urlCategory, i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${
                      urlPage === i + 1 
                        ? "bg-[#0E5E56] text-white shadow-md" 
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-transparent"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => updateUrl(urlSearch, urlCategory, Math.min(totalPages, urlPage + 1))}
                disabled={urlPage === totalPages}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFBF7] pt-32 flex justify-center"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#0E5E56] rounded-full animate-spin"></div></div>}>
      <ShopContent />
    </Suspense>
  );
}
