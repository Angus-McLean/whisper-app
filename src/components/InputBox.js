import React, { Component } from 'react';

class InputBox extends Component {



    sendMessage(e) {
        alert("Not yet implemented!")
    }

    render() {
        console.log(this.props.messages)
        return (
                <div className="input-group">
                    <input type="text" placeholder="Type a message" aria-describedby="button-addon2" className="form-control rounded-0 border-0 py-4 bg-light" />
                    <div className="input-group-append">
                        <button id="button-addon2" className="btn btn-link" onClick={this.sendMessage}>
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
        )
    }
}

export default InputBox;
