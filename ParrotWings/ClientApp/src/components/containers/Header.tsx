import * as React from 'react';
import { createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, Button, Container, Grid } from '@material-ui/core';
import { logoutAsync } from '../../store/account/slice';
import { useAppDispatch } from '../../hooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        }
    })
);

function Header() {
    const dispatch = useAppDispatch();
    const classes = useStyles();

    const signOut = () => {
        dispatch(logoutAsync());
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="md">
                    <Grid container>
                        <Typography variant="h6" className={classes.title}>
                            Parrot Wings
                        </Typography>
                        <Button color="inherit" onClick={signOut}>Sign Out</Button>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Header