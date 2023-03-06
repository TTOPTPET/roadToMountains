import PopupCalendar from "./PopupCalendar/PopupCalendar";
import "./PopupDatePicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  isModalActive,
  setModalInactive,
} from "../../../redux/reducers/ModalReducer";
import { datePickerModalId } from "../../../config/types";
import { Box, Modal } from "@mui/material";

function PopupDatePicker() {
  const activeModals = useSelector((state) => state.modal.activeModals);
  const dispatch = useDispatch();
  return (
    <Modal
      open={isModalActive(datePickerModalId, activeModals)}
      onClose={() => dispatch(setModalInactive(datePickerModalId))}
    >
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#f2f2f2",
          padding: "30px 30px",
          borderRadius: "5px",
          outline: "none",
        }}
      >
        <PopupCalendar />
      </Box>
    </Modal>
  );
}

export default PopupDatePicker;
