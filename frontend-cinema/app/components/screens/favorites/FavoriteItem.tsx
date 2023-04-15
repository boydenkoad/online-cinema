import {FC} from 'react'

import styles from './Favorites.module.scss'
import { IMovie } from '@/shared/types/movie.types'
import FavoriteButton from '../single-movie/FavoriteButton/FavoriteButton'
import Link from 'next/link'
import { getMoviesUrl } from 'config/api.config'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'


const FavoriteItem: FC<{movie:IMovie}>=({movie})=>{
    const {user} = useAuth()

    return <div className={styles.itemWrapper}>
        {user && <FavoriteButton movieId={movie._id}/>}
        <Link href={getMoviesUrl(movie.slug)}>
            <a className={styles.item}>
                <Image
                    alt={movie.title}
                    src={movie.bigPoster}
                    layout='fill'
                    draggable={false}
                    priority
                />
                <div className={styles.title}>{movie.title}</div>
            </a>
        </Link>
    </div>

}
export default FavoriteItem