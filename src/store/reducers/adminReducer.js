import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    role: [],
    position: [],
    isloadingGender: false,
    createUserResponse: {},
    users: [],
    deleteResponse: {},
    updateResponse: {},
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER:
            console.log('fetch FETCH_GENDER ok!', action);

            return {
                ...state,
                isloadingGender: true,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('fetch FETCH_GENDER_SUCCESS ok!', action);

            return {
                ...state,
                gender: action.data.gender.errCode === 0 ? action.data.gender.data : [],
                role: action.data.role.errCode === 0 ? action.data.role.data : [],
                position: action.data.role.errCode === 0 ? action.data.position.data : [],

                isloadingGender: false,
            };
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('fetch FETCH_GENDER_FAIL ok!', action);

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
            };
        case actionTypes.FETCH_CREATE_USER_SUCCESS:
            // console.log('fetch FETCH_CREATE_USER_SUCCESS ok!', action);
            return {
                ...state,
                createUserResponse: action.data,
            };
        case actionTypes.FETCH_CREATE_USER_FAIL:
            // console.log('fetch FETCH_CREATE_USER_FAIL ok!', action);

            return {
                ...state,
                createUserResponse: action.data,
            };

        /** GET ALL USER
         *
         *  */

        case actionTypes.FETCH_GET_ALL_USER:
            // console.log('fetch FETCH_GET_ALL_USER ok!', action);

            return {
                ...state,
            };
        case actionTypes.FETCH_GET_ALL_USER_SUCCESS:
            // console.log('fetch FETCH_GET_ALL_USER ok!', action);
            return {
                ...state,
                users: action.data.userData,
            };
        case actionTypes.FETCH_GET_ALL_USER_FAIL:
            // console.log('fetch FETCH_CREATE_USER_FAIL ok!', action);

            return {
                ...state,
            };

        /**
         * DELETE USE
         *
         */

        case actionTypes.DETELE_USER:
            // console.log('fetch FETCH_CREATE_USER ok!', action);

            return {
                ...state,
            };
        case actionTypes.DETELE_USER_SUCCESS:
            // console.log('fetch FETCH_CREATE_USER_SUCCESS ok!', action);
            return {
                ...state,
                deleteResponse: action.data,
            };
        case actionTypes.DETELE_USER_FAIL:
            // console.log('fetch FETCH_CREATE_USER_FAIL ok!', action);

            return {
                ...state,
            };

        /**
         * UPDATE USER
         */

        case actionTypes.UPDATE_USER:
            console.log('fetch UPDATE_USER ok!', action);

            return {
                ...state,
            };
        case actionTypes.UPDATE_USER_SUCCESS:
            console.log('fetch UPDATE_USER_SUCCESS ok!', action);
            return {
                ...state,
                updateResponse: action.data,
            };
        case actionTypes.UPDATE_USER_FAIL:
            console.log('fetch UPDATE_USER_FAIL ok!', action);

            return {
                ...state,
                updateResponse: action.data,
            };

        default:
            return state;
    }
};

export default adminReducer;
