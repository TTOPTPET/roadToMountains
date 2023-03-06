export const SET_MODAL_ACTIVE = "SET_MODAL_ACTIVE";
export const SET_MODAL_INACTIVE = "SET_MODAL_INACTIVE";
const defaultState = {
  activeModals: [{}],
};

const ModalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_MODAL_ACTIVE:
      return {
        ...state,
        activeModals: state.activeModals.concat(action.payload),
      };
    case SET_MODAL_INACTIVE:
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

export const setModalActive = (id, props = {}) => {
  return {
    type: SET_MODAL_ACTIVE,
    payload: { id, props },
  };
};
export const setModalInactive = (id) => {
  return {
    type: SET_MODAL_INACTIVE,
    payload: { id },
  };
};

export const isModalActive = (id, activeModals = [{}]) => {
  return Boolean(activeModals.find((modal) => modal.id === id));
};
