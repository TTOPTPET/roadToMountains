//HACK: Для того, чтобы задать новый id необходмо вписать его сюда :)
type modalsId =
  | "filterModal"
  | "sortModal"
  | "errorReportModal"
  | "successMessageSendModal"
  | "cancelBookingModal"
  | "successCancellingBookingModal"
  | "successPayModal"
  | "successBookingModal"
  | "deleteTourModal"
  | "successDeleteTourModal"
  | "successEditUserInfoModal"
  | "enterMobileCodeModal"
  | "newPublicModal"
  | "сancelPostedToursModal"
  | "confirmCancelPostedTourModal"
  | "successCancelPostedTourModal"
  | "bookingInfoModal";

enum actionTypes {
  SET_MODAL_ACTIVE = "SET_MODAL_ACTIVE",
  SET_MODAL_INACTIVE = "SET_MODAL_INACTIVE",
}

interface IActionProps {
  id: modalsId;
  props?: {
    index?: number;
    newPublic?: boolean;
    tourDate?: {
      from: string;
      to: string;
    };
    bookingItem: {
      tour?: {
        tourName?: string;
      };
      tourAmount?: number;
      bookingInfo?: {
        userInfo?: {
          photo?: string;
          phone?: string;
          email?: string;
          name?: string;
        };
        bookingId?: string;
        tourAmount?: number;
        bookingDate?: {
          from?: string;
          to?: string;
        };
        touristsInfo?: {
          name?: string;
          age?: string;
          sex?: string;
        }[];
        comment?: string;
      };
    };
  };
}

interface IAction {
  type: actionTypes;
  payload: IActionProps;
}

interface IDefaultState {
  activeModals: IActionProps[];
}

const defaultState: IDefaultState = {
  activeModals: [],
};

const ModalReducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET_MODAL_ACTIVE:
      return {
        ...state,
        activeModals: state.activeModals.concat(action.payload),
      };
    case actionTypes.SET_MODAL_INACTIVE:
      return {
        ...state,
        activeModals: state.activeModals.filter(
          (modal) => modal.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default ModalReducer;

export const setModalActive = (id: modalsId, props?: any) => {
  return {
    type: actionTypes.SET_MODAL_ACTIVE,
    payload: { id, props },
  };
};
export const setModalInactive = (id: modalsId) => {
  return {
    type: actionTypes.SET_MODAL_INACTIVE,
    payload: { id },
  };
};

export const isModalActive = (id: modalsId, activeModals: IActionProps[]) => {
  return Boolean(activeModals.find((modal) => modal.id === id));
};
