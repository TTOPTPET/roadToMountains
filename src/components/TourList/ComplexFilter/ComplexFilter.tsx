import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { IFilterProps } from "../FilterTypes/IFilterProps";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";
import { tourDuration } from "../Constants/tourDuration";
import { getToursSorted } from "../../../API/tourListAPI/searchAPI/searchAPI";
import getChipLabels from "../getChipLabels";

export const ComplexFilter: FC<IFilterProps> = ({
  filters,
  searchData,
  setSearchData,
  setTourList,
  setFiltersLabels,
}) => {
  const [durationState, setDurationState] = useState<boolean>(true);
  const [durationLabel, setDurationLabel] = useState<string>("");

  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const lessThenMid = useMediaQuery(theme.breakpoints.down("md"));

  const { maxPrice, category, complexity } = filters;
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const dispatch = useDispatch();

  const handlerCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchData.category.indexOf(e.target.value) === -1) {
      setSearchData({
        ...searchData,
        category: [...searchData.category, e.target.value],
      });
    } else {
      setSearchData({
        ...searchData,
        category: [
          ...searchData.category.filter((item) => item !== e.target.value),
        ],
      });
    }
  };

  const handlerComplexityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchData?.complexity.indexOf(e.target.value) === -1) {
      setSearchData({
        ...searchData,
        complexity: [...searchData.complexity, e.target.value],
      });
    } else {
      setSearchData({
        ...searchData,
        complexity: [
          ...searchData.complexity.filter((item) => item !== e.target.value),
        ],
      });
    }
  };

  const handlerDurationChange = (visibility: boolean, e: number[] | number) => {
    if (visibility) {
      let duration = Object.values(e);
      setSearchData({
        ...searchData,
        tourDuration: {
          from: duration[0],
          to: duration[1],
        },
      });
    } else {
      setSearchData({
        ...searchData,
        tourDuration: {
          from: 0,
          to: e as number,
        },
      });
    }

    setDurationState(visibility);
  };

  const handleChangeField = (key: keyof ISearchRequest, e: number[]) => {
    let numbers = Object.values(e);
    setSearchData({
      ...searchData,
      [key]: { from: numbers[0], to: numbers[1] },
    });
  };

  const handlerConfirmClick = () => {
    dispatch(setModalInactive("filterModal"));
    getToursSorted((value) => {
      setTourList(value);
      setFiltersLabels(getChipLabels(searchData));
    }, searchData);
  };

  const handlerClearClick = () => {
    setSearchData({
      searchParam: searchData.searchParam,
      region: searchData.region,
      tourDate: searchData.tourDate,
      maxPersonNumber: searchData.maxPersonNumber,
      category: [],
      complexity: [],
    });
    setSliderInputValue([0, maxPrice / 100 || 1000]);
  };

  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: maxPrice / 100,
      label: maxPrice / 100,
    },
  ];

  const age = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 120,
      label: 120,
    },
  ];

  const [sliderInputValue, setSliderInputValue] = useState([
    searchData?.price?.from / 100 || 0,
    searchData?.price?.to / 100 || maxPrice / 100,
  ]);

  useEffect(() => {
    setSliderInputValue((curValue) => [curValue[0], curValue[1] || maxPrice]);
  }, [maxPrice]);

  return (
    <Dialog
      className="filters"
      onClose={() => dispatch(setModalInactive("filterModal"))}
      open={isModalActive("filterModal", activeModals)}
      fullWidth
      maxWidth={"lg"}
    >
      <DialogContent sx={{ p: lessThenSmall ? "0px" : "20px 24px" }}>
        <Grid
          container
          item
          direction={lessThenSmall ? "column" : "row"}
          width={lessThenSmall ? "80%" : "100%"}
          justifyContent={"space-between"}
        >
          <Grid item sm={3}>
            <Typography variant={"h5"}>Категория тура</Typography>
            <RadioGroup sx={{ m: lessThenMid ? "7px 0" : "0px 0" }}>
              {category.map((cat, index) => (
                <FormControlLabel
                  key={index}
                  checked={
                    searchData?.category &&
                    searchData?.category.indexOf(cat) !== -1
                      ? true
                      : false
                  }
                  value={cat}
                  control={<Checkbox onChange={handlerCategoryChange} />}
                  label={<Typography variant={"caption"}>{cat}</Typography>}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item sm={4}>
            <Typography variant={"h5"}>Длительность тура</Typography>
            <RadioGroup sx={{ m: lessThenMid ? "7px 0" : "0px 0" }}>
              {tourDuration.map((duration, index) =>
                tourDuration.length - 1 === index ? (
                  <FormControlLabel
                    key={index}
                    value={duration.label}
                    checked={durationLabel === duration.label}
                    control={
                      <Radio
                        onChange={() => {
                          handlerDurationChange(false, duration.value);
                          setDurationLabel(duration.label);
                        }}
                      />
                    }
                    label={
                      <Typography variant={"caption"}>
                        {duration.label}
                      </Typography>
                    }
                  />
                ) : (
                  <FormControlLabel
                    key={index}
                    value={duration.label}
                    checked={durationLabel === duration.label}
                    control={
                      <Radio
                        onChange={() => {
                          handlerDurationChange(true, duration.value);
                          setDurationLabel(duration.label);
                        }}
                      />
                    }
                    label={
                      <Typography variant={"caption"}>
                        {duration.label}
                      </Typography>
                    }
                  />
                )
              )}
            </RadioGroup>
            <TextField
              color={"secondary"}
              disabled={durationState}
              type={"number"}
              onChange={(e) => handlerDurationChange(false, +e.target.value)}
              label="Введите колличество дней"
            />
            <Typography variant={"h5"} marginTop={2}>
              Стоимость
            </Typography>
            <Slider
              max={maxPrice / 100}
              marks={marks}
              value={sliderInputValue}
              onChange={(e, value) => {
                handleChangeField("price", [
                  value[0] * 100,
                  value[1] * 100,
                ] as number[]);
                setSliderInputValue(value as number[]);
              }}
              valueLabelDisplay="auto"
              sx={{ ml: "15px" }}
            />
          </Grid>
          <Grid item sm={3}>
            <Typography variant={"h5"}>Сложность маршрута</Typography>
            <RadioGroup sx={{ m: lessThenMid ? "7px 0" : "0px 0" }}>
              {complexity.map((compl, index) => (
                <FormControlLabel
                  key={index}
                  checked={
                    searchData.complexity &&
                    searchData?.complexity.indexOf(compl) !== -1
                      ? true
                      : false
                  }
                  value={compl}
                  control={<Checkbox onChange={handlerComplexityChange} />}
                  label={<Typography variant={"caption"}>{compl}</Typography>}
                />
              ))}
            </RadioGroup>
            <Typography variant={"h5"} marginTop={lessThenSmall ? 0 : 5}>
              Рекомендуемый возраст
            </Typography>
            <Slider
              max={120}
              marks={age}
              value={[
                searchData?.recommendedAge?.from || 0,
                searchData?.recommendedAge?.to || 120,
              ]}
              onChange={(_, value) =>
                handleChangeField("recommendedAge", value as number[])
              }
              valueLabelDisplay="auto"
              sx={{ ml: "15px", width: "85%" }}
            />
          </Grid>
        </Grid>
        <Stack direction={"row"} justifyContent={"end"} marginTop={4} gap={1}>
          <Button onClick={handlerConfirmClick}>Применить</Button>
          <Button onClick={handlerClearClick}>Сбросить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
