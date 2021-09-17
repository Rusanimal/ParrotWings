import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store';
import RecipientStep from './CreateTransaction/RecipientStep';
import AmountStep from './CreateTransaction/AmountStep';
import ConfirmStep from './CreateTransaction/ConfirmStep';
import { Stepper, Step, StepLabel, Paper, Grid, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';
import SuccessStep from './CreateTransaction/SuccessStep';
import { resetState } from '../../store/transaction/reducers';

function getSteps() {
    return ['Select recipient', 'Enter amount', 'Confirm transaction'];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(0, 2, 5, 2),

            '& .MuiTextField-root': {
                margin: theme.spacing(3),
                width: '40ch',
            },
        }
    })
);

function CreateTransaction() {
    const classes = useStyles();
    const step = useSelector((state: ApplicationState) => state.transaction.step);
    const dispatch = useDispatch();
    const steps = getSteps();

    React.useEffect(() => () => {
        dispatch(resetState());
    }, [dispatch]);

    const title = steps[step] && <Typography variant="h6">{steps[step]}:</Typography>

    const body = step === 0 ? (<RecipientStep />) :
        step === 1 ? (<AmountStep />) :
            step === 2 ? (<ConfirmStep />) :
                step === 3 ? <SuccessStep /> :
                    "";

    return (<Paper className={classes.root}>
        <Grid container direction="column" alignItems="center">
            <Stepper activeStep={step} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {title}
            {body}
        </Grid>
    </Paper>
    );
}

export default CreateTransaction