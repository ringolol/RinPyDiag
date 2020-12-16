import React from 'react';
import { TrayWidget } from './Tray/TrayWidget';
import { TrayItemWidget, FileExplorer } from './Tray/TrayItemWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { Canvas } from './Canvas/Canvas';
import styled from '@emotion/styled';
import { PropsType, StatesTypes } from './DiagramContainer';
import { BloksType, FilesType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import { DiagNodeModel } from './Node/DiagNodeModel';
import ParModal from './ParModal';
import { diagramAPI } from '../../api/api';


class Diagram extends React.Component<PropsType,StatesTypes> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			selectedNode: null,
			showParModal: false,
			diagOutput: "",
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
        let base = this.props.diagramApp.getDiagramEngine().getMouseElement(event);
        if(!base || base.getType() !== 'diag') return;
        let node: DiagNodeModel = base as DiagNodeModel;
		this.setState({
            selectedNode: node,
            showParModal: true,
        });
        node.setSelected(false);
    }
    
    parseDiagram = () => {
        diagramAPI.parseDiagram(this.props.diagramApp.getSerialized(), {t: 5, dt: 0.01})
            .then(response => { 
				console.log(response);
				let output = this.state.diagOutput + response?.data.output;
				this.setState({diagOutput: output});
			});
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
                <Footer>
                    <Output readOnly={true} value={this.state.diagOutput}></Output>
                    <RunBtn onClick={this.parseDiagram}>RUN</RunBtn>
                </Footer>
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

export default Diagram;

const Footer = styled.div`
flex-grow: 1;
display: flex;
flex-direction: row;
background: black;
`;

const Output = styled.textarea`
display: flex;
flex-grow: 1;
background: darkgray;
`;

const RunBtn = styled.button`
background: green;
width: 70px;
color: white;
`;

const Body = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;
min-height: 90%;
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