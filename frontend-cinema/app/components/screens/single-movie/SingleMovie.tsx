import dynamic from 'next/dynamic'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import Meta from '@/utils/meta/Meta'

import { IMoviePage } from '../../../../pages/movies/[slug]'
import Banner from 'ui/banner/Banner'
import Gallery from 'ui/gallery/Gallery'
import SubHeading from 'ui/heading/SubHeading'

import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'

const DynamicPlayer = dynamic(
	() => import('../../../ui/video-player/VideoPlayer'),
	{
		ssr: false,
	}
)
const DynamicRating = dynamic(() => import('./RateMovie/RateMovie'), {
	ssr: false,
})

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {

	useUpdateCountOpened(movie.slug)

	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>
			
			<DynamicPlayer slug={movie.slug} videoSources={movie.videoUrl} />

			<div className="mt-12">
				<SubHeading title="Similar" />
				<Gallery items={similarMovies} />
			</div>

			<DynamicRating id={movie._id} slug={movie.slug} />
		</Meta>
	)
}
export default SingleMovie
