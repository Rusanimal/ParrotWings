import * as React from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { getBalanceAsync } from '../../../store/user/reducers';
import { resetState } from '../../../store/transaction/reducers';

function SuccessStep() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getBalanceAsync());
    }, [dispatch]);

    const handleClick = () => {
        dispatch(resetState());
    }

    return (<React.Fragment>
        <Grid container justify="center">
            <CheckCircleOutlineIcon style={{ fontSize: 80, color: green[500] }} />
        </Grid>
        <Box textAlign="center" fontSize="h4.fontSize">Transaction succesfull!</Box>
        <Box>Want to create another transaction? <Button onClick={handleClick}>yes</Button></Box>
    </React.Fragment>)
}

export default SuccessStep