import { NodeModelGenerics, DefaultNodeModel, DefaultNodeModelGenerics, DefaultNodeModelOptions, DefaultPortModel, NodeModel, PortModelAlignment } from "@projectstorm/react-diagrams";
import { BasePositionModelOptions, DeserializeEvent } from '@projectstorm/react-canvas-core';
import _ from "lodash";


export interface DiagNodeModelOptions extends BasePositionModelOptions  {
	name?: string;
	color?: string;
	parameters?: any;
	states?: any;
}

export interface DiagNodeModelGenerics extends NodeModelGenerics {
	OPTIONS: DiagNodeModelOptions;
}

export class DiagNodeModel extends NodeModel<DiagNodeModelGenerics> {
	protected portsIn: DefaultPortModel[];
	protected portsOut: DefaultPortModel[];

	constructor(name: string, color: string);
	constructor(options?: DiagNodeModelOptions);
	constructor(options: any = {}, color?: string, parameters?: any, states?: any) {
		if (typeof options === 'string') {
			options = {
				name: options,
				color: color,
				parameters: parameters,
				states: states,
			};
		}
		super({
			type: 'diag',
			name: 'Untitled',
			color: 'rgb(0,192,255)',
			parameters: {},
			states: {},
			...options
		});
		this.portsOut = [];
		this.portsIn = [];
		this.options.parameters = {};
		this.options.states = {};
	}

	doClone(lookupTable: {}, clone: any): void {
		clone.portsIn = [];
		clone.portsOut = [];
		super.doClone(lookupTable, clone);
	}

	removePort(port: DefaultPortModel): void {
		super.removePort(port);
		if (port.getOptions().in) {
			this.portsIn.splice(this.portsIn.indexOf(port));
		} else {
			this.portsOut.splice(this.portsOut.indexOf(port));
		}
	}

	addPort<T extends DefaultPortModel>(port: T): T {
		super.addPort(port);
		if (port.getOptions().in) {
			if (this.portsIn.indexOf(port) === -1) {
				this.portsIn.push(port);
			}
		} else {
			if (this.portsOut.indexOf(port) === -1) {
				this.portsOut.push(port);
			}
		}
		return port;
	}

	addInPort(label: string, after = true): DefaultPortModel {
		const p = new DefaultPortModel({
			in: true,
			name: label,
			label: label,
			alignment: PortModelAlignment.LEFT
		});
		if (!after) {
			this.portsIn.splice(0, 0, p);
		}
		return this.addPort(p);
	}

	addOutPort(label: string, after = true): DefaultPortModel {
		const p = new DefaultPortModel({
			in: false,
			name: label,
			label: label,
			alignment: PortModelAlignment.RIGHT
		});
		if (!after) {
			this.portsOut.splice(0, 0, p);
		}
		return this.addPort(p);
	}

	getInPorts(): DefaultPortModel[] {
		return this.portsIn;
	}

	getOutPorts(): DefaultPortModel[] {
		return this.portsOut;
	}

	serialize(): any {
		return {
			...super.serialize(),
			name: this.options.name,
			color: this.options.color,
			portsInOrder: _.map(this.portsIn, port => {
				return port.getID();
			}),
			portsOutOrder: _.map(this.portsOut, port => {
				return port.getID();
			}),
			parameters: this.options.parameters,
			states: this.options.states,
		};
	}

	deserialize(event: DeserializeEvent<this>): void {
		super.deserialize(event);
		this.options.name = event.data.name;
		this.options.color = event.data.color;
		this.portsIn = _.map(event.data.portsInOrder, id => {
			return this.getPortFromID(id);
		}) as DefaultPortModel[];
		this.portsOut = _.map(event.data.portsOutOrder, id => {
			return this.getPortFromID(id);
		}) as DefaultPortModel[];
		
		this.options.parameters = event.data.parameters;
		this.options.states = event.data.states;
	}
}