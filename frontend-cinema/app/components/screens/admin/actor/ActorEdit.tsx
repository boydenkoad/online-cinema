import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Meta from '@/utils/meta/Meta'
import generateSlug from '@/utils/string/generateSlug'

import formStyles from '../../../../ui/form-elemets/admin-form.module.scss'
import AdminNavigation from 'ui/admin-navigation/AdminNavigation'
import Button from 'ui/form-elemets/Button'
import Field from 'ui/form-elemets/Field'
import SlugField from 'ui/form-elemets/SlugField/SlugField'
import UploadField from 'ui/form-elemets/UploadField/UploadField'
import Heading from 'ui/heading/Heading'
import SkeletonLoader from 'ui/heading/SkeletonLoader'

import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<Meta title="Edit genre">
			<AdminNavigation />
			<Heading title="Edit genre"></Heading>
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: '50%' }}
							/>
							<SlugField
								register={register}
								error={errors.slug}
								generate={() => {
									setValue('slug', generateSlug(getValues('name')))
								}}
							/>
						</div>
						<Controller
							control={control}
							name="photo"
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
								<UploadField
									onChange={onChange}
									value={value}
									error={error}
									folder='actors'
									placeholder="Photo"
								/>
							)}
							rules={{
								required: 'Photo is required',
							}}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}
export default ActorEdit
