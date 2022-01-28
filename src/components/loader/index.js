import { useSpring, animated } from "react-spring";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  margin: 0 auto 0;
  width: ${(props) => props.width || "6rem"};
  height: ${(props) => props.height || "6rem"};
  margin-top: ${(props) => props.marginTop};
`;

export default function Loader({ width, height, marginTop }) {
  const styles = useSpring({
    loop: true,
    delay: 150,
    from: {
      opacity: 1,
      width: width || "0",
      height: height || "0",
    },
    to: {
      opacity: 0,
      width: width || "6rem",
      height: height || "6rem",
    },
  });

  return (
    <Container marginTop={marginTop}>
      <animated.div
        style={{
          border: "0.8rem solid black",
          borderRadius: "100%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          ...styles,
        }}
      />
    </Container>
  );
}

Loader.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  marginTop: PropTypes.string,
};
