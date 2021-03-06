// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";


// Component
import Nav from "../../components/Nav";
import Footer from "../../components/Footer/Footer";
import FlashMessageList from "../../components/FlashMessageList/FlashMessageList";
import MainHeader from "../../components/MainHeader";
import CreatePracticeForm from "../../components/createPracticeForm";
import { DeleteBtn } from "../../components/List";

// Actions
import { addFlashMessage } from "../../actions/flashMessages";
import { createPracticePost, getPractice, deletePractice } from "../../actions/practicePost";
import API from "../../actions/API";

// CSS
import "./coachespage.css";

// ----------------------------------------------------------------------------------- //
// Creating the Parent Page
class CoachPortal extends Component {

    constructor() {
        super();
        this.state = {
            createPracticeForm: false,
            showTeam: false,
            showSchedule: false,
            showPractice: false,
            practices: [],
            team_association: [],
            teams: [],
            schedules: [],
            errors: {}
        }       
    }

    // Update state after data is called
    componentDidMount() {
        this.retrieveTeamInfo(this.props.auth.user.id);
    }

    // Retrieve teams for form dropdown
    retrieveTeamInfo = id => {
        API.coachFindTeams(id)
            .then(res => {
                const [ coach, games, practices ] = res.data;
                this.setState({ teams: coach.Team, schedules: games, practices: practices })
            })
                // Handle errors
                .catch(err =>console.log(err));

    }

    // Delete practices
    deleteCoachPractices = id => {
        this.props.deletePractice(id)
            .then(res => this.retrievePractices(this.props.auth.user.id))
                // Handle errors
                .catch(err => console.log(err));
    }


    // Toggle create practice form
    togglePracticeForm () {
        this.setState({
            createPracticeForm: !this.state.createPracticeForm,
            showPractice: false,
            showTeam: false,
            showSchedule: false
        });
    }

    // Toggle practice div
    togglePracticeDiv () {
        this.setState({
            showPractice: !this.state.showPractice,
            createPracticeForm: false,
            showTeam: false,
            showSchedule: false
        });
    }

    // Toggle team div
    toggleTeamDiv () {
        this.setState({
            showTeam: !this.state.showTeam,
            createPracticeForm: false,
            showPractice: false,
            showSchedule: false,
        })
    }

    // Toggle team div
    toggleScheduleDiv () {
        this.setState({
            showSchedule: !this.state.showSchedule,
            createPracticeForm: false,
            showPractice: false,
            showTeam: false
        })
    }

    

    // Render the page
    render() {
        const { addFlashMessage, createPracticePost } = this.props; 

        return (
            <div className="container-fluid">
            <Nav/>
                <div className="row">
                    <div className="col-md-6 form">
                        <MainHeader />
                        <FlashMessageList />
                        {/* Buttons to render certain data */}
                        <div className="button-div text-center">

                        <h3 className="dashboard-title">Coach Dashboard</h3>
                        <hr className="line"></hr>

                            <ul className="mx-auto">
                                <li><button className="btn btn-primary form-btn button-actions" onClick={() => this.togglePracticeForm()}>Create Practices</button></li>
                                <li><button className="btn btn-primary form-btn button-actions" onClick={() => this.toggleTeamDiv()}>Assigned Teams</button></li>
                                <li><button className="btn btn-primary form-btn button-actions" onClick={() => this.togglePracticeDiv()}>Show Practices</button></li>
                                <li><button className="btn btn-primary form-btn button-actions" onClick={() => this.toggleScheduleDiv()}>Show Team Schedule</button></li>
                            </ul>
                        </div> 

                        {/* Toggle Forms */}
                        { this.state.createPracticeForm ?  
                        // Create Practice Form
                        <CreatePracticeForm 
                            createPracticePost={createPracticePost}
                            addFlashMessage={addFlashMessage}
                            coachId={this.props.auth.user.id}
                            retrievePractices={this.retrievePractices}
                            teams={this.state.teams}
                            teamId={this.props.teamId}

                        />
                        // If not toggled to true, hide the form
                            :null
                        }

                        {/*  --------------------------------------------------- */}

                        {/* Show schedule div */}
                        { this.state.showPractice ? 
                            <div className="coachDataDiv col-md-8 mx-auto homepage">
                                <div className="text-center">
                                    <h5><stronger>Date - Time - Location - Association - X</stronger></h5>
                                </div>
                                <div className="text-center">
                                    <ul className="coachDataId" >
                                    {this.state.practices.map(practice => (
                                        <li className="dateTime" key={practice.id}>
                                            {moment(practice.date, "YYYY-MM-DDTHH:mm:ss.SSS").format("MM/DD/YY")} - {moment(practice.time, "HH:mm:ss").format("hh:MM p")} - {practice.location} - {this.state.teams.teamName} - <DeleteBtn onClick={() => this.deleteCoachPractices(practice.id)}/>
                                        </li>
                                    ))}

                                    </ul>
                                </div>
                            </div>     
                        // If not toggled to true, hide the form
                            :null
                        }
                        {/*  --------------------------------------------------- */}

                        {/* Show teams div */}
                        { this.state.showTeam ? 
                            <div className="coachDataDiv col-md-4 mx-auto homepage">
                            {/* If the teams array is empty.. */}
                            { this.state.teams === null
                                ?
                                <div className="col-md-12 text-center">
                                    <span className="data-header">You currently are not assigned a team</span>
                                </div>
                                // Else
                                :
                                    <div className="row text-center">
                                        <div className="col-md-12">
                                                <span className="data-header">Team Name</span>
                                            </div>
                                    

                                            <ul className="coachDataId" key={this.state.teams.id}>
                                                    <div className="col-md-4 coachListItem">
                                                        <li className="dateTime">Id: {this.state.teams.id}</li>
                                                    </div>
                                                    <div className="col-md-8 coachListItem">
                                                        <li className="dateTime">{this.state.teams.teamName}</li>
                                                    </div> 
                                                    <hr className="line"></hr>
                                            </ul>
                                    </div>
                                // End conditional
                                }
                            </div>
                            // If not toggled to true, hide the form
                            :null
                        }

                         {/*  --------------------------------------------------- */}

                        {/* Show schedule div */}
                        { this.state.showSchedule ? 
                            <div className="coachDataDiv col-md-12 mx-auto homepage">

                                {/* If the teams array is empty.. */}
                                {this.state.teams === null 
                                    ?
                                <div className="col-md-12 text-center">
                                    <span className="data-header">There are no scehdules to view at this time</span>
                                </div>
                                // Else
                                :
                                <div className="row text-center">
                                    <div className="col-md-12 schedule-header">
                                        <div className="col-md-3">
                                            <span className="data-header">Date</span>
                                        </div>
                                        <div className="col-md-3">
                                            <span className="data-header">Time</span>
                                        </div>
                                        <div className="col-md-3">
                                            <span className="data-header">Location</span>
                                        </div>
                                        <div className="col-md-3">
                                            <span className="data-header">Opponent</span>
                                        </div>
                                    </div>
                                 
                                    {this.state.schedules.map(games => (
                                            <ul className="coachDataId" key={games.id}>
                                                    <div className="col-md-3 coachListItem">
                                                            <li className="dateTime">{moment(games.date, "YYYY-MM-DDTHH:mm:ss.SSS").format("MM/DD/YY")}</li>
                                                    </div>
                                                    <div className="col-md-2 coachListItem">
                                                            <li className="dateTime">{moment(games.time, "HH:mm:ss").format("hh:MM p")}</li>
                                                    </div>
                                                    <div className="col-md-3 coachListItem">
                                                            <li className="dateTime">{games.location}</li>
                                                    </div>
                                                    <div className="col-md-3 coachListItem">
                                                            <li className="dateTime">{games.opponent}</li>
                                                    </div> 
                                                    <hr className="line"></hr>
                                            </ul>
                                    ))}
                                </div>
                                // End conditional
                                }
                            </div>
                        // If not toggled to true, hide the form
                            :null
                        }

                    {/* End col-md-6 */}
                    </div>

                    <div className="col-md-6 form">
                        <div className="landing-bg">
                        {/*  */}
                        </div>
                    </div>
                {/* End row */}
                </div>
                <Footer/>
            {/* End container */}
            </div>
        );
    }
};

// ----------------------------------------------------------------------------------- //
// Setting propTypes
CoachPortal.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    createPracticePost: PropTypes.func.isRequired,
    getPractice: PropTypes.func.isRequired,
    deletePractice: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

// Exporting the page, and connecting the props with redux
export default connect(mapStateToProps, { addFlashMessage, createPracticePost, getPractice, deletePractice })(CoachPortal);