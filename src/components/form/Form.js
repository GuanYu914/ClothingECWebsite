import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { CTAPrimaryButton } from "../../components/button";
import { BR_PRIMARY1, BR_SECONDARY1, COLOR_PRIMARY1 } from "../../constant";

const Container = styled.div.attrs(() => ({
  className: "bg-secondary3 box-shadow-light",
}))`
  width: ${(props) => props.width || "24rem"};
  height: fit-content;
  border-radius: 1rem;
  padding: 2rem 1rem 2rem;
`;
const FormContainer = styled.form`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FieldContainer = styled.div`
  margin-bottom: 2rem;
`;

const FormField = styled.h2.attrs(() => ({
  className: "fs-h2 color-primary1",
}))`
  margin-bottom: 0.5rem;
`;

const InputArea = styled.input.attrs((props) => ({
  type: props.type || "text",
  maxLength: props.maxLength,
}))`
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  height: 2.6rem;
  padding: 0.4rem;
  width: 100%;
  transition: all 0.3s ease;
  border: 0.08rem solid ${BR_SECONDARY1};

  &:focus {
    outline: none !important;
    border-color: ${BR_PRIMARY1};
    box-shadow: 0 0 0 0.16rem ${BR_PRIMARY1};
  }
`;

const FormHelper = styled.h3.attrs(() => ({
  className: "fs-h3 color-primary1",
}))`
  color: ${(props) => props.color || COLOR_PRIMARY1};
`;

const ButtonContainer = styled.div``;
const ForgetPassButton = styled.a.attrs(() => ({
  className: "fs-h3 color-secondary1",
  href: "/pass-reset",
  target: "_blank",
}))`
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: ${COLOR_PRIMARY1};
  }
  &:hover {
    color: ${COLOR_PRIMARY1};
  }
`;
export default function Form({
  width,
  formState,
  handleInputChange,
  handleSubmit,
  handleFocusOut,
  useForLogin,
  useForRegister,
}) {
  return (
    <Container width={width}>
      <FormContainer>
        {formState.map((formData) => (
          <FieldContainer key={formData.id}>
            <FormField>{formData.field}</FormField>
            <InputArea
              type={formData.type}
              maxLength={formData.maxLength}
              value={formData.inputValue}
              onChange={(e) => {
                handleInputChange(formData.id, e);
              }}
              onBlur={(e) => {
                handleFocusOut(formData.field, e);
              }}
            ></InputArea>
            <FormHelper color={formData.helperColor}>
              {formData.helperMsg}
            </FormHelper>
          </FieldContainer>
        ))}
      </FormContainer>
      {useForLogin && (
        <ButtonContainer>
          <ForgetPassButton>忘記密碼？</ForgetPassButton>
          <CTAPrimaryButton
            width={"100%"}
            margin={"1.4rem auto 0"}
            isRounded={true}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            登入
          </CTAPrimaryButton>
        </ButtonContainer>
      )}
      {useForRegister && (
        <CTAPrimaryButton
          width={"100%"}
          margin={"0 auto 0"}
          isRounded={true}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          註冊
        </CTAPrimaryButton>
      )}
    </Container>
  );
}

Form.propTypes = {
  width: PropTypes.string,
  formState: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      maxLength: PropTypes.number.isRequired,
      field: PropTypes.string.isRequired,
      inputValue: PropTypes.string.isRequired,
    })
  ),
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFocusOut: PropTypes.func.isRequired,
  useForLogin: PropTypes.bool,
  useForRegister: PropTypes.bool,
};
