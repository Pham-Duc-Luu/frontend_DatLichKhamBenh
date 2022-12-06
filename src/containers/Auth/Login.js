import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { handleLoginUser } from '../../services/userService';

import * as actions from '../../store/actions';
// import { KeyCodeUtils, LanguageUtils } from '../utils';

// import userIcon from '../../src/assets/images/user.svg';
// import passIcon from '../../src/assets/images/pass.svg';
import './Login.scss';
import { userLoginSuccess } from '../../store/actions';
// import { FormattedMessage } from 'react-intl';

// import adminService from '../services/adminService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            hidden: true,
            errCode: 0,
            message: 'ASD',
        };
        // this.btnLogin = React.createRef();
    }

    handleLogin = async (email, password) => {
        // console.log(email, password);
        try {
            let user = await handleLoginUser(email, password);
            console.log(user);

            if (user.errCode === 0) {
                console.log(user.data);
                this.props.userLoginSuccess(user.data);
            }

            this.setState({ errCode: user.errCode, message: user.message });
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    console.log(e.response.data);
                }
            }
            this.setState({ errCode: 1, message: '' });
        }
    };

    render() {
        return (
            <div className="login-background">
                <div className="login-container col-12 col-sm-4">
                    <div className="login-title text-center">Login</div>
                    <div className="login-Username form-group">
                        <label>Username</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your username"
                            value={this.state.userName}
                            onChange={(e) => {
                                this.setState({ userName: e.target.value });
                                // console.log(this.state.userName);
                            }}
                        />
                        <span className="err-message" style={{ color: 'red', fontSize: '10px', marginLeft: '10px' }}>
                            {this.state.errCode === 2 ? this.state.message : ''}
                        </span>
                    </div>
                    <div className="login-Username form-group">
                        <label>Password</label>
                        <div className="login-username-box">
                            <input
                                type={this.state.hidden ? 'password' : 'text'}
                                className="form-control"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={(e) => {
                                    this.setState({ password: e.target.value });
                                    // console.log(this.state.password);
                                }}
                            />
                            <i
                                class="fas fa-eye-slash"
                                onClick={() => {
                                    this.setState({ hidden: !this.state.hidden });
                                }}
                            ></i>
                        </div>
                        <span className="err-message" style={{ color: 'red', fontSize: '10px', marginLeft: '10px' }}>
                            {this.state.errCode === 3 ? this.state.message : ''}
                        </span>
                    </div>
                    <div className="col-12 login-btn">
                        <button
                            onClick={() => {
                                this.handleLogin(this.state.userName, this.state.password);
                            }}
                        >
                            Login
                        </button>
                    </div>
                    <div className="col-12 login-forgot">
                        <span>Forgot your password ?</span>
                    </div>
                    <div className="col-12 login-other text-center">
                        <span>Or login with</span>
                    </div>
                    <div className="col-12 login-other-icon">
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-google"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
