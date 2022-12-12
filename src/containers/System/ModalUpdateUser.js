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
            gender: 0,
            roleId: 0,
            phoneNumberErr: '',
            lastNameErr: '',
            firstNameErr: '',
            addressErr: '',
        };
    }

    componentDidMount() {
        console.log(this.props.userInfo);

        this.setState({
            email: this.props.userInfo.email,
            phoneNumber: this.props.userInfo.phoneNumber,
            lastName: this.props.userInfo.lastName,
            firstName: this.props.userInfo.firstName,
            address: this.props.userInfo.address,
            gender: this.props.userInfo.gender,
            roleId: this.props.userInfo.roleId,
        });
    }

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

    handleSubmit = async () => {
        this.isEmpty(this.state.phoneNumber, 'phoneNumber') && this.handleCheckPhoneNumber(this.state.phoneNumber);
        this.isEmpty(this.state.address, 'address');
        this.isEmpty(this.state.lastName, 'lastName');
        this.isEmpty(this.state.firstName, 'firstName');

        if (
            this.state.phoneNumberErr !== '' &&
            this.state.lastNameErr !== '' &&
            this.state.firstNameErr !== '' &&
            this.state.addressErr !== ''
        ) {
            console.log('submit');

            let response = await this.props.updateUser({
                ...this.props.userInfo,
                phoneNumber: this.state.phoneNumber,
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.roleId,
            });

            console.log(response);

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
        return (
            <div className="modal-create-containter">
                {/* <Button
                    color="danger"
                    onClick={() => {
                        this.toggle();
                    }}
                    className="px-2"
                >
                    {this.props.buttonLabel}
                    Add new user
                    <i className="fas fa-plus mx-2"></i>
                </Button> */}
                <Modal size="lg" isOpen={this.props.isOpen} toggle={this.toggle} className="modal-create-user">
                    <ModalHeader className="bg-warning" toggle={this.toggle}>
                        Update user's infomations
                    </ModalHeader>
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
                                            value={this.state.email}
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
                                            value={this.state.phoneNumber}
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
                                            value={this.state.lastName}
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
                                            value={this.state.firstName}
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
                                        value={this.state.address}
                                        placeholder="Enter your address"
                                        onChange={(e) => this.handleOnchangeInput(e.target.value, 'address')}
                                    />
                                    <small className="text-danger">{this.state.addressErr}</small>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group my-4 col-md-4 col-4">
                                    <label for="inputState">Gender</label>
                                    <select
                                        id="inputState"
                                        class="form-control"
                                        value={this.state.gender}
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
                                        value={this.state.roleId}
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
                            Update
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
