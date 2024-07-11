import "./index.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Artworks from "./components/Artworks";
import SingleClArtwork from "./components/SingleClArtwork";
import Error from "./components/Error";
import { UserListProvider } from "./components/ListContext";
import TempListArtworks from "./components/TempListArtworks";
import ExhibitList from "./components/ExibitList";
import Home from "./components/Home";
import SingleChicagoArtwork from "./components/SingleChicagoArtwork";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/UserAuth";
import LoginPage from "./components/LoginPage";
// import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <UserProvider>
      <UserListProvider>
        <div className="bg-bgcolour font-main max-w-screen-lg min-h-screen mx-auto p-2 text-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/artworks" element={<Artworks />} />
            <Route
              path="/artworks/clevelandartwork/:clartwork_id"
              element={<SingleClArtwork />}
            />
            <Route
              path="/artworks/chicagoartwork/:chicagoartwork_id"
              element={<SingleChicagoArtwork />}
            />
            <Route
              path="/artworks/artworkslist"
              element={<TempListArtworks />}
            />
            <Route path="/artworks/exhibitList" element={<ExhibitList />} />
            <Route path="/*" element={<Error message="Route not found!" />} />
          </Routes>
          <ToastContainer />
        </div>
      </UserListProvider>
    </UserProvider>
  );
}

export default App;
