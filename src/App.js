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
import { UserContext, CartContext } from "./context";

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
  // 模擬購物車有產品的時候
  const [cartContext, setCartContext] = useState([
    {
      id: 1,
      pid: 2315,
      name: "女版針織衫",
      urls: [
        { id: 1, src: "https://i.imgur.com/C7SYk0P.jpg", alt: "product_pic" },
        { id: 2, src: "https://i.imgur.com/Dfav1Yk.jpg", alt: "product_pic" },
      ],
      colors: [
        { id: 1, hexcode: "#ffce30", selected: false },
        { id: 2, hexcode: "#e83845", selected: false },
        { id: 3, hexcode: "#e389b9", selected: false },
        { id: 4, hexcode: "#746ab0", selected: true },
        { id: 5, hexcode: "#288ba8", selected: false },
      ],
      sizes: [
        { id: 1, name: "XS", selected: false },
        { id: 2, name: "S", selected: true },
        { id: 3, name: "M", selected: false },
        { id: 4, name: "L", selected: false },
        { id: 5, name: "XL", selected: false },
        { id: 6, name: "2L", selected: false },
      ],
      quantity: 1,
      unitPrice: 490,
    },
    {
      id: 2,
      pid: 1574,
      name: "男版針織衫",
      urls: [
        { id: 1, src: "https://i.imgur.com/C7SYk0P.jpg", alt: "product_pic" },
        { id: 2, src: "https://i.imgur.com/Dfav1Yk.jpg", alt: "product_pic" },
      ],
      colors: [
        { id: 1, hexcode: "#ffce30", selected: false },
        { id: 2, hexcode: "#e83845", selected: false },
        { id: 3, hexcode: "#e389b9", selected: false },
        { id: 4, hexcode: "#746ab0", selected: false },
        { id: 5, hexcode: "#288ba8", selected: true },
      ],
      sizes: [
        { id: 1, name: "XS", selected: false },
        { id: 2, name: "S", selected: false },
        { id: 3, name: "M", selected: false },
        { id: 4, name: "L", selected: false },
        { id: 5, name: "XL", selected: false },
        { id: 6, name: "2L", selected: true },
      ],
      quantity: 2,
      unitPrice: 790,
    },
    {
      id: 3,
      pid: 5846,
      name: "針織衫外套",
      urls: [
        { id: 1, src: "https://i.imgur.com/C7SYk0P.jpg", alt: "product_pic" },
        { id: 2, src: "https://i.imgur.com/Dfav1Yk.jpg", alt: "product_pic" },
      ],
      colors: [
        { id: 1, hexcode: "#ffce30", selected: false },
        { id: 2, hexcode: "#e83845", selected: true },
        { id: 3, hexcode: "#e389b9", selected: false },
        { id: 4, hexcode: "#746ab0", selected: false },
        { id: 5, hexcode: "#288ba8", selected: false },
      ],
      sizes: [
        { id: 1, name: "XS", selected: false },
        { id: 2, name: "S", selected: false },
        { id: 3, name: "M", selected: false },
        { id: 4, name: "L", selected: false },
        { id: 5, name: "XL", selected: true },
        { id: 6, name: "2L", selected: false },
      ],
      quantity: 4,
      unitPrice: 1290,
    },
  ]);
  // 模擬購物車是空的時候
  // const [cartContext, setCartContext] = useState([]);
  // 當 cartContext
  const memorizedCart = useMemo(
    () => ({ cartContext, setCartContext }),
    [cartContext]
  );

  return (
    <main>
      <Router>
        <Switch>
          <UserContext.Provider value={memorizedUser}>
            <CartContext.Provider value={memorizedCart}>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                {/* 防止已經是會員用戶透過 url 存取登入頁面 */}
                {user !== null ? <Redirect to="/" /> : <LoginPage />}
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
                {/* 防止已經是會員用戶透過 url 存取註冊頁面 */}
                {user !== null ? <Redirect to="/" /> : <RegisterPage />}
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
            </CartContext.Provider>
          </UserContext.Provider>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
