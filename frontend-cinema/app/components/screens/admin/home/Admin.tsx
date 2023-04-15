import Meta from '@/utils/meta/Meta'
import {FC} from 'react'
import AdminNavigation from 'ui/admin-navigation/AdminNavigation'
import Heading from '../../../../ui/heading/Heading'

import styles from './Admin.module.scss'
import Statistics from '../home/Statistics/Statistics'

const Admin: FC=()=>{
    return (
        <Meta title='Admin panel'>
            <AdminNavigation/>
            <Heading title='Some statistics'/>
            <Statistics/>
        </Meta>
    )

}
export default Admin