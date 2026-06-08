import RequestForm from "@/components/RequestForm";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Создайте свой идеальный сайт
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Закажите стильный свадебный альбом, онлайн-приглашение или сайт с историей вашей любви (Лавстори).
            Мы создаем адаптивные сайты, которые идеально выглядят как на ПК, так и на телефонах.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-pink-100 h-48 flex items-center justify-center">
              <span className="text-pink-500 text-5xl">💍</span>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">Свадебный альбом</h3>
              <p className="text-gray-600">Цифровая галерея ваших лучших фотографий со свадьбы.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-blue-100 h-48 flex items-center justify-center">
              <span className="text-blue-500 text-5xl">✉️</span>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">Приглашение</h3>
              <p className="text-gray-600">Стильный сайт-приглашение для гостей с деталями мероприятия и RSVP.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <div className="bg-red-100 h-48 flex items-center justify-center">
              <span className="text-red-500 text-5xl">❤️</span>
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">Лавстори</h3>
              <p className="text-gray-600">Сайт с историей вашего знакомства и развития отношений.</p>
            </div>
          </div>
        </div>

        <div id="order-form" className="flex justify-center">
          <RequestForm />
        </div>
      </div>
    </main>
  );
}
