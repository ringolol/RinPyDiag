import React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './Tray/TrayWidget';
import { TrayItemWidget, FileExplorer } from './Tray/TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { Canvas } from './Canvas/Canvas';
import styled from '@emotion/styled';
import { PropsType } from './DiagramContainer';
import { BloksType, FilesType } from '../../types/types';


class Diagram extends React.Component<PropsType> {

	onDrop = (event: any) => {
		const data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
		let node: DefaultNodeModel = new DefaultNodeModel(data.block.name, 'rgb(150,150,150)');

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
	
	render() {
		return (
			<Body>
				<Content>
					<TrayWidget>
						<Title> Blocks:</Title>
						<Blocks blocks={ this.props.blocks } />
					</TrayWidget>
					<Layer onDrop={ this.onDrop } onDragOver={ this.onDragOver }>
						<Canvas>
							<CanvasWidget engine={this.props.diagramApp.getDiagramEngine()} />
						</Canvas>
					</Layer>
					<TrayWidget>
						<Title>Files:</Title>
						<Files diagramApp={ this.props.diagramApp } files={ this.props.files }/>
					</TrayWidget>
				</Content>
			</Body>
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
				app={ props.diagramApp }color="rgb(150,150,150)" />
		))
	)
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