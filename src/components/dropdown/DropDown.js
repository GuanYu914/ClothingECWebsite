import styled from "styled-components/macro";
import PropTypes from "prop-types";
import {
  BG_PRIMARY1,
  COLOR_SECONDARY2,
  COLOR_SECONDARY3,
} from "../../constant";
import { CTAPrimaryButton } from "../button";

const DropDownContainer = styled.div`
  display: inline-block;
  position: relative;
`;
const DropDownContent = styled.div.attrs(() => ({
  className: "box-shadow-dark color-secondary2 fs-h3 bg-secondary3",
}))`
  visibility: hidden;
  opacity: 0;
  border-radius: 0.5rem;
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: ${(props) => props.width || "fit-content"};
  overflow: visible;
  transition: all 0.2s ease-in-out;
  padding: 0.8rem;

  ${DropDownContainer}:hover & {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  & a {
    display: block;
    color: ${COLOR_SECONDARY2};
    padding: 0.5rem;
    text-decoration: none;
  }

  & a:hover {
    color: ${COLOR_SECONDARY3};
    background-color: ${BG_PRIMARY1};
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }
`;

const CartProductsContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  cursor: pointer;

  &:hover {
    // rgba(144, 144, 144, 0.2) = #909090 opacity 0.2
    background-color: rgba(144, 144, 144, 0.2);
  }
`;

const ProductThumbnail = styled.div`
  width: 4rem;
  height: 4rem;
  background: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 2rem;
`;

const ProductSpecs = styled.div`
  width: 10rem;
  margin-right: 1rem;
`;
const ProductName = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const ProductColor = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  margin-left: 0.5rem;
`;

const ProductQuantity = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))``;

export default function DropDown({ dropDownInfo, children }) {
  return (
    <DropDownContainer>
      {children}
      {dropDownInfo.useForLinks && (
        <DropDownContent width={dropDownInfo.width}>
          {dropDownInfo.options.map((option) => (
            <a key={option.id} href={option.url}>
              {option.name}
            </a>
          ))}
        </DropDownContent>
      )}
      {dropDownInfo.useForBag && (
        <DropDownContent width={dropDownInfo.width}>
          {dropDownInfo.products.map((product) => (
            <CartProductsContainer key={product.id}>
              <ProductThumbnail url={product.url} />
              <ProductSpecs>
                <ProductName>{product.name}</ProductName>
                <ProductInfo>
                  <ProductColor color={product.color} />
                  <ProductSize>{product.size}</ProductSize>
                </ProductInfo>
              </ProductSpecs>
              <ProductQuantity>{product.quantity}</ProductQuantity>
            </CartProductsContainer>
          ))}
          <CTAPrimaryButton
            margin={"1rem 0 0 auto"}
            isRounded={true}
            width={"100%"}
            // 這邊使用 onClick 取代 React router Link，是因為 Link component 會受到 css 效果影響
            onClick={() => {
              window.location.href = "/cart";
            }}
          >
            查看購物車
          </CTAPrimaryButton>
        </DropDownContent>
      )}
    </DropDownContainer>
  );
}

/**
 *  DropDown PropTypes 屬性
 *  children: react component
 *  dropDownInfo: {
 *    width: string,
 *    useForLinks: boolean, ( 跟 useForBag 則一傳入即可 )
 *    useForBag: boolean,   ( 跟 useForLinks 則一傳入即可 )
 *    options: [{           ( useForLinks 為 true 時必須傳入 )
 *      id: number,
 *      name: string,
 *      url: string
 *    }],
 *    products: [{          ( useForBag 為 true 時必須傳入 )
 *      id: number,
 *      url: string,
 *      name: string,
 *      color: string,
 *      size: string,
 *      quantity: string,
 *    }]
 *  }
 */

DropDown.propTypes = {
  children: PropTypes.element.isRequired,
  dropDownInfo: PropTypes.shape({
    width: PropTypes.string,
    useForLinks: PropTypes.bool,
    useForBag: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
        name: PropTypes.string,
        color: PropTypes.string,
        size: PropTypes.string,
        quantity: PropTypes.string,
      })
    ),
  }),
};
