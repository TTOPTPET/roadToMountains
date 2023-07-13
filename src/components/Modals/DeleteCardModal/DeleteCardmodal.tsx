import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { deleteCard } from "../../../API/paymentAPI/deleteCard";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

function DeleteCardModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("deleteCardModal"));
  };

  return (
    <Dialog
      className="deleteCardModal"
      onClose={() => dispatch(setModalInactive("deleteCardModal"))}
      open={isModalActive("deleteCardModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение удаления карты
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите отвязвть карту?
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button onClick={() => deleteCard()}>Да, удалить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCardModal;
