import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

type MoneyOutputErrorModalProps = {
  errorMessage: string;
};

function MoneyOutputErrorModal({ errorMessage }: MoneyOutputErrorModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("moneyOutputErrorModal"));
  };

  return (
    <>
      <Dialog
        className="moneyOutputErrorModal"
        onClose={() => dispatch(setModalInactive("moneyOutputErrorModal"))}
        open={isModalActive("moneyOutputErrorModal", activeModals)}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogContent>
          <Typography variant={"h5"} sx={{ mb: "30px" }}>
            Ошибка вывода средств!
          </Typography>
          <Typography variant={"caption"}>{errorMessage}</Typography>

          <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
            <Button onClick={handlerCloseClick}>Закрыть</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MoneyOutputErrorModal;
