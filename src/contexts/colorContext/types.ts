import { Dispatch } from "react";

export type ThemeType = {
    theme: string;
    primaryColor: string;
    secondaryColor: string;
    terciaryColor: string;
    fontColor: string;
    iconColor: string;
}

export type themeInitialState = ThemeType[];

export type ContextType = {
    theme: ThemeType,
    setTheme: Dispatch<ThemeType>
}