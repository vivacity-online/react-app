import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function animateText(event) {
    let tl = gsap.timeline(),
        splitText = new SplitText("#shinies-text",
            {
                type: "words,chars"
            }),
        chars = splitText.chars;
    gsap.set("#shinies-text", {perspective: 400});

    tl.from(chars, {duration: 0.8, opacity: 0, scale: 0, y: 80, rotaion: 180, transformOrigin: "0% 50% -50", ease: "back", stagger: 0.01, delay: 0.2}, "+=0");
}