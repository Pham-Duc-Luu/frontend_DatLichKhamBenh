import actionTypes from './actionTypes';
import {
    handleGetAllCode,
    handleCreateNewUser,
    handleGetUserInfo,
    handleDeleteUser,
    handleUpdateUser,
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleSaveDoctorDetail,
    handleGetDoctorDetailById,
} from '../../services/index';

/**
 * GET GENDEE
 *
 */
export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER });
            let data = {
                gender: await handleGetAllCode('GENDER'),
                role: await handleGetAllCode('ROLE'),
                position: await handleGetAllCode('POSITION'),
            };

            // console.log(data);
            if (data && data.errCode !== 0) {
                dispatch(fetchGenderSuccess(data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
        }
    };
};

export const fetchGenderSuccess = (data) => {
    return { type: actionTypes.FETCH_GENDER_SUCCESS, data: data };
};
export const fetchGenderFail = () => {
    return { type: actionTypes.FETCH_GENDER_FAIL };
};

/**
 * CREATE USER
 *
 *
 */

export const fetchCreateUser = (data) => {
    // console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_CREATE_USER, data: {} });
            let fetchData = await handleCreateNewUser(data);

            if (fetchData && fetchData.errCode === 0) {
                dispatch(fetchCreateUserSuccess(fetchData));
                // fetchGetAllUser();
            } else {
                dispatch(fetchCreateUserFail(fetchData));
            }
        } catch (e) {
            dispatch(fetchCreateUserFail(e));
        }
    };
};

export const fetchCreateUserSuccess = (data) => {
    return { type: actionTypes.FETCH_CREATE_USER_SUCCESS, data };
};

export const fetchCreateUserFail = (data) => {
    return { type: actionTypes.FETCH_CREATE_USER_FAIL, data };
};

/**
 * GET ALL USER
 *
 *
 */

export const fetchGetAllUser = () => {
    // console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GET_ALL_USER, data: [] });
            let fetchData = await handleGetUserInfo('all');
            if (fetchData && fetchData.errCode === 0) {
                dispatch(fetchGetAllUserSuccess(fetchData));
            } else {
                dispatch(fetchGetAllUserFail(fetchData));
            }
        } catch (e) {
            dispatch(fetchGetAllUserFail(e));
        }
    };
};

export const fetchGetAllUserSuccess = (data) => {
    return { type: actionTypes.FETCH_GET_ALL_USER_SUCCESS, data };
};

export const fetchGetAllUserFail = (data) => {
    return { type: actionTypes.FETCH_CREATE_USER_FAIL, data };
};

/**
 * DELETE USER
 *
 */

export const deleteUser = (id) => {
    // console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.DETELE_USER });
            let response = await handleDeleteUser(id);
            if (response && response.errCode === 0) {
                dispatch(deleteUserSuccess(response));
            } else {
                dispatch(deleteUserFail(response));
            }
        } catch (e) {
            dispatch(deleteUserFail(e));
        }
    };
};

export const deleteUserSuccess = (data) => {
    return { type: actionTypes.DETELE_USER_SUCCESS, data };
};

export const deleteUserFail = (data) => {
    return { type: actionTypes.DETELE_USER_FAIL, data };
};

/**
 * UPDATE USER
 */

export const fetchUpdateUser = (data) => {
    console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.UPDATE_USER, data: {} });
            let response = await handleUpdateUser(data);
            if (response && response.errCode === 0) {
                dispatch(fetchUpdateUserSuccess(response));
            } else {
                dispatch(fetchUpdateUserFail(response));
            }
        } catch (e) {
            dispatch(deleteUserFail(e));
        }
    };
};

export const fetchUpdateUserSuccess = (data) => {
    return { type: actionTypes.UPDATE_USER_SUCCESS, data };
};

export const fetchUpdateUserFail = (data) => {
    return { type: actionTypes.UPDATE_USER_FAIL, data };
};

/**
 * GET TOP 10 DOCTOR
 */

export const getTopdoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOCTOR_TOP, data: {} });
            let response = await handleGetTopDoctor(limit);
            // console.log('get top doctor', response);
            if (response && response.errCode === 0) {
                dispatch(getTopdoctorSuccess(response));
            } else {
                dispatch(getTopdoctorFail(response));
            }
        } catch (e) {
            dispatch(getTopdoctorFail());
        }
    };
};

export const getTopdoctorSuccess = (data) => {
    return { type: actionTypes.GET_DOCTOR_TOP_SUCCESS, data };
};

export const getTopdoctorFail = (data) => {
    return { type: actionTypes.GET_DOCTOR_TOP_FAIL, data };
};

/**
 * GET ALL DOCTOR
 */

export const getAllDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_DOCTOR, data: {} });
            let response = await handleGetAllDoctor();
            // console.log('get top doctor', response);
            if (response && response.errCode === 0) {
                dispatch(getAllDoctorSuccess(response));
            } else {
                dispatch(getAllDoctorFail(response));
            }
        } catch (e) {
            dispatch(getAllDoctorFail());
        }
    };
};

export const getAllDoctorSuccess = (data) => {
    return { type: actionTypes.GET_ALL_DOCTOR_SUCCESS, data };
};

export const getAllDoctorFail = (data) => {
    return { type: actionTypes.GET_ALL_DOCTOR_FAIL, data };
};

/**
 * CREATE DESCRIPTIONS
 */

export const saveDoctorDetail = (data) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.SAVE_DOCTOR_DETAIL, data: {} });
            let response = await handleSaveDoctorDetail(data);
            // console.log('get top doctor', response);
            if (response && response.errCode === 0) {
                dispatch(saveDoctorDetailSuccess(response));
            } else {
                dispatch(saveDoctorDetailFail(response));
            }
        } catch (e) {
            dispatch(saveDoctorDetailFail());
        }
    };
};

export const saveDoctorDetailSuccess = (data) => {
    return { type: actionTypes.SAVE_DOCTOR_DETAIL_SUCCESS, data };
};

export const saveDoctorDetailFail = (data) => {
    return { type: actionTypes.SAVE_DOCTOR_DETAIL_FAIL, data };
};

/**
 * GET DOCTOR BY ID
 */

export const getDoctorDetailById = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_DOTOR_BY_ID, data: {} });
            let response = await handleGetDoctorDetailById(id);
            if (response && response.errCode === 0) {
                dispatch(getDoctorDetailByIdSuccess(response));
            } else {
                dispatch(getDoctorDetailByIdFail(response));
            }
        } catch (e) {
            dispatch(getDoctorDetailByIdFail());
        }
    };
};

export const getDoctorDetailByIdSuccess = (data) => {
    return { type: actionTypes.GET_DOTOR_BY_ID_SUCCESS, data };
};

export const getDoctorDetailByIdFail = (data) => {
    return { type: actionTypes.GET_DOTOR_BY_ID_FAIL, data };
};
