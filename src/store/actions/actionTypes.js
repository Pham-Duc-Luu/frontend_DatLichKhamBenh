const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    // //admin
    FETCH_GENDER: 'FETCH_GENDER',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAIL: 'FETCH_GENDER_FAIL',

    // admin create user
    FETCH_CREATE_USER: 'FETCH_CREATE_USER',
    FETCH_CREATE_USER_SUCCESS: 'FETCH_CREATE_USER_SUCCESS',
    FETCH_CREATE_USER_FAIL: 'FETCH_CREATE_USER_FAIL',

    // admin get all user
    FETCH_GET_ALL_USER: 'FETCH_GET_ALL_USER',
    FETCH_GET_ALL_USER_SUCCESS: 'FETCH_GET_ALL_USER_SUCCESS',
    FETCH_GET_ALL_USER_FAIL: 'FETCH_GET_ALL_USER_FAIL',

    // admin delete user

    DETELE_USER: 'DETELE_USER',
    DETELE_USER_SUCCESS: 'DETELE_USER_SUCCESS',
    DETELE_USER_FAIL: 'DETELE_USER_FAIL',

    // update user

    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL: 'UPDATE_USER_FAIL',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',

    // GET TOP DOCTOR OVERWEEK

    GET_DOCTOR_TOP: 'GET_DOCTOR_TOP',
    GET_DOCTOR_TOP_SUCCESS: 'GET_DOCTOR_TOP_SUCCESS',
    GET_DOCTOR_TOP_FAIL: 'GET_DOCTOR_TOP_FAIL',

    // GET ALL DOCTOR

    GET_ALL_DOCTOR: 'GET_ALL_DOCTOR',
    GET_ALL_DOCTOR_SUCCESS: 'GET_ALL_DOCTOR_SUCCESS',
    GET_ALL_DOCTOR_FAIL: 'GET_ALL_DOCTOR_FAIL',

    //GET DOCTOR BY ID

    GET_DOTOR_BY_ID: 'GET_DOTOR_BY_ID',
    GET_DOTOR_BY_ID_SUCCESS: 'GET_DOTOR_BY_ID_SUCCESS',
    GET_DOTOR_BY_ID_FAIL: 'GET_DOTOR_BY_ID_FAIL',

    SAVE_DOCTOR_DETAIL: 'SAVE_DOCTOR_DETAIL',
    SAVE_DOCTOR_DETAIL_SUCCESS: 'SAVE_DOCTOR_DETAIL_SUCCESS',
    SAVE_DOCTOR_DETAIL_FAIL: 'SAVE_DOCTOR_DETAIL_FAIL',

    //GET SCHEDULE

    GET_SCHEDULE: 'GET_SCHEDULE',
    GET_SCHEDULE_SUCCESS: 'GET_SCHEDULE_SUCCESS',
    GET_SCHEDULE_FAIL: 'GET_SCHEDULE_FAIL',

    //GET DOCTOR

    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
});

export default actionTypes;
