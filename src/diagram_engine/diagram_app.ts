import * as SRD from '@projectstorm/react-diagrams';
import { DiagNodeFactory } from '../components/Diagram/Node/DiagNodeFactory';

/**
 * @author Dylan Vorster
 */
export class DiagApplication {
	protected activeModel: SRD.DiagramModel;
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		this.diagramEngine = SRD.default();
		this.diagramEngine.getNodeFactories()
			.registerFactory(new DiagNodeFactory());
		this.activeModel = new SRD.DiagramModel();
		this.diagramEngine.setModel(this.activeModel);
	}

	public getActiveDiagram(): SRD.DiagramModel {
		return this.activeModel;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		return this.diagramEngine;
	}

	public getSerialized() {
		return this.activeModel.serialize();
	}

	public deserialize(ser: any) {
		this.activeModel.deserializeModel(ser, this.diagramEngine);
		this.diagramEngine.setModel(this.activeModel);
	}
}
