import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { PropsType } from './LoginContainer';
import { NavLink } from 'react-router-dom';

const Login: React.FC<PropsType> = (props) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
	}
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const onLogIn = () => {
        props.onLogIn(login, password);
    }

    const setRegister = () => {
        props.setRegister(false);
    }

    const pressEnter = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onLogIn();
        }
    }

    return(
        <Wrapper>
            <Container style={{maxHeight: '400px', maxWidth: '300px'}}>
                <Form>
                    <Form.Group controlId='fromBasicEmail'>
                        <Form.Control type='text' placeholder='Enter login' 
                            onChange={ onLoginChange } onKeyPress={ pressEnter } value={ login } />
                    </Form.Group>
                    <Form.Group controlId='fromBasicPassword'>
                        <Form.Control type='password' placeholder='Enter password'
                            onChange={ onPasswordChange } onKeyPress={ pressEnter } value={ password }/>
                        <Form.Text className='text-muted' >Don't share your password with anyone</Form.Text>
                    </Form.Group>
                    <Form.Group controlId='fromBasicCheckbox'>
                        <Form.Check type='checkbox' label='Remeber me' />
                    </Form.Group>
                    <Button
                        className='float-right'  
                        variant="primary"
                        onClick={ onLogIn }
                        >Log in</Button>
                    <NavLink to="/register" onClick={ setRegister }>Register</NavLink>
                </Form>
            </Container>
        </Wrapper>
    )
}

export default Login;


const Wrapper = styled.div `
    height: 100vh;
    display: flex;
    justify-items: center;
    align-items: center;
`