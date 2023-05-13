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

const defaultState: IDefaultState = {
  tourFields: {
    tourName: "",
    tourDescription: "",
    category: "",
    complexity: "",
    region: "",
    price: null,
    photos: [],
    prices: {
      from: null,
      to: null,
    },
    recommendedAge: {
      from: null,
      to: null,
    },
    mapPoints: [],
    housingInclude: {
      housingName: "",
      housingAddress: "",
      housingDescription: "",
    },
    insuranceInclude: {
      insuranceNumber: null,
      insuranceAmount: null,
    },
    recommendations: [],
    tourServices: {
      freeServices: [],
      additionalServices: [],
    },
  },
};

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
        tourFields: defaultState.tourFields,
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
