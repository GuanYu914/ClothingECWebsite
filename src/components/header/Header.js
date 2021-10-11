import { ReactComponent as logo } from "../../imgs/components/header/bootstrap.svg";
import { ReactComponent as list } from "../../imgs/components/header/list.svg";
import { ReactComponent as profile } from "../../imgs/components/header/person-circle.svg";
import { ReactComponent as shopping_bag } from "../../imgs/components/header/bag.svg";
import styled from "styled-components";
import {
  BREAKPOINT_LAPTOP,
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  Z_INDEX_LV6,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
} from "../../constant";

const NavBarContainer = styled.nav.attrs(() => ({
  className: "bg-secondary3",
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: ${Z_INDEX_LV6};
  height: ${HEADER_HEIGHT_MOBILE};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  ${BREAKPOINT_MOBILE} {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${BREAKPOINT_PAD} {
    height: ${HEADER_HEIGHT_PAD};
  }

  // 裝置尺寸為 1440px 寬時，將 NavBar 固定為 1440px 寬
  ${BREAKPOINT_LAPTOP} {
    padding-left: calc((100% - 90rem) / 2);
    padding-right: calc((100% - 90rem) / 2);
  }
`;

const BrandLogo = styled(logo)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  ${BREAKPOINT_PAD} {
    width: 2.4rem;
    height: 2.4rem;
  }
`;
const HamburgerButton = styled(list)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const FeatureContainer = styled.div`
  display: none;

  ${BREAKPOINT_PAD} {
    display: flex;
  }
`;

const ProfileContainer = styled.div`
  display: none;

  ${BREAKPOINT_PAD} {
    display: flex;
    align-items: center;
    margin-right: 2rem;
  }
`;

const ProfileIcon = styled(profile)`
  ${BREAKPOINT_PAD} {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
    margin-right: 1rem;
  }
`;

const UserNickname = styled.h3.attrs(() => ({
  className: "fs-h3",
}))``;

const ShoppingBag = styled(shopping_bag)`
  ${BREAKPOINT_PAD} {
    width: 2.4rem;
    height: 2.4rem;
    cursor: pointer;
  }
`;

export default function Header() {
  return (
    <NavBarContainer>
      <BrandLogo />
      <HamburgerButton />
      <FeatureContainer>
        <ProfileContainer>
          <ProfileIcon />
          <UserNickname>冠宇</UserNickname>
        </ProfileContainer>
        <ShoppingBag />
      </FeatureContainer>
    </NavBarContainer>
  );
}
