import * as React from 'react';
import { Button, Grid, Box, Backdrop, CircularProgress, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { backStep, createTransactionAsync, nextStep, checkUserBalanceAsync } from '../../../store/transaction/reducers';
import { ApplicationState } from '../../../store';
import { CreateTransactionModel } from '../../../store/transaction/types';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff'
        }
    })
);

function ConfirmStep() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const recipient = useSelector((state: ApplicationState) => state.transaction.correspondent);
    const amount = useSelector((state: ApplicationState) => state.transaction.amount);
    const isCreated = useSelector((state: ApplicationState) => state.transaction.isCreated);
    const error = useSelector((state: ApplicationState) => state.transaction.error);
    const isLoading = useSelector((state: ApplicationState) => state.transaction.isLoading);
    const isChecked = useSelector((state: ApplicationState) => state.transaction.isBalanceOk);

    React.useEffect(() => {
        if (amount) {
            dispatch(checkUserBalanceAsync(amount));
        }
    }, [amount, dispatch]);

    React.useEffect(() => {
        if (isCreated) {
            dispatch(nextStep());
        }
    }, [isCreated, dispatch]);

    const handleClickBack = () => {
        dispatch(backStep());
    }

    const handleClickConfirm = () => {
        let model: CreateTransactionModel = {
            correspondentId: recipient?.id!,
            amount: amount!
        }
        dispatch(createTransactionAsync(model));
    }

    const errorBody = error && <Alert severity="error">{error}</Alert>
    const errorAmount = !isChecked && <Alert severity="error">Amount incorrect. Please change amount</Alert>

    return (<React.Fragment>
        <Grid container direction="column">
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Box fontWeight="fontWeightMedium" textAlign="right">Recipient:</Box>
                </Grid>
                <Grid item xs={7}>{recipient?.name}</Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={5}>
                    <Box fontWeight="fontWeightMedium" textAlign="right">Amount:</Box>
                </Grid>
                <Grid item xs={7}>{amount + " PW"}</Grid>
            </Grid>
            {errorBody}
            {errorAmount}
        </Grid>
        <Grid container justify="space-between">
            <Button variant="contained" onClick={handleClickBack}>Back</Button>
            <Button color="primary" variant="contained" onClick={handleClickConfirm} disabled={!isChecked}>Confirm</Button>
        </Grid>
        <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </React.Fragment>)
}

export default ConfirmStep