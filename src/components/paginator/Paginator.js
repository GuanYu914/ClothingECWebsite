import styled from "styled-components/macro";
import { ReactComponent as arrowLeft } from "../../imgs/components/paginator/arrow-left.svg";
import { ReactComponent as arrowRight } from "../../imgs/components/paginator/arrow-right.svg";
import PropTypes from "prop-types";
import { COLOR_PRIMARY1 } from "../../constant";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PrevIcon = styled(arrowLeft)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  visibility: ${(props) => props.hidden && "hidden"};
`;

const NextIcon = styled(arrowRight)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  visibility: ${(props) => props.hidden && "hidden"};
`;

const PageIndicator = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
`;

const PageButton = styled.button.attrs(() => ({
  className: "fs-h2 color-secondary2 btn-reset",
}))`
  margin-right: 1.2rem;
  user-select: none;
  color: ${(props) => props.isSelected && COLOR_PRIMARY1}};

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${COLOR_PRIMARY1};
    text-decoration: underline;
  }
`;

export default function Paginator({
  pagesInfo,
  handleJumpToPrevPage,
  handleJumpToNextPage,
  handleUpdateCurrentPage,
}) {
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
              handleUpdateCurrentPage(Number(e.target.innerText.trim()));
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

/**
 *  pagesInfo: {
 *    totalsItems: number,
 *    itemsPerPage: number,
 *    currentPage: number
 *  }
 *
 *  handleJumpToPrevPage: function
 *  handleJumpToNextPage: function
 *  handleUpdateCurrentPage: function
 *
 */

Paginator.propTypes = {
  pagesInfo: PropTypes.shape({
    totalsItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
  }),
  handleJumpToPrevPage: PropTypes.func,
  handleJumpToNextPage: PropTypes.func,
  handleUpdateCurrentPage: PropTypes.func,
};
