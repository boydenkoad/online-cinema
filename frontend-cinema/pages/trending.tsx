import { MovieService } from '@/services/movie.service'
import { IMovie } from '@/shared/types/movie.types'
import { GetStaticProps, NextPage } from 'next'
import {FC} from 'react'
import Catalog from 'ui/catalog-movies/Catalog'

const TrendingPage:NextPage<{movies:IMovie[]}>=({movies})=>{
    return <Catalog movies={movies || []} title='Trending movies' description='Trending movies in excellent quality: legal, safe, without ads.'/>
}

export const getStaticProps:GetStaticProps =async ()=>{
    try{
        const movies = await MovieService.getMostPopularMovies()

        return{
            props:{
                movies
            },
            revalidate:60
        }

    }catch(error){
        return {
            notFound:true
        }
    }
}


export default TrendingPage