import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchAllCountries, deleteCountryAPI, fetchCountries } from "../services/countriesAPI";


const useCountries = () => {
  // Estado para un país único
  const [countryData, setCountryData] = useState(null);

  // Estado para listas de países
  const [countriesData, setCountriesData] = useState([]);

  // Lista de países destacados
  const [featuredCountriesData, setFeaturedCountriesData] = useState([]);

  // Control de carga y errores
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Favoritos
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("countryFavorites")) || [];
  });

  const [isOpenModalFavorites, setIsOpenModalFavorites] = useState(false);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("countryFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Obtener datos de un país
  const getCountry = async (countryName) => {
    setCountryData(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetchCountries(countryName);
      setCountryData(response);
      toast.success(`País encontrado: ${response.nombreComun}`, {
        autoClose: 3000,
      });
    } catch (err) {
      setError(err.message);
      toast.error("No se pudo obtener el país");
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedCountries = async () => {
    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        featuredCountries.map((name) => fetchCountries(name))
      );
      setFeaturedCountriesData(responses.map((res) => res[0]));
    } catch (err) {
      setError("Error al obtener países destacados");
      toast.error("No se pudieron cargar los países destacados");
    } finally {
      setLoading(false);
    }
  };

  // Obtener países de Sudamérica
  const getSouthAmericanCountries = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetchAllCountries();
    setCountriesData(response);
  } catch (err) {
    setError("Error al obtener los países de Sudamérica");
    toast.error("No se pudieron cargar los países de Sudamérica");
  } finally {
    setLoading(false);
  }
};

  // Agregar o quitar favoritos
  const toggleFavorite = (country) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.cca3 === country.cca3);
      const updated = exists
        ? prev.filter((fav) => fav.cca3 !== country.cca3)
        : [...prev, country];

      toast[exists ? "info" : "success"](
        exists
          ? `${country.name.common} eliminado de favoritos`
          : `${country.name.common} agregado a favoritos`
      );

      return updated;
    });
  };

  const handleOpenModalFavorites = () => setIsOpenModalFavorites(true);
  const handleCloseFavorites = () => setIsOpenModalFavorites(false);

  const removeAllFromFavorites = () => {
    setFavorites([]);
    toast.info("Se vaciaron los favoritos");
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.cca3 !== id));
    toast.info("País eliminado de favoritos");
  };
  
  const isFavorite = (country) => favorites.some(fav => fav.cca3 === country.cca3);
  
  const deleteCountry = async (id) => {
    setLoading(true);
    try {
      await deleteCountryAPI(id);
      setCountriesData((prev) => prev.filter((country) => country._id !== id));
    } catch (error) {
      console.error("Error deleting country:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    countryData,            // un solo país
    countriesData,          // lista de países
    featuredCountriesData,  // países destacados
    loading,
    error,
    getCountry,
    getFeaturedCountries,
    getSouthAmericanCountries,
    favorites,
    toggleFavorite,
    removeAllFromFavorites,
    removeFromFavorites,
    isOpenModalFavorites,
    handleOpenModalFavorites,
    handleCloseFavorites,
    isFavorite,
    deleteCountry
  };
};

export default useCountries;
