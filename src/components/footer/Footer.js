import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as github } from "../../imgs/components/footer/github.svg";
import { ReactComponent as mail } from "../../imgs/components/footer/mailbox2.svg";
import {
  BG_PRIMARY1,
  BG_SECONDARY1,
  COLOR_PRIMARY1,
  COLOR_SECONDARY3,
} from "../../constant";

const Container = styled.div`
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_SECONDARY1};
  width: 100%;
  height: 12rem;
  text-align: center;
  // 預設為 margin-top: 4rem
  margin-top: ${(props) => props.marginTop || "4rem"};
  // 預設為 margin-bottom: 0
  margin-bottom: ${(props) => props.marginBottom || 0};
  background-color: ${(props) => props.bgColor || BG_PRIMARY1};
`;

const IconsContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GithubLink = styled(github)`
  width: 2.4rem;
  height: 2.4rem;
  margin: 0 0.4rem;
  color: ${(props) =>
    props.color === COLOR_PRIMARY1 ? COLOR_SECONDARY3 : COLOR_PRIMARY1};

  &:hover {
    cursor: pointer;
  }
`;

const MailLink = styled(mail)`
  width: 2.4rem;
  height: 2.4rem;
  margin: 0 0.4rem;
  color: ${(props) =>
    props.color === COLOR_PRIMARY1 ? COLOR_SECONDARY3 : COLOR_PRIMARY1};

  &:hover {
    cursor: pointer;
  }
`;

const ProjectDescription = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${(props) =>
    props.color === COLOR_PRIMARY1 ? COLOR_SECONDARY3 : COLOR_PRIMARY1};
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;
export default function Footer({ marginTop, marginBottom, bgColor }) {
  return (
    <Container
      marginTop={marginTop}
      marginBottom={marginBottom}
      bgColor={bgColor}
    >
      <IconsContainer>
        <GithubLink
          color={bgColor}
          onClick={() => {
            window.open("https://github.com/GuanYu914/clothing-ec-website");
          }}
        />
        <MailLink
          color={bgColor}
          onClick={() => {
            window.open("mailto:yu.uiux.designer@gmail.com");
          }}
        />
      </IconsContainer>
      <ProjectDescription color={bgColor}>
        透過點擊上方圖示，查看原始碼或跟我 Say 哈囉
      </ProjectDescription>
      <ProjectDescription color={bgColor}>
        專案為個人練習，素材部分為 CCO 授權，且不做任何商業營利用途
      </ProjectDescription>
    </Container>
  );
}

Footer.propTypes = {
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  bgColor: PropTypes.string.isRequired,
};
