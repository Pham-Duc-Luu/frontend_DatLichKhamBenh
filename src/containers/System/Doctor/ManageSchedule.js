import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

class ManageSchedule extends Component {
    render() {
        return <React.Fragment>Manage schedule</React.Fragment>;
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
