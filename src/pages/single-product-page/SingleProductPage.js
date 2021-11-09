import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styled from "styled-components/macro";
import BSCarousel from "../../components/bs-carousel/BSCarousel";
import CardContainer from "../../components/card-container";
import ProductPicker from "../../components/product-picker";
import { useEffect, useState, useContext } from "react";
import { ReactComponent as heart } from "../../imgs/pages/single-product-page/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/pages/single-product-page/heart-fill.svg";
import { ReactComponent as cart } from "../../imgs/pages/single-product-page/cart.svg";
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
  Z_INDEX_LV2,
  Z_INDEX_LV6,
  COLOR_PRIMARY1,
} from "../../constant";
import { CartContext, UserContext } from "../../context";
import { useTransition, animated } from "react-spring";
import { useHistory } from "react-router";

const PageContainer = styled.div``;
const ContentContainer = styled.div`
  // 定義容器最大寬度
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
  // 大於 1440px 寬度時，改變左右 padding
  ${BREAKPOINT_LAPTOP} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const ProductCategoryPath = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  margin-bottom: 1rem;
  // 根據不同裝置寬度預設跟 Header 保持 margin-top: 1rem
  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE} + 1rem);
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD} + 1rem);
  }
`;

const ProductInfoForMobile = styled.div`
  display: block;

  ${BREAKPOINT_MOBILE} {
    display: block;
  }

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const ProductInfoContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${BREAKPOINT_PAD} {
    display: block;
    margin-top: 0;
    flex-grow: 1;
    padding-left: 0.8rem;
  }
`;

const ProductHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProductName = styled.h1.attrs(() => ({
  className: "fs-h1 color-secondary2",
}))``;

const FavoriteIcon = styled(heart)`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

const FavoriteFilledIcon = styled(heartFilled)`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

const DetailInfoContainer = styled.div`
  margin-top: 3rem;
`;

const DetailInfoTitle = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))``;

const DetailInfoDesc = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  margin-top: 1rem;
`;

const ProductInfoContainerForPad = styled.div`
  display: none;

  ${BREAKPOINT_MOBILE} {
    display: none;
  }

  ${BREAKPOINT_PAD} {
    display: flex;
  }
`;

const WatchedItemsContainer = styled.div`
  margin-top: 2rem;
`;

const WatchedItemsTitle = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))``;

const ProductAddButton = styled.div.attrs(() => ({
  className: "fs-h2 bg-primary1 color-secondary3",
}))`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.04) 0px -3px 5px;
  z-index: ${Z_INDEX_LV2};

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const AddToCartReminderMsg = styled(animated.div).attrs(() => ({
  className: "box-shadow-dark",
}))`
  position: fixed;
  // 為了讓 .svg 檔案能夠水平居中
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${Z_INDEX_LV6};
  background-color: ${COLOR_PRIMARY1};
  padding: 1.5rem;
  border-radius: 0.8rem;
`;

const CartIcon = styled(cart).attrs(() => ({
  className: "color-secondary3",
}))`
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
`;

const ReminderMsg = styled.h2.attrs(() => ({
  className: "fs-h3 color-secondary3",
}))``;

export default function SingleProductPage() {
  // 透過 UserContext 拿到用戶資訊
  const userContext = useContext(UserContext);
  // 透過此 hook 換頁
  const history = useHistory();
  // 透過 CartContext 拿到購物車資訊
  const { cartContext, setCartContext } = useContext(CartContext);
  // 頁面產品資訊
  const [productInfo, setProductInfo] = useState({
    id: 1,
    pid: 4784,
    name: "女版襯衫",
    detail: "這邊需要提供運費、尺寸、商品品質及清洗注意事項",
    imgs: [
      {
        id: 1,
        src: "https://i.imgur.com/C7SYk0P.jpg",
        alt: "product_pic",
      },
      {
        id: 2,
        src: "https://i.imgur.com/Dfav1Yk.jpg",
        alt: "product_pic",
      },
    ],
    colors: [
      { id: 1, hexcode: "#ffce30", selected: false },
      { id: 2, hexcode: "#e83845", selected: false },
      { id: 3, hexcode: "#e389b9", selected: false },
      { id: 4, hexcode: "#746ab0", selected: false },
      { id: 5, hexcode: "#288ba8", selected: false },
    ],
    sizes: [
      { id: 1, name: "XS", selected: false },
      { id: 2, name: "S", selected: false },
      { id: 3, name: "M", selected: false },
      { id: 4, name: "L", selected: false },
      { id: 5, name: "XL", selected: false },
      { id: 6, name: "2L", selected: false },
    ],
    quantity: 1,
    unitPrice: 490,
  });
  // 根據螢幕寬度給不同 props 到 BSCarousel 元件
  // 使用假資料
  const [slidesForMobile, setSlidesForMobile] = useState({
    frame: {
      maxHeight: "22rem",
      borderRadius: "2rem",
    },
    slide: productInfo.imgs,
  });

  const [slidesForPad, setSlidesForPad] = useState({
    frame: {
      borderRadius: "2rem",
    },
    slide: productInfo.imgs,
  });
  // mobile 裝置底下， product-picker 元件啟用狀態
  const [mobilePickerState, setMobilePickerState] = useState(false);
  // 儲存當前頁面，愛心是否被點擊狀態
  const [isLiked, setIsLiked] = useState(false);
  // 給 picker 的資訊，適用於 mobile 跟 pad
  // 使用假資料
  const [picker, setPicker] = useState({
    colors: productInfo.colors,
    sizes: productInfo.sizes,
    quantity: productInfo.quantity,
    unitPrice: productInfo.unitPrice,
  });
  const [activeOpState, setActiveOpState] = useState(false);
  // 加入購物車訊息動畫
  const showCartReminderDuration = 500;
  const [showCartReminder, setShowCartReminder] = useState(false);
  const showCartReminderAnimation = useTransition(showCartReminder, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: showCartReminderDuration,
    },
  });
  // 使用假資料
  const [watchedItems, setWatchItems] = useState([
    {
      id: 1,
      product: { name: "牛仔短褲", price: "489" },
      isLiked: false,
    },
    {
      id: 2,
      product: { name: "修身寬褲", price: "699" },
      isLiked: true,
    },
    {
      id: 3,
      product: {
        name: "迪士尼聯名短袖",
        price: "899",
      },
      isLiked: true,
    },
  ]);

  // Render 完會做的事
  useEffect(() => {
    // 這裡可以檢查目前以下變數狀態
    // console.log("picker 狀態", picker);
    // console.log("cartContext 狀態", cartContext);
    // console.log("showCartReminder 狀態", showCartReminder);
    // 更新底部按鈕配色
    setActiveOpState(checkOP());
    // 自動隱藏加入購物車訊息
    if (showCartReminder) {
      setTimeout(() => {
        setShowCartReminder(false);
      }, showCartReminderDuration * 3);
    }
  }, [showCartReminder, cartContext, picker, activeOpState]);

  function handleProductAdd() {
    // 叫出 mobile 裝置底下的 product-picker 元件
    setMobilePickerState(true);
  }
  // 更新當前頁面愛心狀態
  function handleAddToLikedItems() {
    setIsLiked(!isLiked);
  }

  function handleSelectPickerColor(id) {
    setPicker({
      ...picker,
      colors: picker.colors.map((color) =>
        color.id === id
          ? { ...color, selected: true }
          : { ...color, selected: false }
      ),
    });
  }

  function handleSelectPickerSize(id) {
    setPicker({
      ...picker,
      sizes: picker.sizes.map((size) =>
        size.id === id
          ? { ...size, selected: true }
          : { ...size, selected: false }
      ),
    });
  }

  function handleIncreaseQuantity() {
    setPicker({
      ...picker,
      quantity: picker.quantity + 1,
    });
  }

  function handleDecreaseQuantity() {
    if (picker.quantity == 1) return;
    setPicker({
      ...picker,
      quantity: picker.quantity - 1,
    });
  }

  function checkOP() {
    let colorChecked = false;
    let sizeChecked = false;
    for (let i = 0; i < picker.colors.length; i++) {
      if (picker.colors[i].selected) {
        colorChecked = true;
        break;
      }
    }
    for (let j = 0; j < picker.sizes.length; j++) {
      if (picker.sizes[j].selected) {
        sizeChecked = true;
        break;
      }
    }

    return colorChecked && sizeChecked;
  }

  function handleAddToCart(selectedPickerColor, selectedPickerSize) {
    // 找尋購物車內是否有一樣產品規格
    let flagFind = false;
    for (let i = 0; i < cartContext.length; i++) {
      if (cartContext[i].pid === productInfo.pid) {
        if (
          cartContext[i].colors.filter((color) => color.selected)[0].hexcode ===
          selectedPickerColor
        ) {
          if (
            cartContext[i].sizes.filter((size) => size.selected)[0].name ===
            selectedPickerSize
          ) {
            // 找到一樣規格的產品，更新該產品目前數量
            // 防止 state 被 batch，造成資料不是預期的
            setCartContext((prevCartContext) => {
              return prevCartContext.map((product, index) =>
                index === i
                  ? { ...product, quantity: product.quantity + picker.quantity }
                  : { ...product }
              );
            });
            flagFind = true;
            break;
          }
        }
      }
    }
    // 未找到相同規格的產品，新增到購物車頂端
    if (!flagFind) {
      // 複製 cartContext 內容，但 ref 不一樣，造成 react 去更新
      const newCartContext = [...cartContext];
      newCartContext.unshift({
        id: cartContext.length + 1,
        pid: productInfo.pid,
        name: productInfo.name,
        urls: productInfo.imgs,
        colors: picker.colors,
        sizes: picker.sizes,
        quantity: picker.quantity,
        unitPrice: picker.unitPrice,
      });
      setCartContext(newCartContext);
    }
    // 顯示加入購物車訊息動畫
    setShowCartReminder(true);
  }

  function handleCheckout(
    selectedPickerColor,
    selectedPickerSize,
    selectedPickerQuantity
  ) {
    // 加入到購物車且導引到 cart page
    handleAddToCart(
      selectedPickerColor,
      selectedPickerSize,
      selectedPickerQuantity
    );
    history.push("/cart");
  }

  // 更新 watchedItems 裡面物件的 isLiked 屬性
  function handleUpdateItemLikedState(id) {
    setWatchItems(
      watchedItems.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : { ...item }
      )
    );
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ProductCategoryPath>
          首頁 &gt; 分類 &gt; 女裝 &gt; 秋冬款
        </ProductCategoryPath>
        <ProductInfoForMobile>
          <BSCarousel slides={slidesForMobile} />
          <ProductInfoContainer>
            <ProductName>女版襯衫</ProductName>
            {userContext !== null && (
              <>
                {isLiked && (
                  <FavoriteFilledIcon onClick={handleAddToLikedItems} />
                )}
                {!isLiked && <FavoriteIcon onClick={handleAddToLikedItems} />}
              </>
            )}
          </ProductInfoContainer>
          <DetailInfoContainer>
            <DetailInfoTitle>詳細資訊</DetailInfoTitle>
            <DetailInfoDesc>
              這邊會需要提供運費、尺寸、商品材質以及清洗注意事項
            </DetailInfoDesc>
          </DetailInfoContainer>
        </ProductInfoForMobile>
        <ProductInfoContainerForPad>
          <BSCarousel slides={slidesForPad} />
          <ProductInfoContainer>
            <ProductHeaderContainer>
              <ProductName>{productInfo.name}</ProductName>
              {userContext !== null && (
                <>
                  {isLiked && (
                    <FavoriteFilledIcon onClick={handleAddToLikedItems} />
                  )}
                  {!isLiked && <FavoriteIcon onClick={handleAddToLikedItems} />}
                </>
              )}
            </ProductHeaderContainer>
            <ProductPicker
              picker={picker}
              usedOnPad={true}
              handleSelectPickerColor={handleSelectPickerColor}
              handleSelectPickerSize={handleSelectPickerSize}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              activeOpState={activeOpState}
              setMobilePickerState={handleProductAdd}
              isLiked={isLiked}
              handleAddToLikedItems={handleAddToLikedItems}
              handleAddToCart={handleAddToCart}
              handleCheckout={handleCheckout}
            />
            <DetailInfoContainer>
              <DetailInfoTitle>詳細資訊</DetailInfoTitle>
              <DetailInfoDesc>{productInfo.detail}</DetailInfoDesc>
            </DetailInfoContainer>
          </ProductInfoContainer>
        </ProductInfoContainerForPad>
        <WatchedItemsContainer>
          <WatchedItemsTitle>近期看過的商品</WatchedItemsTitle>
          <CardContainer
            items={watchedItems}
            handleLiked={handleUpdateItemLikedState}
            marginLeft={"0"}
          />
        </WatchedItemsContainer>
      </ContentContainer>
      {/* 這是 mobile 裝置上的底部按鈕 */}
      <ProductAddButton onClick={handleProductAdd}>
        選擇商品規格
      </ProductAddButton>
      {mobilePickerState && (
        // 適用於 mobile breakpoint
        <ProductPicker
          picker={picker}
          usedOnMobile={true}
          handleSelectPickerColor={handleSelectPickerColor}
          handleSelectPickerSize={handleSelectPickerSize}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          activeOpState={activeOpState}
          setMobilePickerState={setMobilePickerState}
          isLiked={isLiked}
          handleAddToLikedItems={handleAddToLikedItems}
          handleAddToCart={handleAddToCart}
          handleCheckout={handleCheckout}
        />
      )}
      {/* 這是用來提醒用戶商品被加入購物車的訊息 */}
      {showCartReminderAnimation(
        (props, item) =>
          item && (
            <AddToCartReminderMsg style={props}>
              <CartIcon />
              <ReminderMsg>已加入購物車</ReminderMsg>
            </AddToCartReminderMsg>
          )
      )}
      <Footer marginTop="6rem" marginBottom="4rem" />
    </PageContainer>
  );
}
