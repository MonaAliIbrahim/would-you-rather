const initialState = {
  users: [],
  user: {},
  error: null
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Users
    case 'FETCH_USER_REQUEST':
      return { ...state };
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        users: Object.values(action.payload),
      };
    case 'FETCH_USER_FAIL':
      return {
        ...state,
        error: action.payload
      };
    case 'ADD_AUTHUSER':
      return {
        user: action.user
      }

    default:
      return state;
  }
}

export default UserReducer;