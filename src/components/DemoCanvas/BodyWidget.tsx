import React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TrayWidget';
import { TrayItemWidget, FileExplorer } from './TrayItemWidget';
import { DefaultNodeModel } from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import { Body, Header, Content, Layer, Title } from './BodyWidget.styled';
import { PropsType } from './DemoCanvasContainer';


const BodyWidget: React.FC<PropsType> = (props) => {

	const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let text = event.target.value;
		props.setFileName(text);
	}

	const onSendFile = () => {
		console.log(props.app.getSerialized());
		props.sendFile(props.filename, props.app.getSerialized());
	}

	const onUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let username = event.target.value;
		props.setUserName(username);
	}

	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let password = event.target.value;
		props.setPassword(password);
	}

	const onLogIn = () => {
		props.onLogIn(props.username, props.password);
	}

	const onLogOut = () => {
		props.onLogOut();
	}

	const blocks = props.blocks.map((block: any) => {
		return (
			<TrayItemWidget 
				key={ block.name } 
				model={{ block: block }} 
				name={ block.name } 
				color="rgb(150,150,150)" />
		)
	})

	const files = props.files.map((file: any) => {
		return (
			<FileExplorer
				key={ file.name } 
				ser={ file.ser } 
				name={ file.name }
				app={ props.app }
				color="rgb(150,150,150)" />
		)
	})
	
	return (
		<Body>
			<Header>
				<div className="title">Storm React Diagrams - DnD demo</div>
				<input type='text' value={ props.username } onChange={ onUserNameChange } />
				<input type='password' value={ props.password } onChange={ onPasswordChange } />
				<button onClick={ onLogIn }>Login</button>
				<button onClick={ onLogOut }>Logout</button>
				<input type='text' value={ props.filename } onChange={ onTextChange } />
				<button onClick={ onSendFile }>Save File</button>
			</Header>
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
						var point = props.app.getDiagramEngine().getRelativeMousePoint(event);
						node.setPosition(point);
						props.app.getDiagramEngine().getModel().addNode(node);
						// forceUpdate();  чо это такое?
					}}
					onDragOver={(event) => {
						event.preventDefault();
					}}>
					<DemoCanvasWidget>
						<CanvasWidget engine={props.app.getDiagramEngine()} />
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

export default BodyWidget;