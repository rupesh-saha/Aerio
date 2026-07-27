"use server";

import { db } from "@/lib/auth";
import type { Product } from "@/types";

const fallbackProducts: Product[] = [
  {
    _id: "aerio-pro",
    name: "Aerio Pro",
    slug: "aerio-pro",
    description: "Maximum coverage for large living spaces up to 1,200 sq ft.",
    price: 599,
    category: "air-purifier",
    imageUrl: "/aerio-pro.png",
    rating: 5,
    reviewCount: 120,
    inStock: true,
    specs: { coverageSqFt: 1200, noiseLevelDb: 22, filterType: "HEPA 14" }
  },
  {
    _id: "aerio-classic",
    name: "Aerio",
    slug: "aerio",
    description: "The original perfect balance for bedrooms and studies.",
    price: 399,
    category: "air-purifier",
    imageUrl: "/aerio.png",
    rating: 4.8,
    reviewCount: 340,
    inStock: true,
    specs: { coverageSqFt: 600, noiseLevelDb: 18, filterType: "HEPA 13" }
  },
  {
    _id: "aerio-mini",
    name: "Aerio Mini",
    slug: "aerio-mini",
    description: "Compact design for personal spaces and nurseries.",
    price: 249,
    category: "air-purifier",
    imageUrl: "/aerio-mini.png",
    rating: 4.9,
    reviewCount: 85,
    inStock: true,
    specs: { coverageSqFt: 250, noiseLevelDb: 15, filterType: "HEPA 13" }
  }
];

export async function getProducts(): Promise<Product[]> {
  try {
    const productsCollection = db.collection<Product>("products");
    const count = await productsCollection.countDocuments();

    if (count === 0) {
      // Seed default products if collection is empty
      const { ...seedData } = fallbackProducts;
      await productsCollection.insertMany(fallbackProducts as any);
    }

    const products = await productsCollection.find({}).toArray();
    
    // Map _id to string for client component serialization
    return products.map(p => ({
      ...p,
      _id: p._id.toString()
    }));
  } catch (error) {
    console.error("Failed to fetch products from MongoDB:", error);
    // Fallback to defaults if DB fails to connect
    return fallbackProducts;
  }
}
