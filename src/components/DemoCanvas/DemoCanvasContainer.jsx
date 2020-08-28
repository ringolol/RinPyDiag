import * as React from 'react';
import DemoCanvas from './DemoCanvas';
import { getBlocksData } from '../../redux/blocks_reducer';
import { connect } from 'react-redux';

const DemoCanvasContainer = (props) => {

    React.useEffect(() => {
        props.getBlocksData(); //  запрос
    }, [])
    
    return (
        <DemoCanvas />
    );
}

const mapStateToProps = (state) => ({
    blocks: state.blocksPage.blocks
}) 


export default connect(mapStateToProps, {
    getBlocksData
})(DemoCanvasContainer);
