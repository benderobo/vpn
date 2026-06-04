import { prisma } from "@/lib/prisma";
import AdminPanel from "@/components/AdminPanel";

// Force dynamic rendering since we are fetching from DB directly in Server Component
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Convert dates to strings for passing to Client Component
  const serializedOrders = orders.map(order => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Админ Панель - Заявки</h1>
        <AdminPanel initialOrders={serializedOrders} />
      </div>
    </div>
  );
}
