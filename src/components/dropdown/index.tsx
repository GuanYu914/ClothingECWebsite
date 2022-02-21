import React from "react";
import styled from "styled-components";
import {
  BG_PRIMARY1,
  BG_SECONDARY4,
  COLOR_PRIMARY1,
  COLOR_SECONDARY2,
  COLOR_SECONDARY3,
} from "../../constant";
import { CTAPrimaryButton } from "../button";
import { useHistory } from "react-router-dom";

const DropDownContainer = styled.div<{ zIndex: string }>`
  display: inline-block;
  position: relative;
  z-index: ${(props) => props.zIndex};
`;
const DropDownContent = styled.section.attrs(() => ({
  className: "fs-h3 box-shadow-dark",
}))<{
  height?: string;
  width?: string;
}>`
  color: ${COLOR_SECONDARY2};
  background-color: ${BG_SECONDARY4};
  visibility: hidden;
  opacity: 0;
  border-radius: 0.5rem;
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  height: ${(props) => props.height || "fit-content"};
  width: ${(props) => props.width || "fit-content"};
  overflow: auto;
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
    padding: 0.8rem;
    text-decoration: none;
  }

  & a:hover {
    color: ${COLOR_SECONDARY3};
    background-color: ${BG_PRIMARY1};
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }
`;

const LinkName = styled.a.attrs(() => ({
  className: "fs-h3",
}))`
  cursor: pointer;
`;

const OptionName = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  margin-bottom: 1.6rem;
  cursor: pointer;

  &:hover {
    color: ${COLOR_PRIMARY1};
  }

  &:last-child {
    margin-bottom: 0;
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

const ProductThumbnail = styled.div<{ url: string }>`
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
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const ProductColor = styled.div<{ color: string }>`
  width: 1.4rem;
  height: 1.4rem;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  margin-left: 0.5rem;
`;

const ProductQuantity = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
`;

interface DropDownProps {
  dropDownInfo: {
    width?: string;
    height?: string;
    zIndex: string;
    useForLinks?: boolean;
    useForCart?: boolean;
    useForOption?: boolean;
    options?: {
      id: number;
      name: string;
      url?: string;
    }[];
    products?: {
      id: number;
      pid: number;
      url: string;
      name: string;
      color: string;
      size: string;
      quantity: number;
    }[];
  };
  handleOptionSelection?: (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  children: React.ReactChild;
}

export default function DropDown({
  dropDownInfo,
  children,
  handleOptionSelection,
}: DropDownProps) {
  const history = useHistory();
  return (
    <DropDownContainer zIndex={dropDownInfo.zIndex}>
      {children}
      {dropDownInfo.useForLinks && (
        <DropDownContent width={dropDownInfo.width}>
          {dropDownInfo.options?.map((option) => (
            <LinkName
              key={option.id}
              onClick={() => {
                history.push(`${option.url}`);
              }}
            >
              {option.name}
            </LinkName>
          ))}
        </DropDownContent>
      )}
      {dropDownInfo.useForOption && (
        <DropDownContent width={dropDownInfo.width}>
          {dropDownInfo.options?.map((option) => (
            <OptionName
              key={option.id}
              data-option-name={option.name}
              onClick={handleOptionSelection}
            >
              {option.name}
            </OptionName>
          ))}
        </DropDownContent>
      )}
      {dropDownInfo.useForCart &&
        (dropDownInfo.products?.length ? (
          <DropDownContent
            width={dropDownInfo.width}
            height={dropDownInfo.height}
          >
            {dropDownInfo.products.map((product) => (
              <CartProductsContainer
                key={product.id}
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/product/${product.pid}`);
                }}
              >
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
              onClick={() => {
                history.push("/cart");
              }}
            >
              查看購物車
            </CTAPrimaryButton>
          </DropDownContent>
        ) : (
          <DropDownContent
            width={dropDownInfo.width}
            height={dropDownInfo.height}
          >
            購物車內並沒有任何產品喔
            <CTAPrimaryButton
              margin={"1rem 0 0 auto"}
              isRounded={true}
              onClick={() => {
                history.push("/cart");
              }}
            >
              查看購物車
            </CTAPrimaryButton>
          </DropDownContent>
        ))}
    </DropDownContainer>
  );
}
