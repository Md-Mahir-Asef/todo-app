import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Create } from "./pages/Create";
import { Update } from "./pages/Update";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />\
        <Route path="/create" element={<Create />} />
        <Route path="/update" element={<Update />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
