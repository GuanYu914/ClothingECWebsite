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
  pageInfo,
  handleJumpToPrevPage,
  handleJumpToNextPage,
  handleUpdateCurrentPage,
}) {
  return (
    <Container>
      <PrevIcon
        hidden={pageInfo.currentPage === 1 ? true : false}
        onClick={() => {
          handleJumpToPrevPage();
        }}
      />
      <PageIndicator>
        {pageInfo.totalPages.map((page, index) => (
          <PageButton
            key={index}
            isSelected={pageInfo.currentPage === page ? true : false}
            onClick={(e) => {
              console.log("clicked page is: " + e.target.innerText);
              handleUpdateCurrentPage(Number(e.target.innerText.trim()));
            }}
          >
            {page + " "}
          </PageButton>
        ))}
      </PageIndicator>
      <NextIcon
        hidden={
          pageInfo.currentPage === pageInfo.totalPages.length ? true : false
        }
        onClick={() => {
          handleJumpToNextPage();
        }}
      />
    </Container>
  );
}

/**
 *  pageInfo: {
 *    totalPages: number array
 *    currentPage: number
 *  }
 *
 *  handleJumpToPrevPage: function
 *  handleJumpToNextPage: function
 *  handleUpdateCurrentPage: function
 *
 */

Paginator.propTypes = {
  pageInfo: PropTypes.shape({
    totalPages: PropTypes.arrayOf(PropTypes.number),
    currentPage: PropTypes.number,
  }),
  handleJumpToPrevPage: PropTypes.func,
  handleJumpToNextPage: PropTypes.func,
  handleUpdateCurrentPage: PropTypes.func,
};
