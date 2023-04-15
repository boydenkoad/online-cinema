import { getAdminUrl } from 'config/url.config'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { useDebounce } from '@/hooks/useDebounce'

import { UserService } from '@/services/user.service'

import { convertMongoDate } from '@/utils/date/convertMongoDate'
import { toastError } from '@/utils/toast-error'

import { ITableItem } from 'ui/admin-table/AdminTable/admin-table.interface'
import { ActorService } from '@/services/actor.service'
import { useRouter } from 'next/router'

export const useActors= () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['actor list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => (
						{
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name,String(actor.countMovies)],
					})
				),

			onError: (error) => {
				toastError(error, 'Actor list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const {push} = useRouter()

	const { mutateAsync: createAsync} = useMutation(
		'actor',
		() => ActorService.create(),
		{
			onError: (error) => {
				toastError(error, 'Create actor')
			},

			onSuccess: ({data:_id}) => {
				toastr.success('Create actor', 'Create was successful')
				push(getAdminUrl(`/actor/edit/${_id}`))
			},
		}
	)

	const { mutateAsync: deleteAsync } = useMutation(
		['delete actors', debouncedSearch],
		(userId: string) => ActorService.delete(userId),
		{
			onError: (error) => {
				toastError(error, 'Delete actor')
			},

			onSuccess: () => {
				toastr.success('Delete actor', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync
		}),
		[queryData, searchTerm, deleteAsync, createAsync]
	)
}
