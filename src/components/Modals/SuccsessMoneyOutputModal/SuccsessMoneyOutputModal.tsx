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

function SuccsessMoneyOutputModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("succsessMoneyOutputModal"));
  };

  return (
    <>
      <Dialog
        className="succsessMoneyOutputModal"
        onClose={() => dispatch(setModalInactive("succsessMoneyOutputModal"))}
        open={isModalActive("succsessMoneyOutputModal", activeModals)}
        fullWidth
        maxWidth={"sm"}
      >
        <DialogContent>
          <Typography variant={"h5"} sx={{ mb: "30px" }}>
            Успешный вывод средств!
          </Typography>
          <Typography variant={"caption"}>
            Ожидайте поступления средств
          </Typography>

          <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
            <Button onClick={handlerCloseClick}>Закрыть</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SuccsessMoneyOutputModal;
