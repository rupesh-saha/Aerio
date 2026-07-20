import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Product } from "@/types";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ChevronLeft } from "lucide-react";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${slug}`, {
      next: { revalidate: 60 },
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch product");
    }
    
    return res.json();
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.slug);
  if (!product) return { title: "Not Found | Aerio" };
  
  return {
    title: `${product.name} | Aerio`,
    description: product.description,
  };
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1C1E]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side: Sticky Image Gallery */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:sticky top-0 bg-[#F5F5F7] flex items-center justify-center p-8 pt-36 lg:p-24 lg:pt-36 overflow-hidden relative">
          <Link href="/shop" className="absolute top-32 lg:top-36 left-8 lg:left-12 flex items-center text-sm font-medium hover:opacity-60 transition-opacity z-10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Shop
          </Link>
          <div className="relative w-full max-w-lg aspect-square lg:aspect-[3/4] mt-8 lg:mt-0">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain lg:object-cover rounded-2xl shadow-2xl"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 md:p-16 lg:p-32">
          <div className="max-w-xl">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#0E5E56]/10 text-[#0E5E56] text-xs font-semibold uppercase tracking-wider rounded-full mb-6">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-light text-gray-500 mb-8">
                ${product.price}
              </p>
            </div>

            <p className="text-lg text-gray-600 font-light leading-relaxed mb-12">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12 p-8 bg-white rounded-3xl shadow-sm border border-black/5">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Coverage</p>
                <p className="text-xl font-normal">{product.specs.coverageSqFt} <span className="text-sm text-gray-500">sq ft</span></p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Noise Level</p>
                <p className="text-xl font-normal">{product.specs.noiseLevelDb} <span className="text-sm text-gray-500">dB</span></p>
              </div>
              <div className="col-span-2 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Filtration System</p>
                <p className="text-lg font-normal">{product.specs.filterType}</p>
              </div>
            </div>

            <div className="sticky bottom-8 z-10 pt-4 pb-2 bg-[#FDFBF7]/80 backdrop-blur-xl">
              <AddToCartButton productId={product._id} price={product.price} />
              <p className="text-center text-xs text-gray-400 mt-4">
                Free shipping. 30-day risk-free trial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
