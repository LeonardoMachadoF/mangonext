import { Bell, DownloadSimple, List, MagnifyingGlass } from 'phosphor-react'
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { useThemeContext } from '../../contexts/colorContext/hook';
import styles from './styles.module.css'

type Props = {
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ menuOpen, setMenuOpen }: Props) => {
    const { theme, setTheme } = useThemeContext();
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
        <header className={styles.header} style={{ backgroundColor: theme.secondaryColor }}>
            <div className={styles.logo}>

                <List
                    size={24}
                    color={theme.iconColor}
                    weight="bold"
                    onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}
                />

                <div onClick={() => setTheme()}>Logo</div>
            </div>
            <div className={styles.searchArea}>

                <div className={styles.searchBar}>
                    <input type="text" placeholder='Pesquise um manga' />
                    <MagnifyingGlass size={24} color="#fff" />
                </div>
                <div className={styles.toggle}>
                    <input type="checkbox" name="switch" id="switch" onChange={handleChange} checked={theme.theme !== 'dark'} />
                </div>
            </div>
        </header>
    )
}