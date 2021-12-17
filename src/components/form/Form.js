import styled from "styled-components";
import PropTypes from "prop-types";
import { CTAPrimaryButton } from "../../components/button";
import {
  BG_SECONDARY3,
  BR_PRIMARY1,
  BR_SECONDARY1,
  COLOR_PRIMARY1,
  COLOR_SECONDARY1,
} from "../../constant";

const Container = styled.div.attrs(() => ({
  className: "box-shadow-light",
}))`
  background-color: ${BG_SECONDARY3};
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
  className: "fs-h2",
}))`
  color: ${COLOR_PRIMARY1};
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
  className: "fs-h3",
}))`
  color: ${(props) => props.color || COLOR_PRIMARY1};
`;

const ButtonContainer = styled.div``;

const RegisterButton = styled.a.attrs(() => ({
  className: "fs-h3",
  href: "/clothing-ec/demo/register",
  target: "_blank",
}))`
  color: ${COLOR_SECONDARY1};
  display: block;
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: ${COLOR_PRIMARY1};
  }
  &:hover {
    color: ${COLOR_PRIMARY1};
`;

const LoginButton = styled.a.attrs(() => ({
  className: "fs-h3",
  href: "/clothing-ec/demo/login",
  target: "_blank",
}))`
  color: ${COLOR_SECONDARY1};
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
  useForProfileEditing,
}) {
  return (
    <Container width={width}>
      <FormContainer>
        {formState.map((formData) => (
          <FieldContainer key={formData.id}>
            <FormField>{formData.field}</FormField>
            <InputArea
              type={formData.type}
              readOnly={formData.readOnly}
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
          <RegisterButton>還沒成為會員嗎？點此註冊</RegisterButton>
          <CTAPrimaryButton
            width={"100%"}
            margin={"1.4rem auto 0"}
            isRounded={true}
            onClick={() => {
              handleSubmit();
            }}
          >
            登入
          </CTAPrimaryButton>
        </ButtonContainer>
      )}
      {useForRegister && (
        <ButtonContainer>
          <LoginButton>已經是會員了嗎？點此登入</LoginButton>
          <CTAPrimaryButton
            width={"100%"}
            margin={"1.4rem auto 0"}
            isRounded={true}
            onClick={() => {
              handleSubmit();
            }}
          >
            註冊
          </CTAPrimaryButton>
        </ButtonContainer>
      )}
      {useForProfileEditing && (
        <ButtonContainer>
          <CTAPrimaryButton
            width={"100%"}
            margin={"1.4rem auto 0"}
            isRounded={true}
            onClick={() => {
              handleSubmit();
            }}
          >
            修改
          </CTAPrimaryButton>
        </ButtonContainer>
      )}
    </Container>
  );
}

/**
 *  Form PropTypes 屬性
 *  Form: {
 *    width: string,
 *    formState: [
 *      {
 *        id: number,         (required)
 *        type: string,       (required)
 *        maxLength: number,  (required)
 *        field: string,      (required)
 *        inputValue: string, (required)
 *      }
 *    ],
 *    handleInputChange: function,  (required)
 *    handleSubmit: function,       (required)
 *    handleFocusOut: function,     (required)
 *    useForLogin: function,        (根據使用頁面決定，跟下列三個擇一即可)
 *    useForRegister: function,
 *    useForProfileEditing: function,
 *  }
 */

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
  useForProfileEditing: PropTypes.bool,
};
