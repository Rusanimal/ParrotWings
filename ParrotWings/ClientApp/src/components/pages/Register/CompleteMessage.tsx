import * as React from "react";
import { Link, Typography, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from "@material-ui/core/colors";
import { push } from "connected-react-router";
import { resetCreated } from "../../../store/account/slice";
import { useAppDispatch } from "../../../hooks";

function CompleteMessage() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        let timer = setTimeout(() => dispatch(push("/Login")), 5000);
        return () => {
            clearTimeout(timer);
            dispatch(resetCreated());
        }
    }, [dispatch])

    return (<React.Fragment>
        <Grid container justifyContent="center">
            <CheckCircleOutlineIcon style={{ fontSize: 80, color: green[500] }} />
        </Grid>
        <Typography align="center" variant="h4">Registration succesfull!</Typography>
        <Typography variant="subtitle1">You will be redirected to the login page in 5 seconds.You can follow this <Link component={RouterLink} to={"/Login"}>link</Link></Typography>
    </React.Fragment>)
}

export default CompleteMessage