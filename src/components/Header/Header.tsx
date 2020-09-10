import React, { useState } from 'react';
import { Nav, Navbar, Button, Container, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { PropsType } from './HeaderContainer';
import styles from './Header.module.css';

const Styles = styled.div `
a, .navbar-brand, .navbar-nav .nav-link {
    color: #adb1b8;
    
    &:hover {
        color: white
    }
}
`


const Header: React.FC<PropsType> = (props) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onLogOut = () => {
		props.onLogOut();
	}

    return (
        <>
            <Styles>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>Rin Diagramm</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <div className={ styles.linkWrapper }>
                                <Link to="/widget">Home</Link>
                                <Link to="/about">About</Link>
                            </div>
                        </Nav>
                        <Nav>
                            <Button 
                            variant="primary" 
                            className="mr-2"
                            onClick={ handleShow }>Save File</Button>
                            <Button variant="primary" onClick={ onLogOut }>Logout</Button>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Styles>
            <Modal show={ show } onHide={ handleClose } centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add file</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='fromBasicFilename'>
                            <Form.Control type='text' placeholder='filename...' />
                            <Form.Text className='text-muted'>What is the name of the file?</Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Header;