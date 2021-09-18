import * as React from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';
import { getBalanceAsync } from '../../../store/user/slice';
import { resetState } from '../../../store/transaction/slice';
import { useAppDispatch } from '../../../hooks';

function SuccessStep() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(getBalanceAsync());
    }, [dispatch]);

    const handleClick = () => {
        dispatch(resetState());
    }

    return (<React.Fragment>
        <Grid container justifyContent="center">
            <CheckCircleOutlineIcon style={{ fontSize: 80, color: green[500] }} />
        </Grid>
        <Box textAlign="center" fontSize="h4.fontSize">Transaction succesfull!</Box>
        <Box>Want to create another transaction? <Button onClick={handleClick}>yes</Button></Box>
    </React.Fragment>)
}

export default SuccessStep