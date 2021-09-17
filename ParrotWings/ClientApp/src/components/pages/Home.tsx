import * as React from 'react';
import { List, Backdrop, CircularProgress, makeStyles, Theme, createStyles, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getBalanceHistoryAsync } from '../../store/user/reducers';
import { ApplicationState } from '../../store';
import TransactionItem from './Home/TransactionItem';
import { TransactionModel, OrderFields } from '../../store/user/types';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff'
        }
    })
);

function getOrders() {
    let arr: { id: number; name: string }[] = [];

    for (var n in OrderFields) {
        if (typeof OrderFields[n] === 'number') {
            arr.push({ id: +OrderFields[n], name: n });
        }
    }
    return arr;
}

function comparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const Home = () => {
    const orders = getOrders();
    const classes = useStyles();
    const dispatch = useDispatch()
    const [text, setText] = React.useState<string>('');
    const [order, setOrder] = React.useState<number>(0);
    const list = useSelector((state: ApplicationState) => state.user.transactionList);
    const [filteredList, setFilteredList] = React.useState<Array<TransactionModel>>([]);
    const [sortedList, setSortedList] = React.useState<Array<TransactionModel>>([]);
    const isLoading = useSelector((state: ApplicationState) => state.transaction.isLoading);

    React.useEffect(() => {
        dispatch(getBalanceHistoryAsync())
    }, [dispatch]);

    React.useEffect(() => {
        if (list.length > 0 && text.length > 0) {
            let filteredList = list.filter(function (item) {
                return item.amount.toString().toLowerCase().search(text.toLowerCase()) !== -1 ||
                    (item.correspondentName && item.correspondentName.toLowerCase().search(text.toLowerCase()) !== -1);

            });
            setFilteredList(filteredList);
        } else {
            setFilteredList(list);
        }
    }, [text, list]);

    React.useEffect(() => {
        if (filteredList.length > 0) {
            switch (order) {
                case OrderFields.AmountAsc: {
                    setSortedList(stableSort(filteredList, (a, b) => -comparator(a, b, "amount")));
                    break;
                }
                case OrderFields.AmountDesc: {
                    setSortedList(stableSort(filteredList, (a, b) => comparator(a, b, "amount")));
                    break;
                }
                case OrderFields.CreateDateAsc: {
                    setSortedList(stableSort(filteredList, (a, b) => -comparator(a, b, "creationDate")));
                    break;
                }
                case OrderFields.CreateDateDesc: {
                    setSortedList(stableSort(filteredList, (a, b) => comparator(a, b, "creationDate")));
                    break;
                }
                case OrderFields.RecepientAsc: {
                    setSortedList(stableSort(filteredList, (a, b) => -comparator(a, b, "correspondentName")));
                    break;
                }
                case OrderFields.RecepientDesc: {
                    setSortedList(stableSort(filteredList, (a, b) => comparator(a, b, "correspondentName")));
                    break;
                }
            }
        } else {
            setSortedList(filteredList);
        }
    }, [filteredList, order]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        let val = event.target.value as number;
        setOrder(val);
    }

    const body = sortedList.length === 0 ? "No avaliable entries" :
        sortedList.map((item) => <TransactionItem key={item.transitionId} item={item} />);

    const options = orders.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>);

    return (<React.Fragment>
        <Typography variant="h5" style={{ margin: '16px 0' }}>Transaction history:</Typography>
        <Grid container justify="space-between">
            <FormControl variant="outlined">
                <InputLabel id="select-outlined-label">Order</InputLabel>
                <Select
                    labelId="select-outlined-label"
                    defaultValue={OrderFields.CreateDateDesc}
                    onChange={handleSelect}
                    label="Orders"
                >
                    {options}
                </Select>
            </FormControl>
            <TextField variant="outlined" label="Filter" onChange={handleChange} />
        </Grid>
        <List>
            {body}
        </List>
        <Backdrop className={classes.backdrop} open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    </React.Fragment>
    )
};

export default Home;
