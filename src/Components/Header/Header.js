import { ReactComponent as logo } from "../../Imgs/Components/Header/bootstrap.svg";
import { ReactComponent as list } from "../../Imgs/Components/Header/list.svg";
import styled from "styled-components";
import { HEADER_HEIGHT_OFFSET, Z_INDEX_LV6 } from "../../Constant";

const Container = styled.div``;

const NavBarContainer = styled.nav.attrs(() => ({
  className: "bg-secondary3",
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: ${Z_INDEX_LV6};
  height: ${HEADER_HEIGHT_OFFSET};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
`;

const BrandLogo = styled(logo)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-left: 1rem;
`;
const HamburgerButton = styled(list)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  margin-right: 1rem;
`;

export default function Header() {
  return (
    <Container>
      <NavBarContainer>
        <BrandLogo />
        <HamburgerButton />
      </NavBarContainer>
    </Container>
  );
}
