import React, { useState } from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { TrayItemWidget, FileExplorer } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import { Body, Content, Layer, Title } from './BodyWidget.styled';
import { PropsType } from './DemoCanvasContainer';


class BodyWidget extends React.Component<PropsType> {
	
	render() {
		const blocks = this.props.blocks.map((block: any) => {
			return (
				<TrayItemWidget 
					key={ block.name } 
					model={{ block: block }} 
					name={ block.name } 
					color="rgb(150,150,150)" />
			)
		})
	
		const files = this.props.files.map((file: any) => {
			return (
				<FileExplorer
					key={ file.name } 
					ser={ file.ser } 
					name={ file.name }
					app={ this.props.diagramApp }
					color="rgb(150,150,150)" />
			)
		})

		return (
			<Body>
				<Content>
					<TrayWidget>
						<Title> Blocks:</Title>
						{ blocks }
					</TrayWidget>
					<Layer
						onDrop={(event) => {
							var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
							var node: DefaultNodeModel;
							node = new DefaultNodeModel(data.block.name, 'rgb(150,150,150)');
							for (let i = 0; i < data.block.inpN; i++) {
								node.addInPort('In_' + i);
							}
							for (let i = 0; i < data.block.outpN; i++) {
								node.addOutPort('Out_' + i);
							}
							var point = this.props.diagramApp.getDiagramEngine().getRelativeMousePoint(event);
							node.setPosition(point);
							this.props.diagramApp.getDiagramEngine().getModel().addNode(node);
							this.forceUpdate();
						}}
						onDragOver={(event) => {
							event.preventDefault();
						}}>
						<DemoCanvasWidget>
							<CanvasWidget engine={this.props.diagramApp.getDiagramEngine()} />
						</DemoCanvasWidget>
					</Layer>
					<TrayWidget>
						<Title>Files:</Title>
						{ files }
					</TrayWidget>
				</Content>
			</Body>
		);
	}
}

export default BodyWidget;