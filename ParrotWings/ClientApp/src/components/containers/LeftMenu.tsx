import * as React from 'react';
import { List, ListItem, Divider, ListItemIcon, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../store/user/actionCreators';
import { ApplicationState } from '../../store';
import { NavLink } from 'react-router-dom';


function LeftMenu() {
    const dispatch = useDispatch();
    const { balance, name } = useSelector((state: ApplicationState) => {
        return {
            name: state.user.name,
            balance: state.user.balance
        }
    });

    React.useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);


    return (<React.Fragment>
        <List component="nav" aria-label="main mailbox folders">
            <ListItem>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <AccountBalanceWalletIcon />
                </ListItemIcon>
                <ListItemText primary={"Balance: " + balance + " PW"} />
            </ListItem>
        </List>
        <Divider />
        <List component="nav" aria-label="secondary mailbox folder">
            <ListItem
                button
                component={NavLink}
                activeClassName="Mui-selected"
                to={"/"}
                exact
            >
                <ListItemText primary="Transaction history" />
            </ListItem>
            <ListItem
                button
                component={NavLink}
                activeClassName="Mui-selected"
                to={"/CreateTransaction"}
                exact
            >
                <ListItemText primary="Create transaction" />
            </ListItem>
        </List>
    </React.Fragment>
    )
}

export default LeftMenu