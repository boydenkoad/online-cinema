import { useActions } from '@/hooks/useAction'
import {FC,MouseEvent} from 'react'
import MaterialIcon from 'ui/MaterialIcon'


const LogoutButton: FC=()=>{

    const {logout} = useActions()

    const handleOnClick=(e:MouseEvent<HTMLAnchorElement>)=>{
        e.preventDefault()
        logout()
    }

    return <li>
        <a onClick={handleOnClick}>
            <MaterialIcon name='MdLogout'/>
            {/* <MaterialIcon name='MdPlagiarism'/> */}
            <span>Logout</span>
        </a>
    </li>

}
export default LogoutButton