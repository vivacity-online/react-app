import React from 'react';
import Shiny from '../../../../img/currency/shiny.png';
import { Container, Badge } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        shinies: state.user.currency.shinies
    }
}

function ShiniesComponent(props) {
    return (
        <Container maxWidth={"xs"}>
            <Badge badgeContent={props.shinies || "0"} max={5000} color={"secondary"} >
                <img src={Shiny} alt={"Shinies"} />
            </Badge>
        </Container>
    )
}

const Shinies = connect(mapStateToProps)(ShiniesComponent);
export default Shinies;