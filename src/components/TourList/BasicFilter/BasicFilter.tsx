import { FC, useCallback, useEffect, useState } from "react";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { IFilterProps } from "../FilterTypes/IFilterProps";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { getToursSorted } from "../../../API/tourListAPI/searchAPI/searchAPI";
import { mobile } from "../../../config/config";
import getChipLabels from "../getChipLabels";

export const BasicFilter: FC<IFilterProps> = ({
  filters,
  searchData,
  setSearchData,
  setTourList,
  filtersLabels,
  setFiltersLabels,
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

  const handlerSearchClick = () => {
    getToursSorted((value) => {
      setTourList(value);
      setFiltersLabels(getChipLabels(searchData));
    }, searchData);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <Stack direction={windowSize <= mobile ? "column" : "row"} gap={1}>
      <Autocomplete
        freeSolo
        disableClearable
        value={searchData?.region ?? ""}
        onChange={(e, value) => setSearchData({ ...searchData, region: value })}
        options={regions.map((region) => region)}
        renderInput={(params) => (
          <TextField
            label={"Регион"}
            {...params}
            onChange={(e) =>
              handleFieldChange<string>("region", e.target.value)
            }
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Дата заезда"
          value={dayjs(searchData?.tourDate?.from ?? "")}
          onChange={(newValue) => handleDateChange("from", newValue)}
          renderInput={(props) => (
            <TextField
              {...props}
              error={props.error && props.inputProps.value !== ""}
              inputProps={{
                ...props.inputProps,
                placeholder: "",
              }}
            />
          )}
        />
        <DatePicker
          label="Дата выезда"
          value={dayjs(searchData?.tourDate?.to ?? "")
            .subtract(23, "h")
            .subtract(59, "m")
            .subtract(59, "s")}
          onChange={(newValue) =>
            handleDateChange(
              "to",
              newValue && newValue.add(23, "h").add(59, "m").add(59, "s")
            )
          }
          renderInput={(props) => (
            <TextField
              {...props}
              error={props.error && props.inputProps.value !== ""}
              inputProps={{
                ...props.inputProps,
                placeholder: "",
              }}
            />
          )}
        />
      </LocalizationProvider>
      <TextField
        type={"number"}
        InputProps={{ inputProps: { min: 0 } }}
        value={!searchData?.maxPersonNumber ? "" : searchData?.maxPersonNumber}
        onChange={(e) =>
          handleFieldChange<number>("maxPersonNumber", +e.target.value)
        }
        label={"Количество человек"}
      />
      <Button variant="high" onClick={handlerSearchClick}>
        Найти
      </Button>
    </Stack>
  );
};
