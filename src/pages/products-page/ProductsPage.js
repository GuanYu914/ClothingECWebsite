import Header from "../../components/header";
import Footer from "../../components/footer";
import CardContainer from "../../components/card-container";
import { CTAPrimaryButton } from "../../components/button";
import Paginator from "../../components/paginator";
import styled, { keyframes } from "styled-components/macro";
import { fadeIn } from "react-animations";
import {
  MAX_CONTAINER_WIDTH,
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  BREAKPOINT_LAPTOP,
} from "../../constant";
import { ReactComponent as filterIcon } from "../../imgs/pages/products-page/caret-down-fill.svg";
import { useState } from "react";

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

const ProductsCategoryPath = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  margin-bottom: 2rem;
  // 根據不同裝置寬度預設跟 Header 保持 margin-top: 1rem
  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE} + 1rem);
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD} + 1rem);
  }
`;

const ProductsInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductsCounter = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))``;

const ProductsFilter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterName = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  margin-right: 0.8rem;
`;

const FilterIcon = styled(filterIcon)`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
  position: ${(props) => props.position || "static"};
  right: 0;
`;

const ProductsContainer = styled.div`
  margin-top: 3rem;

  ${BREAKPOINT_PAD} {
    display: flex;
  }
`;

const ProductsCategoryListContainer = styled.div`
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
}))`
  margin-bottom: 1rem;
  list-style: none;
  position: relative;
  user-select: none;
  cursor: pointer;
  color: ${(props) => props.isSelected && "#9dcbdf"};

  &:hover {
    color: #9dcbdf;
  }
`;

const fadeInAnimation = keyframes`${fadeIn}`;

const CategorySubTitle = styled.ul.attrs(() => ({
  className: "fs-h3 color-secondary2 list-reset",
}))`
  margin-bottom: ${(props) => props.marginBottom || "0"};
  margin-left: 1rem;
  list-style: none;
  user-select: none;
  color: ${(props) => props.isSelected && "#9dcbdf"};
  animation: 0.8s ${fadeInAnimation};

  &:hover {
    color: #9dcbdf;
  }
`;

const CategoryDetailTitle = styled.li.attrs(() => ({
  className: "fs-h3 color-secondary2 list-reset",
}))`
  margin-left: 1rem;
  list-style: none;
  user-select: none;
  color: ${(props) => props.isSelected && "#9dcbdf"};
  animation: 0.8s ${fadeInAnimation};

  &:hover {
    color: #9dcbdf;
  }
`;

const CardContainerForMobile = styled.div`
  ${BREAKPOINT_MOBILE} {
    display: block;
  }

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const CardContainerForPad = styled.div`
  ${BREAKPOINT_MOBILE} {
    display: none;
  }

  ${BREAKPOINT_PAD} {
    display: block;
  }
`;

const ButtonContainerForMobileAndPad = styled.div`
  ${BREAKPOINT_MOBILE} {
    display: block;
  }

  ${BREAKPOINT_PAD} {
    display: block;
  }

  ${BREAKPOINT_LAPTOP} {
    display: none;
  }
`;

const ButtonContainerForLaptop = styled.div`
  ${BREAKPOINT_MOBILE} {
    display: none;
  }

  ${BREAKPOINT_LAPTOP} {
    display: block;
  }
`;

export default function ProductsPage() {
  const [productsInfo, setProductsInfo] = useState({
    categoryPath: {
      base: "分類",
      main: "小孩",
      sub: "配件",
      detailed: "襪子",
    },
    categoriesList: [
      {
        id: 1,
        name: "男裝",
        category: [
          {
            id: 1,
            name: "上衣類",
            category: ["背心", "Polo衫", "T恤", "針織衫", "連帽上衣"],
          },
          {
            id: 2,
            name: "下身類",
            category: ["牛仔褲", "休閒長褲", "卡其褲", "短褲"],
          },
          {
            id: 3,
            name: "外套類",
            category: ["抗UV系列", "連帽外套", "風衣外套", "羽絨外套"],
          },
        ],
        isSelected: false,
      },
      {
        id: 2,
        name: "女裝",
        category: [
          {
            id: 1,
            name: "上衣類",
            category: ["背心", "Polo衫", "T恤", "針織衫", "連帽上衣"],
          },
          {
            id: 2,
            name: "洋裝/裙子",
            category: ["洋裝", "裙子"],
          },
          {
            id: 3,
            name: "下身類",
            category: ["牛仔褲", "休閒長褲", "寬褲", "緊身褲", "短褲"],
          },
          {
            id: 4,
            name: "外套類",
            category: ["抗UV系列", "連帽外套", "風衣外套", "羽絨外套"],
          },
        ],
        isSelected: false,
      },
      {
        id: 3,
        name: "小孩",
        category: [
          {
            id: 1,
            name: "上衣類",
            category: ["短袖", "襯衫", "休閒上衣"],
          },
          {
            id: 2,
            name: "洋裝/裙子",
            category: ["洋裝", "裙子"],
          },
          {
            id: 3,
            name: "內衣類",
            category: ["內搭衣", "內褲"],
          },
          {
            id: 4,
            name: "配件",
            category: ["襪子"],
          },
        ],
        isSelected: true,
      },
    ],
    productsList: [
      {
        id: 1,
        product: {
          name: "大學",
          price: "799",
        },
        isLiked: false,
      },
      {
        id: 2,
        product: {
          name: "秋冬薄針織",
          price: "499",
        },
        isLiked: false,
      },
      {
        id: 3,
        product: {
          name: "長版西裝長褲",
          price: "1299",
        },
        isLiked: true,
      },
      {
        id: 4,
        product: {
          name: "雲朵包",
          price: "888",
        },
        isLiked: false,
      },
    ],
  });

  const [filter, setFilter] = useState({
    enable: false,
    condition: "根據熱門程度",
  });

  const [pageInfo, setPageInfo] = useState({
    totalPages: [1, 2, 3, 4, 5, 6, 7, 8],
    currentPage: 7,
  });

  function handleUpdateProductLikeState(id) {
    setProductsInfo({
      ...productsInfo,
      productsList: productsInfo.productsList.map((product) =>
        product.id === id
          ? { ...product, isLiked: !product.isLiked }
          : { ...product }
      ),
    });
  }

  function handleToggleCategorySubLists(id) {
    setProductsInfo({
      ...productsInfo,
      categoriesList: productsInfo.categoriesList.map((main_category) =>
        main_category.id === id
          ? { ...main_category, isSelected: !main_category.isSelected }
          : { ...main_category }
      ),
    });
  }

  function handleJumpToPrevPage() {
    if (pageInfo.currentPage === 1) return;
    setPageInfo({
      ...pageInfo,
      currentPage: pageInfo.currentPage - 1,
    });
  }

  function handleJumpToNextPage() {
    if (pageInfo.currentPage === pageInfo.totalPages.length) return;
    setPageInfo({
      ...pageInfo,
      currentPage: pageInfo.currentPage + 1,
    });
  }

  function handleUpdateCurrentPage(page) {
    setPageInfo({
      ...pageInfo,
      currentPage: page,
    });
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ProductsCategoryPath>
          {productsInfo.categoryPath.base +
            " > " +
            productsInfo.categoryPath.main +
            " > " +
            productsInfo.categoryPath.sub +
            "  > " +
            productsInfo.categoryPath.detailed}
        </ProductsCategoryPath>
        <ProductsInfo>
          <ProductsCounter>
            共 {productsInfo.productsList.length} 件商品
          </ProductsCounter>
          {filter.enable && (
            <ProductsFilter>
              <FilterName>{filter.condition}</FilterName>
              <FilterIcon />
            </ProductsFilter>
          )}
          {!filter.enable && (
            <ProductsFilter>
              <FilterName>尚未套用篩選</FilterName>
              <FilterIcon />
            </ProductsFilter>
          )}
        </ProductsInfo>
        <ProductsContainer>
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
                          ? productsInfo.categoryPath.sub === sub_category.name
                            ? true
                            : false
                          : false
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(
                          `click sub category...${
                            e.target.outerText.split("\n")[0]
                          }`
                        );
                      }}
                    >
                      {sub_category.name}
                      {sub_category.category.map((detailed_category, index) => (
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
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(
                              "click detailed category..." + e.target.innerText
                            );
                          }}
                        >
                          {detailed_category}
                        </CategoryDetailTitle>
                      ))}
                    </CategorySubTitle>
                  ))}
              </CategoryMainTitle>
            ))}
          </ProductsCategoryListContainer>
          <CardContainerForMobile>
            <CardContainer
              items={productsInfo.productsList}
              horizontalAlign={"center"}
              handleLiked={handleUpdateProductLikeState}
            ></CardContainer>
          </CardContainerForMobile>
          <CardContainerForPad>
            <CardContainer
              items={productsInfo.productsList}
              marginTop={"0"}
              marginLeft={"0"}
              handleLiked={handleUpdateProductLikeState}
            ></CardContainer>
          </CardContainerForPad>
        </ProductsContainer>
        <ButtonContainerForMobileAndPad>
          <CTAPrimaryButton isRounded={true} margin={"3rem auto 0"}>
            載入更多
          </CTAPrimaryButton>
        </ButtonContainerForMobileAndPad>
        <ButtonContainerForLaptop>
          <Paginator
            pageInfo={pageInfo}
            handleJumpToNextPage={handleJumpToNextPage}
            handleJumpToPrevPage={handleJumpToPrevPage}
            handleUpdateCurrentPage={handleUpdateCurrentPage}
          ></Paginator>
        </ButtonContainerForLaptop>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}
