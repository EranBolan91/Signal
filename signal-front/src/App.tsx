import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ActivationPage from "./pages/Activation/ActivationPage";
import Home from "./pages/Home/Home";
import Layout from "./Layout";
import "./App.css";

const App = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/activation/:id" element={<ActivationPage />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
