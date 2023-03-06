import { Grid } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useDispatch } from "react-redux";
import { datePickerModalId } from "../../../../../config/types";
import {
  setSelectDate,
  setTreeWeek,
} from "../../../../../redux/reducers/DataReducer";
import { setModalInactive } from "../../../../../redux/reducers/ModalReducer";
import { sendSelectedDate } from "../../../../../submitFunctions/calendarAPI";

function CalendarGrid({ selectDate, monthSelected, setMonthSelected }) {
  const dispatch = useDispatch();
  const today = dayjs();

  const renderMonths = () => (
    <Grid
      container
      // spacing={{ xs: 2, md: 3 }}
      spacing={0}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      {[...Array(12)].map((_, index) => (
        <Grid item xs={3} sm={3} md={3} key={index}>
          <div
            className={
              today.isSame(dayjs(selectDate).month(index), "month")
                ? "month__btn date_current"
                : "month__btn"
            }
            id={"month" + dayjs(selectDate).month(index).format("M")}
            key={index}
            onClick={() => {
              dispatch(setSelectDate(dayjs(selectDate).month(index)));
              setMonthSelected(true);
            }}
          >
            <div>{dayjs(selectDate).format("YYYY")}</div>
            <div>{dayjs(selectDate).month(index).format("MMMM")}</div>
          </div>
        </Grid>
      ))}
    </Grid>
  );

  const renderDays = () => (
    <Grid
      container
      // spacing={{ xs: 2, md: 3 }}
      spacing={0}
      columns={{ xs: 12, sm: 12, md: 12 }}
    >
      {[...Array(36)].map((_, index) => {
        const correctIndex = index + 1;
        let className = "day__btn";
        today.isSame(dayjs(selectDate).date(correctIndex), "day") &&
          (className += " date_current");
        correctIndex > dayjs(selectDate).daysInMonth() &&
          (className += " day__btn_dark");
        return (
          <Grid item xs={2} sm={2} md={2} key={correctIndex}>
            <div
              className={className}
              id={"day" + correctIndex}
              key={correctIndex}
              onClick={() => {
                sendSelectedDate(
                  dayjs(selectDate).date(correctIndex).toISOString()
                ).then(
                  (value) => {
                    dispatch(
                      setTreeWeek(value.data) &&
                        setModalInactive(datePickerModalId)
                    );
                  },
                  (reason) => console.error(reason)
                );
              }}
            >
              <div>{dayjs(selectDate).date(correctIndex).format("D")}</div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );

  return <div>{monthSelected ? renderDays() : renderMonths()}</div>;
}

export default CalendarGrid;
