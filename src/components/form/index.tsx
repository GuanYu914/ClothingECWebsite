import React from "react";
import styled from "styled-components/macro";
import { CTAPrimaryButton } from "../button";
import { useHistory } from "react-router-dom";
import {
  BG_SECONDARY3,
  BR_PRIMARY1,
  BR_SECONDARY1,
  COLOR_PRIMARY1,
  COLOR_SECONDARY1,
} from "../../constant";

const Container = styled.section.attrs(() => ({
  className: "box-shadow-light",
}))<{ width?: string }>`
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

const FieldContainer = styled.section`
  margin-bottom: 2rem;
`;

const FormField = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_PRIMARY1};
  margin-bottom: 0.5rem;
`;

const InputArea = styled.input.attrs<{
  type?: string;
  maxLength: string;
}>((props) => ({
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
}))<{ color?: string }>`
  color: ${(props) => props.color || COLOR_PRIMARY1};
`;

const ButtonContainer = styled.section``;

const RegisterButton = styled.a.attrs(() => ({
  className: "fs-h3",
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

export interface ExternalFormProps {
  id: number;
  field: string;
  type?: string;
  readOnly?: boolean;
  inputValue: string;
  maxLength: number;
  helperColor?: string;
  helperMsg: string;
}
interface FormProps {
  width?: string;
  formState: {
    id: number;
    field: string;
    type?: string;
    readOnly?: boolean;
    inputValue: string;
    maxLength: number;
    helperColor?: string;
    helperMsg: string;
  }[];
  useForLogin?: boolean;
  useForRegister?: boolean;
  useForProfileEditing?: boolean;
  handleInputChange: (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleFocusOut: (
    id: string,
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => void;
  handleSubmit: () => void;
}

export default function Form({
  width,
  formState,
  handleInputChange,
  handleSubmit,
  handleFocusOut,
  useForLogin,
  useForRegister,
  useForProfileEditing,
}: FormProps) {
  const history = useHistory();
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
          <RegisterButton
            onClick={() => {
              history.push("/register");
            }}
          >
            還沒成為會員嗎？點此註冊
          </RegisterButton>
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
          <LoginButton
            onClick={() => {
              history.push("/login");
            }}
          >
            已經是會員了嗎？點此登入
          </LoginButton>
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
