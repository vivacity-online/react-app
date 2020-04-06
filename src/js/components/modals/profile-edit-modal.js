import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
    overflowY: 'auto',
  },
  paper: {
    background: 'white',
    backgroundSize: 'cover',  
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
    height: 'auto',
  },
}));

function ProfileEditModal(props) {
    const classes = useStyles();
    const [value, setValue] =  useState("");

    function closeModal(event) {
      props.setEditing(!props.editing)
    };

    function handleChange(event) {
      setValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.editingField.setField(value);
        props.setHasChanged(true);
        props.setEditing(false);
    }

    return (
        <Modal
            role={"dialogue"}
            className={classes.modal}
            open={props.editing}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={props.editing}>
              <div className={classes.paper}>
                  <form onSubmit={handleSubmit}>                  
                    <TextField autoFocus placeholder={props.editingField.field} onChange={handleChange}/>
                    <Button type={"submit"} color={"primary"}>Change</Button>
                  </form>
              </div>
            </Fade>
          </Modal>
    )
}

export default ProfileEditModal;