import styled, { keyframes } from "styled-components/macro";
import { fadeIn } from "react-animations";
import { useState, useEffect, useContext, useRef } from "react";
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
import {
  CTAPrimaryButton,
  CTASecondaryButton,
  GhostPrimaryButton,
} from "../../components/button";
import { ReactComponent as trash } from "../../imgs/pages/cart-page/trash.svg";
import { ReactComponent as checkNoneFilled } from "../../imgs/pages/cart-page/square.svg";
import { ReactComponent as checkFilled } from "../../imgs/pages/cart-page/check-square-fill.svg";
import { ReactComponent as questionSymbol } from "../../imgs/pages/cart-page/patch-question-fill.svg";
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
  Z_INDEX_LV1,
  Z_INDEX_LV5,
  Z_INDEX_LV6,
} from "../../constant";
import { CartContext } from "../../context";
import { useTransition, animated } from "react-spring";

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

const MaskContainer = styled(animated.div).attrs(() => ({
  className: "bg-mask",
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${Z_INDEX_LV5};
`;

const MergeSameProductReminderMsg = styled.div.attrs(() => ({
  className: "bg-primary1",
}))`
  width: 18rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  z-index: ${Z_INDEX_LV6};
  border-radius: 0.8rem;

  ${BREAKPOINT_MOBILE} {
    width: 18rem;
  }

  ${BREAKPOINT_PAD} {
    width: 24rem;
  }
`;

const MergeItemIcon = styled(questionSymbol).attrs(() => ({
  className: "color-secondary3",
}))`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
`;

const ReminderMsg = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary3",
}))``;

const MergeButtons = styled.div`
  margin-top: 1rem;
  display: flex;
`;
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
  // 加入詢問合併產品訊息動畫
  const showMergeProductMsgDuration = 500;
  const [showMergeProductMsg, setShowMergeProductMsg] = useState(false);
  const showMergeProductMsgAnimation = useTransition(showMergeProductMsg, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, display: "none" },
    config: {
      duration: showMergeProductMsgDuration,
    },
  });
  // 使用 useRef 暫存目前需要被合併的產品 id
  const mergeProductId = useRef(null);
  useEffect(() => {
    // 鎖定畫面不能滑動
    const bodyEl = document.querySelector("body");
    if (showMergeProductMsg) {
      bodyEl.classList.add("body-frozen");
    } else {
      bodyEl.classList.remove("body-frozen");
    }
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
  }, [showMergeProductMsg, cartProducts, checkedState, checkedPrice]);

  function handleSelectPickerColor(productId, colorId) {
    mergeProductId.current = checkSameProduct(productId, colorId, null);
    // 如果沒有找到相同的產品需要合併的
    if (mergeProductId.current === undefined) {
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
    // 如果有則跳出訊息，讓用戶選擇
    else {
      setShowMergeProductMsg(true);
    }
  }

  function handleSelectPickerSize(productId, sizeId) {
    mergeProductId.current = checkSameProduct(productId, null, sizeId);
    // 如果沒有找到相同的產品需要合併的
    if (mergeProductId.current === undefined) {
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
    // 如果有則跳出訊息，讓用戶選擇
    else {
      setShowMergeProductMsg(true);
    }
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

  // 合併相同規格的產品 => 顏色跟尺寸必須一樣
  // mergeParent 代表合併那方，mergeChild 代表被合併那方
  function handleMergeSameProduct() {
    console.log(mergeProductId.current);
    const { mergeParent, mergeChild } = mergeProductId.current;
    let priceOfChild = cartProducts.filter(
      (product) => product.id === mergeChild
    )[0].picker.quantity;
    let newCartProducts = cartProducts
      .filter((product) => product.id !== mergeChild)
      .map((product) =>
        product.id === mergeParent
          ? {
              ...product,
              picker: {
                ...product.picker,
                quantity: product.picker.quantity + priceOfChild,
              },
            }
          : { ...product }
      );
    setCartProducts(newCartProducts);
    setShowMergeProductMsg(false);
  }

  // 尋找購物車內是否存在相同的規格的產品 => 顏色跟尺寸必須一樣
  // 如果找到可以合併的產品，回傳 mergeParent 代表合併那方，mergeChild 代表被合併那方
  // 沒有可合併的產品則回傳 undefined
  function checkSameProduct(productId, selectedColorId, selectedSizeId) {
    const searchedProduct = {
      pid: null,
      color: null,
      size: null,
    };
    // 根據 productId 拿到要搜尋的 pid, color, size
    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id === productId) {
        searchedProduct.pid = cartProducts[i].pid;
        // 代表用戶點選 size，color 欄位必須從 cartProducts 拿，size 則從給定的 selectedSizeId 拿
        if (selectedColorId === null) {
          searchedProduct.color = cartProducts[i].picker.colors.filter(
            (color) => color.selected
          )[0].hexcode;
          searchedProduct.size = cartProducts[i].picker.sizes.filter(
            (size) => size.id === selectedSizeId
          )[0].name;
        }
        // 代表用戶點選 color，size 欄位必須從 cartProducts 拿，color 則從給定的 selectedColorId 拿
        if (selectedSizeId === null) {
          searchedProduct.color = cartProducts[i].picker.colors.filter(
            (color) => color.id === selectedColorId
          )[0].hexcode;
          searchedProduct.size = cartProducts[i].picker.sizes.filter(
            (size) => size.selected
          )[0].name;
        }
      }
    }
    // 搜尋原本產品以外的產品，確認規格是否有相同
    for (let i = 0; i < cartProducts.length; i++) {
      if (cartProducts[i].id !== productId) {
        if (cartProducts[i].pid === searchedProduct.pid) {
          if (
            cartProducts[i].picker.colors.filter((color) => color.selected)[0]
              .hexcode === searchedProduct.color
          ) {
            if (
              cartProducts[i].picker.sizes.filter((size) => size.selected)[0]
                .name === searchedProduct.size
            ) {
              return {
                mergeParent: cartProducts[i].id,
                mergeChild: productId,
              };
            }
          }
        }
      }
    }
    return undefined;
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
      {/* 這是用來提醒用戶是否要合併相同產品的訊息 */}
      {showMergeProductMsgAnimation(
        (props, item) =>
          item && (
            <MaskContainer
              style={props}
              onClick={() => {
                setShowMergeProductMsg(false);
              }}
            >
              <MergeSameProductReminderMsg>
                <MergeItemIcon />
                <ReminderMsg>
                  購物車內有相同規格的產品，是否合併呢？
                </ReminderMsg>
                <MergeButtons>
                  <CTAPrimaryButton onClick={handleMergeSameProduct}>
                    確定
                  </CTAPrimaryButton>
                  <GhostPrimaryButton
                    border="0"
                    isRounded={true}
                    onClick={() => {
                      setShowMergeProductMsg(false);
                    }}
                  >
                    取消
                  </GhostPrimaryButton>
                </MergeButtons>
              </MergeSameProductReminderMsg>
            </MaskContainer>
          )
      )}
      <Footer marginBottom={"10rem"} />
    </PageContainer>
  );
}
