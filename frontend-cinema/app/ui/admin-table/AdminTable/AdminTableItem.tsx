import {FC} from 'react'
import { IAdminTableItem } from './admin-table.interface'
import AdminActions from './AdminActions/AdminActions'


import styles from './AdminTable.module.scss'

const AdminTableItem: FC<IAdminTableItem>=({removeHandle,tableItem})=>{
    return <div className={styles.item}>
        {tableItem.items.map(value=><div key={value}>{value}</div>)}
        <AdminActions removeHandler={()=>removeHandle(tableItem._id)} editUrl={tableItem.editUrl}/>
    </div>

}
export default AdminTableItem