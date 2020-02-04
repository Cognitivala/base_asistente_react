import React, { Component } from "react";
import PropTypes from "prop-types";
import './styles.scss';

export default class InputFile extends Component {
    constructor(props) {
        super(props);
        this.attach = React.createRef();
        this.attachFile = this.attachFile.bind(this);
        this.attachIconClick = this.attachIconClick.bind(this);
    }

    attachIconClick() {
        this.attach.current.click();
    }

    attachFile(event) {
        console.log('attachFile InputFILE:: ', event.target.files);
        if(event.target.files.length){
            const { attachFile } = this.props;
            const file = this.attach.current.files[0];
            let item = {};
            item.file = file;
            attachFile(item);
        }
    }

    render() {
        return (
        <button
            className="btn btn-rounded input-user-btn"
            type="button"
            onClick={this.attachIconClick}
        >
            <i className="fas fa-paperclip icon" />
            <input
                type="file"
                className="hide"
                ref={this.attach}
                onChange={this.attachFile}
            />
        </button>
        );
    }
}

InputFile.propTypes = {
    attachFile: PropTypes.func.isRequired
};
