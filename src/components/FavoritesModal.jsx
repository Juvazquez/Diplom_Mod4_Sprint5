import FavoriteCard from "./FavoriteCard";
import EmptyFavorites from "./EmptyFavorites";
import { useCountriesContext } from "../contexts/CountriesContext";

const FavoritesModal = () => {
  const {
    favorites,
    isOpenModalFavorites,
    handleCloseFavorites,
    removeAllFromFavorites,
    removeFromFavorites,
  } = useCountriesContext();

  if (!isOpenModalFavorites) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
        <button
          onClick={handleCloseFavorites}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
        >
          Cerrar
        </button>
        <button
          onClick={removeAllFromFavorites}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mb-4 ml-2"
        >
          Vaciar favoritos
        </button>

        {favorites.length > 0 ? (
          <ul className="space-y-4">
            {favorites.map((country) => (
              <FavoriteCard
                key={country.cca3} // código único del país
                country={country}  // pasamos el objeto país
                removeFromFavorites={removeFromFavorites}
              />
            ))}
          </ul>
        ) : (
          <EmptyFavorites />
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;
