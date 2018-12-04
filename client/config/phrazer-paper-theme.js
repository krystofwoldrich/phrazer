import { DefaultTheme } from "react-native-paper";

import COLORS from "./colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.mainColor.light
  }
};
