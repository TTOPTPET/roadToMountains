import {
  Button,
  Chip,
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
import { ChipLabelType } from "../../components/TourList/getChipLabels";

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
  const [filtersLabels, setFiltersLabels] = useState<string[]>([]);

  const dispatch = useDispatch();

  const theme = useTheme();

  const moreThanSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const clearSearchField = (key: keyof ISearchRequest, value: string) => {
    const searchValue = searchData[key];
    if (searchValue instanceof Array) {
      const newArray = searchValue.filter((item) => item !== value);
      setSearchData({
        ...searchData,
        [key]: newArray,
      });
    } else {
      setSearchData({
        ...searchData,
        [key]: undefined,
      });
    }
    setFiltersLabels([...filtersLabels.filter((item) => item !== value)]);
  };

  const handlerDeleteLabel = (value: string) => {
    const chipLabelTypeIndex = Object.values(ChipLabelType).indexOf(
      value as ChipLabelType
    );
    if (chipLabelTypeIndex !== -1) {
      const searchKey = Object.keys(ChipLabelType)[chipLabelTypeIndex];
      clearSearchField(searchKey as keyof ISearchRequest, value);
    } else {
      const searchDataKeys = Object.keys(searchData);
      Object.values(searchData).forEach((item, key) => {
        if (typeof item === "string") {
          if (item === value) {
            clearSearchField(
              searchDataKeys[key] as keyof ISearchRequest,
              value
            );
          }
        } else if (item instanceof Array) {
          if (item.indexOf(value) !== -1) {
            clearSearchField(
              searchDataKeys[key] as keyof ISearchRequest,
              value
            );
          }
        }
      });
    }
  };

  useEffect(() => {
    getFilters((filter) => setFilters(filter), undefined, false);
    getToursSorted(
      (search) => setTourList(search),
      searchData,
      undefined,
      false
    );
  }, [filtersLabels]);

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
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: { lg: "50px", md: "30px", sm: "20px", xs: "10px" } }}
      >
        <Grid item md={8}>
          <Typography variant={moreThanSmall ? "h3" : "h4"}>
            Все туры
          </Typography>
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
        filtersLabels={filtersLabels}
        setFiltersLabels={setFiltersLabels}
      />
      <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
        {filtersLabels.map((item, index) => (
          <Chip
            key={index}
            variant={"outlined"}
            label={item}
            onDelete={() => handlerDeleteLabel(item)}
          />
        ))}
      </Stack>
      <ComplexFilter
        filters={filters}
        searchData={searchData}
        setSearchData={setSearchData}
        setTourList={setTourList}
        filtersLabels={filtersLabels}
        setFiltersLabels={setFiltersLabels}
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
              <Grid key={index} item lg={3} md={3} sm={4}>
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
