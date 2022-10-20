import { Manga } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { List, MagnifyingGlass, X } from 'phosphor-react'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useThemeContext } from '../../../contexts/colorContext/hook';
import { FollowingItem } from '../../GeneralComponents/FollowingItem';
import { ToogleButton } from '../../GeneralComponents/ToogleButton';
import styles from './styles.module.css'

type Props = {
    menuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
    absolute?: boolean;
}

export const Header = ({ menuOpen, setMenuOpen, absolute = false }: Props) => {
    const { theme } = useThemeContext();
    const inputRef = useRef<any>(null);
    const [mobile, setMobile] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchInputMangas, setSearchInputMangas] = useState<any>([])

    useLayoutEffect(() => {
        if (window.innerWidth <= 400) setMobile(true);
    }, [])


    const handleSearchIconClick = async () => {
        if (mobile) {
            setSearchOpen(!searchOpen)
            await new Promise(resolve => setTimeout(resolve, 100))
            inputRef.current.focus()
        }
    }

    const handleItemSearchClick = () => {
        setSearchInput('');
        setSearchInputMangas([]);
    }

    useEffect(() => {
        const getData = async () => {
            let mangas = await axios.get(`/api/manga?title=${searchInput}`);
            setSearchInputMangas(mangas.data.mangas);
        }

        if (searchInput.length >= 3) {
            getData();
        } else {
            setSearchInputMangas([]);
        }
    }, [searchInput])
    return (
        <header className={styles.header} style={{ backgroundColor: theme.secondaryColor, position: absolute ? 'absolute' : 'fixed' }}>
            <nav className={styles.logo} style={{ display: searchOpen ? 'none' : 'flex' }}>

                <List
                    size={24}
                    color={theme.iconColor}
                    weight="bold"
                    onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer' }}
                />

                <Link href='/'
                    className={styles.logoTitle}
                    style={{ display: searchOpen ? 'none' : 'block' }}
                >
                    Tenki Mangas
                </Link>
            </nav>
            <div className={styles.searchArea}>

                <div className={styles.searchBar} style={{ width: searchOpen ? '100%' : (mobile ? 'fit-content' : '100%') }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Pesquise um manga'
                        style={{ display: searchOpen ? (mobile ? 'block' : 'none') : (mobile ? 'none' : 'block') }}
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                    />
                    {searchOpen && mobile &&
                        <X size={24} color="#fff" style={{ marginRight: '4px' }} onClick={() => { setSearchOpen(!searchOpen); setSearchInputMangas([]); setSearchInput(''); }} />
                    }
                    <MagnifyingGlass size={24} color="#fff" onClick={handleSearchIconClick} />

                    {searchInput && searchInputMangas &&
                        <div className={styles.followingItems}>
                            {searchInputMangas.map((manga: Manga) => {
                                console.log(searchInputMangas)
                                return (
                                    <div className={styles.searchInputMangas} key={manga.id} onClick={handleItemSearchClick}>
                                        <Link href={`/titulo/${manga.slug}`}>
                                            <a>
                                                <p>{manga.title}</p>
                                                <p>{manga.sinopse.length > 200 ? `${manga.sinopse.substring(0, 200)}...` : manga.sinopse}</p>
                                            </a>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>

                <div className={styles.toggle}>
                    <ToogleButton />
                </div>
            </div>
        </header>
    )
}