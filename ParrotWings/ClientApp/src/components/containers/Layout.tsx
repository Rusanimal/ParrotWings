import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid, Paper, createStyles, Theme, makeStyles, Backdrop, CircularProgress } from '@material-ui/core';
import { ApplicationState } from '../../store';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff'
        },
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(5, 8)
        }
    }),
);

export default function Layout(props: { children?: React.ReactNode }) {
    const classes = useStyles();
    const isLoading = useSelector((state: ApplicationState) => state.account.isLoading);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Grid container className={classes.root} direction="column" justify="center">
                    <Grid item>
                        <Paper className={classes.paper}>
                            <Grid container direction="column" style={{ height: '100%' }}>
                                {props.children}
                                <Backdrop className={classes.backdrop} open={isLoading}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    )
};
