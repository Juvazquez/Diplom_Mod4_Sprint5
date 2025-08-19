import { createContext, useContext } from "react";
import useCountries from "../hooks/useCountries"; 

// 1. Define el contexto
const CountriesContext = createContext();

// 2. Crea el provider
export const CountriesProvider = ({ children }) => {
  const countries = useCountries();
  console.log("countriesData ->", countries.countriesData); // Para depuración

  return (
    <CountriesContext.Provider value={countries}>
      {children}
    </CountriesContext.Provider>
  );
};

// 3. Custom hook para consumir el contexto
export const useCountriesContext = () => useContext(CountriesContext);
