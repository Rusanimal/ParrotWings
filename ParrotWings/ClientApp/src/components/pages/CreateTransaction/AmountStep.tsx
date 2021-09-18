import * as React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import { nextStep, backStep, setAmount, checkUserBalanceAsync } from '../../../store/transaction/slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

function AmountStep() {
    const [currentAmount, setCurrentAmount] = React.useState<number>(0);
    const [error, setError] = React.useState<string>('');
    const [disabled, setDisabled] = React.useState<boolean>(true);
    const dispatch = useAppDispatch();
    const { amount, isChecked } = useAppSelector(state => {
        return {
            amount: state.transaction.amount,
            isChecked: state.transaction.isBalanceOk
        }
    });

    React.useEffect(() => {
        if (amount) {
            setCurrentAmount(amount);
        }
    }, [amount]);

    React.useEffect(() => {
        if (currentAmount > 0) {
            dispatch(checkUserBalanceAsync(currentAmount));
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
        <Grid container justifyContent="space-between">
            <Button variant="contained" onClick={handleClickBack}>Back</Button>
            <Button color="primary" variant="contained" onClick={handleClickNext} disabled={disabled}>Next</Button>
        </Grid>
    </React.Fragment>)
}

export default AmountStep