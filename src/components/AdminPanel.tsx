"use client";

import { useState } from "react";

type Order = {
  id: number;
  template: string;
  previews: string;
  questionnaire: string;
  status: string;
  createdAt: string;
};

export default function AdminPanel({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const forwardOrder = async (id: number) => {
    setLoadingId(id);
    try {
      const res = await fetch("/api/forward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: id }),
      });

      if (!res.ok) throw new Error("Failed to forward");



      // Update local state
      setOrders(orders.map(o => o.id === id ? { ...o, status: "forwarded" } : o));
      alert("Успешно отправлено агентам!");
    } catch (err: unknown) {
      alert("Ошибка при отправке: " + (err as Error).message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Шаблон</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Детали</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Статус</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Действие</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => {
            const quest = JSON.parse(order.questionnaire || "{}");
            const previews = JSON.parse(order.previews || "[]");

            return (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4 font-medium">{order.template}</td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    <span className="font-semibold">Имя:</span> {quest.name} <br />
                    <span className="font-semibold">Инфо:</span> {quest.details} <br />
                    <span className="font-semibold">Превью:</span> {previews.length} ссылок
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === "forwarded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => forwardOrder(order.id)}
                    disabled={loadingId === order.id || order.status === "forwarded"}
                    className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 disabled:bg-gray-400"
                  >
                    {loadingId === order.id ? "Отправка..." : order.status === "forwarded" ? "Отправлено" : "Отправить AI"}
                  </button>
                </td>
              </tr>
            );
          })}
          {orders.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-500">
                Заявок пока нет
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
