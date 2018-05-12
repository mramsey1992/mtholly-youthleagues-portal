// Imports
import React, { Component } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import FlashMessageList from "../../components/FlashMessageList/FlashMessageList";
import "../Landing/landing.css";
import AdminLogin from "../../components/AdminForm/AdminLogin";
import Nav from "../../components/Nav/Nav";


// Creating the Coach Page
class AdminLogInPage extends Component {
    // Render the page
    render() {
        return (
            <div className="container-fluid">
                <Nav/>
                <div className="row">
                    <div className="col-md-6 form">
                        <MainHeader/>
                        <FlashMessageList/>
                        <AdminLogin
                            onSubmit={() => this.handleFormSubmit()}
                            onChange={() => this.handleInputChange()}
                            user={() => this.state.user}
                        />
                    </div>

                    <div className="col-md-6 home-bg">
                        <div className="landing-bg">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

// Export the page
export default AdminLogInPage;