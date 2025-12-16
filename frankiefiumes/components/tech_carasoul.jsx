import '../styles/tech_carasoul.css'
import { useState, useEffect } from 'react'

const TechCarasoul = () => {
    const [selection, setSelection] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

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
        }
    ]

    // Auto-rotation
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setSelection((prev) => (prev + 1) % knownTechnologies.length)
            }, 3000) // Change every 3 seconds

            return () => clearInterval(interval)
        }
    }, [isPaused, knownTechnologies.length])

    // Navigation functions
    const nextSlide = () => {
        setSelection((prev) => (prev + 1) % knownTechnologies.length)
    }

    const prevSlide = () => {
        setSelection((prev) => (prev - 1 + knownTechnologies.length) % knownTechnologies.length)
    }

    const goToSlide = (index) => {
        setSelection(index)
    }

    return (
        <div
            id="MainContainer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <h3>Known Technologies</h3>
            <div className="carousel-content">
                <button className="carousel-btn prev-btn" onClick={prevSlide}>
                    &#8249;
                </button>

                <div className="tech-display">
                    <img
                        src={knownTechnologies[selection].path}
                        alt={knownTechnologies[selection].name}
                        className="tech-logo"
                    />
                    <h3 className="tech-name">{knownTechnologies[selection].name}</h3>
                </div>

                <button className="carousel-btn next-btn" onClick={nextSlide}>
                    &#8250;
                </button>
            </div>

            <div className="carousel-dots">
                {knownTechnologies.map((tech, index) => (
                    <button
                        key={index}
                        className={`dot ${index === selection ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to ${tech.name}`}
                    />
                ))}
            </div>
        </div>
    );


}

export default TechCarasoul