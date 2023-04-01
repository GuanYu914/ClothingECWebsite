import styled from "styled-components/macro";
import { ReactComponent as arrowLeft } from "../../imgs/components/paginator/arrow-left.svg";
import { ReactComponent as arrowRight } from "../../imgs/components/paginator/arrow-right.svg";
import { COLOR_PRIMARY1, COLOR_SECONDARY2 } from "../../constant";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrevIcon = styled(arrowLeft)<{ hidden?: boolean }>`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
`;

const NextIcon = styled(arrowRight)<{ hidden?: boolean }>`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
`;

const PageIndicator = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const PageButton = styled.button.attrs(() => ({
  className: "fs-h2 btn-reset",
}))<{
  isSelected?: boolean;
}>`
  color: ${COLOR_SECONDARY2};
  margin-right: 1.2rem;
  user-select: none;
  color: ${(props) => (props.isSelected ? COLOR_PRIMARY1 : COLOR_SECONDARY2)}};

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${COLOR_PRIMARY1};
    text-decoration: underline;
  }
`;

interface PaginatorProps {
  pagesInfo: {
    totalsItems: number;
    itemsPerPage: number;
    currentPage: number;
  };
  handleJumpToPrevPage: () => void;
  handleJumpToNextPage: () => void;
  handleUpdateCurrentPage: (page: number) => void;
}

export default function Paginator({
  pagesInfo,
  handleJumpToPrevPage,
  handleJumpToNextPage,
  handleUpdateCurrentPage,
}: PaginatorProps) {
  // 使用預設值
  if (pagesInfo.totalsItems === undefined) {
    pagesInfo.totalsItems = 1;
  }
  if (pagesInfo.itemsPerPage === undefined) {
    pagesInfo.itemsPerPage = 5;
  }
  // 產生頁數陣列
  let pagesArray = [];
  for (
    let i = 0;
    i < Math.floor(pagesInfo.totalsItems / pagesInfo.itemsPerPage);
    i++
  ) {
    pagesArray.push(i + 1);
  }
  return (
    <Container>
      <PrevIcon
        hidden={pagesInfo.currentPage === 1 ? true : false}
        onClick={() => {
          handleJumpToPrevPage();
        }}
      />
      <PageIndicator>
        {pagesArray.map((page, index) => (
          <PageButton
            key={index}
            isSelected={pagesInfo.currentPage === page ? true : false}
            onClick={(e) => {
              const domInfo = e.target as HTMLElement;
              handleUpdateCurrentPage(Number(domInfo.innerText.trim()));
            }}
          >
            {page + " "}
          </PageButton>
        ))}
      </PageIndicator>
      <NextIcon
        hidden={pagesInfo.currentPage === pagesArray.length ? true : false}
        onClick={() => {
          handleJumpToNextPage();
        }}
      />
    </Container>
  );
}
