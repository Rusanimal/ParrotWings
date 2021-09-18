import * as React from 'react';
import RegisterForm from './Register/RegisterForm';
import CompleteMessage from './Register/CompleteMessage';
import { useAppSelector } from '../../hooks';

function Register() {
    const isCreated = useAppSelector(state => state.account.isCreated);

    const body = isCreated ? <CompleteMessage /> : <RegisterForm />

    return (<React.Fragment>
        {body}
    </React.Fragment>)
}

export default Register