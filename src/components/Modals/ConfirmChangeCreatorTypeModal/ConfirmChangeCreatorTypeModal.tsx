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
import { Dispatch, SetStateAction } from "react";
import { ICreatorInfo } from "../../../models/userModels/IUserInfo";

interface ConfirmChangeCreatorTypeModalProps {
  setEditedCreatorInfo: Dispatch<SetStateAction<ICreatorInfo>>;
}

function ConfirmChangeCreatorTypeModal({
  setEditedCreatorInfo,
}: ConfirmChangeCreatorTypeModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find(
    (modal) => modal.id === "confirmChangeCreatorTypeModal"
  );

  const handlerCloseClick = () => {
    setEditedCreatorInfo((editedCreatorInfo) => ({
      ...editedCreatorInfo,
    }));
    dispatch(setModalInactive("confirmChangeCreatorTypeModal"));
  };

  const handlerChangeClick = () => {
    modal?.props?.creatorTypeRadio &&
      setEditedCreatorInfo((editedCreatorInfo) => ({
        ...editedCreatorInfo,
        dataUser: {
          ...editedCreatorInfo?.dataUser,
          creatorType: modal?.props?.creatorTypeRadio,
        },
      }));
    dispatch(setModalInactive("confirmChangeCreatorTypeModal"));
  };

  return (
    <Dialog
      className="confirmChangeCreatorTypeModal"
      onClose={() =>
        dispatch(setModalInactive("confirmChangeCreatorTypeModal"))
      }
      open={isModalActive("confirmChangeCreatorTypeModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Внимание!
        </Typography>
        <Typography variant={"caption"}>
          Обратите внимание, при изменении типа организации произойдет утеря
          личных данных.
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerChangeClick}>Изменить</Button>
          <Button onClick={handlerCloseClick}>Отмена</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmChangeCreatorTypeModal;
