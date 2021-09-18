import * as React from 'react';
import { Grid, TextField, Typography, Button, Link, Theme, makeStyles, createStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { registerAsync, clearError } from '../../../store/account/slice';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@material-ui/lab/Alert';
import { useAppDispatch, useAppSelector } from '../../../hooks';

type RegisterForm = {
    confirmPassword: string;
    email: string;
    name: string;
    password: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margins: { margin: theme.spacing(1, 0) }
    })
);

function RegisterForm() {
    const classes = useStyles();
    const error = useAppSelector(state => state.account.error);
    const dispatch = useAppDispatch();
    const { control, handleSubmit, errors, getValues } = useForm<RegisterForm>();

    React.useEffect(() => () => { dispatch(clearError()) }, [dispatch]);

    const onSubmit = (form: RegisterForm) => {
        dispatch(registerAsync(form));
    }

    const validate = (value: string) => {
        return getValues().password === value || "Passwords should be equals";
    }

    return (<>
        <Grid item>
            <Typography variant="h2" align="center">Register</Typography>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid style={{ flexGrow: 2 }} container direction="column" justifyContent="space-between">
                <Controller
                    className={classes.margins}
                    as={TextField}
                    control={control}
                    name="email"
                    rules={{ required: "Enter email", pattern: { value: /^.+@.+\..+$/i, message: "Enter correct email" } }}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    label="Email"
                    variant="outlined"
                    defaultValue=""
                />
                <Controller
                    className={classes.margins}
                    as={TextField}
                    control={control}
                    name="name"
                    rules={{ required: "Enter name" }}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    type="text"
                    label="Name"
                    variant="outlined"
                    defaultValue=""
                />
                <Controller
                    className={classes.margins}
                    as={TextField}
                    control={control}
                    name="password"
                    rules={{ required: "Enter password" }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    type="password"
                    label="Password"
                    variant="outlined"
                    defaultValue=""
                />
                <Controller
                    className={classes.margins}
                    as={TextField}
                    control={control}
                    name="confirmPassword"
                    rules={{ required: "Enter confirm password", validate: validate }}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    type="password"
                    label="ConfirmPassword"
                    variant="outlined"
                    defaultValue=""
                />
                {error && error.length > 0 && <Alert severity="error">{error}</Alert>}
                <Button className={classes.margins} variant="contained" color="primary" type="submit">Register</Button>
                <Link component={RouterLink} to="/login" color="primary">Sign In</Link>
            </Grid>
        </form>
    </>)
}

export default RegisterForm