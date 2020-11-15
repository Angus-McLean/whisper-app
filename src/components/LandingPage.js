import React, { Component } from 'react';

class LandingPage extends Component {

    constructor(props) {
        super(props)
        this.props = props    
    }

    joinMeeting = async (e) => {
        e.preventDefault();
        console.log('LandingPage.joinMeeting',e)

        this.props.goToMeeting({
            'meetingId':document.getElementById('meetingField').value,
            'userId':document.getElementById('userField').value
        })
    }

    render() {
        return (
            <div className="landing section">
                <div className="landing text-block-8">Join meeting</div>
                <div className="landing text-block-9">Whisper Meeting</div>
                <div className="landing form-block w-form">
                    <form id="email-form" onSubmit={this.joinMeeting} name="email-form" data-name="Email Form" className="landing form">
                        <input type="text"
                            className="landing text-field w-input" maxLength="256" name="name" data-name="Name" placeholder="Meeting ID.."
                            id="meetingField" defaultValue="defaultTestMeeting"/>
                        <input type="text"
                            className="landing text-field w-input" maxLength="256" name="name" data-name="Name" placeholder="Your Name.."
                            id="userField" defaultValue="John Doe"/>
                        <input type="submit" value="Join Meeting" data-wait="Please wait..."
                            className="landing submit-button w-button" />
                    </form>
                    <div className="landing w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="landing w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;



// Other Helpers 
