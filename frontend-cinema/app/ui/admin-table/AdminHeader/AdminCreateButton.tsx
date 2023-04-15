import {FC} from 'react'
import Button from 'ui/form-elemets/Button'


import styles from './AdminHeader.module.scss'

const AdminCreateButton: FC<{onClick:()=>void}>=({onClick})=>{
    return <Button onClick={onClick}>Create New</Button>

}
export default AdminCreateButton