import { FC, useCallback, useEffect, useState } from "react";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { IFilterProps } from "../FilterTypes/IFilterProps";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { getToursSorted } from "../../../API/tourListAPI/searchAPI/searchAPI";
import { mobile } from "../../../config/config";

export const BasicFilter: FC<IFilterProps> = ({
  filters,
  searchData,
  setSearchData,
  setTourList,
}) => {
  const { regions } = filters;

  const [windowSize, setWindowSize] = useState<number>();

  const handleFieldChange = <T extends any>(
    key: keyof ISearchRequest,
    e: T
  ) => {
    setSearchData({ ...searchData, [key]: e });
  };

  const handleWindowResize = useCallback((event) => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

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
    <Stack direction={windowSize <= mobile ? "column" : "row"} gap={1}>
      <Autocomplete
        freeSolo
        disableClearable
        onChange={(e, value) => setSearchData({ ...searchData, region: value })}
        options={regions.map((region) => region)}
        renderInput={(params) => (
          <TextField
            label={"Регион"}
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
          value={dayjs(searchData?.tourDate?.from || "")}
          onChange={(newValue) => handleDateChange("from", newValue)}
          renderInput={(props) => (
            <TextField
              {...props}
              error={props.error && props.inputProps.value !== ""}
              inputProps={{
                ...props.inputProps,
                label: "Дата заезда",
              }}
            />
          )}
        />
        <DatePicker
          value={dayjs(searchData?.tourDate?.to || "")}
          onChange={(newValue) => handleDateChange("to", newValue)}
          renderInput={(props) => (
            <TextField
              {...props}
              error={props.error && props.inputProps.value !== ""}
              inputProps={{
                ...props.inputProps,
                label: "Дата выезда",
              }}
            />
          )}
        />
      </LocalizationProvider>
      <TextField
        type={"number"}
        InputProps={{ inputProps: { min: 0 } }}
        value={
          searchData?.maxPersonNumber === 0 ? "" : searchData?.maxPersonNumber
        }
        onChange={(e) =>
          handleFieldChange<number>("maxPersonNumber", +e.target.value)
        }
        label={"Количество человек"}
      />
      <Button
        variant="high"
        onClick={() =>
          getToursSorted((value) => setTourList(value), searchData)
        }
      >
        Найти
      </Button>
    </Stack>
  );
};
