import { Bell, DownloadSimple, List, MagnifyingGlass } from 'phosphor-react'
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { useThemeContext } from '../../contexts/colorContext/hook';
import { ToogleButton } from '../ToogleButton';
import styles from './styles.module.css'

type Props = {
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ menuOpen, setMenuOpen }: Props) => {
    const { theme, setTheme } = useThemeContext();

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
                    <ToogleButton />
                </div>
            </div>
        </header>
    )
}