import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { DiagApplication } from './DiagApplication';
import { TrayItemWidget } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import styled from '@emotion/styled';

export interface BodyWidgetProps {
	app: DiagApplication;
	blocks: any;
	files: any;
	text: any;
	setText: any;
	sendTextForServer: any;
}

export const Body = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	min-height: 100%;
`;

export const Header = styled.div`
	display: flex;
	background: rgb(30, 30, 30);
	flex-grow: 0;
	flex-shrink: 0;
	color: white;
	font-family: Helvetica, Arial, sans-serif;
	padding: 10px;
	align-items: center;
`;

export const Content = styled.div`
	display: flex;
	flex-grow: 1;
`;

export const Layer = styled.div`
	position: relative;
	flex-grow: 1;
`;

export class BodyWidget extends React.Component<BodyWidgetProps> {
	
	constructor(props: any) {
		super(props);
	}

	showBlocksInConsole = () => {
		console.log(this.props)
	}

	onTextChange = (event: any) => {
		let text = event.target.value;
		this.props.setText(text);
	}

	onSendText = () => {
		this.props.sendTextForServer(this.props.text);
	}
	
	render() {
		// эти блоки мы берем с серва ( api: /diagram/api/blocks )
		const blocks = this.props.blocks.map((block: any) => {
			return (
				<TrayItemWidget 
					key={ block.name } 
					model={{ block: block }} 
					name={ block.name } 
					color="rgb(150,150,150)" />
			)
		})

		return (
			<Body>
				<Header>
					<div className="title">Storm React Diagrams - DnD demo</div>
					<button onClick={ this.showBlocksInConsole }> Show blocks in console </button>
					<input type='text' value={ this.props.text } onChange={ this.onTextChange } />
					<button onClick={ this.onSendText }>Send data</button>
				</Header>
				<Content>
					<TrayWidget>
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
							var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
							node.setPosition(point);
							this.props.app.getDiagramEngine().getModel().addNode(node);
							this.forceUpdate();
						}}
						onDragOver={(event) => {
							event.preventDefault();
						}}>
						<DemoCanvasWidget>
							<CanvasWidget engine={this.props.app.getDiagramEngine()} />
						</DemoCanvasWidget>
					</Layer>
				</Content>
			</Body>
		);
	}
}
