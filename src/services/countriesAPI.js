import axios from "axios";

// Variables de entorno para la API de países
const baseUrl = import.meta.env.VITE_BASE_URL;

// Buscar un país por nombre
export const fetchCountries = async (countryName) => {
  const url = `${baseUrl}/api/pais/nombre/${countryName}`;
  const response = await axios.get(url);
  return response.data; 
};


// Obtener todos los países
export const fetchAllCountries = async () => {
  const url = `${baseUrl}/api/paises`;
  console.log("URL generada:", url);
  const response = await axios.get(url);
  return response.data;
};
// Eliminar un país por id
export const deleteCountryAPI = async (id) => {
  const url = `${baseUrl}/api/pais/${id}`;
  const response = await axios.delete(url);
  return response.data;
};