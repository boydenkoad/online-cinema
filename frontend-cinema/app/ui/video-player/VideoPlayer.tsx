
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder'
import styles from './VideoPlayer.module.scss'
import { useVideo } from './useVideo'
import { IVideoPlayer } from './video.interface'
import MaterialIcon from 'ui/MaterialIcon'
import { useUpdateCountOpened } from '@/components/screens/single-movie/useUpdateCountOpened'

const VideoPlayer: FC<IVideoPlayer> = ({ slug, videoSources }) => {
	const { actions, video, videoRef} = useVideo()

	const { user } = useAuth()
	return (
		<div
            
			className={!user ? `${styles.wrapper} ${styles.notAuth}` : `${styles.wrapper}`}
		>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSources}#t=1`}
						preload="metadata"
					/>
					<div className={styles.progressBarContainer}>
						<div style={{width:`${video.progress}%`}} className={styles.progressBar}/>
					</div>

                    <div className={styles.controls}>
                        <div >
                            <button onClick={actions.revert}>
                                <MaterialIcon name='MdHistory'/>
                            </button>
                            <button onClick={actions.toggleVideo}>
                                <MaterialIcon name={video.isPlaying ? "MdPause" : "MdOutlinePlayArrow"}/>
                            </button>
                            <button onClick={actions.forward}>
                                <MaterialIcon name='MdUpdate'/>
                            </button>
                            <div className={styles.timeControls}>
                                <p className={styles.controlsTime}>
                                    {Math.floor(video.currentTime / 60) + ':' + ('0' + Math.floor(video.currentTime % 60)).slice(-2)}
                                </p>
                                <p> / </p>
                                <p className={styles.controlsTime}>
                                    {Math.floor(video.videoTime / 60) + ':' + ('0' + Math.floor(video.videoTime % 60)).slice(-2)}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button onClick={actions.fullScreen}>
                                <MaterialIcon name='MdFullscreen'/>
                            </button>
                        </div>
                    </div>
				</>
			) : (<AuthPlaceholder slug={slug} />)
			}
		</div>
	)
}
export default VideoPlayer
