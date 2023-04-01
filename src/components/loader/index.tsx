import { useSpring, animated } from "react-spring";
import styled from "styled-components/macro";

const Container = styled.div<{
  width?: string;
  height?: string;
  marginTop: string;
}>`
  position: relative;
  margin: 0 auto 0;
  width: ${(props) => props.width || "6rem"};
  height: ${(props) => props.height || "6rem"};
  margin-top: ${(props) => props.marginTop};
`;

interface LoaderProps {
  width?: string;
  height?: string;
  marginTop: string;
}

export default function Loader({ width, height, marginTop }: LoaderProps) {
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
