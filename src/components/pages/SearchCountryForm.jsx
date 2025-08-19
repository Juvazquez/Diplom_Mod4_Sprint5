import { useState, useEffect } from "react";
import { useCountriesContext } from "../../contexts/CountriesContext";
import { Search } from "lucide-react";

function SearchCountryForm() {
  const [country, setCountry] = useState("");
  const { getCountry } = useCountriesContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country.trim()) {
      alert("Por favor, ingrese un país válido.");
      return;
    }
    getCountry(country);
  };

  useEffect(() => {
    getCountry("Argentina");
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center my-6"
    >
      <div className="relative w-full max-w-xl">
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Buscar país..."
          className="w-full p-3 pr-12 rounded-full border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}

export default SearchCountryForm;
