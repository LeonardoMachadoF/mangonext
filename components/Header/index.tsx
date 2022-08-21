import { Bell, DownloadSimple, MagnifyingGlass } from 'phosphor-react'
import styles from './styles.module.css'

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                Logo
            </div>
            <div className={styles.searchArea}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder='Pesquise um manga' />
                    <MagnifyingGlass size={24} color="#c4c4c4" />
                </div>
                <DownloadSimple size={24} color="#c4c4c4" />
                <Bell size={24} color="#c4c4c4" />
                <div className={styles.profileIcon}></div>
            </div>
        </header>
    )
}