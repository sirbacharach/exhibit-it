import "./index.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Artworks from "./components/Artworks";
import SingleClArtwork from "./components/SingleClArtwork";
import Error from "./components/Error";
import { UserListProvider } from "./components/ListContext";

function App() {
  return (
    <UserListProvider>
    <div className="bg-bgcolour font-main max-w-screen-lg min-h-screen mx-auto p-2">
      <Header />
      <Routes>
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/artworks/:clartwork_id" element={<SingleClArtwork />} />
        <Route path="/*" element={<Error message="Route not found!" />} />
      </Routes>
    </div>
    </UserListProvider>
  );
}

export default App;
