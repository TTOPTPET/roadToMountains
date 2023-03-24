import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import { BasicFilter, ComplexFilter, Sorter } from "../../components/TourList";
import { IFilter } from "../../models/tourListModels/IFilter";
import { getFilters } from "../../submitFunctions/tourListAPI";

const filterDefault: IFilter = {
  regions: [],
  category: [],
  complexity: [],
  maxPrice: 0,
};

function TourListPage() {
  const [filters, setFilters] = useState<IFilter>(filterDefault);

  useEffect(() => {
    getFilters((filter) => setFilters(filter), undefined, true);
  }, []);

  const dispatch = useDispatch();
  return (
    <Stack gap={1}>
      <Grid container alignItems={"center"} spacing={1}>
        <Grid item sm={9}>
          <Typography variant={"h3"}>Все туры</Typography>
        </Grid>
        <Grid item sm={3}>
          <Button
            variant={"textButton"}
            onClick={() => dispatch(setModalActive("filterModal"))}
          >
            Фильтры
          </Button>
          <Button
            variant={"textButton"}
            onClick={() => dispatch(setModalActive("sortModal"))}
          >
            Сортировать
          </Button>
        </Grid>
      </Grid>

      <BasicFilter {...filters} />
      <ComplexFilter {...filters} />
      <Sorter />
    </Stack>
  );
}

export default TourListPage;
