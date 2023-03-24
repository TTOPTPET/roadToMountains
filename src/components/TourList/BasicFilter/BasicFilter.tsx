import { FC } from "react";
import { IFilter } from "../../../models/tourListModels/IFilter";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";

export const BasicFilter: FC<IFilter> = ({ regions }) => {
  return (
    <Stack direction={"row"} gap={1}>
      <Autocomplete
        freeSolo
        disableClearable
        options={regions.map((region) => region)}
        renderInput={(params) => (
          <TextField
            placeholder={"Регион"}
            {...params}
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <TextField type="date" placeholder="Дата заезда" />
      <TextField type="date" placeholder="Дата выезда" />
      <TextField
        type={"number"}
        InputProps={{ inputProps: { min: 0 } }}
        placeholder={"Колличество человек"}
      />
      <Button variant="high">Найти</Button>
    </Stack>
  );
};
