import * as React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, {
    DiagramModel, DefaultNodeModel, DefaultLinkModel
} from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';

export interface DemoCanvasWidgetProps {
	color?: string;
	background?: string;
}

const Container = styled.div<{ color: string; background: string }>`
height: 100%;
background-color: ${(p) => p.background};
background-size: 50px 50px;
display: flex;
> * {
    height: 100%;
    min-height: 100%;
    width: 100%;
}
background-image: linear-gradient(
        0deg,
        transparent 24%,
        ${(p) => p.color} 25%,
        ${(p) => p.color} 26%,
        transparent 27%,
        transparent 74%,
        ${(p) => p.color} 75%,
        ${(p) => p.color} 76%,
        transparent 77%,
        transparent
    ),
    linear-gradient(
        90deg,
        transparent 24%,
        ${(p) => p.color} 25%,
        ${(p) => p.color} 26%,
        transparent 27%,
        transparent 74%,
        ${(p) => p.color} 75%,
        ${(p) => p.color} 76%,
        transparent 77%,
        transparent
    );
`

const DemoCanvas = (props: any) => {
    
    return (
        <Container
		    background={ props.background || 'rgb(60, 60, 60)' }
		    color={ props.color || 'rgba(255,255,255, 0.05)' }>
			<Canvas />
		</Container>
    );
}

const Canvas = () => {
    const engine = createEngine();

    const model = new DiagramModel();
    const node1 = new DefaultNodeModel({
        name: 'Node 1',
        color: 'rgb(0,192,255)'
    });
    node1.setPosition(100, 100);
    
    const port1 = node1.addOutPort('Out');
    const node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
    const port2 = node2.addInPort('In');
    node2.setPosition(400, 100);

    const link1 = port1.link<DefaultLinkModel>(port2);
    link1.getOptions().testName = 'Test';
    // link1.addLabel('Hello World!');

    model.addAll(node1, node2, link1);

    engine.setModel(model);

    return (
        <CanvasWidget engine={ engine } className="canvas" />
    )

}

export default DemoCanvas;
