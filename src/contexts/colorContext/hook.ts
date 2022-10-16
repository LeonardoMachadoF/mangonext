import { useContext } from "react";
import { Context, themes } from "./context";
import { ThemeType } from "./types";

export const useThemeContext = () => {
    const { theme, setTheme } = useContext(Context);

    return {
        theme: theme,
        setTheme: (ctx?: ThemeType) => {
            if (ctx) {
                setTheme(ctx);
                return;
            }
            if (theme.theme === 'dark') {
                setTheme(themes[1])
                return
            }
            if (theme.theme === 'light') {
                setTheme(themes[0])
                return
            }
        }
    }
}