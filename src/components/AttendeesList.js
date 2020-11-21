import React, { Component }  from 'react';
import MessageText from './MessageText';


class AttendeesList extends Component {
    
    constructor(props){
        super(props)
    }
    render() {
        console.log("AttendeesList", this.props.attendees)

        return (
            <div className="div-block-5">
                <div className="w-layout-grid green" style={{
                    maxHeight: "30vh",
                    overflow: "scroll"
                }}>
                    {
                        this.props.attendees && this.props.attendees.reverse().map(user => (
                            <div className="div-block-3">
                                <div className="div-block-4 green">
                                    <div className="text-block">{user.userId}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default AttendeesList;
