import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Meta from '@/utils/meta/Meta'
import AuthFields from '../../auth/AuthFields'
import AdminNavigation from 'ui/admin-navigation/AdminNavigation'
import Button from 'ui/form-elemets/Button'
import Heading from 'ui/heading/Heading'
import SkeletonLoader from 'ui/heading/SkeletonLoader'

import { useGenreEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.interface'


const UserEdit: FC = () => {
	const { handleSubmit, register, formState, setValue, getValues, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Edit genre"></Heading>
			<form onSubmit={handleSubmit(onSubmit)} className='admin-form'>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<AuthFields register={register} formState={formState} />
						<Controller
							control={control}
							name="isAdmin"
							render={({ field }) => (
								<button onClick={(e)=>{
									e.preventDefault()
									field.onChange(!field.value)
								}}
								className='text-link block mb-7'
								>
									{field.value ? 'Make it regular user' : 'Make it admin'}
								</button>
							)}
						/>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}
export default UserEdit
