import React, { useMemo, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/home-page";
import ProductsPage from "./pages/products-page";
import SingleProductPage from "./pages/single-product-page";
import CartPage from "./pages/cart-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import ProfileEditPage from "./pages/profile-edit-page";
import FavoritePage from "./pages/favorite-page";
import { UserContext } from "./context/UserContext";

function App() {
  // Call Web API 拿用戶資訊
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({
    userId: 12456,
    nickname: "冠宇",
    account: "Emory914",
    pass: "Fish950914",
  });
  // 當 user 更新時，才更新此數值
  const memorizedUser = useMemo(() => {
    return user;
  }, [user]);

  return (
    <main>
      <Router>
        <Switch>
          <UserContext.Provider value={memorizedUser}>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/profile-edit">
              {/* 防止非用戶透過 url 存取編輯個人資訊頁面 */}
              {user === null ? <Redirect to="/login" /> : <ProfileEditPage />}
            </Route>
            <Route path="/favorite">
              {/* 防止非用戶透過 url 存取收藏清單頁面 */}
              {user === null ? <Redirect to="/login" /> : <FavoritePage />}
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
          </UserContext.Provider>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
