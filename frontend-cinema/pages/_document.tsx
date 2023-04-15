import { Html, Main, NextScript ,Head} from 'next/document'

import {FC} from 'react'

export default function Document(){
    return(
        <Html lang='en'>
            <Head>
            <link
            href='https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap'
            rel='stylesheet'
          />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    )
}
