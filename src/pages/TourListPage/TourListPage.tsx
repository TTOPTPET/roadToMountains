import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import { BasicFilter, ComplexFilter, Sorter } from "../../components/TourList";
import { IFilter } from "../../models/tourListModels/IFilter";
import { getFilters } from "../../submitFunctions/tourListAPI";
import { ISearchRequest } from "../../models/tourListModels/ISearchRequest";
import { getToursSorted } from "../../submitFunctions/tourListAPI/searchAPI/searchAPI";
import { ITour } from "../../models/tourCardModel/ITour";
import TourCard from "../../components/TourCard/TourCard";

const filterDefault: IFilter = {
  regions: [],
  category: [],
  complexity: [],
  maxPrice: 0,
};

const searchDefault: ISearchRequest = {
  searchParam: "",
  category: [],
  tourDuration: {
    from: 0,
    to: 0,
  },
  complexity: [],
  price: {
    from: 0,
    to: 5000,
  },
  recommendedAge: {
    from: 0,
    to: 14,
  },
  region: "",
  tourDate: {
    from: "",
    to: "",
  },
  maxPersonNumber: 0,
};

function TourListPage() {
  const [filters, setFilters] = useState<IFilter>(filterDefault);
  const [searchData, setSearchData] = useState<ISearchRequest>(searchDefault);
  const [tours, setTours] = useState<ITour[]>([]);

  useEffect(() => {
    getFilters((filter) => setFilters(filter), undefined, true);
  }, []);

  useEffect(() => {
    getToursSorted((search) => setTours(search), searchData, undefined, true);
  }, [searchData]);

  const dispatch = useDispatch();
  return (
    <Stack gap={1}>
      {JSON.stringify(searchData)}
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

      <BasicFilter
        filters={filters}
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <ComplexFilter
        filters={filters}
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <Sorter tours={tours} setTours={setTours} />

      <Stack
        flexDirection={"row"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={"center"}
        marginTop={1}
      >
        {tours &&
          tours
            .filter((tour) => tour.banStatus !== true)
            .map((tour, index) => (
              <TourCard key={index} tour={tour} tourCardType={"tourList"} />
            ))}
      </Stack>
    </Stack>
  );
}

export default TourListPage;
