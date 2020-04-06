import React, { useEffect, useState } from 'react';

function ParticlesContainer() {
    const [particlesState, setParticles] = useState(false);
    const [appState, setApp] = useState(false);

    useEffect(() => {
        if(!appState){
            const particles = document.createElement('script');
            particles.src = './js/particles.js';
            particles.async = true;
            particles.id = "particles-js-file";
            function run() {
                document.body.appendChild(particles);
                setParticles(true);
            };
            if(!particlesState) {
                run();
            };
        }
    }, [appState, particlesState,]);

    useEffect(() => {
        if(particlesState){
            const particlesApp = document.createElement('script');
            particlesApp.src = './js/particles.app.js';
            particlesApp.async = false;
            particlesApp.id = "particlesApp-js-file";
            function run() {
                document.body.appendChild(particlesApp);
                setApp(true);
            };
            if(!appState) {
                run();
            };
        }
    }, [particlesState, appState]);

    return (
        <canvas className="particles-js-canvas-el" ></canvas>
    )
}

export default ParticlesContainer;