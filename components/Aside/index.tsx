import { Bookmarks, Cards, CaretDown, ChatText, ClockCounterClockwise, Fire, Funnel, Gear, Heart, House, List, Question } from 'phosphor-react'
import { useThemeContext } from '../../contexts/colorContext/context'
import { AsideNavItems } from '../AsideNavItems'
import styles from './styles.module.css'

export const Aside = () => {
    const { theme, setTheme } = useThemeContext();

    return (
        <nav className={styles.aside} style={{ backgroundColor: theme.terciaryColor }}>
            <div className={styles.navItems}>
                <AsideNavItems icon={<House size={24} color="#c4c4c4" />} name={'Home'} />
                <AsideNavItems icon={<Fire size={24} color="#c4c4c4" />} name={'Populares'} />
                <AsideNavItems icon={<Cards size={24} color="#c4c4c4" />} name={'Recomendações'} />
                <AsideNavItems icon={<Funnel size={24} color="#c4c4c4" weight="bold" />} name={'Pesquisa Avançada'} />
            </div>
        </nav>
    )
}