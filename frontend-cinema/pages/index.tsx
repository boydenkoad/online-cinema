import type { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/Home'
import { MovieService } from '@/services/movie.service'
import { getActorsUrl, getMoviesUrl } from 'config/api.config'
import { getGenresList } from '@/utils/movie/getGenresList'
import { IHome } from '@/components/screens/home/home.interface'
import { ISlide } from 'ui/slider/slider.types'
import { IGalleryItem } from 'ui/gallery/gallery.interface'
import { ActorService } from '@/services/actor.service'

const HomePage: NextPage<IHome> = ({slides,actors,trendingMovies}) => {
	return <Home slides={slides} actors={actors} trendingMovies={trendingMovies}/>
}

export const getStaticProps:GetStaticProps = async ()=>{
	try{
		const {data:movies} = await MovieService.getAll()

		const slides:ISlide[] = movies.slice(0,3).map((m)=>({
			_id:m._id,
			bigPoster:m.bigPoster,
			link:getMoviesUrl(m.slug),
			subTitle:getGenresList(m.genres),
			title:m.title
		}))

		const {data:dataActors} = await ActorService.getAll()

		const actors:IGalleryItem[] = dataActors.slice(0,7).map(a=>({
			name:a.name,
			posterPath:a.photo,
			link:getActorsUrl(a.slug),
			content:{
				title:a.name,
				subTitle:`${a.countMovies} movies`
			}
		}))


		const dataTrendingMovies = await MovieService.getMostPopularMovies()

		const trendingMovies = dataTrendingMovies.slice(0,7).map(m=>({
			name:m.title,
			posterPath:m.poster,
			link:getMoviesUrl(m.slug),
		}))

		return{
			props:{
				slides,
				actors,
				trendingMovies
			}as IHome,
			revalidate:60
		}
	}catch(error){
		return{
			props:{
				slides:[],
				actors:[],
				trendingMovies:[]
			}
		}
	}
}

export default HomePage
