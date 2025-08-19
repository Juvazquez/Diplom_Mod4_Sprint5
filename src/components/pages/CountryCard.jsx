import { Globe, Users, Landmark, Languages, Star, StarOff } from "lucide-react";

const CountryCard = ({ country, isFavorite, toggleFavorite }) => {
  const {
    nombreComun,
    nombreOficial,
    banderas,
    capital,
    poblacion,
    idiomas,
    region,
  } = country;

  const handleToggleFavorite = () => {
    toggleFavorite(country);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 flex flex-col gap-4 text-gray-800 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={banderas?.svg || banderas?.png || "/placeholder.png"}
            alt={`Bandera de ${nombreComun || "País desconocido"}`}
            className="w-10 h-6 object-cover rounded"
          />
          <h2 className="text-2xl font-bold">{nombreComun}</h2>
        </div>

        <button
          onClick={handleToggleFavorite}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm border transition ${
            isFavorite
              ? "bg-yellow-300 border-yellow-400 text-yellow-900 hover:bg-yellow-200"
              : "bg-white border-gray-300 hover:bg-yellow-100"
          }`}
        >
          {isFavorite ? (
            <>
              <Star className="w-4 h-4" />
              En Favoritos
            </>
          ) : (
            <>
              <StarOff className="w-4 h-4" />
              Agregar a Favoritos
            </>
          )}
        </button>
      </div>

      {/* Datos */}
      <div className="flex items-center gap-4">
        <Globe className="w-6 h-6 text-green-500" />
        <p className="text-gray-700">{region || "Región desconocida"}</p>
      </div>

      <div className="flex items-center gap-4">
        <Landmark className="w-6 h-6 text-blue-500" />
        <p className="text-gray-700">{capital?.[0] || "Sin capital"}</p>
      </div>

      <div className="flex items-center gap-4">
        <Users className="w-6 h-6 text-purple-500" />
        <p>
          Población: {poblacion ? poblacion.toLocaleString("es-ES") : "N/D"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Languages className="w-6 h-6 text-red-500" />
        <p>
          Idiomas:{" "}
          {idiomas && Object.keys(idiomas).length > 0
            ? Object.values(idiomas).join(", ")
            : "N/D"}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
