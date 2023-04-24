enum actionTypes {
  SET_PHOTO_DELETE = "SET_PHOTO_DELETE",
  CLEAR_PHOTO_DELETE = "CLEAR_PHOTO_DELETE",
}

interface IAction {
  type: actionTypes;
  payload?: string;
}

interface IDefaultState {
  photo: string[];
}

const defaultState: IDefaultState = {
  photo: [],
};

const PhotoReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_PHOTO_DELETE:
      return {
        ...state,
        photo: [...state.photo, action.payload],
      };
    case actionTypes.CLEAR_PHOTO_DELETE:
      state.photo = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default PhotoReducer;

export const setPhotoToDelete = (props: string) => {
  return {
    type: actionTypes.SET_PHOTO_DELETE,
    payload: props,
  };
};

export const clearPhotoToDelete = () => {
  return {
    type: actionTypes.CLEAR_PHOTO_DELETE,
  };
};
