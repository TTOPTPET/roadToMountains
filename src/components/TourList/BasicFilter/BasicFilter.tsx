import { ChangeEvent, FC } from "react";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { IFilterProps } from "../FilterTypes/IFilterProps";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export const BasicFilter: FC<IFilterProps> = ({
  filters,
  searchData,
  setSearchData,
}) => {
  const { regions } = filters;

  const handleFieldChange = <T extends any>(
    key: keyof ISearchRequest,
    e: T
  ) => {
    setSearchData({ ...searchData, [key]: e });
  };

  const handleDateChange = (type: "from" | "to", value: Dayjs) => {
    try {
      const stringDate = value ? value.toISOString() : "";
      switch (type) {
        case "from": {
          setSearchData({
            ...searchData,
            tourDate: { ...searchData.tourDate, from: stringDate },
          });
          break;
        }
        case "to": {
          setSearchData({
            ...searchData,
            tourDate: { ...searchData.tourDate, to: stringDate },
          });
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("invalid Data format");
    }
  };

  return (
    <Stack direction={"row"} gap={1}>
      <Autocomplete
        freeSolo
        disableClearable
        onChange={(e, value) => setSearchData({ ...searchData, region: value })}
        options={regions.map((region) => region)}
        renderInput={(params) => (
          <TextField
            placeholder={"Регион"}
            {...params}
            value={searchData.region}
            onChange={(e) =>
              handleFieldChange<string>("region", e.target.value)
            }
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(searchData.tourDate.from)}
          onChange={(newValue) => handleDateChange("from", newValue)}
          renderInput={(props) => (
            <TextField
              {...props}
              inputProps={{
                ...props.inputProps,
                placeholder: "Дата заезда",
              }}
            />
          )}
        />
        <DatePicker
          value={dayjs(searchData.tourDate.to)}
          onChange={(newValue) => handleDateChange("to", newValue)}
          renderInput={(props) => (
            <TextField
              {...props}
              inputProps={{
                ...props.inputProps,
                placeholder: "Дата выезда",
              }}
            />
          )}
        />
      </LocalizationProvider>
      {/* <TextField
        type="date"
        placeholder="Дата заезда"
        value={searchData.tourDate.from}
        onChange={(e) => handleDateChange("from", e)}
      />
      <TextField
        type="date"
        placeholder="Дата выезда"
        value={searchData.tourDate.to}
        onChange={(e) => handleDateChange("to", e)}
      /> */}
      <TextField
        type={"number"}
        InputProps={{ inputProps: { min: 0 } }}
        value={
          searchData.maxPersonNumber === 0 ? "" : searchData.maxPersonNumber
        }
        onChange={(e) =>
          handleFieldChange<number>("maxPersonNumber", +e.target.value)
        }
        placeholder={"Колличество человек"}
      />
      <Button variant="high">Найти</Button>
    </Stack>
  );
};
