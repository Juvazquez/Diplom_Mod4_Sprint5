import { useCountriesContext } from "../../contexts/CountriesContext";
import ClipLoader from "react-spinners/ClipLoader";
import CountryCard from "./CountryCard";

function CountryDisplay() {
  const {
    countryData,
    error,
    loading,
    toggleFavorite,
    favorites,
  } = useCountriesContext();

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

  if (!countryData) {
    return (
      <p className="text-center mt-8">
        Ingrese un país para ver la información.
      </p>
    );
  }

  const isFavorite = favorites.some(
    (fav) => fav.cca3 === countryData.cca3 // compara usando el código del país
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <CountryCard
        country={countryData}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default CountryDisplay;
