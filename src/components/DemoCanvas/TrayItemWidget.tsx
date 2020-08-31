import * as React from 'react';
import styled from '@emotion/styled';

export interface TrayItemWidgetProps {
	model: any;
	color?: string;
	name: string;
}

export interface TrayItemWidgetProps2 {
	ser: any;
	color?: string;
	name: string;
	app: any;
}


export const Tray = styled.div<{ color: string }>`
	color: white;
	font-family: Helvetica, Arial;
	padding: 5px;
	margin: 0px 10px;
	border: solid 1px ${(p) => p.color};
	border-radius: 5px;
	margin-bottom: 2px;
	cursor: pointer;
`;


export class TrayItemWidget extends React.Component<TrayItemWidgetProps> {
	render() {
		return (
			<Tray
				color={ this.props.color || 'gray' }
				draggable={true}
				onDragStart={(event) => {
					event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model));
				}}
				className="tray-item">
				{this.props.name}
			</Tray>
		);
	}
}

export class TrayItemWidget2 extends React.Component<TrayItemWidgetProps2> {
	render() {
		return (
			<Tray
				color={ this.props.color || 'gray' }
				// draggable={true}
				// onDragStart={(event) => {
				// 	event.dataTransfer.setData('storm-diagram-node', JSON.stringify(this.props.model));
				// }}
				onClick={() => { this.props.app.deserialize(this.props.ser) }}
				className="tray-item">
				{this.props.name}
			</Tray>
		);
	}
}
