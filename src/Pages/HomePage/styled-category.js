import styled from "styled-components";

export const CategoryBlock = styled.div`
  margin-top: 5rem;
`;

export const CategoryTitle = styled.h1.attrs(() => ({
  className: "mob-h1",
}))`
  text-align: center;
`;

export const CategoriesContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Category = styled.div.attrs(() => ({
  className: "mob-h3-mid color-secondary3 bg-secondary1",
}))`
  width: fit-content;
  height: fit-content;
  padding: 2.4rem 2.6rem;
  margin: 0.4rem 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
`;
