import Experience from "./Experience/Experience";


const canvas = document.getElementById("webgl")

const mobile = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0
const myExperience = new Experience(canvas, mobile)

