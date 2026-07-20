"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/auth";
import { headers } from "next/headers";
import { Product } from "@/types";
import { ObjectId } from "mongodb";

export type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
};

export type Cart = {
  _id?: string;
  userId: string;
  items: CartItem[];
};

export async function getCart() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    return { items: [] };
  }

  const cartCollection = db.collection<Cart>("carts");
  const cart = await cartCollection.findOne({ userId: session.user.id });

  if (!cart) {
    return { items: [] };
  }

  // Populate product details for the UI
  const productCollection = db.collection<Product>("products");
  const populatedItems = await Promise.all(
    cart.items.map(async (item) => {
      // In MongoDB, Product _id is ObjectId, so we need to fetch it correctly. 
      // The _id might be a string in typescript but ObjectId in DB.
      let pId;
      try { pId = new ObjectId(item.productId); } catch (e) { pId = item.productId; }
      
      const product = await productCollection.findOne({ _id: pId as any });
      return {
        ...item,
        product: product ? { ...product, _id: product._id.toString() } : undefined,
      };
    })
  );

  return { items: populatedItems };
}

export async function addToCart(productId: string, price: number, quantity: number = 1) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cartCollection = db.collection<Cart>("carts");
  
  const existingCart = await cartCollection.findOne({ userId: session.user.id });

  if (existingCart) {
    const itemIndex = existingCart.items.findIndex(i => i.productId === productId);
    if (itemIndex > -1) {
      existingCart.items[itemIndex].quantity += quantity;
    } else {
      existingCart.items.push({ productId, price, quantity });
    }
    
    await cartCollection.updateOne(
      { userId: session.user.id },
      { $set: { items: existingCart.items } }
    );
  } else {
    await cartCollection.insertOne({
      userId: session.user.id,
      items: [{ productId, price, quantity }]
    });
  }

  return { success: true };
}

export async function removeFromCart(productId: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cartCollection = db.collection<Cart>("carts");
  
  await cartCollection.updateOne(
    { userId: session.user.id },
    { $pull: { items: { productId } } } as any
  );

  return { success: true };
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cartCollection = db.collection<Cart>("carts");
  
  if (quantity <= 0) {
    return removeFromCart(productId);
  }

  const existingCart = await cartCollection.findOne({ userId: session.user.id });
  if (existingCart) {
    const itemIndex = existingCart.items.findIndex(i => i.productId === productId);
    if (itemIndex > -1) {
      existingCart.items[itemIndex].quantity = quantity;
      await cartCollection.updateOne(
        { userId: session.user.id },
        { $set: { items: existingCart.items } }
      );
    }
  }

  return { success: true };
}

export async function checkoutCart() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const { items } = await getCart();
  if (!items || items.length === 0) {
    throw new Error("Cart is empty");
  }

  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Call the aerio-server to create an order
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": session.user.id
    },
    body: JSON.stringify({
      items,
      totalAmount,
      shippingAddress: "Premium Member Address" // Demo address
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  // Clear the cart
  const cartCollection = db.collection<Cart>("carts");
  await cartCollection.updateOne(
    { userId: session.user.id },
    { $set: { items: [] } }
  );

  return { success: true };
}
