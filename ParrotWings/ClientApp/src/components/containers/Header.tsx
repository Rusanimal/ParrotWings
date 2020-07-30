import * as React from 'react';
import { createStyles, makeStyles, Theme, AppBar, Toolbar, Typography, Button, Container, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/account/actionCreators';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        }
    })
);

function Header() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const signOut = () => {
        dispatch(logout());
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