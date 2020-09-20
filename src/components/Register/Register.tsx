import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { PropsType } from './RegisterContainer';


const Register: React.FC<PropsType> = (props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
	}
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const onPasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
    }
    const register = () => {
        props.register(username, password, passwordConfirm);
    }

    const pressEnter = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            register();
        }
    }

    return(
        <Wrapper>
            <Container style={{maxHeight: '400px', maxWidth: '300px'}}>
                <Form>
                    <Form.Group controlId='formUsername'>
                        <Form.Control type='text' placeholder='Enter the username' 
                            onChange={ onLoginChange } onKeyPress={ pressEnter } 
                            value={ username } required />
                    </Form.Group>
                    <Form.Group controlId='formPassword'>
                        <Form.Control type='password' placeholder='Enter password'
                            onChange={ onPasswordChange } onKeyPress={ pressEnter } 
                            value={ password } required />
                    </Form.Group>
                    <Form.Group controlId='formPasswordConfirm'>
                        <Form.Control type='password' placeholder='Confirm password'
                            onChange={ onPasswordConfirmChange } onKeyPress={ pressEnter } 
                            value={ passwordConfirm } required />
                        <Form.Text className='text-muted' >Don't share your password with anyone</Form.Text>
                    </Form.Group>
                    <Button
                        className='float-right'  
                        variant="primary"
                        onClick={ register }
                        >Register</Button>
                    <NavLink to="/login" >Login</NavLink>
                </Form>
            </Container>
        </Wrapper>
    )
}

export default Register;


const Wrapper = styled.div `
    height: 100vh;
    display: flex;
    justify-items: center;
    align-items: center;
`