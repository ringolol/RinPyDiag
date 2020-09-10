import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import styles from './Login.module.css';

const Login = () => {
    return(
        <div className={ styles.wrapper } >
            <Container style={{maxHeight: '400px', maxWidth: '300px'}}>
                <Form>
                    <Form.Group controlId='fromBasicEmail'>
                        <Form.Control type='text' placeholder='Enter login' />
                    </Form.Group>
                    <Form.Group controlId='fromBasicPassword'>
                        <Form.Control type='password' placeholder='Enter password'/>
                        <Form.Text className='text-muted'>Don't share your password with anyone</Form.Text>
                    </Form.Group>
                    <Form.Group controlId='fromBasicCheckbox'>
                        <Form.Check type='checkbox' label='Remeber me' />
                    </Form.Group>
                    <Button
                        className='float-right'  
                        variant="primary">Log in</Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login;