import { Dispatch, FC, SetStateAction } from "react";
import { IStatisticSearch } from "../../../models/statisticModels/IStatisticSearch";
import { Button, Stack, TextField } from "@mui/material";
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
      <DatePicker
        value={dayjs(statisticSearch?.dateFrom || "")}
        onChange={(newValue) => handlerChangeSearchField("dateFrom", newValue)}
        renderInput={(props) => (
          <TextField
            {...props}
            error={props.error && props.inputProps.value !== ""}
            inputProps={{
              ...props.inputProps,
              label: "Дата начала",
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
              label: "Дата конца",
            }}
          />
        )}
      />
      <Button variant="high">Найти</Button>
    </Stack>
  );
};

export default StatisticSearch;
