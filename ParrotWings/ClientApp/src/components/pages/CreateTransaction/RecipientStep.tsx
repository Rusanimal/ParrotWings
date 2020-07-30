import * as React from 'react';
import { serverApi } from '../../../utils/serverApi';
import { UserModel } from '../../../store/user/types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, Button, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setCorrespondent, nextStep } from '../../../store/transaction/actionCreators';
import { ApplicationState } from '../../../store';

function RecipientStep() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<Array<UserModel>>([]);
    const loading = open && options.length === 0;
    const dispatch = useDispatch();
    const recipient = useSelector((state: ApplicationState) => state.transaction.correspondent);

    React.useEffect(() => {
        async function getUsers() {
            const response = await serverApi.get<Array<UserModel>>("User/GetUsers");
            const users = await response.data;

            if (active) {
                setOptions(users);
            }
        }

        let active = true;

        if (!loading) {
            return undefined;
        }

        getUsers();
        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleChange = (event: any, newValue: UserModel | null) => {
        dispatch(setCorrespondent(newValue));
    }

    const handleClick = () => {
        dispatch(nextStep());
    }

    return (<React.Fragment>
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={handleChange}
            value={recipient}
            getOptionSelected={(option: UserModel, value) => option.id === value.id}
            getOptionLabel={(option: UserModel) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select recipient"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
        <Grid container justify="flex-end">
            <Button
                color="primary"
                variant="contained"
                onClick={handleClick}
                disabled={recipient == null}
            >
                Next
            </Button>
        </Grid>
    </React.Fragment>)
}

export default RecipientStep