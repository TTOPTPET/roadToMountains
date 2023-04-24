import { IAddTour } from "../../models/addTourModels/IAddTour";
enum actionTypes {
  SET_TOUR_FIELD = "SET_TOUR_FIELD",
  CLEAR_TOUR_FIELDS = "CLEAR_TOUR_FIELDS",
}

interface IActionProps {
  props: IAddTour;
}

interface IAction {
  type: actionTypes;
  payload?: IActionProps;
}

interface IDefaultState {
  tourFields: IAddTour;
}

const defaultState: IDefaultState = { tourFields: undefined };

const AddTourReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_TOUR_FIELD:
      return {
        ...state,
        tourFields: { ...state.tourFields, ...action.payload },
      };
    case actionTypes.CLEAR_TOUR_FIELDS:
      return {
        ...state,
        tourFields: undefined,
      };

    default:
      return state;
  }
};

export default AddTourReducer;

export const setTourField = (props: IAddTour) => {
  return {
    type: actionTypes.SET_TOUR_FIELD,
    payload: props,
  };
};
export const clearTourFields = () => {
  return {
    type: actionTypes.CLEAR_TOUR_FIELDS,
  };
};
