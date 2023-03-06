import React from "react";
import "./DatePickerButton.css";
import calendar from "../../../media/calendar.png";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { datePickerModalId } from "../../../config/types";
import { setModalActive } from "../../../redux/reducers/ModalReducer";

function DatePickerButton({ mobile }) {
  const treeWeek = useSelector((state) => state.data.treeWeek);
  const dispatch = useDispatch();

  return (
    <div
      className={mobile ? "datePicker_btn_mob" : "datePicker_btn"}
      onClick={(e) => {
        e.preventDefault();
        dispatch(setModalActive(datePickerModalId));
      }}
    >
      {mobile ? (
        <img src={calendar}></img>
      ) : (
        [
          dayjs(treeWeek[0]?.day || undefined).format("DD.MM.YYYY"),
          " - ",
          dayjs(treeWeek[6]?.day || undefined).format("DD.MM.YYYY"),
        ]
      )}
    </div>
  );
}

export default DatePickerButton;
