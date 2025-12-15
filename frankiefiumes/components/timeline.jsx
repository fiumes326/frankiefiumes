import '../styles/timeline.css'
import {motion, useScroll, useTransform} from "framer-motion"
import { useRef } from "react"

const TimelineCard = ({ year, title }) => {
    const cardRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Scale: start small (0.7), grow to full (1), then shrink back (0.7) as you scroll past
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

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
    return (
       <div id="TimelineContainer">
            <h1>My Timeline</h1>

            <TimelineCard
                year="Summer 2021"
                title="Started Clemson University as a engineering Major"
            />

            <TimelineCard
                year="Summer 2023"
                title="Completed an Engineering Internship with Donato Inc."
            />

            <TimelineCard
                year="Fall 2023"
                title="Changed Major to Computer Science"
            />

            <TimelineCard 
                year="Spring 2025"
                title="Graduated from Clemson"
            />
        </div>
    );
}

export default TimeLine;