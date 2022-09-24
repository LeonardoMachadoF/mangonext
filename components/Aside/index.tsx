import { Bookmarks, Cards, CaretDown, ChatText, ClockCounterClockwise, Fire, Funnel, Gear, Heart, House, List, Question } from 'phosphor-react'
import { useThemeContext } from '../../contexts/colorContext/hook';
import { AsideNavItems } from '../AsideNavItems'
import styles from './styles.module.css'

export const Aside = () => {
    const { theme } = useThemeContext();

    return (
        <nav className={styles.aside} style={{ backgroundColor: theme.terciaryColor }}>
            <div className={styles.navItems}>
                <AsideNavItems icon={<House size={24} color={theme.iconColor} />} name={'Home'} color={theme.fontColor} />
                <AsideNavItems icon={<Fire size={24} color={theme.iconColor} />} name={'Populares'} color={theme.fontColor} />
                <AsideNavItems icon={<Cards size={24} color={theme.iconColor} />} name={'Recomendações'} color={theme.fontColor} />
                <AsideNavItems icon={<Funnel size={24} color={theme.iconColor} weight="bold" />} name={'Pesquisa Avançada'} color={theme.fontColor} />
            </div>
        </nav>
    )
}