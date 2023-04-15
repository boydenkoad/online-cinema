import cn from 'classnames'
import { FC } from 'react'
import { useQuery } from 'react-query'

import { AdminService } from '@/services/admin.service'

import styles from '../Admin.module.scss'
import SkeletonLoader from 'ui/heading/SkeletonLoader'

const CountUsers: FC = () => {
	const { isLoading, data } = useQuery('Count users', () =>
		AdminService.getCountUsers()
	)

	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className={styles.number}>
						{data?.data}
						<div className={styles.description}>Users</div>
					</div>
				)}
			</div>
		</div>
	)
}
export default CountUsers
