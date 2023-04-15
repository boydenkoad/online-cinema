import {FC} from 'react'

import styles from './AuthPlaceholder.module.scss'
import Link from 'next/link'
import { getMoviesUrl } from 'config/api.config'

const AuthButton: FC<{slug:string}>=({slug})=>{
    return <Link href={`/auth?redirect=${getMoviesUrl(slug)}`}>
        <a className={styles.btn}>Sing in</a>
    </Link>

}
export default AuthButton