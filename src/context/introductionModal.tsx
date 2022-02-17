import React, { createContext } from "react";

interface IntroductionModalContextPayload {
  introductionModalIsDisplayed: boolean;
  setIntroductionModalIsDisplayed?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export const IntroductionModalContext =
  createContext<IntroductionModalContextPayload>({
    introductionModalIsDisplayed: false,
  });
