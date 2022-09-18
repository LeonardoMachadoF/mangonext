import { createContext, useContext, useState } from "react";

type themeInitialState = {
    primaryColor: string;
    secondaryColor: string;
    terciaryColor: string;
    fontColor: string;
    iconColor: string;
}

type ContextType = {
    theme: themeInitialState,
    setTheme: any
}

const themeInitialState = {
    primaryColor: '#1c1c1c',
    secondaryColor: '#323634',
    terciaryColor: '#000000',
    fontColor: '#fff',
    iconColor: '#fff'
}

const Context = createContext<ContextType>({
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

export const useThemeContext = () => {
    const { theme, setTheme } = useContext(Context);

    return {
        theme: theme,
        setTheme: () => {
            if (theme.primaryColor === '#1c1c1c') {
                setTheme({
                    primaryColor: '#b5f7de',
                    secondaryColor: '#7caa98',
                    terciaryColor: '#6a9182',
                    fontColor: '#000',
                    iconColor: '#000'
                })
                return
            }
            if (theme.primaryColor === '#b5f7de') {
                setTheme({
                    primaryColor: '#1c1c1c',
                    secondaryColor: '#323634',
                    terciaryColor: '#000000',
                    fontColor: '#fff',
                    iconColor: '#fff'
                })
                return
            }
        }
    }
}
