// Imports
import React, { Component } from "react";

// Component
import FlashMessageList from "../../components/FlashMessageList/FlashMessageList";
import MainHeader from "../../components/MainHeader";
import LogInForm from "../../components/LogInForm/LogInForm";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

// CSS
import "./landing.css";

// ----------------------------------------------------------------------------------- //
// Creating the Homepage
class Landing extends Component {
    // Render the page
    render() {
        return (
            <div className="container-fluid">
                <Nav/>
                    <div className="row">
                        <div className="col-md-6 form homepage">
                            <MainHeader/>
                            <FlashMessageList/>
                            <LogInForm
                                onSubmit={() => this.handleFormSubmit()}
                                onChange={() => this.handleInputChange()}
                                user={() => this.state.user}
                            />
                        </div>

                        <div className="col-md-6 home-bg homepage">
                            <div className="landing-bg">
                            </div>
                        </div>
                    </div>
                <Footer/>
            </div>
        )
    }
};

// Export the page
export default Landing;