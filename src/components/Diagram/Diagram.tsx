import React from 'react';
import { TrayWidget } from './Tray/TrayWidget';
import { TrayItemWidget, FileExplorer } from './Tray/TrayItemWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { Canvas } from './Canvas/Canvas';
import styled from '@emotion/styled';
import { ParModalPropsTypes, ParModalStatesTypes, PropsType, StatesTypes } from './DiagramContainer';
import { BloksType, FilesType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { DiagNodeModel } from './Node/DiagNodeModel';


class Diagram extends React.Component<PropsType,StatesTypes> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			selectedNode: null,
            showParModal: false,
		}
	}

	onDrop = (event: any) => {
		const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
        let node: DiagNodeModel = new DiagNodeModel(data.block.name, 'rgb(150,150,150)');
        
		node.getOptions().parameters = Object.assign({}, data.block.pars);
		node.getOptions().states = Object.assign({}, data.block.states);

		for (let i = 0; i < data.block.inpN; i++) {
			node.addInPort('In_' + i);
		}
		for (let i = 0; i < data.block.outpN; i++) {
			node.addOutPort('Out_' + i);
		}
		const point = this.props.diagramApp.getDiagramEngine().getRelativeMousePoint(event);
        node.setPosition(point);
		this.props.diagramApp.getDiagramEngine().getModel().addNode(node);
        this.forceUpdate();
	}

	onDragOver = (event: any) => {
		event.preventDefault();
	}

	onDoubleClick = (event: any) => {
		let node: DiagNodeModel = this.props.diagramApp.getDiagramEngine().getMouseElement(event) as DiagNodeModel;
		this.setState({
            selectedNode: node,
            showParModal: true,
        });
        node.setSelected(false);
	}
  
	render() {
		return (
			<>
			<Body>
				<Content>
					<TrayWidget>
						<Title> Blocks:</Title>
						{ this.props.isLoaded
							? <Blocks blocks={ this.props.blocks } />
							: <Preloader color='#b1aaaa' /> }
					</TrayWidget>
					<Layer onDrop={ this.onDrop } onDragOver={ this.onDragOver } onDoubleClick={this.onDoubleClick}>
						<Canvas>
							<CanvasWidget 
								engine={this.props.diagramApp.getDiagramEngine()}
							/>
						</Canvas>
					</Layer>
					<TrayWidget>
						<Title>Files:</Title>
						{ this.props.isLoaded
							? <Files diagramApp={ this.props.diagramApp } files={ this.props.files }/>
							: <Preloader color='#b1aaaa' /> }
					</TrayWidget>
				</Content>
			</Body>
            <ParModal key={this.state.selectedNode?.getID()} 
                selectedNode={this.state.selectedNode} 
                show={this.state.showParModal} 
                onClose={() => {this.setState({showParModal: false, selectedNode: null})}}/>
			</>
		);
	}
}

const Blocks = (props: any) => {
	return (
		props.blocks.map((block: BloksType) => (
			<TrayItemWidget 
				key={ block.name } model={{ block: block }} 
				name={ block.name } color="rgb(150,150,150)" />
		))
	)
}

const Files = (props: any) => {
	return (
		props.files.map((file: FilesType) => (
			<FileExplorer
				key={ file.name } ser={ file.ser } name={ file.name }
				app={ props.diagramApp } color="rgb(150,150,150)" />
		))
	)
}

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

class ParModal extends React.Component<ParModalPropsTypes,ParModalStatesTypes> {
    constructor(props: any) {
        super(props);
        console.log(this.props.selectedNode);
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
        node.getOptions().parameters = this.state.selectedNodesPars;
        node.getOptions().states = this.state.selectedNodesStates;
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
                        { this.props.selectedNode?.options?.name }
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

export default Diagram;

const Body = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;
min-height: 93%;
`;

const Content = styled.div`
display: flex;
flex-grow: 1;
`;

const Layer = styled.div`
position: relative;
flex-grow: 1;
`;

const Title = styled.div`
color: white;
font-family: Helvetica, Arial;
padding: 10px;
`;