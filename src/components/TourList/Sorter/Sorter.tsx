import {
  Button,
  Dialog,
  DialogContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { ISortFilter } from "../FilterTypes/ISortFilter";
import { ITour } from "../../../models/tourCardModel/ITour";
import { SetStateAction, Dispatch, FC, useState } from "react";
import { parse } from "date-fns";

interface ISorterProps {
  tours: ITour[];
  setTours: Dispatch<SetStateAction<ITour[]>>;
}

export const Sorter: FC<ISorterProps> = ({ tours, setTours }) => {
  const [sortData, setSortData] = useState<ISortFilter>();

  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const dispatch = useDispatch();

  const sortDefault: ISortFilter[] = [
    {
      name: "По возрастанию цены",
      sort: function () {
        setTours([...tours.sort((a, b) => a.prices.from - b.prices.from)]);
      },
    },
    {
      name: "По убыванию цены",
      sort: function () {
        setTours([...tours.sort((a, b) => b.prices.from - a.prices.from)]);
      },
    },
    {
      name: "По возрастанию длительности",
      sort: function () {
        setTours([
          ...tours.sort((a, b) => {
            return (
              Number(parse(a.tourDate.to, "dd.MM.yyyy", new Date())) -
              Number(parse(a.tourDate.from, "dd.MM.yyyy", new Date())) -
              (Number(parse(b.tourDate.to, "dd.MM.yyyy", new Date())) -
                Number(parse(b.tourDate.from, "dd.MM.yyyy", new Date())))
            );
          }),
        ]);
      },
    },
    {
      name: "По убыванию длительности",
      sort: function () {
        setTours([
          ...tours.sort(
            (a, b) =>
              Number(parse(b.tourDate.to, "dd.MM.yyyy", new Date())) -
              Number(parse(b.tourDate.from, "dd.MM.yyyy", new Date())) -
              (Number(parse(a.tourDate.to, "dd.MM.yyyy", new Date())) -
                Number(parse(a.tourDate.from, "dd.MM.yyyy", new Date())))
          ),
        ]);
      },
    },
  ];

  const handlerSetSort = (sortFilter: ISortFilter) => {
    setSortData(sortFilter);
  };

  const handlerConfirmClick = () => {
    sortData.sort();
    dispatch(setModalInactive("sortModal"));
  };

  const handlerClearClick = () => {
    setSortData(null);
    dispatch(setModalInactive("sortModal"));
  };

  return (
    <Dialog
      className="filters"
      onClose={() => dispatch(setModalInactive("sortModal"))}
      open={isModalActive("sortModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"}>Сортировать</Typography>
        <RadioGroup>
          {sortDefault.map((sort, index) => (
            <FormControlLabel
              key={index}
              checked={sortData?.name === sort.name ? true : false}
              value={sort.name}
              control={<Radio onChange={() => handlerSetSort(sort)} />}
              label={sort.name}
            />
          ))}
        </RadioGroup>
        <Stack direction={"row"} justifyContent={"end"} marginTop={4} gap={1}>
          <Button onClick={handlerConfirmClick}>Применить</Button>
          <Button onClick={handlerClearClick}>Сбросить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
