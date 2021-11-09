import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { useTransition, useChain, useSpringRef, animated } from "react-spring";
import { ReactComponent as close } from "../../imgs/components/offcanva/x-lg.svg";
import { ReactComponent as list } from "../../imgs/components/offcanva/list.svg";
import { ReactComponent as profile } from "../../imgs/components/offcanva/person-circle.svg";
import {
  BG_SECONDARY3,
  COLOR_PRIMARY1,
  COLOR_SECONDARY1,
} from "../../constant";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Container = styled.div``;

const OffcanvaButton = styled(list)`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const OffcanvaContainer = styled.div``;

const MaskContainer = styled(animated.div).attrs(() => ({
  className: "bg-mask",
}))`
  position: fixed;
  z-index: 5;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const OffcanvaBody = styled(animated.div).attrs(() => ({
  className: "fs-h3",
}))`
  height: 100vh;
  width: fit-content;
  position: absolute;
  z-index: 6;
  top: 0;
  right: 0;
  background-color: ${BG_SECONDARY3};
  overflow-x: hidden;
  padding: 4rem 2rem;

  & a {
    margin-bottom: 0.5rem;
    text-decoration: none;
    color: ${COLOR_SECONDARY1};
    display: block;
    transition: all 0.3s;
  }

  & a:hover {
    color: ${COLOR_PRIMARY1};
  }
`;

const OffcanvaLink = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary1",
}))`
  padding: 0.4rem 0 0.4rem;
`;

const CloseButton = styled(close)`
  position: absolute;
  cursor: pointer;
  top: 1rem;
  right: 1rem;
  width: 1.4rem;
  height: 1.4rem;
  transition: all 0.3s;

  &:hover {
    color: ${COLOR_PRIMARY1};
  }
`;

const OffcanvaHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserName = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary1",
}))``;

const ProfileIcon = styled(profile)`
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
`;

export default function Offcanva({ offcanvaInfo }) {
  const [active, setActive] = useState(false);
  const maskContainerTransitionRef = useSpringRef();
  const offcanvaBodyTransitionRef = useSpringRef();

  const maskContainerAnimation = useTransition(active, {
    ref: maskContainerTransitionRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 240,
    },
  });
  const offcanvaBodyAnimation = useTransition(active, {
    ref: offcanvaBodyTransitionRef,
    from: { transform: "translateX(100%)" },
    enter: { transform: "translateX(0px)" },
    leave: { transform: "translateX(100%)" },
    config: {
      duration: 240,
    },
  });
  // 透過 hook 完成連續動畫呈現
  useChain(
    active
      ? [offcanvaBodyTransitionRef, maskContainerTransitionRef]
      : [offcanvaBodyTransitionRef, maskContainerTransitionRef]
  );

  useEffect(() => {
    // render 完後，將 body 內容變更為不可滑動
    const bodyEl = document.querySelector("body");
    if (active) {
      bodyEl.classList.add("body-frozen");
    } else {
      bodyEl.classList.remove("body-frozen");
    }
  }, [active]);

  return (
    <Container>
      <OffcanvaButton
        onClick={() => {
          setActive(!active);
        }}
      ></OffcanvaButton>
      <OffcanvaContainer>
        {maskContainerAnimation(
          (props, item) =>
            item && (
              <MaskContainer
                style={props}
                onClick={() => {
                  setActive(!active);
                }}
              />
            )
        )}
        {offcanvaBodyAnimation(
          (props, item) =>
            item && (
              <OffcanvaBody style={props}>
                <OffcanvaHeader>
                  {offcanvaInfo.displayUserInfo && (
                    <>
                      <ProfileIcon />
                      {offcanvaInfo.user.isLogin && (
                        <UserName>{`${offcanvaInfo.user.name}，歡迎回來`}</UserName>
                      )}
                      {!offcanvaInfo.user.isLogin && (
                        <UserName>訪客，您好</UserName>
                      )}
                    </>
                  )}
                </OffcanvaHeader>
                <CloseButton
                  onClick={() => {
                    setActive(!active);
                  }}
                />
                {offcanvaInfo.links.map((link) => (
                  <Link key={link.id} to={link.url}>
                    <OffcanvaLink>{link.name}</OffcanvaLink>
                  </Link>
                ))}
              </OffcanvaBody>
            )
        )}
      </OffcanvaContainer>
    </Container>
  );
}

/**
 *  Offcanva PropTypes 屬性
 *  offcanvaInfo: {
 *    links: [{
 *      id: number,       (required)
 *      name: string,     (required)
 *      url: string,      (required)
 *    }]
 *  },
 *  displayUserInfo: boolean,
 *  user: {               (如果 displayUserInfo 為 true，則必須傳入)
 *    isLogin: boolean    (required)
 *    name: string        (required)
 *  }
 */

Offcanva.propTypes = {
  offcanvaInfo: PropTypes.shape({
    links: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
    displayUserInfo: PropTypes.bool,
    user: PropTypes.shape({
      isLogin: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};
