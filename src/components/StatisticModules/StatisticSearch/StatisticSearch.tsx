import { Dispatch, FC, SetStateAction } from "react";
import { IStatisticSearch } from "../../../models/statisticModels/IStatisticSearch";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface IStatisticSearchProps {
  statisticSearch: IStatisticSearch;
  setStatisticSearch: Dispatch<SetStateAction<IStatisticSearch>>;
}

const StatisticSearch: FC<IStatisticSearchProps> = ({
  statisticSearch,
  setStatisticSearch,
}) => {
  const handlerChangeSearchField = (
    type: keyof IStatisticSearch,
    value: Dayjs
  ) => {
    const stringDate = value ? value.toISOString() : "";
    setStatisticSearch({ ...statisticSearch, [type]: stringDate });
  };

  return (
    <Stack direction={"row"} columnGap={5}>
      <Autocomplete
        freeSolo
        disableClearable
        value={""}
        options={[]}
        renderInput={(params) => (
          <TextField
            placeholder={"Пол"}
            color={"primary"}
            {...params}
            value={""}
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <DatePicker
        value={dayjs(statisticSearch?.dateFrom || "")}
        onChange={(newValue) => handlerChangeSearchField("dateFrom", newValue)}
        renderInput={(props) => (
          <TextField
            {...props}
            error={props.error && props.inputProps.value !== ""}
            inputProps={{
              ...props.inputProps,
              placeholder: "Дата заезда",
            }}
          />
        )}
      />
      <DatePicker
        value={dayjs(statisticSearch?.dateTo || "")}
        onChange={(newValue) => handlerChangeSearchField("dateTo", newValue)}
        renderInput={(props) => (
          <TextField
            {...props}
            error={props.error && props.inputProps.value !== ""}
            inputProps={{
              ...props.inputProps,
              placeholder: "Дата выезда",
            }}
          />
        )}
      />
      <Button variant="high">Найти</Button>
    </Stack>
  );
};

export default StatisticSearch;
