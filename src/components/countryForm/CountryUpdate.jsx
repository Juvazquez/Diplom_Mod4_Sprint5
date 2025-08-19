import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCountriesContext } from "../../contexts/CountriesContext";
import { useForm } from "react-hook-form";

const CountryUpdate = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { countries, updateCountry } = useCountriesContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await updateCountry(id, data);
      navigate(`/countries/${id}`);
    } catch (err) {
      setError("Error al actualizar el país");
      console.error(err);
    }
  };

  // Cargar datos del país al montar el componente
  useEffect(() => {
    const currentCountry = countries.find((c) => c.id === id);
    console.log("Current Country:", currentCountry);
    if (currentCountry) {
      setValue("name", currentCountry.name);
      setValue("flag", currentCountry.flag);
      setValue("continent", currentCountry.continent);
    }
  }, [id, countries, setValue]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Actualizar País</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Nombre del país"
            type="text"
            {...register("name", {
              required: "El nombre del país es obligatorio",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 mb-4">{errors.name.message}</p>
          )}

          {/* URL de bandera */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="URL de la bandera"
            type="text"
            {...register("flag", {
              required: "La URL de la bandera es obligatoria",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Por favor ingrese una URL válida",
              },
            })}
          />
          {errors.flag && (
            <p className="text-red-500 mb-4">{errors.flag.message}</p>
          )}

          {/* Continente */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Continente"
            type="text"
            {...register("continent", {
              required: "El continente es obligatorio",
            })}
          />
          {errors.continent && (
            <p className="text-red-500 mb-4">{errors.continent.message}</p>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          >
            Actualizar País
          </button>
        </form>
      </div>
    </div>
  );
};

export default CountryUpdate;
