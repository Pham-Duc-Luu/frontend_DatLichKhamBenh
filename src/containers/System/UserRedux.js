import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class UserRedux extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            isloadingGender: false,
            imgURL: '',
            isOpen: false,

            createUserResponse: {},

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
            position: '',
        };
    }

    async componentDidMount() {
        this.props.fetchGender();
        this.setState({
            isloadingGender: this.props.isloadingGender,
        });
        // console.log(this.state);
    }

    handleSetInput(value, type) {
        this.setState({
            [type]: value,
        });
    }

    handleValidation = (e) => {
        let { email, password, firstName, lastName, address, phoneNumber, gender, role, position, imgURL } = this.state;

        let arr = [
            'email',
            'password',
            'firstName',
            'lastName',
            'address',
            'phoneNumber',
            'gender',
            'role',
            'position',
        ];

        let validate = true;

        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                alert(`please enter ${arr[i]}`);
                validate = false;
                break;
            }
        }

        if (validate) {
            this.props.fetchCreateUser({
                email,
                password,
                firstName,
                lastName,
                address,
                phoneNumber,
                gender,
                roleId: role,
                positionId: position,
                image: imgURL,
            });
            // console.log('validate');
        }
    };

    componentDidUpdate(prevProps) {
        if (this.props.genderArr !== prevProps.genderArr) {
            this.setState({
                genderArr: this.props.genderArr,
                gender: this.props.genderArr[0].key,
            });
        }

        if (this.props.roleArr !== prevProps.roleArr) {
            this.setState({
                roleArr: this.props.roleArr,
                role: this.props.roleArr[0].key,
            });
        }

        if (this.props.positionArr !== prevProps.positionArr) {
            this.setState({
                positionArr: this.props.positionArr,
                position: this.props.positionArr[0].key,
            });
        }

        if (this.props.isloadingGender !== prevProps.isloadingGender) {
            this.setState({
                isloadingGender: this.props.isloadingGender,
            });
        }

        if (this.props.createUserResponse !== prevProps.createUserResponse) {
            // alert(this.props.createUserResponse);
            if (this.props.createUserResponse.errCode === 2) {
                alert(this.props.createUserResponse.message);
            }
            if (this.props.createUserResponse.errCode === 0) {
                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phoneNumber: '',
                    gender: '',
                    role: '',
                    position: '',
                });
            }
        }
    }

    render() {
        // console.log(this.props);
        // console.log(this.state);
        return (
            <div className="use-redux">
                <div className="use-redux-container">
                    <div className="title">
                        {this.state.isloadingGender ? 'is loading' : 'Quản lí người dùng với redux'}
                    </div>
                    <div className="container my-4">
                        <form>
                            <div class="row">
                                <div class="form-group col-md-6 my-2">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.email" />
                                    </label>
                                    <input
                                        onChange={(e) => this.handleSetInput(e.target.value, 'email')}
                                        type="email"
                                        value={this.state.email}
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group col-md-6 my-2">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.password" />
                                    </label>
                                    <input
                                        onChange={(e) => this.handleSetInput(e.target.value, 'password')}
                                        type="text"
                                        value={this.state.password}
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6 my-2">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.first-name" />
                                    </label>
                                    <input
                                        onChange={(e) => this.handleSetInput(e.target.value, 'firstName')}
                                        type="text"
                                        value={this.state.firstName}
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group col-md-6 my-2">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.last-name" />
                                    </label>
                                    <input
                                        onChange={(e) => this.handleSetInput(e.target.value, 'lastName')}
                                        type="text"
                                        value={this.state.lastName}
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6 my-2">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.address" />
                                    </label>
                                    <input
                                        onChange={(e) => this.handleSetInput(e.target.value, 'address')}
                                        type="text"
                                        value={this.state.address}
                                        class="form-control"
                                    />
                                </div>
                                <div class="form-group col-md-6 my-2">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.phone-number" />
                                    </label>
                                    <input
                                        onChange={(e) => this.handleSetInput(e.target.value, 'phoneNumber')}
                                        type="text"
                                        value={this.state.phoneNumber}
                                        class="form-control"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-3">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.gender" />
                                    </label>
                                    <select
                                        class="form-control"
                                        onChange={(e) => this.handleSetInput(e.target.value, 'gender')}
                                    >
                                        value={this.state.gender}
                                        {this.state.genderArr !== [] ? (
                                            this.state.genderArr.map((value, index) => (
                                                <option key={index}>
                                                    {this.props.language === 'en' ? value.valueEn : value.valueVi}
                                                </option>
                                            ))
                                        ) : (
                                            <option></option>
                                        )}
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.role" />
                                    </label>
                                    <select
                                        class="form-control"
                                        onChange={(e) => this.handleSetInput(e.target.value, 'role')}
                                    >
                                        value={this.state.role}
                                        {this.state.roleArr !== [] ? (
                                            this.state.roleArr.map((value, index) => (
                                                <option key={index}>
                                                    {this.props.language === 'en' ? value.valueEn : value.valueVi}
                                                </option>
                                            ))
                                        ) : (
                                            <option></option>
                                        )}
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label>
                                        <FormattedMessage id="menu.admin.crud-keyword.position" />
                                    </label>
                                    <select
                                        class="form-control"
                                        onChange={(e) => this.handleSetInput(e.target.value, 'position')}
                                    >
                                        value={this.state.position}
                                        {this.state.positionArr !== [] ? (
                                            this.state.positionArr.map((value, index) => (
                                                <option key={index}>
                                                    {this.props.language === 'en' ? value.valueEn : value.valueVi}
                                                </option>
                                            ))
                                        ) : (
                                            <option></option>
                                        )}
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label
                                        htmlFor="inputFileImg"
                                        type="button"
                                        className="upload bg- col-12 btn btn-outline-secondary"
                                    >
                                        <span>
                                            <FormattedMessage id="menu.admin.crud-keyword.image" />
                                        </span>
                                        <input
                                            type="file"
                                            id="inputFileImg"
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                if (e.target.files[0]) {
                                                    this.setState({
                                                        imgURL: URL.createObjectURL(e.target.files[0]),
                                                    });
                                                }
                                            }}
                                            accept=".jpg,.png"
                                        />
                                        <i class="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className=" img-preview"
                                        style={{
                                            height: '100px',
                                            // width: '100px',
                                            backgroundImage: `url(${this.state.imgURL})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center',
                                        }}
                                        onClick={() => {
                                            this.state.imgURL && this.setState({ isOpen: true });
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <button
                                class="btn btn-primary px-3 m-3"
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.handleValidation(e);
                                }}
                            >
                                Sign in
                            </button>
                        </form>
                    </div>

                    {this.state.isOpen && (
                        <Lightbox mainSrc={this.state.imgURL} onCloseRequest={() => this.setState({ isOpen: false })} />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isloadingGender: state.admin.isloadingGender,
        genderArr: state.admin.gender,
        roleArr: state.admin.role,
        positionArr: state.admin.position,
        language: state.app.language,
        createUserResponse: state.admin.createUserResponse,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGender: () => dispatch(actions.fetchGender()),
        fetchCreateUser: (data) => dispatch(actions.fetchCreateUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
