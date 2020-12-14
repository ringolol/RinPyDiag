import * as React from 'react';
import { DefaultNodeWidget } from '@projectstorm/react-diagrams';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

import { DiagNodeModel } from './DiagNodeModel';


export class DiagNodeFactory extends AbstractReactFactory<DiagNodeModel, DiagramEngine> {
    constructor() {
        super('diag');
    }

    generateReactWidget(event: any): JSX.Element {
        return <DefaultNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: any): DiagNodeModel {
        return new DiagNodeModel();
    }
}