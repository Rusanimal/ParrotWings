import * as React from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { getBalance } from '../../../store/user/actionCreators';
import { resetState } from '../../../store/transaction/actionCreators';

function SuccessStep() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getBalance());
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