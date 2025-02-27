import "./index.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Artworks from "./components/Artworks";
import SingleClArtwork from "./components/SingleVAndAArtwork";
import Error from "./components/Error";
import { UserListProvider } from "./components/ListContext";
import TempListArtworks from "./components/TempListArtworks";
import ExhibitList from "./components/ExibitList";
import Home from "./components/Home";
import SingleRijkArtwork from "./components/SingleRijkArtwork";
import { ToastContainer } from "react-toastify";

function App() {
  return (
      <UserListProvider>
        <div className="bg-bgcolour font-main max-w-screen-lg min-h-screen mx-auto p-2 text-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks" element={<Artworks />} />
            <Route
              path="/artworks/v&aartwork/:clartwork_id"
              element={<SingleClArtwork />}
            />
            <Route
              path="/artworks/rijkartwork/:rijkartwork_id"
              element={<SingleRijkArtwork />}
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
  );
}

export default App;
