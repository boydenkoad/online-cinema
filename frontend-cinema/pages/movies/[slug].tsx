import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'

import { IActor, IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import Error404 from '../404'
import Catalog from 'ui/catalog-movies/Catalog'
import { IGalleryItem } from 'ui/gallery/gallery.interface'
import { getMoviesUrl } from 'config/api.config'

export interface IMoviePage {
	movie: IMovie
	similarMovies: IGalleryItem[]
}

const ActorPage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies || []} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		const paths = movies.map((a) => ({
			params: { slug: a.slug },
		}))

		return {
			paths: paths,
			fallback: 'blocking', // can also be true or 'blocking'
		}
		
	} catch (e) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))

		const { data: dataSimilarMovies } = await MovieService.getByGenres(movie.genres.map(g=>g._id))

		const similarMovies:IGalleryItem[] = dataSimilarMovies.filter(m=>m._id !== movie._id).map((m)=>({
			name:m.title,
			posterPath:m.poster,
			link:getMoviesUrl(m.slug)
		}))

		return {
			props: {
				movie,
				similarMovies,
			},
			revalidate:60
		}
	} catch (e) {
		return {
			props: {
				notFound: true,
			},
		}
	}
}

export default ActorPage
