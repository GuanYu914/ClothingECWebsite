import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styled from "styled-components";
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
  COLOR_SECONDARY2,
  COLOR_SECONDARY3,
  BG_PRIMARY1,
  BG_SECONDARY4,
  COLOR_PRIMARY2,
} from "../../constant";
import {
  CartContext,
  UserContext,
  FavoriteItemsContext,
  WatchedProductsContext,
} from "../../context";
import { useTransition, animated } from "react-spring";
import { useHistory, useParams } from "react-router";
import { getProductByIDApi } from "../../Webapi";
import Loader from "../../components/loader";
import Modal from "../../components/modal";
import { isEmptyObj } from "../../util";

const PageContainer = styled.div`
  background-color: ${BG_SECONDARY4};
`;
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
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  padding-top: 1rem;
  margin-bottom: 1rem;
  // 根據不同裝置寬度預設跟 Header 保持 margin-top: 0
  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE});
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD});
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
  color: ${COLOR_SECONDARY2};
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
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY2};
`;

const FavoriteIcon = styled(heart)`
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const FavoriteFilledIcon = styled(heartFilled)`
  color: ${COLOR_PRIMARY2};
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const DetailInfoContainer = styled.div`
  margin-top: 3rem;
`;

const DetailInfoTitle = styled.h1.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
`;

const DetailInfoDescBlock = styled.div`
  margin-top: 1rem;
`;

const DetailInfoDescBlockSubTitle = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
`;

const DetailInfoDescBlockBody = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  margin-bottom: 2rem;
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
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
`;

const ProductAddButton = styled.div.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_PRIMARY1};
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

const CartIcon = styled(cart)`
  color: ${COLOR_SECONDARY3};
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
`;

const ReminderMsg = styled.h2.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY3};
`;

export default function SingleProductPage() {
  // 透過 React router hook 拿到特定網址資訊
  const { productID } = useParams();
  // 透過此 hook 換頁
  const history = useHistory();
  // 透過 UserContext 拿到用戶資訊
  const { user } = useContext(UserContext);
  // 透過 FavoriteItemsContext 拿到當前用戶收藏清單跟 setter function
  const { favoriteItems, setFavoriteItems } = useContext(FavoriteItemsContext);
  // 透過 CartContext 拿到購物車資訊
  const { cart, setCart } = useContext(CartContext);
  // 透過 WatchedProductContext 拿到近期瀏覽的商品
  const { watchedProducts, setWatchedProducts } = useContext(
    WatchedProductsContext
  );
  //  產品資訊讀取狀態
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  // 已看過產品清單讀取狀態
  const [isLoadingWatchedProducts, setIsLoadingWatchedProducts] =
    useState(false);
  // 頁面產品資訊
  const [productInfo, setProductInfo] = useState({});
  // 產品幻燈片，根據螢幕寬度給不同 props 到 BSCarousel 元件
  const [slidesForMobile, setSlidesForMobile] = useState({
    frame: {
      maxHeight: "30rem",
      borderRadius: "2rem",
    },
    slide: [],
  });
  const [slidesForPad, setSlidesForPad] = useState({
    frame: {
      maxHeight: "40rem",
      borderRadius: "2rem",
    },
    slide: [],
  });
  // 顯示產品分類路徑名稱
  const [displayedCategoryPath, setDisplayedCategoryPath] = useState();
  // mobile 裝置底下， product-picker 元件啟用狀態
  const [mobilePickerState, setMobilePickerState] = useState(false);
  // 當前頁面可以被執行有關購物車相關的操作狀態
  const [activeOpState, setActiveOpState] = useState(false);
  // 加入購物車動畫時間
  const showCartReminderDuration = 500;
  // 是否要顯示加入購物車的動畫
  const [showCartReminder, setShowCartReminder] = useState(false);
  // 加入購物車訊息動畫
  const showCartReminderAnimation = useTransition(showCartReminder, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: showCartReminderDuration,
    },
  });
  // 是否要顯示 api 發送錯誤的 modal
  const [showModalForApiError, setShowModalForApiError] = useState(false);
  // api 發送錯誤的 modal 資訊
  const [modalInfoForApiError] = useState({
    selectionMode: false,
    title: "發生一點小錯誤",
    content: "由於伺服器或網路異常，請稍後再試一次",
  });

  // mobile 裝置下，點選 "選擇商品規格" 事件
  function handleSelectProductSpecOnMobile() {
    // 重設所有先前用戶點選的選項
    setProductInfo({
      ...productInfo,
      picker: {
        ...productInfo.picker,
        colors: productInfo.picker.colors.map((color) => ({
          ...color,
          selected: false,
        })),
        sizes: productInfo.picker.sizes.map((size) => ({
          ...size,
          selected: false,
        })),
        quantity: 1,
      },
    });
    // 叫出 mobile 裝置底下的 product-picker 元件
    setMobilePickerState(true);
  }
  // 更新當前頁面愛心狀態
  function handleAddToLikedItems() {
    // 更新當前頁面愛心狀態
    setProductInfo({ ...productInfo, isLiked: !productInfo.isLiked });
    // 透過當前頁面愛心狀態，更新用戶收藏清單跟產品觀看歷史紀錄清單的愛心狀態
    if (!productInfo.isLiked) {
      setFavoriteItems([
        {
          ...productInfo,
          product: {
            name: productInfo.name,
            price: productInfo.picker.unitPrice,
            img: productInfo.imgs[0].src,
          },
          isLiked: true,
        },
        ...favoriteItems,
      ]);
      setWatchedProducts(
        watchedProducts.map((watchedProduct) =>
          watchedProduct.id === productInfo.id
            ? {
                ...watchedProduct,
                isLiked: true,
              }
            : { ...watchedProduct }
        )
      );
    } else {
      setFavoriteItems(
        favoriteItems.filter(
          (favoriteItem) => favoriteItem.id !== productInfo.id
        )
      );
      setWatchedProducts(
        watchedProducts.map((watchedProduct) =>
          watchedProduct.id === productInfo.id
            ? { ...watchedProduct, isLiked: false }
            : { ...watchedProduct }
        )
      );
    }
  }
  // 選擇商品顏色
  function handleSelectPickerColor(id) {
    setProductInfo({
      ...productInfo,
      picker: {
        ...productInfo.picker,
        colors: productInfo.picker.colors.map((color) =>
          color.id === id
            ? { ...color, selected: true }
            : { ...color, selected: false }
        ),
      },
    });
  }
  // 選擇商品尺寸
  function handleSelectPickerSize(id) {
    setProductInfo({
      ...productInfo,
      picker: {
        ...productInfo.picker,
        sizes: productInfo.picker.sizes.map((size) =>
          size.id === id
            ? { ...size, selected: true }
            : { ...size, selected: false }
        ),
      },
    });
  }
  // 增加購買數量
  function handleIncreaseQuantity() {
    setProductInfo({
      ...productInfo,
      picker: {
        ...productInfo.picker,
        quantity: productInfo.picker.quantity + 1,
      },
    });
  }
  // 減少購買數量
  function handleDecreaseQuantity() {
    if (productInfo.picker.quantity == 1) return;
    setProductInfo({
      ...productInfo,
      picker: {
        ...productInfo.picker,
        quantity: productInfo.picker.quantity - 1,
      },
    });
  }
  // 檢查當前狀態使否可以點選 "直接購買" 跟 "加入購物車" 按鈕
  function checkActiveState() {
    let colorChecked = false;
    let sizeChecked = false;
    for (let i = 0; i < productInfo.picker.colors.length; i++) {
      if (productInfo.picker.colors[i].selected) {
        colorChecked = true;
        break;
      }
    }
    for (let j = 0; j < productInfo.picker.sizes.length; j++) {
      if (productInfo.picker.sizes[j].selected) {
        sizeChecked = true;
        break;
      }
    }
    return colorChecked && sizeChecked;
  }
  // 點選 "加入購物車" 按鈕
  function handleAddToCart(selectedPickerColor, selectedPickerSize) {
    // 找尋購物車內是否有一樣產品規格
    let flagFind = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].pid === productInfo.id) {
        if (
          cart[i].colors.filter((color) => color.selected)[0].hexcode ===
          selectedPickerColor
        ) {
          if (
            cart[i].sizes.filter((size) => size.selected)[0].name ===
            selectedPickerSize
          ) {
            // 找到一樣規格的產品，更新該產品目前數量
            // 防止 state 被 batch，造成資料不是預期的
            setCart((prevCartContext) => {
              return prevCartContext.map((product, index) =>
                index === i
                  ? {
                      ...product,
                      quantity: product.quantity + productInfo.picker.quantity,
                    }
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
      // 複製 cart 內容，但 ref 不一樣，造成 react 去更新
      const newCart = [...cart];
      newCart.unshift({
        id: cart.length + 1,
        pid: productInfo.id,
        name: productInfo.name,
        urls: productInfo.imgs,
        colors: productInfo.picker.colors,
        sizes: productInfo.picker.sizes,
        quantity: productInfo.picker.quantity,
        unitPrice: productInfo.picker.unitPrice,
      });
      setCart(newCart);
    }
    // 顯示加入購物車訊息動畫
    setShowCartReminder(true);
  }
  // 點選 "直接購買" 按鈕
  function handleCheckout(selectedPickerColor, selectedPickerSize) {
    // 加入到購物車且導引到 cart page
    handleAddToCart(selectedPickerColor, selectedPickerSize);
    history.push("/cart");
  }
  // 更新 watchedItems 裡面物件的 isLiked 屬性
  function handleUpdateItemLikedState(id) {
    // 更新 watchedItems 裡面物件的 isLiked 屬性
    setWatchedProducts(
      watchedProducts.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : { ...item }
      )
    );
    // 根據 watchedItems 裡面的 isLiked 屬性，同步更新用戶收藏清單跟產品觀看歷史紀錄清單的愛心狀態
    watchedProducts.forEach((el) => {
      if (el.id === id) {
        if (!el.isLiked) {
          setFavoriteItems([{ ...el, isLiked: true }, ...favoriteItems]);
          setProductInfo({
            ...productInfo,
            isLiked: true,
          });
        } else {
          setFavoriteItems(
            favoriteItems.filter((favoriteItem) => favoriteItem.id !== id)
          );
          setProductInfo({
            ...productInfo,
            isLiked: false,
          });
        }
      }
    });
  }
  // 拿產品相關資訊，並設置相關狀態
  function getProductInfoFromApi(id) {
    setIsLoadingProduct(true);
    setIsLoadingWatchedProducts(true);
    getProductByIDApi(id)
      .then((resp) => {
        const json_data = resp.data;
        if (json_data.isSuccessful === "failed") {
          console.log("server side error, check response...", json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === "successful") {
          const json_data_for_product = resp.data.data[0];
          setProductInfo({
            id: json_data_for_product.pid, // 將 pid 當作 productInfo.id
            category: JSON.parse(json_data_for_product.category),
            name: json_data_for_product.name,
            detail: JSON.parse(json_data_for_product.detail),
            imgs: JSON.parse(json_data_for_product.imgs),
            picker: {
              sizes: JSON.parse(json_data_for_product.sizes).map((size) => ({
                ...size,
                selected: false,
              })),
              colors: JSON.parse(json_data_for_product.colors).map((color) => ({
                ...color,
                selected: false,
              })),
              quantity: 1,
              unitPrice: json_data_for_product.price,
            },
            isLiked: checkIfUserLikeTheProduct(json_data_for_product.pid),
          });
          setSlidesForMobile({
            ...slidesForMobile,
            slide: JSON.parse(json_data_for_product.imgs),
          });
          setSlidesForPad({
            ...slidesForPad,
            slide: JSON.parse(json_data_for_product.imgs),
          });
          // 加到 watchedProducts
          const newWatchedProducts = filteredWatchedProducts(
            watchedProducts,
            json_data_for_product.pid
          );
          setWatchedProducts([
            {
              id: json_data_for_product.pid,
              product: {
                name: json_data_for_product.name,
                price: `${json_data_for_product.price}`,
                img: JSON.parse(json_data_for_product.imgs)[0].src,
              },
              isLiked: checkIfUserLikeTheProduct(json_data_for_product.pid),
            },
            ...newWatchedProducts,
          ]);
          setIsLoadingProduct(false);
          setIsLoadingWatchedProducts(false);
        }
      })
      .catch((e) => {
        console.log(
          "some errors were happened when setting data from api, error is ",
          e
        );
        setShowModalForApiError(true);
      });
  }
  // 拿到產品所在分類目錄
  function getCategoryPathOfProduct() {
    let categoryPath = "";
    if (productInfo.category.base !== "none") {
      categoryPath += productInfo.category.base;
    }
    if (productInfo.category.main !== "none") {
      categoryPath += " > " + productInfo.category.main;
    }
    if (productInfo.category.sub !== "none") {
      categoryPath += " > " + productInfo.category.sub;
    }
    if (productInfo.category.detailed !== "none") {
      categoryPath += " > " + productInfo.category.detailed;
    }
    return categoryPath;
  }
  // 移除已經在清單裡的產品
  function filteredWatchedProducts(context, pid) {
    return context.filter((el) => el.id !== pid);
  }
  // 導引到相對應的產品頁面
  function handleRedirectToProductPage(e) {
    const id = e.target.getAttribute("data-id");
    // 如果點擊的是當前產品 id 則不理會
    if (productID === id) return;
    getProductInfoFromApi(id);
    history.push(`/product/${id}`);
  }
  // modal 顯示情境: api 發送過程中有誤
  // 處理點選按鈕事件
  function handleSubmitOpForApiError() {
    setShowModalForApiError(false);
  }
  // modal 顯示情境: api 發送過程中有誤
  // 處理點選按鈕之外事件
  function handleCancelOpForApiError() {
    setShowModalForApiError(false);
  }
  // 傳入 product 的 id，並根據當前用戶的收藏清單，回傳是否喜歡此產品
  function checkIfUserLikeTheProduct(id) {
    if (isEmptyObj(user)) return false;
    for (let i = 0; i < favoriteItems.length; i++) {
      if (favoriteItems[i].id === id) return true;
    }
    return false;
  }

  // 第一次 Render 結束
  useEffect(() => {
    getProductInfoFromApi(productID);
  }, []);
  // 若重複點擊，則暫緩顯示購物車訊息
  useEffect(() => {
    if (showCartReminder) {
      setTimeout(() => {
        setShowCartReminder(false);
      }, showCartReminderDuration * 3);
    }
  }, [showCartReminder]);
  // 如果 picker 有被點選，且不是正在讀取中，則更新目前購物操作狀態
  useEffect(() => {
    if (!isLoadingProduct) {
      setActiveOpState(checkActiveState());
    }
  }, [productInfo.picker]);
  // 若產品狀態讀取完畢，則更新分類路徑名稱
  useEffect(() => {
    if (!isLoadingProduct) {
      setDisplayedCategoryPath(getCategoryPathOfProduct());
    }
  }, [isLoadingProduct]);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        {isLoadingProduct ? (
          <Loader />
        ) : (
          <>
            <ProductCategoryPath>{displayedCategoryPath}</ProductCategoryPath>
            <ProductInfoForMobile>
              <BSCarousel slides={slidesForMobile} />
              <ProductInfoContainer>
                <ProductName>{productInfo.name}</ProductName>
                {!isEmptyObj(user) && (
                  <>
                    {productInfo.isLiked ? (
                      <FavoriteFilledIcon onClick={handleAddToLikedItems} />
                    ) : (
                      <FavoriteIcon onClick={handleAddToLikedItems} />
                    )}
                  </>
                )}
              </ProductInfoContainer>
              <DetailInfoContainer>
                <DetailInfoTitle>詳細資訊</DetailInfoTitle>
                <DetailInfoDescBlock>
                  <DetailInfoDescBlockSubTitle>
                    產品尺碼
                  </DetailInfoDescBlockSubTitle>
                  <DetailInfoDescBlockBody>
                    {productInfo.detail.size}
                  </DetailInfoDescBlockBody>
                  <DetailInfoDescBlockSubTitle>
                    運費注意事項
                  </DetailInfoDescBlockSubTitle>
                  <DetailInfoDescBlockBody>
                    {productInfo.detail.shipment}
                  </DetailInfoDescBlockBody>
                  <DetailInfoDescBlockSubTitle>
                    清潔須知
                  </DetailInfoDescBlockSubTitle>
                  <DetailInfoDescBlockBody>
                    {productInfo.detail.cleanness}
                  </DetailInfoDescBlockBody>
                </DetailInfoDescBlock>
              </DetailInfoContainer>
            </ProductInfoForMobile>
            <ProductInfoContainerForPad>
              <BSCarousel slides={slidesForPad} />
              <ProductInfoContainer>
                <ProductHeaderContainer>
                  <ProductName>{productInfo.name}</ProductName>
                  {!isEmptyObj(user) && (
                    <>
                      {productInfo.isLiked ? (
                        <FavoriteFilledIcon onClick={handleAddToLikedItems} />
                      ) : (
                        <FavoriteIcon onClick={handleAddToLikedItems} />
                      )}
                    </>
                  )}
                </ProductHeaderContainer>
                <ProductPicker
                  picker={productInfo.picker}
                  usedOnPad={true}
                  handleSelectPickerColor={handleSelectPickerColor}
                  handleSelectPickerSize={handleSelectPickerSize}
                  handleIncreaseQuantity={handleIncreaseQuantity}
                  handleDecreaseQuantity={handleDecreaseQuantity}
                  activeOpState={activeOpState}
                  setMobilePickerState={handleSelectProductSpecOnMobile}
                  isLiked={productInfo.isLiked}
                  handleAddToLikedItems={handleAddToLikedItems}
                  handleAddToCart={handleAddToCart}
                  handleCheckout={handleCheckout}
                />
                <DetailInfoContainer>
                  <DetailInfoTitle>詳細資訊</DetailInfoTitle>
                  <DetailInfoDescBlock>
                    <DetailInfoDescBlockSubTitle>
                      產品尺碼
                    </DetailInfoDescBlockSubTitle>
                    <DetailInfoDescBlockBody>
                      {productInfo.detail.size}
                    </DetailInfoDescBlockBody>
                    <DetailInfoDescBlockSubTitle>
                      運費注意事項
                    </DetailInfoDescBlockSubTitle>
                    <DetailInfoDescBlockBody>
                      {productInfo.detail.shipment}
                    </DetailInfoDescBlockBody>
                    <DetailInfoDescBlockSubTitle>
                      清潔須知
                    </DetailInfoDescBlockSubTitle>
                    <DetailInfoDescBlockBody>
                      {productInfo.detail.cleanness}
                    </DetailInfoDescBlockBody>
                  </DetailInfoDescBlock>
                </DetailInfoContainer>
              </ProductInfoContainer>
            </ProductInfoContainerForPad>
          </>
        )}
        {isLoadingWatchedProducts ? (
          <Loader />
        ) : (
          <WatchedItemsContainer>
            <WatchedItemsTitle>近期看過的商品</WatchedItemsTitle>
            <CardContainer
              items={watchedProducts}
              handleLiked={handleUpdateItemLikedState}
              handleOnClick={handleRedirectToProductPage}
              marginLeft={"0"}
            />
          </WatchedItemsContainer>
        )}
      </ContentContainer>
      {/* 這是 mobile 裝置上的底部按鈕 */}
      <ProductAddButton onClick={handleSelectProductSpecOnMobile}>
        選擇商品規格
      </ProductAddButton>
      {mobilePickerState && (
        // 適用於 mobile breakpoint
        <ProductPicker
          picker={productInfo.picker}
          usedOnMobile={true}
          handleSelectPickerColor={handleSelectPickerColor}
          handleSelectPickerSize={handleSelectPickerSize}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          activeOpState={activeOpState}
          setMobilePickerState={setMobilePickerState}
          isLiked={productInfo.isLiked}
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
      {showModalForApiError && (
        <Modal
          modalInfo={modalInfoForApiError}
          handleSubmitOp={handleSubmitOpForApiError}
          handleCancelOp={handleCancelOpForApiError}
        />
      )}
      <Footer bgColor={BG_PRIMARY1} marginTop="6rem" marginBottom="4rem" />
    </PageContainer>
  );
}
