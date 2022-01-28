import { ReactComponent as logo } from "../../imgs/components/header/brand-logo.svg";
import { ReactComponent as profile } from "../../imgs/components/header/person-circle.svg";
import { ReactComponent as shopping_bag } from "../../imgs/components/header/bag.svg";
import DropDown from "../../components/dropdown";
import Offcanva from "../offcanva";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
  BREAKPOINT_LAPTOP,
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  Z_INDEX_LV4,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  BOX_SHADOW_LIGHT,
  BG_SECONDARY3,
  COLOR_SECONDARY2,
} from "../../constant";
import { useEffect, useState } from "react";
import { isEmptyObj } from "../../util";
import { useSelector } from "react-redux";

const NavBarContainer = styled.nav`
  background-color: ${BG_SECONDARY3};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: ${Z_INDEX_LV4};
  height: ${HEADER_HEIGHT_MOBILE};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${BOX_SHADOW_LIGHT};

  ${BREAKPOINT_MOBILE} {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${BREAKPOINT_PAD} {
    height: ${HEADER_HEIGHT_PAD};
  }

  // 裝置尺寸為 1440px 寬時，將 NavBar 固定為 1440px 寬
  ${BREAKPOINT_LAPTOP} {
    padding-left: calc((100% - 90rem) / 2);
    padding-right: calc((100% - 90rem) / 2);
  }
`;

const BrandLogo = styled(logo)`
  color: ${COLOR_SECONDARY2};
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;

  ${BREAKPOINT_PAD} {
    width: 3rem;
    height: 3rem;
  }
`;

const FeatureContainer = styled.div`
  display: none;

  ${BREAKPOINT_PAD} {
    display: flex;
  }
`;

const ProfileContainer = styled.div`
  display: none;

  ${BREAKPOINT_PAD} {
    display: flex;
    align-items: center;
    margin-right: 2rem;
    cursor: pointer;
  }
`;

const ProfileIcon = styled(profile)`
  ${BREAKPOINT_PAD} {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
    margin-right: 1rem;
  }
`;

const UserNickname = styled.h3.attrs(() => ({
  className: "fs-h3",
}))``;

const ShoppingBag = styled(shopping_bag)`
  ${BREAKPOINT_PAD} {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
  }
`;

const NavForMobile = styled.section`
  display: block;

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const NavForPad = styled.section`
  display: none;

  ${BREAKPOINT_PAD} {
    display: block;
  }
`;

export default function Header() {
  const history = useHistory();
  // 從 redux-store 拿用戶資訊
  const userFromStore = useSelector((store) => store.user.info);
  // 從 redux-store 拿購物車物品清單
  const cartItemsFromStore = useSelector((store) => store.cart.items);
  // 用戶選單狀態 (dropdown UI)
  const [dropDownForProfile, setDropDownForProfile] = useState({
    width: "12rem",
    useForLinks: true,
    options: isEmptyObj(userFromStore)
      ? [
          { id: 1, name: "登入", url: "/login" },
          { id: 2, name: "註冊", url: "/register" },
        ]
      : [
          { id: 1, name: "編輯個人資訊", url: "/profile-edit" },
          { id: 2, name: "收藏清單", url: "/favorite" },
          { id: 3, name: "登出", url: "/logout" },
        ],
  });
  // 購物車選單狀態 (dropdown UI)
  const [dropDownForCart, setDropDownForCart] = useState({
    width: cartItemsFromStore.length ? "fit-content" : "20rem",
    height: cartItemsFromStore.length >= 4 ? "24rem" : "fit-content",
    useForCart: true,
    products: cartItemsFromStore.map((product) => ({
      id: product.id,
      pid: product.pid,
      name: product.name,
      url: product.urls[0].src,
      color: product.colors.filter((item) => item.selected === true)[0].hexcode,
      size: product.sizes.filter((item) => item.selected === true)[0].name,
      quantity: product.quantity,
    })),
  });
  // 用戶選單狀態 (offcanva UI)
  const [offcanvaInfo, setOffcanvaInfo] = useState({
    links: isEmptyObj(userFromStore)
      ? [
          { id: 1, name: "登入", url: "/login" },
          { id: 2, name: "註冊", url: "/register" },
          { id: 3, name: "購物車", url: "/cart" },
        ]
      : [
          { id: 1, name: "編輯個人資訊", url: "/profile-edit" },
          { id: 2, name: "收藏清單", url: "/favorite" },
          { id: 3, name: "購物車", url: "/cart" },
          { id: 4, name: "登出", url: "/logout" },
        ],
    displayUserInfo: true,
    user: {
      isLogin: isEmptyObj(userFromStore) ? false : true,
      name: isEmptyObj(userFromStore) ? "訪客" : userFromStore.nickname,
    },
  });

  // 如果 user 有更新的話，則更新用戶選單 (dropdown & offcanva)
  useEffect(() => {
    setDropDownForProfile({
      width: "12rem",
      useForLinks: true,
      options: isEmptyObj(userFromStore)
        ? [
            { id: 1, name: "登入", url: "/login" },
            { id: 2, name: "註冊", url: "/register" },
          ]
        : [
            { id: 1, name: "編輯個人資訊", url: "/profile-edit" },
            { id: 2, name: "收藏清單", url: "/favorite" },
            { id: 3, name: "登出", url: "/logout" },
          ],
    });
    setOffcanvaInfo({
      links: isEmptyObj(userFromStore)
        ? [
            { id: 1, name: "登入", url: "/login" },
            { id: 2, name: "註冊", url: "/register" },
            { id: 3, name: "購物車", url: "/cart" },
          ]
        : [
            { id: 1, name: "編輯個人資訊", url: "/profile-edit" },
            { id: 2, name: "收藏清單", url: "/favorite" },
            { id: 3, name: "購物車", url: "/cart" },
            { id: 4, name: "登出", url: "/logout" },
          ],
      displayUserInfo: true,
      user: {
        isLogin: isEmptyObj(userFromStore) ? false : true,
        name: isEmptyObj(userFromStore) ? "訪客" : userFromStore.nickname,
      },
    });
  }, [userFromStore]);
  // 如果 cart 有更新的話，則更新購物車 dropdown 元件
  useEffect(() => {
    setDropDownForCart({
      width: cartItemsFromStore.length ? "fit-content" : "20rem",
      height: cartItemsFromStore.length >= 4 ? "24rem" : "fit-content",
      useForCart: true,
      products: cartItemsFromStore.map((product) => ({
        id: product.id,
        pid: product.pid,
        name: product.name,
        url: product.urls[0].src,
        color: product.colors.filter((item) => item.selected === true)[0]
          .hexcode,
        size: product.sizes.filter((item) => item.selected === true)[0].name,
        quantity: product.quantity,
      })),
    });
  }, [cartItemsFromStore]);

  return (
    <NavBarContainer>
      <BrandLogo
        onClick={() => {
          history.push("/");
        }}
      />
      <NavForMobile>
        <Offcanva offcanvaInfo={offcanvaInfo} />
      </NavForMobile>
      <NavForPad>
        <FeatureContainer>
          <DropDown dropDownInfo={dropDownForProfile}>
            <ProfileContainer>
              <ProfileIcon />
              <UserNickname>
                {isEmptyObj(userFromStore) ? "訪客" : userFromStore.nickname}
              </UserNickname>
            </ProfileContainer>
          </DropDown>
          <DropDown dropDownInfo={dropDownForCart}>
            <ShoppingBag />
          </DropDown>
        </FeatureContainer>
      </NavForPad>
    </NavBarContainer>
  );
}
