import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

import "./scss/app.scss";

const CartPage = lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/CartPage")
);
const SinglePizzaPage = lazy(
  () => import(/* webpackChunkName: "pizzaItem" */ "./pages/SinglePizzaPage")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/cart"
          element={
            <Suspense>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense>
              <SinglePizzaPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
