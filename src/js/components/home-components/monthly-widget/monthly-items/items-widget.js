import React, { useState } from 'react';
import { 
    makeStyles, 
    AppBar,
    Toolbar,
    Button,
 } from '@material-ui/core';
 import ShoppingCart from '../../../items/shoppingcart/shoppingcart';

const useStyles = makeStyles((theme) => ({
    appbar: {
        background: theme.palette.white.main
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

function ItemsWidget(props) {
    // eslint-disable-next-line
    const [cartItems, setCartItems] = useState(0);
    const classes = useStyles();
    
    return (
                    <div>
                        <div style={{height: 250}}>
                            COMING SOON!!
                        </div>
                        <AppBar position={"static"} className={classes.appbar}>
                            <Toolbar className={classes.toolbar}>
                                <ShoppingCart items={cartItems} />
                                <Button disabled={!cartItems} className={classes.toolbarButton} variant={"contained"} color={"primary"}>Checkout</Button>
                            </Toolbar>
                        </AppBar>
                    </div>
    )
}

export default ItemsWidget;
