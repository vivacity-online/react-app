import React from 'react';
import {
    Breadcrumbs,
    Link,
    Typography,
} from '@material-ui/core';

function BreadcrumbsComponent(props) {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
                Material-UI
            </Link>
            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                Core
            </Link>
            <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
    )
}

export default BreadcrumbsComponent;