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
    try {
      await addCountry(data); // data ya contiene name y flag
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
          {/* Nombre del país */}
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

          {/* URL de la bandera */}
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
