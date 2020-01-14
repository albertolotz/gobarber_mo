import produce from 'immer';

const INNITIAL_STATE = {
  profile: null,
};

export default function user(state = INNITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCESS': {
        draft.profile = action.payload.user;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@auth/SIGN_OUT':{
        draft.profile=null;

        break;
      }
      default:
    }
  });
}
