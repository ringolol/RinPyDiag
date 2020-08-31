import React, { useEffect } from 'react';
import {    
            getBlocksData, 
            setText, 
            sendTextForServer, 
            setUserName, 
            setPassword,
            onLogIn } from '../../redux/blocks_reducer';
import { connect } from 'react-redux';

import { BodyWidget } from './BodyWidget';
import { DiagApplication } from './DiagApplication';

class DemoCanvasContainer extends React.Component {
    constructor(props) {
        super(props);  // Просто прокидывание пропсов из редакс. 
        // Ваще оно так по умолчанию делаеться, просто тут надо было открывать конструктор.
        this.app = new DiagApplication();
    }

    componentDidMount() {
        this.props.getBlocksData();
    }

    setText = (text) => {
        this.props.setText(text);
    }

    sendTextForServer = (text) => {
        this.props.sendTextForServer(text);
    }

    setUserName = (username) => {
        this.props.setUserName(username);
    }

    setPassword = (password) => {
        this.props.setPassword(password);
    }

    onLogIn = (username, password) => {
        this.props.onLogIn(username, password);
    }
    
    render() {
        if (!this.props.isLoaded) return <div>Loading</div>
        return ( 
        <BodyWidget 
            app={ this.app }
            blocks={ this.props.blocks }
            files={ this.props.files }
            text={ this.props.text }
            setText={ this.setText }
            sendTextForServer={ this.sendTextForServer }
            onLogIn={ this.onLogIn }
            username={ this.props.username }
            password={ this.props.password }
            setUserName={ this.setUserName }
            setPassword={ this.setPassword }
             /> );
    }
}

const mapStateToProps = (state) => ({
    blocks: state.blocksPage.blocks,
    files: state.blocksPage.files,
    isLoaded: state.blocksPage.isLoaded,
    text: state.blocksPage.text,
    username: state.blocksPage.username,
    password: state.blocksPage.password,
}) 


export default connect(mapStateToProps, {
    getBlocksData,
    setText, 
    sendTextForServer,
    setUserName,
    setPassword,
    onLogIn,
})(DemoCanvasContainer);
