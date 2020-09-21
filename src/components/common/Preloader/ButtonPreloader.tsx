import React from 'react';
import { Button, Spinner } from 'react-bootstrap';

const ButtonPreloader = (props: any) => {
    return (
        <Button variant="primary" disabled {...props}>
            <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
            />
            Loading...
        </Button>
    )
}

export default ButtonPreloader;