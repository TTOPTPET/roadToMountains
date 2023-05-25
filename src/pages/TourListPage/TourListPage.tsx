import {
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import { BasicFilter, ComplexFilter, Sorter } from "../../components/TourList";
import { IFilter } from "../../models/tourListModels/IFilter";
import { getFilters } from "../../API/tourListAPI";
import { ISearchRequest } from "../../models/tourListModels/ISearchRequest";
import { getToursSorted } from "../../API/tourListAPI/searchAPI/searchAPI";
import { ITour } from "../../models/tourCardModel/ITour";
import TourCard from "../../components/TourCard/TourCard";
import { useSearchParams } from "react-router-dom";

const filterDefault: IFilter = {
  regions: [],
  category: [],
  complexity: [],
  maxPrice: 0,
};

function TourListPage() {
  const [searchParam] = useSearchParams();
  const [filters, setFilters] = useState<IFilter>(filterDefault);
  const [tourList, setTourList] = useState<ITour[]>([]);
  const [searchData, setSearchData] = useState<ISearchRequest>({
    complexity: [],
    category: [],
    searchParam: searchParam.get("title"),
  });

  const dispatch = useDispatch();

  const theme = useTheme();

  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getFilters((filter) => setFilters(filter), undefined, false);
    getToursSorted(
      (search) => setTourList(search),
      searchData,
      undefined,
      false
    );
  }, []);

  useEffect(() => {
    setSearchData({ ...searchData, searchParam: searchParam.get("title") });
    getToursSorted(
      (search) => setTourList(search),
      { ...searchData, searchParam: searchParam.get("title") },
      undefined,
      false
    );
  }, [searchParam.get("title")]);

  return (
    <Stack gap={1}>
      <Grid container alignItems={"center"} sx={{ mb: "50px" }}>
        <Grid item md={8}>
          <Typography variant={"h3"}>Все туры</Typography>
        </Grid>
        <Grid item md={4}>
          <Stack direction={"row"} justifyContent={"right"}>
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
          </Stack>
        </Grid>
      </Grid>

      <BasicFilter
        filters={filters}
        searchData={searchData}
        setSearchData={setSearchData}
        setTourList={setTourList}
      />
      <ComplexFilter
        filters={filters}
        searchData={searchData}
        setSearchData={setSearchData}
        setTourList={setTourList}
      />
      <Sorter tours={tourList} setTours={setTourList} />
      <Grid
        container
        spacing={2}
        justifyContent={{ sm: "flex-start", xs: "center" }}
        marginTop={1}
      >
        {tourList &&
          tourList
            .filter((tour) => tour.banStatus !== true)
            .map((tour, index) => (
              <Grid key={index} item lg={3} md={3} sm={4} xs={9}>
                <TourCard
                  key={index}
                  tour={tour}
                  tourCardType={"tourList"}
                  myTours={[]}
                  setMyTours={function (
                    value: React.SetStateAction<ITour[]>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </Grid>
            ))}
      </Grid>
    </Stack>
  );
}

export default TourListPage;
