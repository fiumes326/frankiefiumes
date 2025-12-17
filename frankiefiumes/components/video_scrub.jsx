import { use, useEffect, useRef } from "react";
import {useTransform, useScroll, useMotionValueEvent, motion} from 'framer-motion'
import '../styles/video_scrub.css'

const VideoScrub = () => {
    const VideoContainerRef = useRef(null)
    const VideoRef = useRef(null)

    const {scrollYProgress} = useScroll({
        target: VideoContainerRef,
    })
    
    const scrub = useTransform(scrollYProgress, [0,1], [0,1])
    const scrollOpacity = useTransform(scrollYProgress, [0,.2], [.9, 0])

    useMotionValueEvent(scrub, "change", (scrubValue)=>{
        if (VideoRef.current && VideoRef.current.duration) {
            VideoRef.current.currentTime = scrubValue * VideoRef.current.duration
        }
    })

    return(
        <div id="VideoScrubContainer" ref={VideoContainerRef}>
            <div id="InsideContainer">
                <video
                src="../src/assets/scrub_video.mp4"
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                ref={VideoRef}
                />
                <motion.div
                id="scrollContainer"
                style={{opacity: scrollOpacity}}
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                Scroll &darr;	
                </motion.div>

                
            </div>
        </div>
    );

}

export default VideoScrub