import React, { Component }  from 'react';
import MessageText from './MessageText';


class AttendeesList extends Component {
    
    constructor(props){
        super(props)
    }
    render() {
        // console.log("AttendeesList", this.props.attendees)

        return (
            <div className="div-block-5" style={{borderBottom: '1px solid #9b9b9b', height:'15vh'}}>
                <div className="w-layout-grid green" style={{
                    
                    // maxHeight: "30vh",
                    overflow: "scroll"
                }}>
                    {
                        this.props.attendees && this.props.attendees.reverse().map(user => (
                            <div className="div-block-3" key={user.userId}>
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
