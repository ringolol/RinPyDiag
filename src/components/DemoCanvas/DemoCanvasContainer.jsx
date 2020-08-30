import React, { useEffect } from 'react';
import { getBlocksData } from '../../redux/blocks_reducer';
import { connect } from 'react-redux';

import { BodyWidget } from './BodyWidget';
import { DiagApplication } from './DiagApplication';

const DemoCanvasContainer = (props) => {

    // props.blocks   -  тут появяться данные с серва

    var app = new DiagApplication();

    useEffect(() => {
        props.getBlocksData(); //  запрос
    }, [])
    
    return ( <BodyWidget app={app} /> );
}

const mapStateToProps = (state) => ({
    blocks: state.blocksPage.blocks
}) 


export default connect(mapStateToProps, {
    getBlocksData
})(DemoCanvasContainer);
