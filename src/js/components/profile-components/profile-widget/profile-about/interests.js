import React, { useState, useEffect } from 'react';
import { Chip, Button, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const key = require('weak-key');

function Interests(props) {
    const [newChip, setNewChip] = useState("");

    useEffect(() => {
        if(props.interests) {
            props.setInterests(props.interests);
        }
    }, [props])

    const removeChip = chip => {
        props.setInterests(interests => interests.filter(interest => interest.title !== chip))
        props.setHasChanged(true);
    };

    const addChip = (event) => {
        event.preventDefault();
        if (newChip !== ""){
            let chip = {
                id: null,
                title: newChip
            };
            props.setInterests(interests => [...interests, chip]);
            props.setHasChanged(true);
        }
    };

    return (
        <>
            <p>Interests:</p>
            <div style={{marginBottom: 5}}>
        {Array.isArray(props.interests) &&
            props.interests.map((interest) => 
                <Chip
                    key={key(interest)}
                    variant="outlined"
                    deleteIcon={<CloseIcon />}
                    onDelete={() => {
                        removeChip(interest.title);
                    }}
                    label={interest.title}
                />
            ) 
        }
            </div>
            <div style={{padding: 5, paddingBottom: 10}}>
                <form onSubmit={addChip}>
                    <TextField
                        variant={"outlined"}
                        size={"small"}
                        onChange={(event) => setNewChip(event.target.value)}
                        />
                    <Button type={"submit"}>Add</Button>
                </form>
            </div>
        </>
    )
}

export default Interests;