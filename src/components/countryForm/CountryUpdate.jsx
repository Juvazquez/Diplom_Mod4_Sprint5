import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCountriesContext } from "../../contexts/CountriesContext";
import { useForm } from "react-hook-form";

const CountryUpdate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { countriesData, updateCountry } = useCountriesContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = {
      nombreComun: data.nombreComun,
      nombreOficial: data.nombreOficial,
      capital: data.capital, // el backend lo normaliza a array
      region: data.region,
      poblacion: Number(data.poblacion) || 0,
      area: Number(data.area) || 0,
      banderas: { svg: data.bandera },
      gini: data.gini === "" ? undefined : Number(data.gini),
      creador: data.creador,
    };

    try {
      await updateCountry(id, payload);
      navigate("/dashboard");
      alert("País actualizado exitosamente");
    } catch (err) {
      setError("Error al actualizar el país");
      console.error(err);
    }
  };

  // Cargar datos del país al montar el componente
  useEffect(() => {
    const currentCountry = countriesData.find(
      (c) => c._id === id || c.id === id
    );
    console.log("Current Country:", currentCountry);
    if (currentCountry) {
      setValue("nombreComun", currentCountry.nombreComun || "");
      setValue("nombreOficial", currentCountry.nombreOficial || "");
      setValue("capital", currentCountry.capital?.join(", ") || "");
      setValue("region", currentCountry.region || "");
      setValue("poblacion", currentCountry.poblacion || 0);
      setValue("area", currentCountry.area || 0);
      setValue("bandera", currentCountry.banderas?.svg || "");
      setValue("gini", currentCountry.gini || "");
      setValue("creador", currentCountry.creador || "");
    }
  }, [id, countriesData, setValue]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Actualizar País</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre común */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Nombre común del país"
            type="text"
            {...register("nombreComun", {
              required: "El nombre común es obligatorio",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
          />
          {errors.nombreComun && (
            <p className="text-red-500 mb-4">{errors.nombreComun.message}</p>
          )}

          {/* Nombre oficial */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Nombre oficial"
            type="text"
            {...register("nombreOficial")}
          />

          {/* Capital */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Capital (separada por comas si hay varias)"
            type="text"
            {...register("capital")}
          />

          {/* Región */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Región / Continente"
            type="text"
            {...register("region", { required: "La región es obligatoria" })}
          />
          {errors.region && (
            <p className="text-red-500 mb-4">{errors.region.message}</p>
          )}

          {/* Población */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Población"
            type="number"
            {...register("poblacion")}
          />

          {/* Área */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Área en km²"
            type="number"
            {...register("area")}
          />

          {/* Bandera */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="URL de la bandera"
            type="text"
            {...register("bandera", {
              required: "La URL de la bandera es obligatoria",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Por favor ingrese una URL válida",
              },
            })}
          />
          {errors.bandera && (
            <p className="text-red-500 mb-4">{errors.bandera.message}</p>
          )}

          {/* Gini */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Índice Gini"
            type="number"
            step="0.1"
            {...register("gini")}
          />

          {/* Creador */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Creador"
            type="text"
            {...register("creador")}
          />

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
