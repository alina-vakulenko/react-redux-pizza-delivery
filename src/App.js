import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import SinglePizzaPage from "./pages/SinglePizzaPage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/pizza/:id" element={<SinglePizzaPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
