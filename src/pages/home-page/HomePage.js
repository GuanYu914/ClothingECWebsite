import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  BREAKPOINT_MOBILE,
  COLOR_SECONDARY2,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
} from "../../constant";
import styled from "styled-components/macro";
import { useState, useEffect } from "react";
import BSCarousel from "../../components/bs-carousel/BSCarousel";
import {
  CategoryBlock,
  CategoryTitle,
  CategoriesContainer,
  Category,
} from "./styled-category";

import {
  UserCommentBlock,
  UserCommentTitle,
  UserCommentsContainer,
  UserComment,
  UserAvatar,
} from "./styled-user-comment";
import {
  BREAKPOINT_PAD,
  MAX_CONTAINER_WIDTH,
  HOT_ITEMS_QUERY_INIT_OFFSET,
  HOT_ITEMS_QUERY_INIT_LIMIT,
  HOT_ITEMS_QUERY_LIMIT,
  COMMENTS_QUERY_INIT_OFFSET,
  COMMENTS_QUERY_INIT_LIMIT,
  COMMENTS_QUERY_LIMIT,
} from "../../constant";
import CardContainer from "../../components/card-container";
import { CTASecondaryButton } from "../../components/button";
import {
  getBannersApi,
  getHotItemsApi,
  getUserCommentsApi,
  getMainCategoriesApi,
} from "../../Webapi";
import Loader from "../../components/loader";
import { useHistory } from "react-router";
import Modal from "../../components/modal";

const PageContainer = styled.div``;
const ContentContainer = styled.div`
  // 設定容器最大寬度
  max-width: ${MAX_CONTAINER_WIDTH};
  margin-left: auto;
  margin-right: auto;

  // 從頁面頂端計算 Header Component 目前的高度，並從這當作起點開始 render
  ${BREAKPOINT_MOBILE} {
    margin-top: ${HEADER_HEIGHT_MOBILE};
  }

  ${BREAKPOINT_PAD} {
    margin-top: ${HEADER_HEIGHT_PAD};
  }
`;

const HotSellingItemBlock = styled.div`
  margin-top: 5rem;

  ${BREAKPOINT_PAD} {
    margin-top: 10rem;
  }
`;

const HotSellingItemTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY2};
  text-align: center;
`;

const HotSellingItemsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  max-width: ${MAX_CONTAINER_WIDTH};
`;

export default function HomePage() {
  let history = useHistory();
  // 表示每個區塊是否該顯示 loading 動畫還是內容
  const [isLoadingBanner, setIsLoadingBanner] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingHotItems, setIsLoadingHotItems] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  // 表示是否隱藏 "熱銷品項"、"顧客評價" 的 "載入更多" 按鈕
  const [disableHotItemsButton, setDisableHotItemsButton] = useState(false);
  const [disableCommentsButton, setDisableCommentsButton] = useState(false);
  // 表示上述按鈕是否被用戶點擊，藉此來顯示 loading 動畫
  const [isHotItemsButtonClicked, setIsHotItemsButtonClicked] = useState(false);
  const [isCommentsButtonClicked, setIsCommentsButtonClicked] = useState(false);
  // 每個區塊的狀態
  const [banners, setBanners] = useState({
    frame: {},
    slide: [],
  });
  const [categories, setCategories] = useState([{}]);
  const [hotItems, SetHotItems] = useState([{}]);
  const [comments, setComments] = useState([{}]);
  // 用來實現載入部分商品跟評價
  // offset -> 代表略過幾筆資料
  // limit  -> 代表限制回傳資料筆數
  const [hotItemsIndicator, setHotItemsIndicator] = useState({
    offset: HOT_ITEMS_QUERY_INIT_OFFSET,
    limit: HOT_ITEMS_QUERY_INIT_LIMIT,
  });
  const [commentsIndicator, setCommentsIndicator] = useState({
    offset: COMMENTS_QUERY_INIT_OFFSET,
    limit: COMMENTS_QUERY_INIT_LIMIT,
  });
  // 是否要顯示 api 發送錯誤的 modal
  const [showModalForApiError, setShowModalForApiError] = useState(false);
  // api 發送錯誤的 modal 資訊
  const [modalInfoForApiError] = useState({
    selectionMode: false,
    title: "發生一點小錯誤",
    content: "由於伺服器或網路異常，請稍後再試一次",
  });

  // 更新 hotItems 裡面物件的 isLiked 屬性
  function handleUpdateItemLikedState(id) {
    SetHotItems(
      hotItems.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : { ...item }
      )
    );
  }
  // 拿 banner 資訊，並設定相關的狀態
  function getBannersFromApi() {
    getBannersApi()
      .then((resp) => {
        // 因為 axios 機制，response.data 才是真正回傳的資料
        const json_data = resp.data;
        if (json_data.isSuccessful === "failed") {
          console.log("server side error, check response...", json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === "successful") {
          setBanners({
            ...banners,
            slide: json_data.data,
          });
          setIsLoadingBanner(false);
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
  // 拿商品分類，並設定相關的狀態
  function getCategoriesFromApi() {
    getMainCategoriesApi()
      .then((resp) => {
        // 因為 axios 機制，response.data 才是真正回傳的資料
        const json_data = resp.data;
        if (resp.data.isSuccessful === "failed") {
          console.log("server side error, check response...", json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === "successful") {
          setCategories(
            json_data.data.map((el) => ({
              id: el.id,
              name: el.name,
            }))
          );
          setIsLoadingCategories(false);
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
  // 拿熱銷品項資訊，並設定相關的狀態
  function getHotItemsFromApi(offset, limit) {
    getHotItemsApi(offset, limit)
      .then((resp) => {
        // 因為 axios 機制，response.data 才是真正回傳的資料
        const json_data = resp.data;
        if (json_data.isSuccessful === "failed") {
          console.log("server side error, check response...", json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === "successful") {
          SetHotItems(
            json_data.data.map((el) => ({
              id: el.id,
              product: {
                name: el.name,
                price: `${el.price}`,
                img: JSON.parse(el.imgs)[0].src,
              },
              // 之後要根據 user 做調整
              isLiked: false,
            }))
          );
          // 如果資料總筆數小於目前 indicator 的限制筆數，則資料已讀取完畢
          // 若資料讀取完畢，則不顯示 "載入更多" 按鈕，反之相反
          if (json_data.totals <= hotItemsIndicator.limit) {
            setDisableHotItemsButton(true);
          } else {
            setDisableHotItemsButton(false);
          }
          setIsLoadingHotItems(false);
          setIsHotItemsButtonClicked(false);
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
  // 拿顧客評價資訊，並設定相關的狀態
  function getUserCommentsFromApi(offset, limit) {
    getUserCommentsApi(offset, limit)
      .then((resp) => {
        // 因為 axios 機制，response.data 才是真正回傳的資料
        const json_data = resp.data;
        if (json_data.isSuccessful === "failed") {
          console.log("server side error, check response...", json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === "successful") {
          setComments(
            json_data.data.map((el) => ({
              id: el.id,
              avatar: el.avatar,
              comment: el.comment,
            }))
          );
          // 如果資料總筆數小於目前 indicator 的限制筆數，則資料已讀取完畢
          // 若資料讀取完畢，則不顯示 "載入更多" 按鈕，反之相反
          if (json_data.totals <= commentsIndicator.limit) {
            setDisableCommentsButton(true);
          } else {
            setDisableCommentsButton(false);
          }
          setIsLoadingComments(false);
          setIsCommentsButtonClicked(false);
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
  // 用戶點擊 "熱銷品項"、"顧客評價" 的 "載入更多" 按鈕
  function handleGetHotItemsFromButtonEvent() {
    setHotItemsIndicator({
      offset: hotItemsIndicator.offset,
      limit: hotItemsIndicator.limit + HOT_ITEMS_QUERY_LIMIT,
    });
    setIsHotItemsButtonClicked(true);
  }
  function handleGetCommentsFromButtonEvent() {
    setCommentsIndicator({
      offset: commentsIndicator.offset,
      limit: commentsIndicator.limit + COMMENTS_QUERY_LIMIT,
    });
    setIsCommentsButtonClicked(true);
  }
  // 導引到相對應產品頁面
  function handleRedirectToProductPage(e) {
    const id = e.target.getAttribute("data-id");
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

  // DOM 載入完畢後只執行一次，用來抓一開始的資訊
  // hotItems, comments 會因為設定 indicator 而自動發送 api，所以寫在下面兩個 useEffect functions
  useEffect(() => {
    getBannersFromApi();
    getCategoriesFromApi();
  }, []);
  // hotItemsIndicator 改變時執行
  useEffect(() => {
    getHotItemsFromApi(hotItemsIndicator.offset, hotItemsIndicator.limit);
  }, [hotItemsIndicator]);
  // commentsIndicator 改變時執行
  useEffect(() => {
    getUserCommentsFromApi(commentsIndicator.offset, commentsIndicator.limit);
  }, [commentsIndicator]);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        {isLoadingBanner ? <Loader /> : <BSCarousel slides={banners} />}
        <CategoryBlock>
          <CategoryTitle>商品分類</CategoryTitle>
          <CategoriesContainer>
            {isLoadingCategories ? (
              <Loader />
            ) : (
              <>
                {categories.map((category) => (
                  <Category
                    key={category.id}
                    onClick={() => {
                      history.push(`/products/${category.name}`);
                    }}
                  >
                    {category.name}
                  </Category>
                ))}
              </>
            )}
          </CategoriesContainer>
        </CategoryBlock>
        <HotSellingItemBlock>
          <HotSellingItemTitle>熱賣品項</HotSellingItemTitle>
          <HotSellingItemsContainer>
            {isLoadingHotItems ? (
              <Loader />
            ) : (
              <CardContainer
                items={hotItems}
                horizontalAlign={"center"}
                handleLiked={handleUpdateItemLikedState}
                handleOnClick={handleRedirectToProductPage}
              />
            )}
          </HotSellingItemsContainer>
          {disableHotItemsButton ? (
            <></>
          ) : (
            <>
              {isHotItemsButtonClicked ? <Loader marginTop={"2rem"} /> : <></>}
              <CTASecondaryButton
                isRounded={true}
                margin={"3rem auto 0"}
                onClick={() => {
                  handleGetHotItemsFromButtonEvent();
                }}
              >
                載入更多
              </CTASecondaryButton>
            </>
          )}
        </HotSellingItemBlock>
        <UserCommentBlock>
          <UserCommentTitle>顧客評價</UserCommentTitle>
          <UserCommentsContainer>
            {isLoadingComments ? (
              <Loader />
            ) : (
              <>
                {comments.map((comment) => (
                  <UserComment key={comment.id}>
                    ＂{comment.comment}＂
                    <UserAvatar url={comment.avatar}></UserAvatar>
                  </UserComment>
                ))}
              </>
            )}
          </UserCommentsContainer>
          {disableCommentsButton ? (
            <></>
          ) : (
            <>
              {isCommentsButtonClicked ? <Loader marginTop={"2rem"} /> : <></>}
              <CTASecondaryButton
                isRounded={true}
                margin={"3rem auto 0"}
                onClick={() => {
                  handleGetCommentsFromButtonEvent();
                }}
              >
                載入更多
              </CTASecondaryButton>
            </>
          )}
        </UserCommentBlock>
        {showModalForApiError && (
          <Modal
            modalInfo={modalInfoForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          />
        )}
      </ContentContainer>
      <Footer marginTop={"6rem"} />
    </PageContainer>
  );
}
