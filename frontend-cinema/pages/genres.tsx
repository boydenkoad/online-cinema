import { GetStaticProps, NextPage } from 'next'
import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import Catalog from 'ui/catalog-movies/Catalog'
import { MovieService } from '@/services/movie.service'
import { ICollection } from '@/components/screens/collections/collections.interface'
import Collections from '@/components/screens/collections/Collections'
import { GenreService } from '@/services/genre.service'

const GenresPage: NextPage<{collections: ICollection[] }> = ({ collections }) => {
	return(
		<Collections collections={collections ||[]}/>
	)
}

export const getStaticProps:GetStaticProps = async()=>{
    try{
        const {data:collections} = await GenreService.getCollections()

        return{
            props:{
                collections
            
            },
            revalidate:60

        }

    }catch(error){
        return {
            notFound:true
        }
    }
}
export default GenresPage
