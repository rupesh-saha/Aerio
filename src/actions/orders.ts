"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5001";

export async function getUserOrders() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${API_BASE_URL}/api/orders`, {
    headers: {
      "x-user-id": session.user.id
    },
    cache: "no-store"
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function deleteUserOrder(orderId: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      "x-user-id": session.user.id
    }
  });

  if (!res.ok) {
    throw new Error("Failed to delete order");
  }

  return { success: true };
}
