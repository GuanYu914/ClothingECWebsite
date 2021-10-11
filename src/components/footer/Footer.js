import styled from "styled-components";
import PropTypes from "prop-types";
import { ReactComponent as github } from "../../imgs/components/footer/github.svg";
import { ReactComponent as mail } from "../../imgs/components/footer/mailbox2.svg";

const Container = styled.div.attrs(() => ({
  className: "color-secondary3 bg-secondary1",
}))`
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
`;

const GithubLink = styled(github)`
  width: 2rem;
  height: 2rem;
  margin: 0 0.4rem;
`;

const MailLink = styled(mail)`
  width: 2rem;
  height: 2rem;
  margin: 0 0.4rem;
`;

export default function Footer({ marginTop, marginBottom }) {
  return (
    <Container marginTop={marginTop} marginBottom={marginBottom}>
      <GithubLink />
      <MailLink />
    </Container>
  );
}

Footer.propTypes = {
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
};
