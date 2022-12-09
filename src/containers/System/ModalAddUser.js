import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class UserAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phoneNumber: '',
            lastName: '',
            firstName: '',
            address: '',
            password: '',
            gender: 0,
            roleId: 0,
            rePassword: '',
            emailErr: '',
            phoneNumberErr: '',
            lastNameErr: '',
            firstNameErr: '',
            addressErr: '',
            passwordErr: '',
            rePasswordErr: '',
            genderErr: '',
            roleIdErr: '',
            showPassword: false,
            showRepassword: false,
        };
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleModal();
    };

    handleOnchangeInput = (value, type) => {
        this.setState({
            ...this.state,
            [type]: value,
            [type + 'Err']: '',
        });
    };

    handleCheckEmail = (email) => {
        let isEmail = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );

        if (isEmail) {
            this.setState({
                emailErr: '',
            });
        } else {
            this.setState({
                emailErr: 'This is not a email',
            });
        }
        return isEmail;
    };

    handleCheckPhoneNumber = (phoneNumber) => {
        let isPhoneNumber = phoneNumber.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);

        if (isPhoneNumber) {
            this.setState({
                phoneNumberErr: '',
            });
        } else {
            this.setState({
                phoneNumberErr: 'The phone number must have 10 number or more',
            });
        }
        return isPhoneNumber;
    };

    isEmpty = (value, type) => {
        if (value) {
            this.setState({
                [type + 'Err']: '',
            });
            return true;
        } else {
            this.setState({
                [type + 'Err']: `Please enter your ${String(type).toLocaleLowerCase()}`,
            });
            return false;
        }
    };

    handleCheckPassword = (password) => {
        let isPassword = password.match(/^(?=.{5,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])/);
        if (isPassword) {
            this.setState({
                passwordErr: '',
            });
        } else {
            this.setState({
                passwordErr: 'the password is not validate',
            });
        }
        return isPassword;
    };

    handleCheckRePassword = (password, rePassword) => {
        // console.log(password, rePassword);
        if (password == rePassword) {
            this.setState({
                rePasswordErr: '',
            });
            return true;
        } else {
            this.setState({
                rePasswordErr: 'the re-password is not correct!',
            });
            return false;
        }
    };

    handleSubmit = async () => {
        let allValidata = true;

        this.isEmpty(this.state.email, 'email') && this.handleCheckEmail(this.state.email);
        this.isEmpty(this.state.phoneNumber, 'phoneNumber') && this.handleCheckPhoneNumber(this.state.phoneNumber);
        this.isEmpty(this.state.address, 'address');
        this.isEmpty(this.state.lastName, 'lastName');
        this.isEmpty(this.state.firstName, 'firstName');
        this.isEmpty(this.state.password, 'password') && this.handleCheckPassword(this.state.password);
        this.handleCheckRePassword(this.state.password, this.state.rePassword);

        if (
            !this.state.emailErr &&
            !this.state.phoneNumberErr &&
            !this.state.lastNameErr &&
            !this.state.firstNameErr &&
            !this.state.addressErr &&
            !this.state.passwordErr &&
            !this.state.rePasswordErr
        ) {
            console.log('submit');

            let response = await this.props.createNewUser({
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                address: this.state.address,
                password: this.state.password,
                gender: this.state.gender,
                roleId: this.state.roleId,
            });

            if (response && response.errCode && response.errCode === 2) {
                this.setState({
                    emailErr: response.message,
                });
            } else {
                this.toggle();
            }
        }
    };

    render() {
        // console.log(this.state);
        return (
            <div className="modal-create-containter">
                <Button
                    color="danger"
                    onClick={() => {
                        this.toggle();
                    }}
                    className="px-2"
                >
                    {/* {this.props.buttonLabel} */}
                    Add new user
                    <i className="fas fa-plus mx-2"></i>
                </Button>
                <Modal size="lg" isOpen={this.props.isOpen} toggle={this.toggle} className="modal-create-user">
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <form>
                            <div class="form-row">
                                <div className="row">
                                    <div class="form-group mt-4 col-sm-6">
                                        <label for="inputEmail4">Email</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="inputEmail4"
                                            placeholder="Email"
                                            name="enter the email"
                                            onChange={(e) => this.handleOnchangeInput(e.target.value, 'email')}
                                        />
                                        <small className="text-danger">{this.state.emailErr}</small>
                                    </div>
                                    <div class="form-group mt-4 col-sm-6">
                                        <label for="">Phone Number</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id=""
                                            name="phoneNumber"
                                            placeholder="Enter your phone number"
                                            onChange={(e) => this.handleOnchangeInput(e.target.value, 'phoneNumber')}
                                        />
                                        <small className="text-danger">{this.state.phoneNumberErr}</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div class="form-group mt-4 col-sm-6">
                                        <label for="">Last Name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id=""
                                            name="lastName"
                                            placeholder="Enter your last name"
                                            onChange={(e) => this.handleOnchangeInput(e.target.value, 'lastName')}
                                        />
                                        <small className="text-danger">{this.state.lastNameErr}</small>
                                    </div>
                                    <div class="form-group mt-4 col">
                                        <label for="">First name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id=""
                                            name="firstName"
                                            placeholder="Enter your first name"
                                            onChange={(e) => this.handleOnchangeInput(e.target.value, 'firstName')}
                                        />
                                        <small className="text-danger">{this.state.firstNameErr}</small>
                                    </div>
                                </div>

                                <div class="form-group my-4">
                                    <label for="inputAddress">Address</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="inputAddress"
                                        placeholder="Enter your address"
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'address')}
                                    />
                                    <small className="text-danger">{this.state.addressErr}</small>
                                </div>
                                <div class="form-group my-4 modal-password">
                                    <label for="inputPassword4">Password</label>
                                    <input
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        class="form-control"
                                        id="inputPassword4"
                                        placeholder="Password"
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'password')}
                                    />
                                    <i
                                        class="fas fa-eye"
                                        onClick={() => {
                                            this.setState({
                                                showPassword: !this.state.showPassword,
                                            });
                                        }}
                                    ></i>

                                    <small className="text-danger">{this.state.passwordErr}</small>
                                </div>
                                <div class="form-group my-4 modal-password">
                                    <label for="inputPassword4">Retype The Password</label>
                                    <input
                                        type={this.state.showRepassword ? 'text' : 'password'}
                                        class="form-control"
                                        id="inputPassword4"
                                        placeholder="Re-password"
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'rePassword')}
                                    />
                                    <i
                                        class="fas fa-eye"
                                        onClick={() => {
                                            this.setState({
                                                showRepassword: !this.state.showRepassword,
                                            });
                                        }}
                                    ></i>

                                    <small className="text-danger">{this.state.rePasswordErr}</small>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group my-4 col-md-4 col-4">
                                    <label for="inputState">Gender</label>
                                    <select
                                        id="inputState"
                                        class="form-control"
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'gender')}
                                    >
                                        <option selected value={0}>
                                            Male
                                        </option>
                                        <option value={1}>Female</option>
                                    </select>
                                </div>
                                <div class="form-group my-4 col-md-4 col-4">
                                    <label for="inputState">Your position</label>
                                    <select
                                        id="inputState"
                                        class="form-control"
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'roleId')}
                                    >
                                        <option selected value={0}>
                                            patient
                                        </option>
                                        <option value={1}>Doctor</option>
                                        <option value={2}>Admin</option>
                                    </select>
                                </div>
                            </div>
                        </form>{' '}
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary px-2" onClick={() => this.handleSubmit()}>
                            Submit
                        </Button>{' '}
                        <Button color="secondary px-2" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddUser);
