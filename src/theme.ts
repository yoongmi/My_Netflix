import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  point: "#ffcb6b",
  pointtxt: "#fff",
  bgColor: "#333",
  cardColor: "#555",
  txtColor: "#fff",
  bgOpacity: "rgba(0,0,0,0.5)",
  bgOpacityback: "rgba(255,255,255,0.5)",
  bgDark: "#000",
  bgGradient: "linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 1))",
  bgGradient2:
    "linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(51, 51, 51, 1))",
};

export const lightTheme: DefaultTheme = {
  point: "#ffcb6b",
  pointtxt: "#fff",
  bgColor: "#f1f1f1",
  cardColor: "#f9f9f9",
  txtColor: "#333",
  bgOpacity: "rgba(255,255,255,0.5)",
  bgOpacityback: "rgba(0,0,0,0.8)",
  bgDark: "#fff",
  bgGradient:
    "linear-gradient(to bottom,rgba(255,255, 255, 0) 60% ,rgba(255, 255, 255, 1) 95%)",
  bgGradient2:
    "linear-gradient(to bottom,rgba(255,255, 255, 0),rgba(241, 241, 241, 1) )",
};
