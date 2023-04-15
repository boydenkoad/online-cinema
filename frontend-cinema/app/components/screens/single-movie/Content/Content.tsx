import {FC} from 'react'

import styles from './Content.module.scss'
import { IMovie } from '@/shared/types/movie.types'
import ContentList from './ContentList/ContentList'
// import { getGenreUrl } from 'config/url.config'
import { getActorsUrl, getGenresUrl } from 'config/api.config'
import MaterialIcon from 'ui/MaterialIcon'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import { useAuth } from '@/hooks/useAuth'

const Content: FC<{movie:IMovie}>=({movie})=>{

    const {user} = useAuth()

    return <div className={styles.content}>
        <h1>{movie.title}</h1>
        <div className={styles.details}>
            <span>{movie.parameters.year}-</span>
            <span>{movie.parameters.country}-</span>
            <span>{movie.parameters.duration} min.</span>
        </div>
        <ContentList name='Genres' links={movie.genres.map(g=>({
            _id:g._id,
            link:getGenresUrl(g.slug),
            title:g.name
        }))}
        />
        <ContentList name='Actors' links={movie.actors.slice(0,3).map(a=>({
            _id:a._id,
            link:getActorsUrl(a.slug),
            title:a.name
        }))}
        />
        <div className={styles.rating}>
            <MaterialIcon name='MdStarRate'/>
            <span>{movie.rating.toFixed(1)}</span>
        </div>

        {user && <FavoriteButton movieId={movie._id} />}
        {/* Favorite Button */}
    </div>

}
export default Content