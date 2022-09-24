import { Bell, DownloadSimple, List, MagnifyingGlass } from 'phosphor-react'
import { ChangeEvent, Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState } from 'react';
import { useThemeContext } from '../../contexts/colorContext/hook';
import { ToogleButton } from '../ToogleButton';
import styles from './styles.module.css'

type Props = {
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header = ({ menuOpen, setMenuOpen }: Props) => {
    const { theme, setTheme } = useThemeContext();
    const inputRef = useRef<any>(null);
    const [mobile, setMobile] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 400) setMobile(true);
    }, [])


    const handleSearchIconClick = async () => {
        if (mobile) {
            setSearchOpen(!searchOpen)
            await new Promise(resolve => setTimeout(resolve, 100))
            inputRef.current.focus()
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

                <div className={styles.searchBar} style={{ width: searchOpen ? '100%' : (mobile ? 'fit-content' : '100%') }}>
                    <input ref={inputRef} type="text" placeholder='Pesquise um manga' style={{ display: searchOpen ? (mobile ? 'block' : 'none') : '' }} />
                    <MagnifyingGlass size={24} color="#fff" onClick={handleSearchIconClick} />
                </div>

                <div className={styles.toggle}>
                    <ToogleButton />
                </div>
            </div>
        </header>
    )
}