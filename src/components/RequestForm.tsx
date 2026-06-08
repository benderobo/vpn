"use client";

import { useState } from "react";

export default function RequestForm() {
  const [template, setTemplate] = useState("Свадебный альбом");
  const [previewFiles, setPreviewFiles] = useState<string>("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template,
          previews: previewFiles.split(",").map((s) => s.trim()).filter(Boolean),
          questionnaire: { name, details },
        }),
      });

      if (!res.ok) {
        throw new Error("Ошибка при отправке заявки");
      }

      setStatus("success");
      setTemplate("Свадебный альбом");
      setPreviewFiles("");
      setName("");
      setDetails("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage((err as Error).message || "Неизвестная ошибка");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Оставить заявку</h2>

      {status === "success" && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 text-center">
          Ваша заявка успешно отправлена! Мы скоро свяжемся с вами.
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
            Выберите шаблон
          </label>
          <select
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 border"
            required
          >
            <option value="Свадебный альбом">Свадебный альбом</option>
            <option value="Приглашение">Приглашение на свадьбу</option>
            <option value="Лавстори">Лавстори</option>
          </select>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Ваше Имя / Контакт
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Например, Анна (Telegram: @anna)"
            className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 border"
            required
          />
        </div>

        <div>
          <label htmlFor="previewFiles" className="block text-sm font-medium text-gray-700 mb-1">
            Ссылки на фото/превью (через запятую)
          </label>
          <input
            id="previewFiles"
            type="text"
            value={previewFiles}
            onChange={(e) => setPreviewFiles(e.target.value)}
            placeholder="https://disk.yandex.ru/..., https://..."
            className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 border"
          />
          <p className="text-xs text-gray-500 mt-1">Прикрепите ссылки на облако с вашими фотографиями.</p>
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
            Дополнительные детали (Анкета)
          </label>
          <textarea
            id="details"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Опишите ваши пожелания, имена молодоженов, дату мероприятия и т.д."
            className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 border"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {status === "submitting" ? "Отправка..." : "Оставить заявку"}
        </button>
      </form>
    </div>
  );
}
