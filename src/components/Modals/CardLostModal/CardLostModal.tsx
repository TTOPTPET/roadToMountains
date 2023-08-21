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
import { postFinanceInfo } from "../../../API/paymentAPI/postFinanceInfo";
import { CreatorType } from "../../../models/userModels/IUserInfo";

type CardLostModalProps = {
  creatorType: CreatorType;
};

function CardLostModal({ creatorType }: CardLostModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("cardLostModal"));
  };

  const handlerConfirmClick = () => {
    dispatch(setModalInactive("cardLostModal"));
    postFinanceInfo({}, (data) => {
      window.location.replace(data.connectUrl);
    });
  };

  return (
    <Dialog
      className="cardLostModal"
      onClose={() => dispatch(setModalInactive("cardLostModal"))}
      open={isModalActive("cardLostModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение привязки новой карты
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите привязать новую карту? Привязка новой карты
          приведет к потере привязки текущей карты
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button onClick={handlerConfirmClick}>Да, привязать</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default CardLostModal;
