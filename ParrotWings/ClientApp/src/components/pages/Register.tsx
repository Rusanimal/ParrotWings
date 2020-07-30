import * as React from 'react';
import { ApplicationState } from '../../store';
import { useSelector } from 'react-redux';
import RegisterForm from './Register/RegisterForm';
import CompleteMessage from './Register/CompleteMessage';

function Register() {
    const isCreated = useSelector((state: ApplicationState) => state.account.isCreated);

    const body = isCreated ? <CompleteMessage /> : <RegisterForm />

    return (<React.Fragment>
        {body}
    </React.Fragment>)
}

export default Register