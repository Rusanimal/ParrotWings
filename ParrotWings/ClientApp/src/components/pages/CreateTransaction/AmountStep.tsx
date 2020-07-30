import * as React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, backStep, setAmount } from '../../../store/transaction/actionCreators';
import { ApplicationState } from '../../../store';
import { checkUserBalance } from '../../../store/transaction/actionCreators';

function AmountStep() {
    const [currentAmount, setCurrentAmount] = React.useState<number>(0);
    const [error, setError] = React.useState<string>('');
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const dispatch = useDispatch();
    const amount = useSelector((state: ApplicationState) => state.transaction.amount);
    const isChecked = useSelector((state: ApplicationState) => state.transaction.isBalanceOk);

    React.useEffect(() => {
        if (amount) {
            setCurrentAmount(amount);
        }
    }, [amount]);

    React.useEffect(() => {
        if (currentAmount > 0) {
            dispatch(checkUserBalance(currentAmount));
        }
    }, [currentAmount, dispatch]);

    React.useEffect(() => {
        if (currentAmount < 0) {
            setError("The amount must be positive");
            setDisabled(true);
        } else if (currentAmount === 0) {
            setDisabled(true);
        } else if (currentAmount > 0 && !isChecked) {
            setError("The amount should not exceed the balance");
            setDisabled(true);
        } else {
            setError('');
            setDisabled(false);
        }
    }, [currentAmount, isChecked]);

    const handleClickBack = () => {
        dispatch(backStep());
    }

    const handleClickNext = () => {
        dispatch(setAmount(currentAmount))
        dispatch(nextStep());
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentAmount(+event.target.value)
    }

    return (<React.Fragment>
        <TextField variant="outlined" label="Enter amount" type="number" onChange={handleChange} value={currentAmount} error={disabled && error.length > 0} helperText={error} />
        <Grid container justify="space-between">
            <Button variant="contained" onClick={handleClickBack}>Back</Button>
            <Button color="primary" variant="contained" onClick={handleClickNext} disabled={disabled}>Next</Button>
        </Grid>
    </React.Fragment>)
}

export default AmountStep