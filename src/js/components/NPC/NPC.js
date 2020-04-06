import React from 'react';
import PropTypes from 'prop-types';

function NPC(props) {
    return (
        <img src={props.src} alt={"Non playable character"}/>
    )
};

NPC.propTypes = {
    src: PropTypes.string.isRequired,
};

export default NPC;