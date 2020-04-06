import React from 'react';
import Mun from '../../../../img/currency/mun.png';
import { Container, Badge } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        muns: state.user.currency.muns
    }
}

function MunsComponent(props) {
    return (
        <Container maxWidth={"xs"}>
            <Badge badgeContent={props.muns || "0"} max={10000} color={"secondary"} >
                <img src={Mun} alt={"Muns"} />
            </Badge>
        </Container>
    )
}

const Muns = connect(mapStateToProps)(MunsComponent);
export default Muns;