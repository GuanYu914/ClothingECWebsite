import styled from "styled-components/macro";
import { ReactComponent as checkNoneFilled } from "../../imgs/pages/cart-page/square.svg";
import { ReactComponent as checkFilled } from "../../imgs/pages/cart-page/check-square-fill.svg";
import { CTAPrimaryButton, CTASecondaryButton } from "../../components/button";
import { Z_INDEX_LV4 } from "../../constant";
import PropTypes from "prop-types";

const Container = styled.div.attrs(() => ({
  className: "bg-secondary3",
}))`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX_LV4};
  box-shadow: rgba(0, 0, 0, 0.04) 0px -3px 5px;
`;

const SelectionHeader = styled.div.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
`;

const NoneCheckedAllButton = styled(checkNoneFilled).attrs(() => ({
  className: "color-secondary2",
}))`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const CheckedAllButton = styled(checkFilled).attrs(() => ({
  className: "color-secondary2",
}))`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const TotalPriceShower = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))`
  margin-bottom: 0.8rem;
`;

// 定義可以被重複使用的 styled component
export const SharedSelectionHeader = styled(SelectionHeader)``;
export const SharedNoneCheckedButton = styled(NoneCheckedAllButton)``;
export const SharedCheckedAllButton = styled(CheckedAllButton)``;
export const SharedTotalPriceShower = styled(TotalPriceShower)``;

export default function FixedOffcanva({
  totalPrice,
  checkedState,
  checkedAllState,
  handleToggleSelectAllProducts,
}) {
  return (
    <Container>
      <SelectionHeader>
        {!checkedAllState && (
          <NoneCheckedAllButton onClick={handleToggleSelectAllProducts} />
        )}
        {checkedAllState && (
          <CheckedAllButton onClick={handleToggleSelectAllProducts} />
        )}
        全選
      </SelectionHeader>
      <TotalPriceShower>總金額：NTD {totalPrice}</TotalPriceShower>
      {checkedState && (
        <CTAPrimaryButton width={"100%"} isRounded={true}>
          結帳去
        </CTAPrimaryButton>
      )}
      {!checkedState && (
        <CTASecondaryButton width={"100%"} isRounded={true}>
          沒有物品可結帳
        </CTASecondaryButton>
      )}
    </Container>
  );
}

FixedOffcanva.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  checkedState: PropTypes.bool.isRequired,
  checkedAllState: PropTypes.bool.isRequired,
  handleToggleSelectAllProducts: PropTypes.func.isRequired,
};
