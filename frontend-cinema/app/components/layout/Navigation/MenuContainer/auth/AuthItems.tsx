import { FC } from 'react'

import { useAppSelector } from '@/hooks/useTypeSelector'

import MenuItem from '../MenuItem'
import LogoutButton from './LogoutButton'
import { getAdminHomeUrl } from 'config/url.config'


const AuthItems: FC = () => {
	const { user } = useAppSelector((state) => state.user)

	return (
		<>
			{user ? (
				<>
					<MenuItem
						item={{
							icon: 'MdSettings',
							link: '/profile',
							title: 'Profile',
						}}
					/>
					
					<LogoutButton/>
				</>
			) : (
				<MenuItem
					item={{
						icon: 'MdLogin',
						link: '/auth',
						title: 'Login',
					}}
				/>
			)}
			{user?.isAdmin && <MenuItem
					item={{
						icon:'MdOutlineLock',
						link:getAdminHomeUrl(),
						title:'Admin panel'
					}}/>}
		</>
	)
}
export default AuthItems
