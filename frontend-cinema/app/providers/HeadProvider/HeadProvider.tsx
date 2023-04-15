import { accentColor } from 'config/constans'
import Head from 'next/head'
import NextNProgressBar from 'nextjs-progressbar'
import { FC } from 'react'
import Favicons from './Favicons'

const HeadProvider:FC = ({children}) => {
  return (
    <>
        <NextNProgressBar
            color={accentColor}
            startPosition={0.3}
            stopDelayMs={400}
            height={3}
        
        />

      <Head>

          <meta charSet='UTF-8'/>
            <meta
                name='viewport'
                content='width=device-width, initial-scale=1,maximum-scale=5'
            />
    

            <Favicons/>

            <meta name='theme-color' content={`#181b1e`}/>
            <meta name = 'msapplication-navbutton-color' content={`#181b1e`}/>
            <meta name = 'apple-mobile-web-app-status-bar-style' content={`#181b1e`}/>
            
            <link rel='manifest' href='/manifest.json'/>
        </Head>
        {children}
    </>
  )
}

export default HeadProvider