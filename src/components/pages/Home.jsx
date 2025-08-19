import CountriesSouthAmericanList from "./CountriesSouthAmericanList";
import SearchCountryForm from "./SearchCountryForm";
import CountryDisplay from "./CountryDisplay"; 

function Home() {
  return (
    <section className="min-h-screen bg-[#1d1b3a] flex flex-col items-center justify-center px-4 text-white">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Bienvenido a Mi País
      </h1>
      <p className="text-lg text-white mb-6">
        Consultá información en tiempo real de tus países favoritos del mundo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-5xl">
        <div className="bg-[#2a275b] p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">🌍 Información General</h2>
          <p className="text-gray-300 text-sm">
            Obtené datos clave sobre población, capital, idioma y más.
          </p>
        </div>
        <div className="bg-[#2a275b] p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">🔎 Buscá Países</h2>
          <p className="text-gray-300 text-sm">
            Ingresá el nombre de cualquier país y descubrí sus datos al instante.
          </p>
        </div>
        <div className="bg-[#2a275b] p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold mb-2">❤️ Favoritos</h2>
          <p className="text-gray-300 text-sm">
            Guardá tus países preferidos para acceder rápido a su información.
          </p>
        </div>
      </div>

      <SearchCountryForm />
      <CountryDisplay />

      <h2 className="text-2xl font-bold mt-12 mb-4 text-white">
        🌎 Países de Sudamérica
      </h2>
      <CountriesSouthAmericanList />
    </section>
  );
}

export default Home;
