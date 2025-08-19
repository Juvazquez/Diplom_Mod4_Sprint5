import { FaFlag } from "react-icons/fa"; // Ícono de bandera

const EmptyFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <FaFlag className="text-6xl text-white mb-4" />
      <h2 className="text-xl font-semibold text-white">Sin países favoritos</h2>
      <p className="text-gray-400 text-sm mt-2">
        Agregá tus países favoritos para acceder a su información rápidamente.
      </p>
    </div>
  );
};

export default EmptyFavorites;
