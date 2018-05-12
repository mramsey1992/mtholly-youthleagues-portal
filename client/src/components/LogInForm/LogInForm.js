// Imports
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loginRequest } from "../../actions/login";
import validateInput from "../../Shared/Validations/login";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./loginform.css";


// Creating the Log in form component
class LogInForm extends Component {
    constructor(props) {
        super(props);
        // Setting state
        this.state = {
            email: "",
            password: "",
            errors: {},
            isLoading: false
        };
        // Binding methods to 'this'
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Capturing form input
    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    
    // Validation check
    isValid() {
        const { errors, isValid } = validateInput(this.state);
        // If state is not valid, show errors
        if(!isValid) {
            this.setState({ errors })
        }
        return isValid;
    }

    // On form submit
    handleFormSubmit = event => {
        // Preventing default form behavior
        event.preventDefault();

        if(this.isValid()) {
            // When the form is submitted, reset any stored errors and disable the submit button during load time
            // To prevent multiple events
            this.setState({ errors: {}, isLoading: true });
            this.props.loginRequest(this.state).then(
                (res) => this.context.router.history.push("/parent-portal"),
                (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
            )
        }
    };

    // Render the form
    render() {
        // Setting the errors variable
        const { isLoading } = this.state;
        // Acessing authenticated property
        const { isAuthenticated } = this.props.auth;

        // Continue button
        const continueButton = (
            <div className="continue">
                <button className="btn btn-primary form-btn mx-auto" disabled={isLoading} onClick={this.handleFormSubmit}>
                    <Link to="/parent-portal" className="links">Continue to Parent Portal</Link>
                </button>

            </div>
        )
        // Log in form
        const loginFormArea = (
            <form className="form text-center">
                {/* "ClassNames NPM Package for conditional error handling styles" */}
                    <div className="form-group">
                        <label htmlFor="email" className="control-label">Email</label>
                            <input
                                value={this.state.email}
                                name="email"
                                onChange={this.handleInputChange}
                                type="email"
                                placeholder="Email"
                                id="email"
                            />
                            {/* Error Handling */} 
                    </div>
                    {/* "ClassNames NPM Package for conditional error handling styles" */}
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password</label>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.handleInputChange}
                                type="password"
                                placeholder="Password"
                            />
                    </div>
                    <button className="btn btn-primary form-btn mx-auto" disabled={isLoading} onClick={this.handleFormSubmit}>Submit</button>

                    <h5>Need an account?</h5>
                    <span>Click <Link to="/signup">here</Link></span>
                    
                </form>
        )

        // Render the form or button
        return (
            // Main page
            <div className="form-group text-center">
                <h3>Parent Access Portal</h3>
                
                {/* If authenticated, either render the log-in form or the continue button */}
                <div>
                    { isAuthenticated ? continueButton : loginFormArea }
                </div>

                <h4>Administrative Access Portal</h4>
                <span>Log In <Link to="/coacheslogin">here</Link></span>
            </div>
        )
    }
}
// Setting propTypes
LogInForm.propTypes = {
    auth: PropTypes.object.isRequired,
    loginRequest: PropTypes.func.isRequired
}

LogInForm.contextTypes = {
    router: PropTypes.object.isRequired
}

// Needing to access redux store
function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

// Exporting the form component and connecting it with redux
export default connect(mapStateToProps, { loginRequest })(LogInForm);


