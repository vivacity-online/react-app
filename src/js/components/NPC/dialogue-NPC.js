import React from 'react';
import Emma from '../../../img/npc/emma.png';
import Hunter from '../../../img/npc/hunter.png';
import Von from '../../../img/npc/von.png';
import Magnolia from '../../../img/npc/magnolia.png';
import Norris from '../../../img/npc/norris.png';
import Sparkles from '../../../img/npc/sparkles.png';
import Sylvan from '../../../img/npc/sylvan.png';
import NPC from './NPC';
import {getDialogue} from './dialogue';
import gsap from 'gsap';

const DIALOGUE = getDialogue();
const NPC_IMAGES = [
    Emma,
    Hunter,
    Von,
    Magnolia,
    Norris,
    Sparkles,
    Sylvan
];

const CHARACTERS = [];

for(let x = 0; x < NPC_IMAGES.length; x++) {
    function getRandom(list) {
        let i = Math.floor(Math.random() * list.length);
        return list[i];
    }
    let char = getRandom(NPC_IMAGES);
    let dial = getRandom(DIALOGUE);
    CHARACTERS.push({src: char, dialogue: dial});
}

function popIn(event) {
    gsap.to(".header-npc-container", {delay: 0.25, left: 0, ease: "bounce", duration: 0.75});
}

function DialogueNPC(props) {
    let choice = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    let src = props.src ? props.src : choice.src;
    let dialogue = props.dialogue ? props.dialogue : choice.dialogue;
    return (
        <div onLoad={popIn}>
            <div className={"header-npc-container"}>
                <NPC src={src} />
                <div className={"dialogue"}>
                    <div className={"speech-bubble"}>
                        <h3>{dialogue}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogueNPC;