import { ToastContainer } from "react-toastify";
import AppRouter from "./router/AppRouter";
import Header from "./components/Header";
import FavoritesModal from "./components/FavoritesModal";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <FavoritesModal />
      <AppRouter />
    </>
  );
};

export default App;
