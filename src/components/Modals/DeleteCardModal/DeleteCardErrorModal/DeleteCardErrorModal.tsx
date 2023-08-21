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
} from "../../../../redux/Modal/ModalReducer";
import { RootState } from "../../../../redux/store";

type DeleteCardErrorModalProps = {
  errorMessage?: string;
};

function DeleteCardErrorModal({ errorMessage }: DeleteCardErrorModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("deleteCardErrorModal"));
  };

  return (
    <>
      <Dialog
        className="deleteCardErrorModal"
        onClose={() => dispatch(setModalInactive("deleteCardErrorModal"))}
        open={isModalActive("deleteCardErrorModal", activeModals)}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogContent>
          <Typography variant={"h5"} sx={{ mb: "30px" }}>
            Ошибка!
          </Typography>
          <Typography variant={"caption"}>
            {errorMessage
              ? errorMessage
              : "Что-то пошло не так, попробуйте еще раз позже!"}
          </Typography>

          <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
            <Button onClick={handlerCloseClick}>Закрыть</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteCardErrorModal;
