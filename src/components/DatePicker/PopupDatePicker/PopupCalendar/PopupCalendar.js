import { useState } from "react";
import "./PopupCalendar.css";
import ArrowLeft from "../../../../media/Arrow_left.svg";
import ArrowRight from "../../../../media/Arrow_right.svg";
import { useSwipeable } from "react-swipeable";
import { useDispatch, useSelector } from "react-redux";
import { setSelectDate } from "../../../../redux/reducers/DataReducer";
import dayjs from "dayjs";
import CalendarGrid from "./CalendarGrid/CalendarGrid";

function PopupCalendar() {
  const selectDate = useSelector((state) => state.data.selectDate);
  const dispatch = useDispatch();

  const [monthSelected, setMonthSelected] = useState(false);

  const handlers = useSwipeable({
    onSwipedRight: () => {
      dispatch(
        setSelectDate(
          dayjs(selectDate).subtract(1, monthSelected ? "month" : "year")
        )
      );
    },
    onSwipedLeft: () => {
      dispatch(
        setSelectDate(
          dayjs(selectDate).add(1, monthSelected ? "month" : "year")
        )
      );
    },
  });

  return (
    <div className="popup__wrapp" {...handlers}>
      <div
        className="calendar__selectedDate"
        onClick={() => setMonthSelected(false)}
      >
        <div className="selected_month">{dayjs(selectDate).format("MMMM")}</div>
        <div className="selected_year">{dayjs(selectDate).format("YYYY")}</div>
      </div>
      <div className="btn__wrapp">
        <div
          className="btn__calendar"
          id="btn-calendar-left"
          onClick={() =>
            dispatch(
              setSelectDate(
                dayjs(selectDate).subtract(1, monthSelected ? "month" : "year")
              )
            )
          }
        >
          <img className="btn__calendar_img" src={ArrowLeft} alt=""></img>
        </div>
        <div className="calendar__wrapp">
          <CalendarGrid
            selectDate={selectDate}
            monthSelected={monthSelected}
            setMonthSelected={setMonthSelected}
          />
        </div>
        <div
          className="btn__calendar"
          id="btn-calendar-right"
          onClick={() =>
            dispatch(
              setSelectDate(
                dayjs(selectDate).add(1, monthSelected ? "month" : "year")
              )
            )
          }
        >
          <img className="btn__calendar_img" src={ArrowRight} alt=""></img>
        </div>
      </div>
    </div>
  );
}

export default PopupCalendar;
