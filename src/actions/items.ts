"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5001";

export async function getUserItems() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${API_BASE_URL}/api/items`, {
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

export async function createItem(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const payload = {
    title: formData.get("title")?.toString() || "",
    shortDescription: formData.get("shortDescription")?.toString() || "",
    fullDescription: formData.get("fullDescription")?.toString() || "",
    purchaseDate: formData.get("purchaseDate")?.toString() || "",
    imageUrl: formData.get("imageUrl")?.toString() || "",
  };

  const res = await fetch(`${API_BASE_URL}/api/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": session.user.id
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to create item");
  }

  revalidatePath("/items/manage");
  return { success: true };
}

export async function deleteItem(itemId: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${API_BASE_URL}/api/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "x-user-id": session.user.id
    }
  });

  if (!res.ok) {
    throw new Error("Failed to delete item");
  }

  revalidatePath("/items/manage");
  return { success: true };
}
