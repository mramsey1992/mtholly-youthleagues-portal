// Imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PayPal from "../../PayPal/PayPal";
import moment from "moment";

// Component
import Nav from "../../components/Nav";
import Footer from "../../components/Footer/Footer";
import FlashMessageList from "../../components/FlashMessageList/FlashMessageList";
import MainHeader from "../../components/MainHeader";
import CreateChildForm from "../../components/CreateChildForm";
import { List, DeleteBtn } from "../../components/List";

// Actions
import { childSignUp } from "../../actions/registerChild";
import { addFlashMessage } from "../../actions/flashMessages";
import API  from "../../actions/API";

// CSS
import "./ParentPortal.css";

// ----------------------------------------------------------------------------------- //
// Creating the Parent Page
class ParentPortal extends Component {
    constructor() {
        super();
        this.state = {
            showChildForm: false,
            showChildTeam: false,
            kids: [],
            sports: [],
            kidInfo: [],
            games: [],
            practices: [],
            errors: ""
        }

    }
    
// ---------------------------------------------------------------------------------------------------------
    componentDidMount() {
        this.getChildren(this.props.auth.user.id);
        this.getSports();
        this.getGame();
    }

    displayKidInfo = (kidId) => {
        API.retrieveKidInfo(kidId)
           .then(res => {
               if(res.data.length === 3) {
                    const [ kid, gamesInfo, practiceInfo ] = res.data;
                    this.setState({kidInfo: kid, games: gamesInfo, practices:practiceInfo, showChildTeam: !this.state.showChildTeam, showChildForm: false})
               } else {
                    const [ kid ] = res.data;
                    this.setState({kidInfo: kid, showChildTeam: !this.state.showChildTeam, showChildForm: false})
               }
               
           })
           .catch(err => console.log(err));
    }

    getChildren = (parentId) => {
        API.retrieveChildren(parentId)
          .then(res => this.setState({ kids: res.data }))
          .catch(err => console.log(err));
    }

    removeChild = (kidId) => {
        API.removeChild(kidId)
            .then(res => this.getChildren(this.props.auth.user.id))
            .catch(err => console.log(err));
    }

    getSports = () => {
        API.getSports()
          .then(res => this.setState({ sports: res.data }))
          .catch(err => console.log(err));
      }
    
    getGame = (TeamId) => {
    API.getGame()
        .then(res => this.setState({ games: res.data }))
        .catch(err => console.log(err));
    }

    payForChild = (payInfo) => {
        API.childPaid(payInfo)
            .then(res => { 
                    this.props.addFlashMessage({
                        type: "Success",
                        text: "You have paid for your child!"
                    })
                this.getChildren(this.props.auth.user.id);
            })
            .catch(err => console.log(err));
    }

    // Toggle child form on click
    toggleChildForm () {
        this.setState({
            showChildForm: !this.state.showChildForm,
            showChildTeam: false
        });
    }

    // Render the page
    render() {
        const { childSignUp, addFlashMessage} = this.props; 

        return (
            <div className="container-fluid">
            <Nav/>
                <div className="row">
                    <div className="col-md-6 form">
                    <MainHeader />
                    <FlashMessageList />
                    <div className="text-center">
                        <h1 className="dashboard-title">Parent Dashboard</h1>
                    </div>
                    <hr className="line"></hr>
                    <div className="row">
                        <div className="col-md-8">
                            <p>All leagues cost $10. Click on the PayPal link to the right to log into your account and pay for each child.
                                PayPal will automatically choose the first 'Not Paid' child.
                            </p>
                        </div>
                        <div className="paypal col-md-3 ml-auto">
                            <button className="btn btn-primary register button-actions" onClick={() => this.toggleChildForm()}>Register Child</button>
                            <p className="paypal-text">Pay with PayPal</p>
                            <PayPal payForChild = {this.payForChild} parentId = {this.props.auth.user.id}/>
                        </div>
                    </div>
                    <div className="childList">
                        <h3>Registered Children</h3>
                         {this.state.kids.length ? (
                            <List>
                                {this.state.kids.map(kid => (
                                    <li className="list-group-item" key={kid.id}>
                                    <h3>
                                    <button className="btn btn-primary kidButton button-actions" onClick={() => this.displayKidInfo(kid.id)}  value={kid.id}>
                                        <h4><strong> {kid.first_name} {kid.last_name} - {kid.age} - {kid.Sport.name} - {kid.paidFor ? "Paid" : "Not Paid"}</strong></h4>
                                    </button>
                                    <DeleteBtn onClick={() => this.removeChild(kid.id)} />
                                    </h3>
                                  </li>
                                ))}
                            </List>
                        ) : (
                            <h3>No Children Registered</h3>
                        )}
                        </div>
                       
                        
                    </div>

                    <div className="col-md-6 form">
                        <div className="landing-bg">
                            {
                                this.state.showChildForm
                                    ? <CreateChildForm 
                                        childSignUp={childSignUp}
                                        addFlashMessage={addFlashMessage}
                                        userId={this.props.auth.user.id}
                                        sports={this.state.sports}
                                    />
                                    : null
                            }
                            {
                                this.state.showChildTeam
                                ? this.state.kidInfo.Team
                                  ?
                                  <div>
                                    <div className="child-info text-center">
                                        <h3><strong>Team Name: {this.state.kidInfo.Team.teamName}</strong></h3>
                                    </div>
                                    <div className="child-info text-center">
                                        <h3><strong>Practice Schedule: </strong></h3>
                                        {this.state.practices.length ? (
                                            <div>
                                            <h4><strong>Date - Time - Location</strong></h4>
                                            <List>
                                                {this.state.practices.map(practice => (
                                                    <li className="list-group-item" key={practice.id}>
                                                       <h4> {moment(practice.date, "YYYY-MM-DDTHH:mm:ss.SSS").format("MM/DD/YY")} - {moment(practice.time, "HH:mm:ss").format("hh:MM p")} - {practice.location}</h4>
                                                    </li>
                                                ))}
                                            </List>
                                            </div>
                                        ) : (
                                            <h4>No Practices Scheduled</h4>
                                        )}
                                    </div>
                                    <div className="child-info text-center">
                                        <h3><strong>Game Schedule:</strong></h3>
                                        {this.state.games.length ? (
                                            <div>
                                            <h4><strong>Date - Time - Location - Opponent</strong></h4>
                                            <List>
                                                {this.state.games.map(game => (
                                                    <li className="list-group-item" key={game.id}>
                                                       <h4> {moment(game.date, "YYYY-MM-DDTHH:mm:ss.SSS").format("MM/DD/YY")} - {moment(game.time, "HH:mm:ss").format("hh:MM p")} - {game.location} - {game.opponent}</h4>
                                                    </li>
                                                ))}
                                            </List>
                                            </div>
                                        ) : (
                                            <h4>No Games Scheduled</h4>
                                        )}
                                    </div>
                                  </div>
                                  : <div className="child-info text-center">
                                      <h3>Your child is currently not assigned to a team</h3>
                                    </div>
                                : null
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
};

// ----------------------------------------------------------------------------------- //
// Setting propTypes
ParentPortal.propTypes = {
    childSignUp: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
   
}


function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

// Exporting the page, and connecting the props with redux
export default connect(mapStateToProps, { childSignUp, addFlashMessage })(ParentPortal);
