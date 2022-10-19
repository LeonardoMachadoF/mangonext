import { useEffect } from 'react';
import { useThemeContext } from '../../../contexts/colorContext/hook';
import { ThemeType } from '../../../contexts/colorContext/types';
import styles from './styles.module.css';

export const ToogleButton = () => {
    const { theme, setTheme } = useThemeContext();
    const handleChange = async () => {
        setTheme();
    }

    useEffect(() => {
        let json = localStorage.getItem('theme')
        if (json) {
            let theme = JSON.parse(json);
            setTheme(theme)
        }
    }, [])

    useEffect(() => {
        let handleTheme = async () => {
            await new Promise((resolve) => setTimeout(resolve, 500))
            localStorage.setItem('theme', JSON.stringify(theme));
        }
        handleTheme();
    }, [theme])
    return (
        <div className={styles.toggle}>
            <input type="checkbox" name="switch" id="switch" onChange={handleChange} checked={theme.theme !== 'dark'} />
        </div>
    )
}