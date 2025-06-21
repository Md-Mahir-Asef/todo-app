import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Create } from "./pages/Create";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />\
        <Route path="/create" element={<Create />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
