import React, { useEffect } from 'react';
import { getBlocksData } from '../../redux/blocks_reducer';
import { connect } from 'react-redux';

import { BodyWidget } from './BodyWidget';
import { DiagApplication } from './DiagApplication';
import { render } from '@testing-library/react';

class DemoCanvasContainer extends React.Component {
    constructor(props) {
        super(props);  // Просто прокидывание пропсов из редакс. 
        // Ваще оно так по умолчанию делаеться, просто тут надо было открывать конструктор.
        this.app = new DiagApplication();
    }

    componentDidMount() {
        this.props.getBlocksData();
    }
    
    render() {
        return ( 
        <BodyWidget 
            app={this.app}
            blocks={this.props.blocks} /> );
    }
}

const mapStateToProps = (state) => ({
    blocks: state.blocksPage.blocks
}) 


export default connect(mapStateToProps, {
    getBlocksData
})(DemoCanvasContainer);
