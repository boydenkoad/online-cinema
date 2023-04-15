import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

import Admin from '../home/Admin'
import AdminNavigation from 'ui/admin-navigation/AdminNavigation'
import AdminHeader from 'ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from 'ui/admin-table/AdminTable/AdminTable'
import Heading from 'ui/heading/Heading'

import { useGenres} from './useGenres'

const GenreList: FC = () => {
	const { handleSearch, isLoading, searchTerm, data, deleteAsync, createAsync} = useGenres()

	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
			<AdminTable
				isLoading={isLoading}
				removeHandle={deleteAsync}
				headerItems={['Name', 'Slug']}
				tableItems={data || []}
			/>
		</Meta>
	)
}
export default GenreList
