import { Button, Grid, Stack, Typography } from "@mui/material";
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
      <Grid container alignItems={"center"} spacing={1} sx={{ mb: "50px" }}>
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
        setTourList={setTourList}
      />
      <ComplexFilter
        filters={filters}
        searchData={searchData}
        setSearchData={setSearchData}
        setTourList={setTourList}
      />
      <Sorter tours={tourList} setTours={setTourList} />

      <Stack
        flexDirection={"row"}
        flexWrap={"wrap"}
        gap={2}
        justifyContent={"center"}
        marginTop={1}
      >
        {tourList &&
          tourList
            .filter((tour) => tour.banStatus !== true)
            .map((tour, index) => (
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
            ))}
      </Stack>
    </Stack>
  );
}

export default TourListPage;
