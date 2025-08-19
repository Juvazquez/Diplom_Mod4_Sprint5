// pages/Dashboard.jsx
import { useCountriesContext } from "../../contexts/CountriesContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { countriesData, deleteCountry } = useCountriesContext();
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/crear-pais");
  };

  const handleEdit = (id) => {
    navigate(`/editar-pais/${id}`);
  };

  const handleDeleteSwal = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro de que deseas eliminar este perfil?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deleteCountry(id);
        toast.success(`Pais con ID ${id} eliminado con éxito`);
        navigate("/dashboard");
      } catch (error) {
        toast.error(`Error al eliminar el pais con ID ${id}`);
        console.error(error);
      }
    } else {
      toast.info("Eliminación de pais cancelada");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          📊 Dashboard de Países Sudamericanos y de idioma español
        </h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ➕ Agregar País
        </button>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Bandera</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Capital</th>
            <th className="p-2 border">Población</th>
            <th className="p-2 border">Área</th>
            <th className="p-2 border">Indice Gini</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {countriesData.map((country) => (
            <tr key={country._id}>
              <td className="p-2 border">
                <img
                  src={
                    country.banderas?.svg ||
                    country.banderas?.png ||
                    "/placeholder.png"
                  }
                  alt={`Bandera de ${country.nombreComun}`}
                  className="w-12 h-8 object-cover"
                />
              </td>
              <td className="p-2 border">{country.nombreComun}</td>
              <td className="p-2 border">{country.capital}</td>
              <td className="p-2 border">
                {country.poblacion.toLocaleString()}
              </td>
              <td className="p-2 border">
                {country.area ? country.area.toLocaleString() : "N/D"}
              </td>
              <td className="p-2 border">
                {country.gini ? country.gini.toFixed(1) : "N/D"}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(country.id)}
                  className="bg-yellow-400 px-2 py-1 rounded mr-2"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDeleteSwal(country._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
