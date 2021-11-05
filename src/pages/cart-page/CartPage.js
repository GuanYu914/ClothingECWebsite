import styled, { keyframes } from "styled-components/macro";
import { fadeIn } from "react-animations";
import { useState, useEffect, useContext } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import BSCarousel from "../../components/bs-carousel";
import CartPicker from "./styled-cart-picker";
import FixedOffcanva, {
  SharedNoneCheckedButton,
  SharedCheckedAllButton,
  SharedSelectionHeader,
  SharedTotalPriceShower,
} from "./styled-fixed-offcanv";
import { CTAPrimaryButton, CTASecondaryButton } from "../../components/button";
import { ReactComponent as trash } from "../../imgs/pages/cart-page/trash.svg";
import { ReactComponent as checkNoneFilled } from "../../imgs/pages/cart-page/square.svg";
import { ReactComponent as checkFilled } from "../../imgs/pages/cart-page/check-square-fill.svg";
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
  Z_INDEX_LV1,
} from "../../constant";
import { CartContext } from "../../context";

const PageContainer = styled.div``;
const ContentContainer = styled.div`
  max-width: ${MAX_CONTAINER_WIDTH};
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  // 從頁面頂端計算 Header Component 目前的高度，並從這當作起點開始 render
  ${BREAKPOINT_MOBILE} {
    margin-top: ${HEADER_HEIGHT_MOBILE};
  }

  ${BREAKPOINT_PAD} {
    margin-top: ${HEADER_HEIGHT_PAD};
  }
`;

const CartTitle = styled.h1.attrs(() => ({
  className: "fs-h1 color-secondary2",
}))`
  margin-bottom: 8rem;
  // 根據不同裝置寬度預設跟 Header 保持 margin-top: 1rem
  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE} + 1rem);
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD} + 1rem);
  }
`;

const CartProductsForMobile = styled.div`
  display: block;
  margin-bottom: 4rem;

  ${BREAKPOINT_MOBILE} {
    display: block;
  }

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const CartProductsForPad = styled.div`
  display: none;
  margin-bottom: 4rem;

  ${BREAKPOINT_MOBILE} {
    display: none;
  }

  ${BREAKPOINT_PAD} {
    display: block;
  }
`;

const fadeInAnimation = keyframes`${fadeIn}`;
const CartProduct = styled.div`
  position: relative;
  margin-bottom: 4rem;
  animation: 1s ${fadeInAnimation};

  ${BREAKPOINT_PAD} {
    display: flex;
    align-items: center;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;

  ${BREAKPOINT_PAD} {
    margin-top: 0;
  }
`;

const ProductName = styled.h2.attrs(() => ({
  className: "fs-h1 color-secondary2",
}))``;

const ProductDeleteButton = styled(trash)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const ProductUnderline = styled.div.attrs(() => ({
  className: "bg-secondary1",
}))`
  margin-top: 4rem;
  width: 100%;
  height: 0.4rem;
`;

const NoneCheckedButton = styled(checkNoneFilled).attrs(() => ({
  className: "color-secondary2",
}))`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  position: absolute;
  left: 0.8rem;
  top: 0.8rem;
  z-index: ${Z_INDEX_LV1};

  ${BREAKPOINT_PAD} {
    position: static;
    width: 3.6rem;
    height: 3.6rem;
    margin-right: 0.4rem;
  }
`;

const CheckedButton = styled(checkFilled).attrs(() => ({
  className: "color-secondary2",
}))`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  position: absolute;
  left: 0.8rem;
  top: 0.8rem;
  z-index: ${Z_INDEX_LV1};

  ${BREAKPOINT_PAD} {
    position: static;
    width: 3.6rem;
    height: 3.6rem;
    margin-right: 0.4rem;
  }
`;

const ProductInfo = styled.div`
  width: 80%;
  margin-left: 0.6rem;
`;

const CartProductContainer = styled.div`
  margin-bottom: 4rem;
`;

const StyledSharedTotalPriceShower = styled(SharedTotalPriceShower)`
  margin-bottom: 0;
`;

const StyledSharedSelectionHeader = styled(SharedSelectionHeader)`
  justify-content: space-between;
`;

const CheckedAllButtonContainer = styled.div``;

const CartProductsCheckedBlock = styled.div``;

export default function CartPage() {
  // 透過 cartContext 拿到目前購物車內容
  const { cartContext, setCartContext } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState(
    cartContext.map((product) => ({
      id: product.id,
      pid: product.pid,
      name: product.name,
      slides: {
        frame: {
          maxHeight: "22rem",
          borderRadius: "2rem",
        },
        slide: product.urls.map((url) => ({
          id: url.id,
          src: url.src,
          alt: url.alt,
        })),
      },
      picker: {
        colors: product.colors,
        sizes: product.sizes,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
      },
      selected: false,
    }))
  );
  const [checkedPrice, setCheckedPrice] = useState(0);
  const [checkedState, setCheckedState] = useState(false);
  const [checkedAllState, setCheckedAllState] = useState(false);
  useEffect(() => {
    // cartProducts 更新時，同步更新 CartContext 內容
    setCartContext(
      cartProducts.map((cartProduct) => ({
        id: cartProduct.id,
        pid: cartProduct.pid,
        name: cartProduct.name,
        urls: cartProduct.slides.slide.map((item) => ({
          id: item.id,
          src: item.src,
          alt: item.alt,
        })),
        colors: cartProduct.picker.colors,
        sizes: cartProduct.picker.sizes,
        quantity: cartProduct.picker.quantity,
        unitPrice: cartProduct.picker.unitPrice,
      }))
    );
    // 更新總金額、商品選取狀態
    setCheckedPrice(handleCalcAllSelectedProductPrice());
    setCheckedState(handleCheckAllSelectedState().checked);
    setCheckedAllState(handleCheckAllSelectedState().checkedAll);
  }, [cartProducts, checkedState, checkedPrice]);

  function handleSelectPickerColor(productId, colorId) {
    setCartProducts(
      cartProducts.map((cartProduct) =>
        cartProduct.id === productId
          ? {
              ...cartProduct,
              picker: {
                ...cartProduct.picker,
                colors: cartProduct.picker.colors.map((color) =>
                  color.id === colorId
                    ? { ...color, selected: true }
                    : { ...color, selected: false }
                ),
              },
            }
          : { ...cartProduct }
      )
    );
  }

  function handleSelectPickerSize(productId, sizeId) {
    setCartProducts(
      cartProducts.map((cartProduct) =>
        cartProduct.id === productId
          ? {
              ...cartProduct,
              picker: {
                ...cartProduct.picker,
                sizes: cartProduct.picker.sizes.map((size) =>
                  size.id === sizeId
                    ? { ...size, selected: true }
                    : { ...size, selected: false }
                ),
              },
            }
          : { ...cartProduct }
      )
    );
  }

  function handleIncreaseQuantity(productId) {
    setCartProducts(
      cartProducts.map((cartProduct) =>
        cartProduct.id === productId
          ? {
              ...cartProduct,
              picker: {
                ...cartProduct.picker,
                quantity: cartProduct.picker.quantity + 1,
              },
            }
          : { ...cartProduct }
      )
    );
  }

  function handleDecreaseQuantity(productId) {
    setCartProducts(
      cartProducts.map((cartProduct) =>
        cartProduct.id === productId
          ? {
              ...cartProduct,
              picker: {
                ...cartProduct.picker,
                quantity:
                  cartProduct.picker.quantity === 1
                    ? cartProduct.picker.quantity
                    : cartProduct.picker.quantity - 1,
              },
            }
          : { ...cartProduct }
      )
    );
  }

  function handleChangeProductSelectedState(productId) {
    setCartProducts(
      cartProducts.map((cartProduct) =>
        cartProduct.id === productId
          ? { ...cartProduct, selected: !cartProduct.selected }
          : { ...cartProduct }
      )
    );
  }

  function handleDeleteSelectedProduct(productId) {
    setCartProducts(
      cartProducts.filter((cartProduct) => cartProduct.id !== productId)
    );
  }

  function handleCheckAllSelectedState() {
    let selectedCounter = 0;
    let checkedAll = false;
    let checked = false;
    cartProducts.forEach((cartProduct) => {
      if (cartProduct.selected) {
        selectedCounter++;
      }
    });

    if (selectedCounter === cartProducts.length) {
      checked = true;
      checkedAll = true;
    }
    if (selectedCounter === 0) {
      checkedAll = false;
      checked = false;
    }
    if (selectedCounter >= 1 && selectedCounter !== cartProducts.length) {
      checkedAll = false;
      checked = true;
    }

    return {
      checked,
      checkedAll,
    };
  }

  function handleCalcAllSelectedProductPrice() {
    let checkedPrice = 0;
    cartProducts.forEach((cartProduct) => {
      if (cartProduct.selected) {
        checkedPrice +=
          cartProduct.picker.quantity * cartProduct.picker.unitPrice;
      }
    });
    return checkedPrice;
  }
  // 點選 "全選" 按鈕事件
  function handleToggleSelectAllProducts() {
    const flagCheckedAll = handleCheckAllSelectedState().checkedAll;
    setCartProducts(
      cartProducts.map((cartProduct) => ({
        ...cartProduct,
        selected: flagCheckedAll === true ? false : true,
      }))
    );
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <CartTitle>購物袋中商品</CartTitle>
        <CartProductsForMobile>
          {cartProducts.map((cartProduct) => (
            <CartProduct key={cartProduct.id}>
              {!cartProduct.selected && (
                <NoneCheckedButton
                  onClick={() => {
                    handleChangeProductSelectedState(cartProduct.id);
                  }}
                />
              )}
              {cartProduct.selected && (
                <CheckedButton
                  onClick={() => {
                    handleChangeProductSelectedState(cartProduct.id);
                  }}
                />
              )}
              <BSCarousel slides={cartProduct.slides} />
              <ProductHeader>
                <ProductName>{cartProduct.name}</ProductName>
                <ProductDeleteButton
                  onClick={() => {
                    handleDeleteSelectedProduct(cartProduct.id);
                  }}
                />
              </ProductHeader>
              <CartPicker
                picker={cartProduct.picker}
                productId={cartProduct.id}
                handleSelectPickerColor={handleSelectPickerColor}
                handleSelectPickerSize={handleSelectPickerSize}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
              />
              <ProductUnderline></ProductUnderline>
            </CartProduct>
          ))}
          <FixedOffcanva
            totalPrice={checkedPrice}
            checkedState={checkedState}
            checkedAllState={checkedAllState}
            handleToggleSelectAllProducts={handleToggleSelectAllProducts}
          />
        </CartProductsForMobile>
        <CartProductsForPad>
          {cartProducts.map((cartProduct) => (
            <CartProductContainer key={cartProduct.id}>
              <CartProduct key={cartProduct.id}>
                {!cartProduct.selected && (
                  <NoneCheckedButton
                    onClick={() => {
                      handleChangeProductSelectedState(cartProduct.id);
                    }}
                  />
                )}
                {cartProduct.selected && (
                  <CheckedButton
                    onClick={() => {
                      handleChangeProductSelectedState(cartProduct.id);
                    }}
                  />
                )}
                <BSCarousel slides={cartProduct.slides} />
                <ProductInfo>
                  <ProductHeader>
                    <ProductName>{cartProduct.name}</ProductName>
                    <ProductDeleteButton
                      onClick={() => {
                        handleDeleteSelectedProduct(cartProduct.id);
                      }}
                    />
                  </ProductHeader>
                  <CartPicker
                    picker={cartProduct.picker}
                    productId={cartProduct.id}
                    handleSelectPickerColor={handleSelectPickerColor}
                    handleSelectPickerSize={handleSelectPickerSize}
                    handleIncreaseQuantity={handleIncreaseQuantity}
                    handleDecreaseQuantity={handleDecreaseQuantity}
                  />
                </ProductInfo>
              </CartProduct>
              <ProductUnderline></ProductUnderline>
            </CartProductContainer>
          ))}
          <CartProductsCheckedBlock>
            <StyledSharedSelectionHeader>
              <CheckedAllButtonContainer>
                {!checkedAllState && (
                  <SharedNoneCheckedButton
                    onClick={() => {
                      handleToggleSelectAllProducts();
                    }}
                  />
                )}
                {checkedAllState && (
                  <SharedCheckedAllButton
                    onClick={() => {
                      handleToggleSelectAllProducts();
                    }}
                  />
                )}
                全選
              </CheckedAllButtonContainer>
              <StyledSharedTotalPriceShower>
                總金額：NTD {checkedPrice}
              </StyledSharedTotalPriceShower>
            </StyledSharedSelectionHeader>
            {checkedState && (
              <CTAPrimaryButton
                margin={"0 0 0 auto"}
                width={"16rem"}
                isRounded={true}
              >
                結帳去
              </CTAPrimaryButton>
            )}
            {!checkedState && (
              <CTASecondaryButton
                margin={"0 0 0 auto"}
                width={"16rem"}
                isRounded={true}
              >
                沒有物品可結帳
              </CTASecondaryButton>
            )}
          </CartProductsCheckedBlock>
        </CartProductsForPad>
      </ContentContainer>
      <Footer marginBottom={"10rem"} />
    </PageContainer>
  );
}
