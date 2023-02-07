import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import AllUsersTable from './AllUsersTable';

import configEn from '../../../translations/en.json';
import configVi from '../../../translations/vi.json';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonUtils from '../../../utils/CommonUtils';

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
            isEdit: false,
            createUserResponse: {},

            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            role: '',
            position: '',
            image: '',
        };
    }

    async componentDidMount() {
        this.props.fetchGender();
        this.setState({
            isloadingGender: this.props.isloadingGender,
        });
        this.setState({
            createUserResponse: this.props.createUserResponse,
        });
    }

    handleSetInput(value, type) {
        this.setState({
            [type]: value,
        });
    }

    handleValidation = (e) => {
        let { email, password, firstName, lastName, address, phoneNumber, gender, role, position, image } = this.state;

        let arr = [
            {
                value: email,
                keyword: 'email',
            },
            {
                value: password,
                keyword: 'password',
            },
            {
                value: firstName,
                keyword: 'first-name',
            },
            {
                value: lastName,
                keyword: 'last-name',
            },
            {
                value: address,
                keyword: 'address',
            },
            {
                value: phoneNumber,
                keyword: 'phone-number',
            },
            {
                value: gender,
                keyword: 'gender',
            },
            {
                value: role,
                keyword: 'role',
            },
            {
                value: position,
                keyword: 'position',
            },
            {
                value: image,
                keyword: 'image',
            },
        ];

        let validate = true;

        for (let i = 0; i < arr.length; i++) {
            // if(this.state)
            if (this.state.isEdit && arr[i].keyword === 'password') continue;
            if (!arr[i].value) {
                this.notify(
                    `${this.props.language === 'en' ? 'Please enter ' : 'Làm ơn nhập '} ${
                        this.props.language === 'en'
                            ? configEn.menu.admin['crud-keyword'][arr[i].keyword]
                            : configVi.menu.admin['crud-keyword'][arr[i].keyword]
                    }`,
                );
                // alert(`please enter ${arr[i]}`);
                validate = false;
                break;
            }
        }

        return validate;

        // if (validate) {
        //     this.props.fetchCreateUser({
        //         email,
        //         password,
        //         firstName,
        //         lastName,
        //         address,
        //         phoneNumber,
        //         gender,
        //         roleId: role,
        //         positionId: position,
        //         image: image,
        //     });
        // }
    };

    handleCreateUser() {
        let validate = this.handleValidation();
        if (validate) {
            this.props.fetchCreateUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.image,
            });
        }
    }

    handleUpdateUser() {
        if (this.handleValidation()) {
            this.props.fetchUpdateUser({
                id: this.state.id.toString(),
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.imgURL.toString('base64'),
            });
            this.setState({
                isEdit: false,
            });
        }
    }

    handleGetUserInfo = (data) => {
        let imageBase64 = '';
        if (data.image) {
            imageBase64 = new Buffer(data.image, 'base64').toString('binary');
        }
        this.setState({
            id: data.id,
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            role: data.roleId,
            position: data.positionId,
            image: data.image,
            imgURL: imageBase64,
            isEdit: true,
        });
    };

    async handleOnChangeImage(e) {
        if (e.target.files[0]) {
            let imgBase64 = await CommonUtils.convertBase64(e.target.files[0]);
            this.setState({
                imgURL: URL.createObjectURL(e.target.files[0]),
                image: imgBase64,
            });
        }
        // let file = e.target.files[0];
        // let base64 = await CommonUtils.convertBase64(file);
    }

    notify(message) {
        toast.success(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.genderArr !== prevProps.genderArr) {
            this.setState({
                genderArr: this.props.genderArr,
                gender: this.props.genderArr[0] ? this.props.genderArr[0].keyMap : '',
            });
        }

        if (this.props.roleArr !== prevProps.roleArr) {
            this.setState({
                roleArr: this.props.roleArr,
                role: this.props.roleArr[0] ? this.props.roleArr[0].keyMap : '',
            });
        }

        if (this.props.positionArr !== prevProps.positionArr) {
            this.setState({
                positionArr: this.props.positionArr,
                position: this.props.positionArr[0] ? this.props.positionArr[0].keyMap : '',
            });
        }

        if (this.props.isloadingGender !== prevProps.isloadingGender) {
            this.setState({
                isloadingGender: this.props.isloadingGender,
            });
        }

        if (this.props.createUserResponse !== prevProps.createUserResponse) {
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
                    image: '',
                    gender: this.props.genderArr[0] ? this.props.genderArr[0].keyMap : '',
                    role: this.props.roleArr[0] ? this.props.roleArr[0].keyMap : '',
                    position: this.props.positionArr[0] ? this.props.positionArr[0].keyMap : '',
                    imgURL: '',
                });
                this.notify(this.props.language === 'en' ? 'CREATE USER SUCCESSFUL!' : 'TẠO NGƯỜI DÙNG THÀNH CÔNG!');
                this.props.fetchGetAllUser();
            }
        }

        if (this.props.updateResponse !== prevProps.updateResponse) {
            if (this.props.updateResponse.errCode === 2) {
                alert(this.props.updateResponse.message);
            }
            if (this.props.updateResponse.errCode === 0) {
                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phoneNumber: '',
                    image: '',
                    gender: this.props.genderArr[0] ? this.props.genderArr[0].keyMap : '',
                    role: this.props.roleArr[0] ? this.props.roleArr[0].keyMap : '',
                    position: this.props.positionArr[0] ? this.props.positionArr[0].keyMap : '',
                    imgURL: '',
                });
                this.notify(this.props.language === 'en' ? 'UPDATE USER SUCCESSFUL!' : 'SỬA NGƯỜI DÙNG THÀNH CÔNG!');
                this.props.fetchGetAllUser();
            }
        }
    }

    render() {
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
                                        disabled={this.state.isEdit}
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
                                        value={this.state.gender}
                                    >
                                        {this.state.genderArr !== [] ? (
                                            this.state.genderArr.map((value, index) => (
                                                <option
                                                    key={index}
                                                    value={value.keyMap}
                                                    selected={value.keyMap === this.state.gender}
                                                >
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
                                        // value={this.state.role}
                                    >
                                        {this.state.roleArr !== [] ? (
                                            this.state.roleArr.map((value, index) => (
                                                <option
                                                    key={index}
                                                    value={value.keyMap}
                                                    selected={value.keyMap === this.state.role}
                                                >
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
                                        value={this.state.position}
                                    >
                                        {this.state.positionArr !== [] ? (
                                            this.state.positionArr.map((value, index) => (
                                                <option
                                                    key={index}
                                                    value={value.keyMap}
                                                    selected={value.keyMap === this.state.position}
                                                >
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
                                            onChange={(e) => this.handleOnChangeImage(e)}
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
                            {this.state.isEdit ? (
                                <button
                                    class="btn btn-warning px-3 m-3"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.handleUpdateUser(e);
                                    }}
                                >
                                    <FormattedMessage id="common.update" />
                                </button>
                            ) : (
                                <button
                                    class="btn btn-primary px-3 m-3"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.handleCreateUser(e);
                                    }}
                                >
                                    <FormattedMessage id="common.save" />
                                </button>
                            )}
                        </form>
                    </div>

                    {this.state.isOpen && (
                        <Lightbox mainSrc={this.state.imgURL} onCloseRequest={() => this.setState({ isOpen: false })} />
                    )}
                </div>
                <AllUsersTable handleUpdateUser={this.handleGetUserInfo} />
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
        updateResponse: state.admin.updateResponse,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGender: () => dispatch(actions.fetchGender()),
        fetchCreateUser: (data) => dispatch(actions.fetchCreateUser(data)),
        fetchGetAllUser: () => dispatch(actions.fetchGetAllUser()),
        fetchUpdateUser: (data) => dispatch(actions.fetchUpdateUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
