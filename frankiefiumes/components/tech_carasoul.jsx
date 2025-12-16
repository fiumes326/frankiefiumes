import '../styles/tech_carasoul.css'
import { useState, useRef} from 'react'
import {motion, useTransform, useScroll} from 'framer-motion'

const TechCarasoul = () => {
    const [selection, setSelection] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const refrence = useRef(null)

    const {scrollYProgress} = useScroll({
        target: refrence
    })

    const scrollX = useTransform(scrollYProgress, [0,1], ["1%", "-290%"])

    const knownTechnologies = [
        {
            name: "Python",
            path: "../src/assets/python.svg"
        },
        {
            name: "Javascript",
            path: "../src/assets/javascript.svg"
        },
        {
            name: "React",
            path: "../src/assets/react.svg"
        },
        {
            name: "HTML",
            path: "../src/assets/html.svg"
        },
        {
            name: "CSS",
            path: "../src/assets/css.svg"
        },
        {
            name: "React Native",
            path: "../src/assets/reactnative.svg"
        },
        {
            name: "C",
            path: "../src/assets/c.svg"
        },
        {
            name: "C++",
            path: "../src/assets/cplusplus.svg"
        },
        {
            name: "Docker",
            path: "../src/assets/docker.svg"
        }
    ]

    const MakeTiles = ({name, path, index}) => {
        return(
            <div id={index % 2 ==0 ? "tile-TopDown" : "tile-DownTop"}>
                <h1>{name}</h1>
                <img src={path} alt={name} />
            </div>
        )
    }


    return (
        <div ref={refrence} id="MainContainerTC">
            <div id="TitleWrapper"><h1>My Known Techologies</h1></div>
            <motion.div style={{x: scrollX}} id="CardContainer">
                {knownTechnologies.map((value, index) => {
                    return (
                    <MakeTiles name={value.name} path={value.path} index={index} />
                    );
                })}
            </motion.div>
        </div>
    );


}

export default TechCarasoul