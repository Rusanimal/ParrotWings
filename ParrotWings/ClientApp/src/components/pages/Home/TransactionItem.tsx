import * as React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Grid, Box, Divider, ListItemSecondaryAction, Button } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceived from '@material-ui/icons/CallReceived';
import { TransactionModel } from '../../../store/user/types';
import { green, red } from '@material-ui/core/colors';
import { getTransactionAsync } from '../../../store/transaction/slice';
import { push } from 'connected-react-router';
import { useAppDispatch } from '../../../hooks';

type OwnProps = {
    item: TransactionModel
}

function formatDate(date: string) {
    let newDate = new Date(date);
    return newDate.toLocaleString();
}

function TransactionItem(props: OwnProps) {
    const { item } = props;
    const dispatch = useAppDispatch();
    const color = item.amount > 0 ? green[500] : red[500];

    const handleClick = () => {
        dispatch(getTransactionAsync(item.transitionId));
        dispatch(push("/CreateTransaction"));
    }

    const icon = item.amount > 0 ? <CallReceived fontSize="large" /> :
        <CallMadeIcon fontSize="large" />

    const correspondent = item.correspondentName && item.correspondentName.length > 0 ?
        "Recipient: " + item.correspondentName :
        "Registration award";

    return (<React.Fragment>
        <ListItem alignItems="center">
            <ListItemAvatar>
                <Avatar style={{ backgroundColor: color }} >
                    {icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={"Transaction from " + formatDate(item.creationDate)}
                secondary={
                    <Grid component="span" container direction="column">
                        <Box component="span">{correspondent}</Box>
                        <Box component="span">Amount: {item.amount} pw</Box>
                        <Box component="span">Resulting balance: {item.resultingBalance} pw</Box>
                    </Grid>
                }
            />
            {item.transitionId > 0 && item.amount < 0 && <ListItemSecondaryAction>
                <Button variant="outlined" onClick={handleClick}>Repeat</Button>
            </ListItemSecondaryAction>}
        </ListItem>
        <Divider variant="inset" component="li" />
    </React.Fragment>
    )
}

export default TransactionItem