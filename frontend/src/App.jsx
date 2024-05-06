import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/home.page.component";
import Navbar from "./components/utilities/navbar.component";
import Footer from "./components/utilities/footer.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="font-['jost'] flex-1">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
