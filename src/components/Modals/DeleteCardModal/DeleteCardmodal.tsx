import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { Dispatch, SetStateAction } from "react";

import { useDispatch, useSelector } from "react-redux";

import { deleteCard } from "../../../API/paymentAPI/deleteCard";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { getCardInfo } from "../../../API/paymentAPI/getCardInfo";
import { ICardInfo } from "../../../models/paymentSettingsModels/IPaymentSettings";
type DeleteCardModalProps = {
  setCardInfo: Dispatch<SetStateAction<ICardInfo>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

function DeleteCardModal({
  setCardInfo,
  setErrorMessage,
}: DeleteCardModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("deleteCardModal"));
  };

  const handlerConfirmClick = () => {
    dispatch(setModalInactive("deleteCardModal"));
    deleteCard(
      () => {
        getCardInfo(
          (value) => {
            setCardInfo(value);
          },
          () => {},
          false
        );
      },
      (e) => {
        setErrorMessage(e.response?.data?.detail?.Details);
        dispatch(setModalActive("deleteCardErrorModal"));
      }
    );
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
          <Button onClick={handlerConfirmClick}>Да, удалить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteCardModal;
