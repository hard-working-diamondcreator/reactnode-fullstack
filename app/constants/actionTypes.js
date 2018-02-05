export const ActionTypes = {
  BEGIN_API_CALL: 'api/BEGIN_API_CALL',
  API_CALL_ERROR: 'api/API_CALL_ERROR',

  APP: {
    LOAD_APP_DATA_START: 'appdata/LOAD_APP_DATA_START',
    LOAD_APP_DATA_SUCCESS: 'appdata/LOAD_APP_DATA_SUCCESS',
    LOAD_APP_DATA_ERROR: 'appdata/LOAD_APP_DATA_ERROR',
  },
  // Auth
  LOGIN: {
    LOGIN_START: 'AUTH/LOGIN_START',
    LOGIN_SUCCESS: 'AUTH/LOGIN_SUCCESS',
    LOGIN_ERROR: 'AUTH/LOGIN_ERROR',
  },
  REGISTER: {
    REGISTER_START: 'AUTH/REGISTER_START',
    REGISTER_SUCCESS: 'AUTH/REGISTER_SUCCESS',
    REGISTER_ERROR: 'AUTH/REGISTER_ERROR',
  },
  PROFILE: {
    // Load
    LOAD_START: 'PROFILE/LOAD_START',
    LOAD_SUCCESS: 'PROFILE/LOAD_SUCCESS',
    LOAD_ERROR: 'PROFILE/LOAD_ERROR',
    // Save
    SAVE_START: 'PROFILE/SAVE_START',
    SAVE_SUCCESS: 'PROFILE/SAVE_SUCCESS',
    SAVE_ERROR: 'PROFILE/SAVE_ERROR',
  },
  LOGOUT: 'AUTH/LOGOUT',
};
