import { useEffect } from "react";
import { useCountriesContext } from "../../contexts/CountriesContext";
import ClipLoader from "react-spinners/ClipLoader";
import CountryCard from "./CountryCard";

const CountriesSouthAmericanList = () => {
  const {
    countriesData,
    getSouthAmericanCountries,
    loading,
    error,
    toggleFavorite,
    favorites,
  } = useCountriesContext();

  // Cargar datos al montar el componente
  useEffect(() => {
    getSouthAmericanCountries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-12">
        <ClipLoader color="blue" loading={loading} size={150} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-8">{error}</p>;
  }

  if (
    !Array.isArray(countriesData) ||
    countriesData.length === 0
  ) {
    return <p className="text-center mt-8">No hay datos para mostrar.</p>;
  }

  // Ordenar países por población de mayor a menor
  const sorted = [...countriesData].sort(
    (a, b) => b.population - a.population
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-10 max-w-6xl mx-auto">
      {sorted.map((country) => {
        const isFavorite = favorites.some((fav) => fav.cca3 === country.cca3); // cca3 es un id único de país
        return (
          <CountryCard
            key={country.cca3}
            country={country}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        );
      })}
    </div>
  );
};

export default CountriesSouthAmericanList;
