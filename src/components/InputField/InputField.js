import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField, Autocomplete } from "@mui/material";
import { useSelector } from "react-redux";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

function InputField({
  fieldID,
  setValue,
  value,
  style,
  minDate,
  label,
  disableOpenPicker,
  required,
}) {
  const services = useSelector((state) => state.data.services);
  const [inputValue, setInputValue] = useState("");

  switch (fieldID) {
    case "dateStart":
    case "dateEnd":
    case "repeatEnd":
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
          <DatePicker
            label={label}
            value={dayjs(value)}
            minDate={minDate}
            onChange={(newVal) => setValue(newVal)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          ></DatePicker>
        </LocalizationProvider>
      );
    case "timeStart":
    case "timeEnd":
    case "serviceDuration":
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ru"}>
          <TimePicker
            label={label}
            value={dayjs(value)}
            minTime={minDate}
            minutesStep={!disableOpenPicker && 5}
            disableOpenPicker={disableOpenPicker}
            onChange={(newVal) => {
              setValue(newVal);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth required={required} />
            )}
          />
        </LocalizationProvider>
      );
    case "selection":
      return (
        <Autocomplete
          multiple
          sx={style}
          id={fieldID}
          options={services}
          noOptionsText={"Добавьте услугу"}
          getOptionLabel={(option) => option?.name_service || ""}
          onClick={(e) => {
            e.stopPropagation();
          }}
          value={
            services.find((service) => service?.id === value?.id)?.name_service
          }
          onChange={(event, newVal) => {
            setValue(newVal);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputVal) => {
            setInputValue(newInputVal);
          }}
          renderInput={(params) => (
            <TextField {...params} label={label} variant="standard" fullWidth />
          )}
        ></Autocomplete>
      );
    case "password":
      return (
        <TextField
          style={{
            ...style,
            width: style?.width,
          }}
          type={"password"}
          id={fieldID}
          value={value}
          label={label}
          variant="standard"
          fullWidth
          required={required}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      );
    case "serviceMaxBooking":
    case "servicePrice":
      return (
        <TextField
          style={{
            ...style,
            width: style?.width,
          }}
          type={"number"}
          id={fieldID}
          value={value}
          label={label}
          variant="standard"
          fullWidth
          required={required}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      );
    default:
      return (
        <TextField
          style={{
            ...style,
            width: style?.width,
          }}
          id={fieldID}
          value={value}
          label={label}
          variant="standard"
          fullWidth
          required={required}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      );
  }
}
export default InputField;
