import { SIGN_IN, SIGN_OUT } from '../actions/type';

const INITAL_VALUE = {
  isSignedIn: null,
  userId: '',
  name: '',
  email: '',
  profileImageUrl: ''
};

export default (state = INITAL_VALUE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { isSignedIn: true, ...action.payload };
    case SIGN_OUT:
      return {
        isSignedIn: false,
        userId: '',
        name: '',
        email: '',
        profileImageUrl: ''
      };
    default:
      return state;
  }
};
