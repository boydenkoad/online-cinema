import { FC } from 'react'
import SkeletonLoader from '../../../../ui/heading/SkeletonLoader'
// import SkeletonLoader from '@/ui/heading/SkeletonLoader'

import Menu from '../MenuContainer/Menu'

import { usePopularGenres } from './usePopularGenres'

const GenreMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()

	return isLoading ? (
		<div className='mx-6 mb-5'>
			 <SkeletonLoader count={5} className="h-7 mt-6"/>
		</div>
       
	) : (
		<Menu menu={{ title: 'Popular genres', items: data || [] }} />
	)
}

export default GenreMenu
