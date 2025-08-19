import React from "react";

const FavoriteCard = ({ country, removeFromFavorites }) => {
  return (
    <li className="bg-gray-400 text-black p-4 mb-2 rounded flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={country.flags?.png}
          alt={country.flags?.alt || `Bandera de ${country.name.common}`}
          className="w-16 h-16 rounded mr-4 border"
        /> 
        <div>
          <p className="font-bold text-lg">
            {country.name.common} 🇦🇷
          </p>
          <p className="text-sm">🌍 Región: {country.region}</p>
          <p className="text-sm">🏛️ Capital: {country.capital?.[0] || "N/A"}</p>
          <p className="text-sm">
            👥 Población: {country.population.toLocaleString("es-AR")}
          </p>
        </div>
      </div>
      <button
        onClick={() => removeFromFavorites(country.cca3)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-4"
      >
        Eliminar
      </button>
    </li>
  );
};

export default FavoriteCard;
