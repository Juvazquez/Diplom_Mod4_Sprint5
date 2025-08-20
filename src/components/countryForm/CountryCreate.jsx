import React from "react";
import { useCountriesContext } from "../../contexts/CountriesContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CountryCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { addCountry } = useCountriesContext();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Country data submitted:", data);

    // Adaptar los datos al schema de backend
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
      await addCountry(payload);
      navigate("/dashboard");
      alert("País creado exitosamente");
    } catch (err) {
      console.error("Error al crear el país:", err);
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Crear nuevo País</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre común */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Nombre común"
            type="text"
            {...register("nombreComun", {
              required: "Este campo es obligatorio",
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
            {...register("nombreOficial", {
              required: "Este campo es obligatorio",
            })}
          />
          {errors.nombreOficial && (
            <p className="text-red-500 mb-4">{errors.nombreOficial.message}</p>
          )}

          {/* Capital */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Capital"
            type="text"
            {...register("capital", { required: "La capital es obligatoria" })}
          />
          {errors.capital && (
            <p className="text-red-500 mb-4">{errors.capital.message}</p>
          )}

          {/* Región */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Región"
            type="text"
            {...register("region", { required: "La región es obligatoria" })}
          />
          {errors.region && (
            <p className="text-red-500 mb-4">{errors.region.message}</p>
          )}

          {/* Bandera (URL) */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="URL de la bandera"
            type="text"
            {...register("bandera", { required: "La bandera es obligatoria" })}
          />
          {errors.bandera && (
            <p className="text-red-500 mb-4">{errors.bandera.message}</p>
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

          {/* Gini */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Indice Gini"
            type="number"
            {...register("gini", { min: 0, max: 100 })}
          />

          {/* Creador */}
          <input
            className="border border-gray-700 p-2 rounded mb-4 w-full"
            placeholder="Nombre del creador"
            type="text"
            {...register("creador", { required: "El creador es obligatorio" })}
          />
          {errors.creador && (
            <p className="text-red-500 mb-4">{errors.creador.message}</p>
          )}

          {/* Botón de enviar */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Crear País
          </button>
        </form>
      </div>
    </div>
  );
};

export default CountryCreate;
