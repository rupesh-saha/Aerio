import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCart } from "@/actions/cart";
import { getUserOrders } from "@/actions/orders";

export default async function DashboardOverview() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/login");
  }

  const { items: cartItems } = await getCart();
  const orders = await getUserOrders();

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-medium tracking-tight text-gray-900">
          Welcome back, {session.user.name.split(" ")[0]}
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your Aerio devices, orders, and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-2">Cart Status</h3>
          <p className="text-4xl font-light text-gray-900">{totalCartItems}</p>
          <p className="text-sm text-gray-500 mt-1">items waiting for checkout</p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-2">Active Orders</h3>
          <p className="text-4xl font-light text-[#0E5E56]">{orders.length}</p>
          <p className="text-sm text-gray-500 mt-1">recent orders placed</p>
        </div>
      </div>
    </div>
  );
}
