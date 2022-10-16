import { createContext, useState } from "react";
import { ContextType, themeInitialState } from "./types";

export const themes: themeInitialState = [
    {
        theme: 'dark',
        primaryColor: '#1c1c1c',
        secondaryColor: '#323634',
        terciaryColor: '#000000',
        fontColor: '#fff',
        iconColor: '#fff'
    },
    {
        theme: 'light',
        primaryColor: '#FBF9F9',
        secondaryColor: '#FBF9F9',
        terciaryColor: '#FBF9F9',
        fontColor: '#000',
        iconColor: '#000'
    }
]

const themeInitialState = themes[0];

export const Context = createContext<ContextType>({
    theme: themeInitialState,
    setTheme: () => { }
})

export const ContextProvider = ({ children }: any) => {
    const [theme, setTheme] = useState(themeInitialState);

    return (
        <Context.Provider value={{ theme, setTheme }}>
            {children}
        </Context.Provider>
    )
}
