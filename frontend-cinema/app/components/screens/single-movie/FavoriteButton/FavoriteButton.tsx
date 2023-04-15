import {FC, useEffect, useState} from 'react'
import { useFavorites } from '../../favorites/useFavorites'
import { useMutation } from 'react-query'
import { UserService } from '@/services/user.service'
import { toastError } from '@/utils/toast-error'

import cn from 'classnames'
import heart from '/heart-animation.png'
import styles from './FavoriteButton.module.scss'
const FavoriteButton: FC<{movieId:string}>=({movieId})=>{
    
    const [isSmashed,setIsSmashed] = useState(false)
    
    const {favoriteMovies,refetch} = useFavorites()


    const { mutateAsync} = useMutation(
		'update favorites',
		() => UserService.toggleFavorite(movieId),
		{
			onError: (error) => {
				toastError(error, 'Update favorite list')
			},

			onSuccess: ({data:_id}) => {
                setIsSmashed(!isSmashed)
                refetch()
			},
		}
	)

    useEffect(()=>{
        if(!favoriteMovies) return

        const isHasMovie = favoriteMovies.some(f=>f._id === movieId)
        
        if(isSmashed !== isHasMovie) setIsSmashed(isHasMovie)

    },[favoriteMovies, isSmashed, movieId])

    return <button onClick={()=>mutateAsync()} className={cn(styles.button,{
       [styles.animate] : isSmashed
    })} style={{backgroundImage:`url('/heart-animation.png')`}}></button>

}
export default FavoriteButton