// import React from 'react';
// import DemoCanvasContainer from './components/DemoCanvas/DemoCanvasContainer';


// function App() {
//   return (
//     <DemoCanvasContainer />
//   );
// }

// export default App;

import * as React from 'react';

import { BodyWidget } from './components/DemoCanvas/BodyWidget';
import { DiagApplication } from './components/DemoCanvas/DiagApplication';

export default function App() {
	var app = new DiagApplication();
	return <BodyWidget app={app} />;
};
