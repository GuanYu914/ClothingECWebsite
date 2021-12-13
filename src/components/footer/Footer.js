import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as github } from "../../imgs/components/footer/github.svg";
import { ReactComponent as mail } from "../../imgs/components/footer/mailbox2.svg";
import { BG_PRIMARY1, BG_SECONDARY1, COLOR_SECONDARY3 } from "../../constant";

const Container = styled.div`
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_SECONDARY1};
  width: 100%;
  height: 8rem;
  text-align: center;
  // 預設為 margin-top: 4rem
  margin-top: ${(props) => props.marginTop || "4rem"};
  // 預設為 margin-bottom: 0
  margin-bottom: ${(props) => props.marginBottom || 0};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || BG_PRIMARY1};
`;

const GithubLink = styled(github)`
  width: 2rem;
  height: 2rem;
  margin: 0 0.4rem;
  color: ${(props) => props.icon_color || COLOR_SECONDARY3};
`;

const MailLink = styled(mail)`
  width: 2rem;
  height: 2rem;
  margin: 0 0.4rem;
  color: ${(props) => props.icon_color || COLOR_SECONDARY3};
`;

export default function Footer({
  marginTop,
  marginBottom,
  bgColor,
  iconColor,
}) {
  return (
    <Container
      marginTop={marginTop}
      marginBottom={marginBottom}
      bgColor={bgColor}
    >
      <GithubLink icon_color={iconColor} />
      <MailLink icon_color={iconColor} />
    </Container>
  );
}

Footer.propTypes = {
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  bgColor: PropTypes.string,
  iconColor: PropTypes.string,
};
