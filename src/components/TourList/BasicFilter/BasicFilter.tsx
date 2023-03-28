import { ChangeEvent, FC } from "react";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { IFilterProps } from "../FilterTypes/IFilterProps";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";

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

  const handleDateChange = (
    type: "from" | "to",
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (type) {
      case "from": {
        setSearchData({
          ...searchData,
          tourDate: { ...searchData.tourDate, from: e.target.value },
        });
        break;
      }
      case "to": {
        setSearchData({
          ...searchData,
          tourDate: { ...searchData.tourDate, to: e.target.value },
        });
        break;
      }
      default:
        break;
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
      <TextField
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
      />
      <TextField
        type={"number"}
        InputProps={{ inputProps: { min: 0 } }}
        value={searchData.maxPersonNumber as number}
        onChange={(e) =>
          handleFieldChange<number>("maxPersonNumber", +e.target.value)
        }
        placeholder={"Колличество человек"}
      />
      <Button variant="high">Найти</Button>
    </Stack>
  );
};
