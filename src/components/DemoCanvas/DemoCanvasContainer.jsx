import React, { useEffect } from 'react';
import { getBlocksData } from '../../redux/blocks_reducer';
import { connect } from 'react-redux';

import { BodyWidget } from './components/DemoCanvas/BodyWidget';
import { Application } from './components/DemoCanvas/Application';

const DemoCanvasContainer = (props) => {

    // props.blocks   -  тут появяться данные с серва

    var app = new Application();

    useEffect(() => {
        props.getBlocksData(); //  запрос
    }, [])
    
    return (<BodyWidget app={app} />);
}

const mapStateToProps = (state) => ({
    blocks: state.blocksPage.blocks
}) 


export default connect(mapStateToProps, {
    getBlocksData
})(DemoCanvasContainer);
