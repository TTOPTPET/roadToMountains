import React, { useState } from "react";
import DatePickerButton from "./DatePickerButton/DatePickerButton";
import PopupDatePicker from "./PopupDatePicker/PopupDatePicker";

function DatePicker({ mobileBtn }) {
  return (
    <div>
      <DatePickerButton mobile={mobileBtn} />
      <PopupDatePicker />
    </div>
  );
}

export default DatePicker;
