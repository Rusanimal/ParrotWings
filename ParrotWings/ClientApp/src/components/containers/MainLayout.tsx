import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Header from './Header';
import LeftMenu from './LeftMenu';

function MainLayout(props: { children?: React.ReactNode }) {
    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <Container maxWidth="md">
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <LeftMenu />
                    </Grid>
                    <Grid item xs={8}>
                        {props.children}
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
};

export default MainLayout