import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import SingleProductPage from "./Pages/SingleProductPage";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/product">
          <SingleProductPage />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
