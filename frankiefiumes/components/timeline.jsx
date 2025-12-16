import '../styles/timeline.css'
import {motion, useScroll, useTransform, useMotionValueEvent} from "framer-motion"
import { useRef, useState } from "react"

const TimelineCard = ({ year, title, currentDate, setCurrentDate }) => {
    const cardRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Scale: start small (0.7), grow to full (1), then shrink back (0.7) as you scroll past
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > .4 && latest < .6 ){
            if (currentDate !== year)
                setCurrentDate(year)
        }
    })

    return (
        <motion.div
            id="TimelineCard"
            ref={cardRef}
            style={{ scale, opacity }}
        >
            <h2>{year}</h2>
            <h2>{title}</h2>
        </motion.div>
    );
};

const TimeLine = () => {
    const [currentDate, setCurrentDate] = useState("Summer 2021")
    const dataForCards = {
        "Summer 2021": "This is place holder for summer 2021",
        "Summer 2023": "This is a place holder for summer 2023",
        "Fall 2023": "This is a place holder for Fall 2023",
        "Spring 2025": "This is a placeholder for Spring2025"
    }
    
    return (
       <div id="TimelineContainer">
            <h1>My Timeline</h1>

            <div id="TimelineMainContainer">
                {/* Left side - Sticky Info */}
                <div id="TimelineStickyInfo">
                    <h2>My Journey</h2>
                    <motion.div
                    key={currentDate}
                    initial={{opacity: 0 }}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: .5}}
                    >
                        {dataForCards[currentDate]}
                    </motion.div>
                </div>


                <div id="TimelineScrollableContent">
                    <TimelineCard
                        year="Summer 2021"
                        title="Started Clemson University as a engineering Major"
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                    />

                    <TimelineCard
                        year="Summer 2023"
                        title="Completed an Engineering Internship with Donato Inc."
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                    />

                    <TimelineCard
                        year="Fall 2023"
                        title="Changed Major to Computer Science"
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                    />

                    <TimelineCard
                        year="Spring 2025"
                        title="Graduated from Clemson"
                        currentDate={currentDate}
                        setCurrentDate={setCurrentDate}
                    />
                </div>
            </div>
        </div>
    );
}

export default TimeLine;