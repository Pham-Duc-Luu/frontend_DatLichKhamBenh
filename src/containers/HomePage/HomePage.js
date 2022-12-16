import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Banner from './Banner/Banner';

import Specialist from './Carousel/Specialist';
import Place from './Carousel/Place';
import Doctor from './Carousel/Doctor';
import YouTubeAdd from './YoutubeAdd/YoutubeAdd';
import Footer from './Footer/Footer';

class HomePage extends Component {
    render() {
        return (
            <div className="homePage">
                <HomeHeader />
                <Banner />
                <Specialist />
                <Place />
                <Doctor />
                <YouTubeAdd />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
