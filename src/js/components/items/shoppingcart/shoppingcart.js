import React from 'react';
import {
    IconButton,
    Badge,
    makeStyles,
} from '@material-ui/core';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    cart: {
        color: theme.palette.secondary.main
    }
}));

function ShoppingCartComponent(props) {
    const classes = useStyles();

    return (
        <IconButton edge="start" color="inherit" aria-label="like avatar">
            <Badge badgeContent={props.items} color="primary">
                <ShoppingCart className={classes.cart} />
            </Badge>
        </IconButton>
    )
}

ShoppingCart.propTypes = {
    items: PropTypes.number
};

export default ShoppingCartComponent;