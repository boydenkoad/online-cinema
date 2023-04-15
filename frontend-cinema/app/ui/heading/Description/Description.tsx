import {FC} from 'react'

import parse from 'html-react-parser'
import cn from 'classnames'

import styles from './Description.module.scss'

const Description: FC<{text:string,className?:string}>=({text,className=''})=>{
    return(
        <div
            className={cn(styles.description,'text-lg font-light text-white',className)}
        >   
            {parse(text)}
        </div>
    )

}
export default Description