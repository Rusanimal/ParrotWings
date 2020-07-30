import * as React from 'react';
import { Grid, TextField, Typography, Button, Link, makeStyles, Theme, createStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { clearError, login } from '../../store/account/actionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store';

type LoginForm = {
    email: string,
    password: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margins: { margin: theme.spacing(1, 0) }
    })
);

function Login() {
    const classes = useStyles();
    const error = useSelector((state: ApplicationState) => state.account.error);
    const dispatch = useDispatch();
    const { control, handleSubmit, errors } = useForm<LoginForm>();

    React.useEffect(() => () => { dispatch(clearError()) }, [dispatch]);

    const onSubmit = (form: LoginForm) => {
        dispatch(login(form));
    }

    return (<React.Fragment>
        <Grid item>
            <Typography variant="h2" align="center">Sign In</Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)} style={{ flexGrow: 2 }}>
            <Grid container direction="column">
                <Controller
                    className={classes.margins}
                    as={TextField}
                    name="email"
                    control={control}
                    rules={{ required: "Enter email", pattern: { value: /^.+@.+\..+$/i, message: "Enter correct email" } }}
                    defaultValue=""
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    label="Email"
                    variant="outlined"
                />
                <Controller
                    className={classes.margins}
                    as={TextField}
                    name="password"
                    control={control}
                    type="password"
                    defaultValue=""
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    rules={{ required: "Enter password" }}
                    label="Password" variant="outlined"
                />
                {error && error.length > 0 && <Alert severity="error">{error}</Alert>}
                <Button className={classes.margins} variant="contained" color="primary" type="submit">Sign In</Button>
                <Link component={RouterLink} to="/register" color="primary">Register</Link>
            </Grid>
        </form>
    </React.Fragment>)
}

export default Login