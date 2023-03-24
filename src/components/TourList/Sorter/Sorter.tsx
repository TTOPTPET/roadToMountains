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

const sortDefault: string[] = [
  "По возрастанию цены",
  "По убыванию цены",
  "По возрастанию длительности",
  "По убыванию длительности",
];

export const Sorter = () => {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const dispatch = useDispatch();

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
              value={sort}
              control={<Radio />}
              label={sort}
            />
          ))}
        </RadioGroup>
        <Stack direction={"row"} justifyContent={"end"} marginTop={4} gap={1}>
          <Button>Применить</Button>
          <Button>Сбросить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
