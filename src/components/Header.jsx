import { useCountriesContext } from "../contexts/CountriesContext";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const Header = () => {
  const { favorites, handleOpenModalFavorites } = useCountriesContext();
  const navigate = useNavigate();

  return (
    <header className="p-4 bg-black text-white shadow-md flex justify-between items-center">
      
      {/* Logo + Título */}
      <div className="flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/197/197573.png"
          alt="Logo Países"
          className="w-10 h-10"
        />
        <Link to="/"><h1 className="text-2xl font-bold">Mis Países</h1></Link>
      </div>

      {/* Botón central - Dashboard */}
      <div>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-full border border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white transition"
        >
          📊 Dashboard
        </button>
      </div>

      {/* Botón de favoritos */}
      <div>
        <button
          onClick={handleOpenModalFavorites}
          className="px-4 py-2 rounded-full border border-green-400 text-green-400 hover:bg-green-500 hover:text-white transition"
        >
          Ver Favoritos ({favorites.length})
        </button>
      </div>
    </header>
  );
};

export default Header;
