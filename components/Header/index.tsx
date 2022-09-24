import { Bell, DownloadSimple, List, MagnifyingGlass } from 'phosphor-react'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useThemeContext } from '../../contexts/colorContext/hook';
import { ToogleButton } from '../ToogleButton';
import styles from './styles.module.css'

type Props = {
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ menuOpen, setMenuOpen }: Props) => {
    const { theme, setTheme } = useThemeContext();
    const [mobile, setMobile] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 400) setMobile(true);
    }, [])


    const handleSearchIconClick = () => {
        if (mobile) {
            setSearchOpen(!searchOpen)
        }
    }
    return (
        <header className={styles.header} style={{ backgroundColor: theme.secondaryColor }}>
            <div className={styles.logo} style={{ width: searchOpen ? '50px' : '' }}>

                <List
                    size={24}
                    color={theme.iconColor}
                    weight="bold"
                    onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}
                />

                <div
                    onClick={() => setTheme()}
                    className={styles.logoTitle}
                    style={{ display: searchOpen ? 'none' : 'block' }}
                >
                    Logo
                </div>
            </div>
            <div className={styles.searchArea}>

                <div className={styles.searchBar}>
                    <input type="text" placeholder='Pesquise um manga' style={{ display: searchOpen ? (mobile ? 'block' : 'none') : '' }} />
                    <MagnifyingGlass size={24} color="#fff" onClick={handleSearchIconClick} />
                </div>

                <div className={styles.toggle}>
                    <ToogleButton />
                </div>
            </div>
        </header>
    )
}