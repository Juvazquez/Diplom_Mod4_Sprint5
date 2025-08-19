import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/pages/Home";
import Dashboard from "../components/pages/Dashboard";
import NotFound from "../components/pages/NotFound";

// Componentes de Países
import CountryCreate from "../components/countryForm/CountryCreate";
import CountryUpdate from "../components/countryForm/CountryUpdate";

const AppRouter = () => {
  return (
    <Routes>
      {/* Página principal */}
      <Route path="/" element={<Home />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* CRUD Países */}
      <Route path="/crear-pais" element={<CountryCreate />} />
      <Route path="/editar-pais/:id" element={<CountryUpdate />} />

      {/* Página de error */}
      <Route path="/not-found" element={<NotFound />} />

      {/* Cualquier ruta desconocida redirige a NotFound */}
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default AppRouter;
