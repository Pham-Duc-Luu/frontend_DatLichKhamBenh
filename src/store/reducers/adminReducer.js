import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    role: [],
    position: [],
    isloadingGender: false,
    createUserResponse: {},
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER:
            // console.log('fetch FETCH_GENDER ok!', action);

            return {
                ...state,
                isloadingGender: true,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log('fetch FETCH_GENDER_SUCCESS ok!', action);
            return {
                ...state,
                gender: action.data.gender,
                role: action.data.role,
                position: action.data.position,

                isloadingGender: false,
            };
        case actionTypes.FETCH_GENDER_FAIL:
            // console.log('fetch FETCH_GENDER_FAIL ok!', action);

            return {
                ...state,
                isloadingGender: false,
            };

        /*
            CREATE NEW USER USE REDUX
            
        */

        case actionTypes.FETCH_CREATE_USER:
            // console.log('fetch FETCH_CREATE_USER ok!', action);

            return {
                ...state,
                isloadingGender: true,
            };
        case actionTypes.FETCH_CREATE_USER_SUCCESS:
            // console.log('fetch FETCH_CREATE_USER_SUCCESS ok!', action);
            return {
                ...state,
                createUserResponse: action.data,
                isloadingGender: false,
            };
        case actionTypes.FETCH_CREATE_USER_FAIL:
            // console.log('fetch FETCH_CREATE_USER_FAIL ok!', action);

            return {
                ...state,
                isloadingGender: false,
                createUserResponse: action.data,
            };

        default:
            return state;
    }
};

export default adminReducer;
