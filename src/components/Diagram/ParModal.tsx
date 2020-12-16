import React from 'react';
import { ParModalPropsTypes, ParModalStatesTypes } from './DiagramContainer';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

const ModalFields = (props: any) => {
    return (
        <>{props.fields && 
            Object.entries(props.fields).map((val: any, inx: any) => {
                return (<Form.Group as={Row} controlId="val[0]">
                    <Form.Label column sm="2">
                        {val[0]}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" 
                            value={val[1]} 
                            onChange={props.onChange(val[0])} />
                    </Col>
                    </Form.Group>);
            })
        }</>)
}

export default class ParModal extends React.Component<ParModalPropsTypes,ParModalStatesTypes> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedNodesPars: Object.assign({}, this.props.selectedNode?.getOptions().parameters),
            selectedNodesStates: Object.assign({}, this.props.selectedNode?.getOptions().states),
        };
    }

    onParChange = (name: any) => (event: any) => {
        let pars = Object.assign({}, this.state.selectedNodesPars)
        pars[name] = event.target.value;
        this.setState({selectedNodesPars: pars});
    }

    onStateChange = (name: any) => (event: any) => {
        let states = Object.assign({}, this.state.selectedNodesStates)
        states[name] = event.target.value;
        this.setState({selectedNodesStates: states});
    }

    applyPars = (event: any) => {
        let node = this.props.selectedNode;
        node!.getOptions().parameters = this.state.selectedNodesPars!;
        node!.getOptions().states = this.state.selectedNodesStates!;
        this.deselectNode();
    }

    deselectNode = () => {
        this.setState({
            selectedNodesPars: null,
            selectedNodesStates: null,
        });
        this.props.onClose();
    }

    render() { 
        return (
            <Modal show={ this.props.show } 
                onHide = { this.deselectNode } 
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        { this.props.selectedNode?.getOptions()?.name }
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ModalFields fields={ this.state.selectedNodesPars } onChange={ this.onParChange } />
                    <ModalFields fields={ this.state.selectedNodesStates } onChange={ this.onStateChange } />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick = {() => {this.deselectNode()}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.applyPars}>Apply</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}