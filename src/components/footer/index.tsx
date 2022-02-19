import styled from "styled-components";
import { ReactComponent as github } from "../../imgs/components/footer/github.svg";
import { ReactComponent as mail } from "../../imgs/components/footer/mailbox2.svg";
import {
  BG_PRIMARY1,
  BG_SECONDARY1,
  COLOR_PRIMARY1,
  COLOR_SECONDARY3,
  FOOTER_GITHUB_LINK,
  FOOTER_MAIL_LINK,
} from "../../constant";

const Container = styled.footer<{
  marginTop?: string;
  marginBottom?: string;
  bgColor?: string;
}>`
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

const IconsContainer = styled.section`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GithubLink = styled(github)<{ color?: string }>`
  width: 2.4rem;
  height: 2.4rem;
  margin: 0 0.4rem;
  color: ${(props) => props.color || COLOR_PRIMARY1};

  &:hover {
    cursor: pointer;
  }
`;

const MailLink = styled(mail)<{ color?: string }>`
  width: 2.4rem;
  height: 2.4rem;
  margin: 0 0.4rem;
  color: ${(props) => props.color || COLOR_PRIMARY1};

  &:hover {
    cursor: pointer;
  }
`;

const ProjectDescription = styled.h3.attrs(() => ({
  className: "fs-h3",
}))<{ color?: string }>`
  color: ${(props) => props.color || COLOR_PRIMARY1};
  padding-top: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

interface FooterProps {
  marginTop?: string;
  marginBottom?: string;
  bgColor?: string;
}

export default function Footer({
  marginTop,
  marginBottom,
  bgColor,
}: FooterProps) {
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
            window.open(FOOTER_GITHUB_LINK);
          }}
        />
        <MailLink
          color={bgColor}
          onClick={() => {
            window.open(FOOTER_MAIL_LINK);
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
