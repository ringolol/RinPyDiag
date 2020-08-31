import React, { useEffect } from 'react';
import {    
            setText, 
            sendFile, 
            setUserName, 
            setPassword,
            onLogIn,
            onLogOut } from '../../redux/blocks_reducer';
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
        this.props.onLogIn();
    }

    setText = (text) => {
        this.props.setText(text);
    }

    sendFile = (filename, ser) => {
        this.props.sendFile(filename, ser);
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

    onLogOut = () => {
        this.props.onLogOut();
    }
    
    render() {
        if (!this.props.isLoaded) return <div>Loading</div>
        return ( 
        <BodyWidget 
            app={ this.app }
            blocks={ this.props.blocks }
            files={ this.props.files }
            filename={ this.props.text }
            setText={ this.setText }
            sendFile={ this.sendFile }
            onLogIn={ this.onLogIn }
            username={ this.props.username }
            password={ this.props.password }
            setUserName={ this.setUserName }
            setPassword={ this.setPassword }
            onLogOut={ this.onLogOut }
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
    setText, 
    sendFile,
    setUserName,
    setPassword,
    onLogIn,
    onLogOut,
})(DemoCanvasContainer);
