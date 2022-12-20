import actionTypes from './actionTypes';
import {
    handleGetAllCode,
    handleCreateNewUser,
    handleGetUserInfo,
    handleDeleteUser,
    handleUpdateUser,
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
            console.log(response);
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
