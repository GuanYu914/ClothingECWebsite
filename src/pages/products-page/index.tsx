import Header from "../../components/header";
import Footer from "../../components/footer";
import CardContainer from "../../components/card-container";
import { CTAPrimaryButton } from "../../components/button";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import {
  MAX_CONTAINER_WIDTH,
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  COLOR_PRIMARY1,
  Z_INDEX_LV2,
  PRODUCTS_QUERY_INIT_OFFSET,
  PRODUCTS_QUERY_INIT_LIMIT,
  PRODUCTS_QUERY_LIMIT,
  COLOR_SECONDARY2,
  COLOR_SECONDARY3,
  BG_PRIMARY1,
  BG_SECONDARY4,
  API_RESP_FAILED_MSG,
  API_RESP_SERVER_REJECT_OP_MSG,
  API_RESP_SUCCESSFUL_MSG,
  API_RESP_REQ_REJECT_ERR_MSG,
  FILTER_INIT_OPTION,
  FILTER_OPTION_1,
  FILTER_OPTION_2,
  FILTER_RESET_OPTION,
} from "../../constant";
import { ReactComponent as filterIcon } from "../../imgs/pages/products-page/caret-down-fill.svg";
import { ReactComponent as scrollUpIcon } from "../../imgs/pages/products-page/caret-up-fill.svg";
import { useState, useEffect } from "react";
import { getAllCategoriesApi, getProductsByCategoryApi } from "../../Webapi";
import DropDown from "../../components/dropdown";
import Loader from "../../components/loader";
import { useParams, useHistory } from "react-router";
import Modal from "../../components/modal";
import { isEmptyObj } from "../../util";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../../redux/reducers/FavoriteItemsSlice";
import { useReduxDispatch, useReduxSelector } from "../../redux/store";
import {
  ProductsInfoStatePayload,
  CategoriesInfoAPIRespPayload,
  ProductsByCategoryInfoAPIRespPayload,
  UseParamsHookPayload,
} from "./types";

const PageContainer = styled.div`
  background-color: ${BG_SECONDARY4};
`;
const ContentContainer = styled.main`
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

const ProductsCategoryPath = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  padding-top: 1rem;
  margin-bottom: 2rem;
  // 根據不同裝置寬度預設跟 Header 保持 margin-top: 0
  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE});
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD});
  }
`;

const ProductsInfo = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductsCounter = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
`;

const ProductsFilter = styled.div`
  color: ${COLOR_SECONDARY2};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FilterName = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  margin-right: 0.8rem;
`;

const FilterIcon = styled(filterIcon)<{ position?: string }>`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
  position: ${(props) => props.position || "static"};
  right: 0;
`;

const ProductsContainer = styled.section`
  margin-top: 3rem;

  ${BREAKPOINT_PAD} {
    display: flex;
  }
`;

const ProductsCategoryListContainer = styled.section`
  ${BREAKPOINT_MOBILE} {
    width: 100%;
    margin-bottom: 5rem;
  }

  ${BREAKPOINT_PAD} {
    display: block;
    flex-shrink: 0;
    margin-right: 4rem;
    // 預設 10rem 寬度
    width: 10rem;
  }
`;

const CategoryMainTitle = styled.ul.attrs(() => ({
  className: "fs-h2 color-secondary2 list-reset",
}))<{
  isSelected?: boolean;
}>`
  color: ${COLOR_SECONDARY2};
  margin-bottom: 1rem;
  list-style: none;
  position: relative;
  user-select: none;
  cursor: pointer;
  color: ${(props) => (props.isSelected ? COLOR_PRIMARY1 : COLOR_SECONDARY2)};

  &:hover {
    color: ${COLOR_PRIMARY1};
  }
`;

const fadeInAnimation = keyframes`${fadeIn}`;

const CategorySubTitle = styled.ul.attrs(() => ({
  className: "fs-h3 list-reset",
}))<{
  marginBottom?: string;
  isSelected?: boolean;
}>`
  color: ${COLOR_SECONDARY2};
  margin-bottom: ${(props) => props.marginBottom || "0"};
  margin-left: 1rem;
  list-style: none;
  user-select: none;
  color: ${(props) => (props.isSelected ? COLOR_PRIMARY1 : COLOR_SECONDARY2)};
  animation: 0.8s ${fadeInAnimation};

  &:hover {
    color: ${COLOR_PRIMARY1};
  }
`;

const CategoryDetailTitle = styled.li.attrs(() => ({
  className: "fs-h3 list-reset",
}))<{
  isSelected?: boolean;
}>`
  color: ${COLOR_SECONDARY2};
  margin-left: 1rem;
  list-style: none;
  user-select: none;
  color: ${(props) => (props.isSelected ? COLOR_PRIMARY1 : COLOR_SECONDARY2)};
  animation: 0.8s ${fadeInAnimation};

  &:hover {
    color: #9dcbdf;
  }
`;

const CardContainerForMobile = styled.section`
  ${BREAKPOINT_MOBILE} {
    display: block;
  }

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const CardContainerForPad = styled.section`
  ${BREAKPOINT_MOBILE} {
    display: none;
  }

  ${BREAKPOINT_PAD} {
    display: block;
  }
`;

const FloatingButtonForMobileAndPad = styled.button.attrs(() => ({
  className: "box-shadow-light fs-h3",
}))`
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_PRIMARY1};
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  position: fixed;
  bottom: 10rem;
  right: 0.5rem;
  border: none;
  z-index: ${Z_INDEX_LV2};
`;

const ScrollToTopIcon = styled(scrollUpIcon)`
  display: block;
  margin: 0 auto;
  width: 2rem;
  height: 2rem;
`;

export default function ProductsPage() {
  // 透過 react router hook 拿到一開始的分類路徑
  let {
    mainCategoryFromRouter,
    subCategoryFromRouter,
    detailedCategoryFromRouter,
  } = useParams<UseParamsHookPayload>();
  // 拿到當前頁面的分類路徑
  // 透過 history 改變網址列內容
  let history = useHistory();
  // 產生 dispatch
  const dispatch = useReduxDispatch();
  // 從 redux-store 拿用戶資訊
  const userFromStore = useReduxSelector((store) => store.user.info);
  // 從 redux-store 拿喜好清單
  const favoriteItemsFromStore = useReduxSelector(
    (store) => store.favoriteItems.items
  );
  // 放分類路徑資訊、所有分類列表、該分類底下的所有產品清單
  const [productsInfo, setProductsInfo] = useState<ProductsInfoStatePayload>({
    categoryPath: {
      base: "分類",
      main: undefined,
      sub: undefined,
      detailed: undefined,
    },
    categoriesList: [],
    productsList: [],
    totalProductsNumber: 0,
  });
  // 儲存用來顯示的路徑字串
  const [displayedCategoryPath, setDisplayedCategoryPath] = useState("");
  // 儲存分類讀取狀態
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  // 儲存產品讀取狀態
  const [isLoadingProducts, setIsLoadingProductsBlock] = useState(true);
  // Filter 狀態參數
  const [filter, setFilter] = useState({
    width: "12rem",
    useForOption: true,
    zIndex: Z_INDEX_LV2,
    currentOption: FILTER_INIT_OPTION,
    options: [
      {
        id: 1,
        name: FILTER_OPTION_1,
      },
      {
        id: 2,
        name: FILTER_OPTION_2,
      },
    ],
  });
  // 控制 filter 是否要顯示
  const [showFilter, setShowFilter] = useState(false);
  // 儲存還沒有被 filtered 的 productsList
  const [noneFilteredProducts, setNoneFilteredProducts] = useState([]);
  // 用來控制顯示更多產品的相關參數
  const [productsListIndicator, setProductsListIndicator] = useState({
    offset: PRODUCTS_QUERY_INIT_OFFSET,
    limit: PRODUCTS_QUERY_INIT_LIMIT,
  });
  // 使否要顯示 "載入更多" 按鈕
  const [disableProductsListButton, setDisableProductsListButton] =
    useState(false);
  // 使否要顯示載入時動畫
  const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);
  // 是否要顯示 api 發送錯誤的 modal
  const [showModalForApiError, setShowModalForApiError] = useState(false);
  // api 發送錯誤的 modal 資訊
  const [ModalInfoForApiError] = useState({
    selectionMode: false,
    title: "發生一點小錯誤",
    content: "由於伺服器或網路異常，請稍後再試一次",
  });

  // 拿到所有分類清單
  function getAllCategoriesFromApi(): void {
    getAllCategoriesApi()
      .then((resp) => {
        const json_data = resp.data;
        if (json_data.isSuccessful === API_RESP_FAILED_MSG) {
          console.log(API_RESP_SERVER_REJECT_OP_MSG, json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          // 傳入 function 拿到最新的 state
          setProductsInfo((prevProductsInfo) => {
            return {
              ...prevProductsInfo,
              categoriesList: json_data.data.map(
                (el: CategoriesInfoAPIRespPayload) => ({
                  id: el.id,
                  name: el.name,
                  category: JSON.parse(el.category),
                  isSelected: el.name === mainCategoryFromRouter ? true : false,
                })
              ),
            };
          });
          setIsLoadingCategories(false);
        }
      })
      .catch((e) => {
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
        setShowModalForApiError(true);
      });
  }
  // 透過分類路徑拿到相對應得產品清單，並設定相關狀態
  function getProductsByCategoryFromApi(
    mainCategory: string,
    subCategory: string,
    detailedCategory: string,
    offset: number,
    limit: number,
    flagLoadMore = false
  ): void {
    // 先隱藏 filter
    setShowFilter(false);
    getProductsByCategoryApi(
      mainCategory,
      subCategory === "所有分類" ? undefined : subCategory,
      detailedCategory,
      offset,
      limit
    )
      .then((resp) => {
        const json_data = resp.data;
        if (json_data.isSuccessful === API_RESP_FAILED_MSG) {
          console.log(API_RESP_SERVER_REJECT_OP_MSG, json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          // 儲存未被 filter 套用的產品清單，便於 reset 時套用
          setNoneFilteredProducts(
            json_data.data.map((el: ProductsByCategoryInfoAPIRespPayload) => ({
              id: el.id,
              product: {
                name: el.name,
                price: `${el.price}`,
                img: JSON.parse(el.imgs)[0].src,
              },
              isLiked: false,
            }))
          );
          // 傳入 function 拿到最新的 state
          setProductsInfo((prevProductsInfo) => {
            return {
              categoryPath: prevProductsInfo.categoryPath,
              categoriesList: prevProductsInfo.categoriesList,
              totalProductsNumber: resp.data.totals,
              productsList: json_data.data.map(
                (el: ProductsByCategoryInfoAPIRespPayload) => ({
                  id: el.id,
                  product: {
                    name: el.name,
                    price: `${el.price}`,
                    img: JSON.parse(el.imgs)[0].src,
                  },
                  isLiked: checkIfUserLikeTheProduct(el.id),
                })
              ),
            };
          });
          // 如果資料總筆數小於等於目前 indicator 的限制筆數，則資料已讀取完畢，反之相反
          if (json_data.totals <= productsListIndicator.limit) {
            setDisableProductsListButton(true);
          } else {
            setDisableProductsListButton(false);
          }
          // 顯示 filter，並隱藏相關載入動畫
          setShowFilter(true);
          // 根據讀取的情境，取消該讀取動畫
          if (flagLoadMore) {
            setIsLoadingMoreProducts(false);
          } else {
            setIsLoadingProductsBlock(false);
          }
        }
      })
      .catch((e) => {
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
        setShowModalForApiError(true);
      });
  }
  // 從 react router 拿相對應的路徑資訊
  function getCurrentCategoryPathFromRouter(): void {
    setProductsInfo((prevProductsInfo) => {
      return {
        categoryPath: {
          base: prevProductsInfo.categoryPath.base,
          main: mainCategoryFromRouter,
          sub:
            subCategoryFromRouter === undefined
              ? prevProductsInfo.categoryPath.sub
              : subCategoryFromRouter,
          detailed:
            detailedCategoryFromRouter === undefined
              ? prevProductsInfo.categoryPath.detailed
              : detailedCategoryFromRouter,
        },
        categoriesList: prevProductsInfo.categoriesList,
        productsList: prevProductsInfo.productsList,
        totalProductsNumber: prevProductsInfo.totalProductsNumber,
      };
    });
  }
  // 設置顯示路徑資訊狀態
  function updateDisplayedCategoryPath(): void {
    let displayText = "";
    if (productsInfo.categoryPath.base !== undefined) {
      displayText += "分類";
    }
    if (productsInfo.categoryPath.main !== undefined) {
      displayText += ` > ${productsInfo.categoryPath.main}`;
    }
    if (productsInfo.categoryPath.sub !== undefined) {
      displayText += ` > ${productsInfo.categoryPath.sub}`;
    }
    if (productsInfo.categoryPath.detailed !== undefined) {
      displayText += ` > ${productsInfo.categoryPath.detailed}`;
    }
    setDisplayedCategoryPath(displayText);
  }
  // 添加為喜歡的產品
  function handleUpdateProductLikeState(id: number): void {
    setProductsInfo({
      ...productsInfo,
      productsList: productsInfo.productsList.map((product) =>
        product.id === id
          ? { ...product, isLiked: !product.isLiked }
          : { ...product }
      ),
    });
    // 拿到目前用戶點擊的產品，並根據喜歡狀態添加到收藏清單
    productsInfo.productsList.forEach((el) => {
      if (el.id === id) {
        if (!el.isLiked) {
          dispatch(
            addFavoriteItem([
              { ...el, isLiked: true },
              ...favoriteItemsFromStore,
            ])
          );
        } else {
          dispatch(removeFavoriteItem({ pid: id }));
        }
      }
    });
  }
  // 展開相對應的子分類
  function handleToggleCategorySubLists(id: number): void {
    setProductsInfo({
      ...productsInfo,
      categoriesList: productsInfo.categoriesList.map((main_category) =>
        main_category.id === id
          ? { ...main_category, isSelected: !main_category.isSelected }
          : { ...main_category }
      ),
    });
  }
  // 當用戶點擊分類列表 (選擇子分類)
  function handleUpdateClickedSubCategoryPath(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ): void {
    const categoryFromRouter = `${mainCategoryFromRouter}/${subCategoryFromRouter}`;
    const categoryFromDOM = getSubCategoryPath(e);
    const categoryFromDOMArray = categoryFromDOM.split("/");
    // 如果與當前選擇的分類不符
    if (categoryFromDOM !== categoryFromRouter) {
      // 更新網址
      history.push(`/products/${categoryFromDOM}`);
      // 顯示整個產品清單讀取動畫
      setIsLoadingProductsBlock(true);
      // 重設 ProductsListIndicator，並根據 indicator 的參數重新讀取產品清單
      setProductsListIndicator({
        offset: PRODUCTS_QUERY_INIT_OFFSET,
        limit: PRODUCTS_QUERY_INIT_LIMIT,
      });
      // 重新設定分類路徑，標示顏色
      setProductsInfo({
        ...productsInfo,
        categoryPath: {
          base: "分類",
          main: categoryFromDOMArray[0],
          sub: categoryFromDOMArray[1],
          detailed: undefined,
        },
      });
    }
  }
  // 當用戶點擊分類列表 (選擇詳細分類)
  function handleUpdateClickedDetailedCategoryPath(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ): void {
    const categoryFromRouter = `${mainCategoryFromRouter}/${subCategoryFromRouter}/${detailedCategoryFromRouter}`;
    const categoryFromDOM = getDetailedCategoryPath(e);
    const categoryFromDOMArray = categoryFromDOM.split("/");
    // 如果與當前選擇的分類不符
    if (categoryFromRouter !== categoryFromDOM) {
      // 更新網址
      history.push(`/products/${categoryFromDOM}`);
      // 顯示整個產品清單讀取動畫
      setIsLoadingProductsBlock(true);
      // 重設 ProductsListIndicator，並根據 indicator 的參數重新讀取產品清單
      setProductsListIndicator({
        offset: PRODUCTS_QUERY_INIT_OFFSET,
        limit: PRODUCTS_QUERY_INIT_LIMIT,
      });
      // 重新設定分類路徑，標示顏色
      setProductsInfo({
        ...productsInfo,
        categoryPath: {
          base: "分類",
          main: categoryFromDOMArray[0],
          sub: categoryFromDOMArray[1],
          detailed: categoryFromDOMArray[2],
        },
      });
    }
  }
  // 回傳當前子分類路徑字串
  function getSubCategoryPath(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ): string {
    let el = e.target as HTMLElement;
    let parentNode = el.parentNode as HTMLElement;
    const clickedMainCategory = parentNode.innerText.split("\n")[0];
    const clickedSubCategory = el.innerText.split("\n")[0];
    return `${clickedMainCategory}/${clickedSubCategory}`;
  }
  // 回傳當前詳細路徑字串
  function getDetailedCategoryPath(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    let el = e.target as HTMLElement;
    let parentNode = el.parentNode as HTMLElement;
    let parentOfParentNode = parentNode.parentNode as HTMLElement;
    const clickedMainCategory = parentOfParentNode.innerText.split("\n")[0];
    const clickedSubCategory = parentNode.innerText.split("\n")[0];
    const clickedDetailedCategory = el.innerText;
    return `${clickedMainCategory}/${clickedSubCategory}/${clickedDetailedCategory}`;
  }
  // 處理 filter 點擊 options 事件
  function handleOptionSelection(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ): void {
    // 從 data- 欄位拿到選項名稱
    let el = e.target as HTMLElement;
    let optionName;
    if (el.getAttribute("data-option-name") === null) {
      throw new Error("can't get attribute value");
    } else {
      optionName = el.getAttribute("data-option-name");
    }
    if (optionName !== FILTER_RESET_OPTION) {
      if (optionName === FILTER_OPTION_1) {
        // 根據價格低到高排序
        setProductsInfo({
          ...productsInfo,
          productsList: productsInfo.productsList.sort(
            (a, b) => Number(a.product.price) - Number(b.product.price)
          ),
        });
      }
      if (optionName === FILTER_OPTION_2) {
        // 根據價格高到低排序
        setProductsInfo({
          ...productsInfo,
          productsList: productsInfo.productsList.sort(
            (a, b) => Number(b.product.price) - Number(a.product.price)
          ),
        });
      }
      // 加上選項 "取消套用篩選"，如果已經有則忽略
      setFilter({
        ...filter,
        currentOption:
          optionName === FILTER_RESET_OPTION
            ? FILTER_INIT_OPTION
            : (optionName as string),
        options:
          filter.options.find(
            (option) => option.name === FILTER_RESET_OPTION
          ) === undefined
            ? filter.options.concat([
                {
                  id: filter.options.length + 1,
                  name: FILTER_RESET_OPTION,
                },
              ])
            : filter.options,
      });
    }
    if (optionName === FILTER_RESET_OPTION) {
      // 套用先前沒有 filtered 的產品清單
      setProductsInfo({
        ...productsInfo,
        productsList: [...noneFilteredProducts],
      });
      // 將套用篩選的選項移除，並更新目前的選項名稱
      setFilter({
        ...filter,
        currentOption:
          optionName === FILTER_RESET_OPTION ? FILTER_INIT_OPTION : optionName,
        options: filter.options.filter(
          (option) => option.name !== FILTER_RESET_OPTION
        ),
      });
    }
  }
  // 套用先前的 filter 選項
  function applyExistFilterCondition(): void {
    if (filter.currentOption === FILTER_RESET_OPTION) return;
    if (filter.currentOption === FILTER_OPTION_1) {
      setProductsInfo({
        ...productsInfo,
        productsList: productsInfo.productsList.sort(
          (a, b) => Number(a.product.price) - Number(b.product.price)
        ),
      });
    }
    if (filter.currentOption === FILTER_OPTION_2) {
      setProductsInfo({
        ...productsInfo,
        productsList: productsInfo.productsList.sort(
          (a, b) => Number(b.product.price) - Number(a.product.price)
        ),
      });
    }
  }
  // 點擊載入更多事件
  function handleGetMoreProducts(): void {
    // 顯示部分產品讀取動畫
    setIsLoadingMoreProducts(true);
    setProductsListIndicator({
      offset: productsListIndicator.offset,
      limit: productsListIndicator.limit + PRODUCTS_QUERY_LIMIT,
    });
  }
  // 點選浮動按鈕，自動上滑到頂端事件
  function handleScrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  // 導引到相對應的產品頁面
  function handleRedirectToProductPage(
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ): void {
    const el = e.target as HTMLElement;
    const id = el.getAttribute("data-id");
    history.push(`/product/${id}`);
  }
  // modal 顯示情境: api 發送過程中有誤
  // 處理點選按鈕事件
  function handleSubmitOpForApiError(): void {
    setShowModalForApiError(false);
  }
  // modal 顯示情境: api 發送過程中有誤
  // 處理點選按鈕之外事件
  function handleCancelOpForApiError(): void {
    setShowModalForApiError(false);
  }
  // 傳入 product 的 id，並根據當前用戶的收藏清單，回傳是否喜歡此產品
  function checkIfUserLikeTheProduct(id: number): boolean {
    if (isEmptyObj(userFromStore)) return false;
    for (let i = 0; i < favoriteItemsFromStore.length; i++) {
      if (favoriteItemsFromStore[i].id === id) return true;
    }
    return false;
  }

  // 第一次 render，拿到目前路徑名稱、拿到分類列表、根據目前路徑名稱拿到相對應產品清單
  useEffect(() => {
    getCurrentCategoryPathFromRouter();
    getAllCategoriesFromApi();
    // 顯示整個產品清單讀取動畫
    setIsLoadingProductsBlock(true);
    // eslint-disable-next-line
  }, []);
  // 如果分類路徑有變，則更新顯示路徑
  useEffect(() => {
    updateDisplayedCategoryPath();
    // eslint-disable-next-line
  }, [productsInfo.categoryPath]);
  // 顯示 filter 時，同時套用之前的篩選條件
  useEffect(() => {
    if (showFilter) {
      applyExistFilterCondition();
    }
    //  eslint-disable-next-line
  }, [showFilter]);
  // 根據 indicator 讀取更多產品
  // 因為 indicator 會被初始化導致開始抓取相對應的產品清單
  useEffect(() => {
    // 讀取部分產品清單
    if (isLoadingMoreProducts) {
      getProductsByCategoryFromApi(
        mainCategoryFromRouter,
        subCategoryFromRouter,
        detailedCategoryFromRouter,
        productsListIndicator.offset,
        productsListIndicator.limit,
        true
      );
    }
    // 讀取整個產品清單
    if (isLoadingProducts) {
      getProductsByCategoryFromApi(
        mainCategoryFromRouter,
        subCategoryFromRouter,
        detailedCategoryFromRouter,
        productsListIndicator.offset,
        productsListIndicator.limit,
        false
      );
    }
    // eslint-disable-next-line
  }, [productsListIndicator]);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ProductsCategoryPath>{displayedCategoryPath}</ProductsCategoryPath>
        <ProductsInfo>
          <ProductsCounter>
            共 {productsInfo.totalProductsNumber} 件商品
          </ProductsCounter>
          {showFilter ? (
            <>
              <DropDown
                dropDownInfo={filter}
                handleOptionSelection={handleOptionSelection}
              >
                <ProductsFilter>
                  <FilterName>{filter.currentOption}</FilterName>
                  <FilterIcon />
                </ProductsFilter>
              </DropDown>
            </>
          ) : (
            <></>
          )}
        </ProductsInfo>
        <ProductsContainer>
          {isLoadingCategories ? (
            <Loader marginTop={"0"} />
          ) : (
            <ProductsCategoryListContainer>
              {productsInfo.categoriesList.map((main_category) => (
                <CategoryMainTitle
                  key={main_category.id}
                  isSelected={
                    productsInfo.categoryPath.main === main_category.name
                      ? true
                      : false
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleCategorySubLists(main_category.id);
                  }}
                >
                  {main_category.name}
                  <FilterIcon
                    position={"absolute"}
                    onClick={() => {
                      handleToggleCategorySubLists(main_category.id);
                    }}
                  ></FilterIcon>
                  {main_category.isSelected &&
                    main_category.category.map((sub_category) => (
                      <CategorySubTitle
                        key={sub_category.id}
                        marginBottom={"1rem"}
                        isSelected={
                          productsInfo.categoryPath.main === main_category.name
                            ? productsInfo.categoryPath.sub ===
                              sub_category.name
                              ? true
                              : false
                            : false
                        }
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                          e.stopPropagation();
                          handleUpdateClickedSubCategoryPath(e);
                        }}
                      >
                        {sub_category.name}
                        {sub_category.category.map(
                          (detailed_category, index) => (
                            <CategoryDetailTitle
                              key={index}
                              isSelected={
                                productsInfo.categoryPath.main ===
                                main_category.name
                                  ? productsInfo.categoryPath.sub ===
                                    sub_category.name
                                    ? productsInfo.categoryPath.detailed ===
                                      detailed_category
                                      ? true
                                      : false
                                    : false
                                  : false
                              }
                              onClick={(e: React.MouseEvent<HTMLElement>) => {
                                e.stopPropagation();
                                handleUpdateClickedDetailedCategoryPath(e);
                              }}
                            >
                              {detailed_category}
                            </CategoryDetailTitle>
                          )
                        )}
                      </CategorySubTitle>
                    ))}
                </CategoryMainTitle>
              ))}
            </ProductsCategoryListContainer>
          )}
          {isLoadingProducts ? (
            <Loader marginTop={"0"} />
          ) : (
            <>
              <CardContainerForMobile>
                <CardContainer
                  items={productsInfo.productsList}
                  horizontalAlign={"center"}
                  handleLiked={handleUpdateProductLikeState}
                  handleOnClick={handleRedirectToProductPage}
                ></CardContainer>
              </CardContainerForMobile>
              <CardContainerForPad>
                <CardContainer
                  items={productsInfo.productsList}
                  marginTop={"0"}
                  marginLeft={"0"}
                  handleLiked={handleUpdateProductLikeState}
                  handleOnClick={handleRedirectToProductPage}
                ></CardContainer>
              </CardContainerForPad>
            </>
          )}
        </ProductsContainer>
        <>
          {!disableProductsListButton && (
            <>
              {isLoadingMoreProducts ? (
                <Loader marginTop={"0"} />
              ) : (
                <CTAPrimaryButton
                  isRounded={true}
                  margin={"3rem auto 0"}
                  onClick={handleGetMoreProducts}
                >
                  載入更多
                </CTAPrimaryButton>
              )}
            </>
          )}
        </>
        <FloatingButtonForMobileAndPad onClick={handleScrollToTop}>
          <ScrollToTopIcon />
          回到頂端
        </FloatingButtonForMobileAndPad>
        {showModalForApiError && (
          <Modal
            modalInfo={ModalInfoForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          />
        )}
      </ContentContainer>
      <Footer bgColor={BG_PRIMARY1} />
    </PageContainer>
  );
}
