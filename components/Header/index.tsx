import { Bell, DownloadSimple, List, MagnifyingGlass } from 'phosphor-react'
import { useThemeContext } from '../../contexts/colorContext/context'
import styles from './styles.module.css'

export const Header = () => {
    const { theme, setTheme } = useThemeContext();

    return (
        <header className={styles.header} style={{ backgroundColor: theme.secondaryColor }}>
            <div className={styles.logo}>

                <List size={24} color="#fff" weight="bold" />

                <div onClick={() => setTheme()}>Logo</div>
            </div>
            <div className={styles.searchArea}>
                <div className={styles.toggle}>
                    <input type="checkbox" name="switch" id="switch" onChange={e => setTheme()} />
                </div>
                <div className={styles.searchBar}>
                    <input type="text" placeholder='Pesquise um manga' />
                    <MagnifyingGlass size={24} color="#fff" />
                </div>
            </div>
        </header>
    )
}