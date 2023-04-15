import { useRouter } from 'next/router'
import { FC } from 'react'
import cn from 'classnames'
import { IMenuItem } from './menu.interface'

import styles from './Menu.module.scss'
import Link from 'next/link'
import MaterialIcon from 'ui/MaterialIcon'

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const {asPath} = useRouter()

	return <li className={cn({
        [styles.active]:asPath === item.link
    })}>
        <Link href={item.link}>
            <a>
                <MaterialIcon name={item.icon}/>
                <span>{item.title}</span>
            </a>
        </Link>
    </li>
}

export default MenuItem
