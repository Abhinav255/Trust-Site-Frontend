import { createContext } from "react";

export const themes = {
  dark: "white-content",
  light: "white-content",
};

export const ThemeContext = createContext({
  theme: themes.dark,
  changeTheme: () => {},
});
