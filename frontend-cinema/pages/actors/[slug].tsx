import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { IActor, IMovie } from '@/shared/types/movie.types'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'
import Catalog from 'ui/catalog-movies/Catalog'

interface IActorPage {
	movies: IMovie[]
	actor: IActor
}

const ActorPage: NextPage<IActorPage> = ({ actor, movies }) => {
	return actor ? (
		<Catalog movies={movies || []} title={actor.name} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAll()

		const paths = actors.map((a) => ({
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
		const { data: actor } = await ActorService.getBySlug(String(params!.slug))

		const { data: movies } = await MovieService.getByActor(actor._id)

		return {
			props: {
				actor,
				movies,
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
