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
import LogoutPage from "./pages/logout-page";
import RegisterPage from "./pages/register-page";
import ProfileEditPage from "./pages/profile-edit-page";
import FavoritePage from "./pages/favorite-page";
import { UserContext, CartContext, WatchedProductsContext } from "./context";
import ScrollToTop from "./components/scroll-to-top";

function App() {
  // Call Web API 拿用戶資訊
  const [user, setUser] = useState(null);
  // 當 user 更新時，才更新此數值
  const memorizedUser = useMemo(() => {
    return { user, setUser };
  }, [user]);
  // 模擬購物車是空的時候
  const [cart, setCart] = useState([]);
  // 當 cartContext 更新，才更新此數值
  const memorizedCart = useMemo(() => ({ cart, setCart }), [cart]);
  // 以前看過的產品
  const [watchedProducts, setWatchedProducts] = useState([]);
  const memorizeWatchProducts = useMemo(
    () => ({ watchedProducts, setWatchedProducts }),
    [watchedProducts]
  );

  return (
    <main>
      <Router>
        <ScrollToTop />
        <Switch>
          <UserContext.Provider value={memorizedUser}>
            <CartContext.Provider value={memorizedCart}>
              <WatchedProductsContext.Provider value={memorizeWatchProducts}>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/login">
                  {/* 防止已經是會員用戶透過 url 存取登入頁面 */}
                  {user !== null ? <Redirect to="/" /> : <LoginPage />}
                </Route>
                <Route path="/profile-edit">
                  {/* 防止非用戶透過 url 存取編輯個人資訊頁面 */}
                  {user === null ? (
                    <Redirect to="/login" />
                  ) : (
                    <ProfileEditPage />
                  )}
                </Route>
                <Route path="/favorite">
                  {/* 防止非用戶透過 url 存取收藏清單頁面 */}
                  {user === null ? <Redirect to="/login" /> : <FavoritePage />}
                </Route>
                <Route path="/register">
                  {/* 防止已經是會員用戶透過 url 存取註冊頁面 */}
                  {user !== null ? <Redirect to="/" /> : <RegisterPage />}
                </Route>
                <Route path="/logout">
                  <LogoutPage />
                </Route>
                {/* 使用 ? 代表可能沒有的欄位 */}
                <Route path="/products/:mainCategoryFromRouter/:subCategoryFromRouter?/:detailedCategoryFromRouter?">
                  <ProductsPage />
                </Route>
                <Route path="/product/:productID">
                  <SingleProductPage />
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>
              </WatchedProductsContext.Provider>
            </CartContext.Provider>
          </UserContext.Provider>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
