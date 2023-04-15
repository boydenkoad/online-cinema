import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import Admin from '../home/Admin'
import AdminNavigation from 'ui/admin-navigation/AdminNavigation'
import AdminHeader from 'ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from 'ui/admin-table/AdminTable/AdminTable'
import Heading from 'ui/heading/Heading'

import { useMovies } from './useMovies'

const MovieList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync,createAsync} = useMovies()

	return (
		<Meta title="Movie">
			<AdminNavigation />
			<Heading title="Movie" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
			<AdminTable
				isLoading={isLoading}
				removeHandle={deleteAsync}
				headerItems={['Title', 'Genres','Rating']}
				tableItems={data || []}

			/>
		</Meta>
	)
}
export default MovieList
