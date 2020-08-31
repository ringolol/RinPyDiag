import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { DiagApplication } from './DiagApplication';
import { TrayItemWidget, TrayItemWidget2 } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import styled from '@emotion/styled';

export interface BodyWidgetProps {
	app: DiagApplication;
	blocks: any;
	files: any;
	filename: any;
	setText: any;
	sendFile: any;
	setUserName: any;
	setPassword: any;
	onLogIn: any;
	username: any;
	password: any;
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

	onSendFile = (event: any) => {
		console.log(this.props.app.getSerialized());
		this.props.sendFile(this.props.filename, this.props.app.getSerialized());
	}

	onUserNameChange = (event: any) => {
		let username = event.target.value;
		this.props.setUserName(username);
	}

	onPasswordChange = (event: any) => {
		let password = event.target.value;
		this.props.setPassword(password);
	}

	onLogIn = (event: any) => {
		console.log([this.props.username, this.props.password])
		this.props.onLogIn(this.props.username, this.props.password);
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

		const files = this.props.files.map((file: any) => {
			return (
				<TrayItemWidget2
					key={ file.name } 
					ser={ file.ser } 
					name={ file.name }
					app={ this.props.app }
					color="rgb(150,150,150)" />
			)
		})

		return (
			<Body>
				<Header>
					<div className="title">Storm React Diagrams - DnD demo</div>
					<input type='text' value={ this.props.username } onChange={ this.onUserNameChange } />
					<input type='text' value={ this.props.password } onChange={ this.onPasswordChange } />
					<button onClick={ this.onLogIn }>Login</button>
					<input type='text' value={ this.props.filename } onChange={ this.onTextChange } />
					<button onClick={ this.onSendFile }>Save File</button>
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
					<TrayWidget>
						{ files }
					</TrayWidget>
				</Content>
			</Body>
		);
	}
}
