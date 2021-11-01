import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import ProductsPage from "./pages/products-page";
import SingleProductPage from "./pages/single-product-page";
import CartPage from "./pages/cart-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ProfileEditPage from "./pages/profile-edit-page";

function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/profile-edit">
            <ProfileEditPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
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
    </main>
  );
}

export default App;
