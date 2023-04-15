import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Meta from '@/utils/meta/Meta'

import AuthFields from '../auth/AuthFields'
import Button from 'ui/form-elemets/Button'
import Heading from 'ui/heading/Heading'
import SkeletonLoader from 'ui/heading/SkeletonLoader'

import styles from './Profile.module.scss'
import { IProfileInput } from './profile.interface'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const { handleSubmit, register, formState, setValue } =
		useForm<IProfileInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<Meta title="Profile">
			<Heading title="Profile" className="mb-6" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2}/>
				) : (
					<AuthFields formState={formState} register={register} />
				)}
				<div className={styles.buttons}>
					<Button>Update</Button>
				</div>
			</form>
		</Meta>
	)
}

export default Profile
