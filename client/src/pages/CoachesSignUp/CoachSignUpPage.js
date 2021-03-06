// Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Component
import MainHeader from "../../components/MainHeader";
import CoachSignUpForm from "../../components/CoachSignUpForm/CoachSignUpForm";
import FlashMessageList from "../../components/FlashMessageList/FlashMessageList";
import Nav from "../../components/Nav";

// Actions
import { coachSignupRequest, isCoachExists } from "../../actions/coachSignUpRequest";
import { addFlashMessage } from "../../actions/flashMessages";
import API  from "../../actions/API";

// CSS
import "../Landing/landing.css";

// ----------------------------------------------------------------------------------- //
// Coach Signup Page
class CoachSignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            sports: []
        }

    }

    componentDidMount() {
        this.getSports();
    }

    getSports = () => {
        API.getSports()
          .then(res => this.setState({ sports: res.data }))
          .catch(err => console.log(err));
    }

    // Render the page
    render() {

        // Decontruction the object
        const {coachSignupRequest, addFlashMessage, isCoachExists} = this.props;

        return (
            <div className="container-fluid">
                <Nav/>
                <div className="row">
                    <div className="col-md-6 form homepage">
                        <MainHeader/>
                        <FlashMessageList/>
                        <CoachSignUpForm
                            coachSignupRequest={coachSignupRequest}
                            addFlashMessage={addFlashMessage}
                            isCoachExists={isCoachExists}
                            sports={this.state.sports}
                        
                        />
                    </div>

                    <div className="col-md-6 home-bg homepage">
                        <div className="landing-bg">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

// ----------------------------------------------------------------------------------- //
// Setting propTypes
CoachSignUpPage.propTypes = {
    coachSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isCoachExists: PropTypes.func.isRequired
}

// ----------------------------------------------------------------------------------- //
// Exporting the page, and connecting the props with redux
export default connect(null, { coachSignupRequest, addFlashMessage, isCoachExists })(CoachSignUpPage);