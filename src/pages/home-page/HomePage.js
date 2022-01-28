import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  BREAKPOINT_MOBILE,
  COLOR_SECONDARY2,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  BG_SECONDARY4,
  BG_PRIMARY1,
  API_RESP_FAILED_MSG,
  API_RESP_SERVER_REJECT_OP_MSG,
  API_RESP_SUCCESSFUL_MSG,
  API_RESP_REQ_REJECT_ERR_MSG,
} from "../../constant";
import styled from "styled-components";
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
import { CTAPrimaryButton } from "../../components/button";
import {
  getBannersApi,
  getHotItemsApi,
  getUserCommentsApi,
  getMainCategoriesApi,
} from "../../Webapi";
import Loader from "../../components/loader";
import { useHistory } from "react-router";
import Modal from "../../components/modal";
import { useContext } from "react";
import { IntroductionModalContext } from "../../context";
import { isEmptyObj } from "../../util";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../../redux/reducers/FavoriteItemsSlice";
import { useSelector, useDispatch } from "react-redux";

const PageContainer = styled.div`
  background-color: ${BG_SECONDARY4};
`;
const ContentContainer = styled.main`
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

const HotSellingItemBlock = styled.section`
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
  // 產生 dispatch
  const dispatch = useDispatch();
  // 從 redux-store 拿用戶資訊
  const userFromStore = useSelector((store) => store.user.info);
  // 從 redux-store 拿喜好清單
  const favoriteItemsFromStore = useSelector(
    (store) => store.favoriteItems.items
  );
  // 透過 context 拿到目前 introductionModal 是否有被顯示
  const { introductionModalIsDisplayed, setIntroductionModalIsDisplayed } =
    useContext(IntroductionModalContext);
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
    useForBanner: true,
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
  // 是否要顯示 introduction modal
  const [showModalForIntroductionLocally, setShowModalForIntroductionLocally] =
    useState(false);
  // introduction modal 相關資訊
  const [modalInfoForIntroductionLocally, setModalInfoForIntroductionLocally] =
    useState({});

  // 更新 hotItems 裡面物件的 isLiked 屬性
  function handleUpdateItemLikedState(id) {
    SetHotItems(
      hotItems.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : { ...item }
      )
    );
    // 拿到目前用戶點擊的熱銷產品，並根據喜歡狀態添加到收藏清單
    hotItems.forEach((el) => {
      if (el.id === id) {
        if (!el.isLiked) {
          dispatch(
            addFavoriteItem([
              { ...el, isLiked: true },
              ...favoriteItemsFromStore,
            ])
          );
        } else {
          dispatch(
            removeFavoriteItem({
              pid: id,
            })
          );
        }
      }
    });
  }
  // 拿 banner 資訊，並設定相關的狀態
  function getBannersFromApi() {
    getBannersApi()
      .then((resp) => {
        // 因為 axios 機制，response.data 才是真正回傳的資料
        const json_data = resp.data;
        if (json_data.isSuccessful === API_RESP_FAILED_MSG) {
          console.log(API_RESP_SERVER_REJECT_OP_MSG, json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          setBanners({
            ...banners,
            slide: json_data.data,
          });
          setIsLoadingBanner(false);
        }
      })
      .catch((e) => {
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
        setShowModalForApiError(true);
      });
  }
  // 拿商品分類，並設定相關的狀態
  function getCategoriesFromApi() {
    getMainCategoriesApi()
      .then((resp) => {
        // 因為 axios 機制，response.data 才是真正回傳的資料
        const json_data = resp.data;
        if (resp.data.isSuccessful === API_RESP_FAILED_MSG) {
          console.log(API_RESP_SERVER_REJECT_OP_MSG, json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          setCategories(
            json_data.data.map((el) => ({
              id: el.id,
              name: el.name,
              img: el.src,
            }))
          );
          setIsLoadingCategories(false);
        }
      })
      .catch((e) => {
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
        setShowModalForApiError(true);
      });
  }
  // 拿熱銷品項資訊，並設定相關的狀態
  function getHotItemsFromApi(offset, limit) {
    getHotItemsApi(offset, limit)
      .then((resp) => {
        // 因為 axios 機制，response.data 才是真正回傳的資料
        const json_data = resp.data;
        if (json_data.isSuccessful === API_RESP_FAILED_MSG) {
          console.log(API_RESP_SERVER_REJECT_OP_MSG, json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          SetHotItems(
            json_data.data.map((el) => ({
              id: el.id,
              product: {
                name: el.name,
                price: `${el.price}`,
                img: JSON.parse(el.imgs)[0].src,
              },
              // 根據目前用戶收藏清單，判斷用戶是否喜歡此產品
              isLiked: checkIfUserLikeTheProduct(el.id),
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
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
        setShowModalForApiError(true);
      });
  }
  // 拿顧客評價資訊，並設定相關的狀態
  function getUserCommentsFromApi(offset, limit) {
    getUserCommentsApi(offset, limit)
      .then((resp) => {
        // 因為 axios 機制，response.data 才是真正回傳的資料
        const json_data = resp.data;
        if (json_data.isSuccessful === API_RESP_FAILED_MSG) {
          console.log(API_RESP_SERVER_REJECT_OP_MSG, json_data);
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
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
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
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
  // 傳入 product 的 id，並根據當前用戶的收藏清單，回傳是否喜歡此產品
  function checkIfUserLikeTheProduct(id) {
    if (isEmptyObj(userFromStore)) return false;
    for (let i = 0; i < favoriteItemsFromStore.length; i++) {
      if (favoriteItemsFromStore[i].id === id) return true;
    }
    return false;
  }

  // DOM 載入完畢後只執行一次，用來抓一開始的資訊
  // hotItems, comments 會因為設定 indicator 而自動發送 api，所以寫在下面兩個 useEffect functions
  useEffect(() => {
    getBannersFromApi();
    getCategoriesFromApi();
    // 如果 context 顯示還沒被看過，則設置相關訊息
    if (!introductionModalIsDisplayed) {
      setModalInfoForIntroductionLocally({
        selectionMode: false,
        title: `歡迎光臨, ${
          isEmptyObj(userFromStore) ? "訪客" : userFromStore.nickname
        }`,
        content: `使用網站前須注意事項 🔔\n
• 註冊會員就可以有專屬的收藏清單，將喜歡的產品一網打盡\n
• 目前版本尚不開放結帳金流服務，敬請期待\n
很開心見到您，祝您購物愉快 😘`,
      });
    }
  }, []);
  // hotItemsIndicator 改變時執行
  useEffect(() => {
    getHotItemsFromApi(hotItemsIndicator.offset, hotItemsIndicator.limit);
  }, [hotItemsIndicator]);
  // commentsIndicator 改變時執行
  useEffect(() => {
    getUserCommentsFromApi(commentsIndicator.offset, commentsIndicator.limit);
  }, [commentsIndicator]);
  // 當 introduction modal 內容被設置時執行
  useEffect(() => {
    // 如果 context 顯示已經被看過或還在初始值，則跳過
    if (
      introductionModalIsDisplayed === true ||
      isEmptyObj(modalInfoForIntroductionLocally)
    )
      return;
    setShowModalForIntroductionLocally(true);
    setIntroductionModalIsDisplayed(true);
  }, [modalInfoForIntroductionLocally]);

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
                    img={category.img}
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
              <CTAPrimaryButton
                isRounded={true}
                margin={"3rem auto 0"}
                onClick={() => {
                  handleGetHotItemsFromButtonEvent();
                }}
              >
                載入更多
              </CTAPrimaryButton>
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
              <CTAPrimaryButton
                isRounded={true}
                margin={"3rem auto 0"}
                onClick={() => {
                  handleGetCommentsFromButtonEvent();
                }}
              >
                載入更多
              </CTAPrimaryButton>
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
        {showModalForIntroductionLocally && (
          <Modal
            modalInfo={modalInfoForIntroductionLocally}
            handleSubmitOp={() => {
              setShowModalForIntroductionLocally(false);
            }}
            handleCancelOp={() => {
              setShowModalForIntroductionLocally(false);
            }}
          />
        )}
      </ContentContainer>
      <Footer bgColor={BG_PRIMARY1} marginTop={"6rem"} />
    </PageContainer>
  );
}
