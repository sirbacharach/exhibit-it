import "./index.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ClArtworks from "./components/ClArtworks";
// import SingleClArtwork from "./components/SingleClArtwork";


function App() {
  return (
    <div className="bg-bgcolour font-main max-w-screen-lg min-h-screen mx-auto flex flex-col p-2">
      <Header />
      <Routes>
      <Route path="/clartworks" element={<ClArtworks />} />
      {/* <Route path="/clartworks/:clartwork_id" element={<SingleClArtwork />} /> */}
      </Routes>
    </div>
  );
}

export default App;
