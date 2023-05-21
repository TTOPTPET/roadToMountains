import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { postErrorMessage } from "../../../API/commonAPI";
import { useEffect, useState } from "react";
import { IErrorMessage } from "../../../models/errorMessageModels/IErrorMessage";
import { redColor } from "../../../config/MUI/color/color";

function ErrorReportModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find((modal) => modal.id === "errorReportModal");

  const [errorReportData, setErrorReportData] = useState<IErrorMessage>();

  const [errorMessage, setErrorMessage] = useState("");

  console.log(errorReportData);

  useEffect(() => {
    modal?.props?.tour &&
      setErrorReportData((errorReportData) => ({
        ...errorReportData,
        tourInfo: {
          tourId: modal?.props?.record.tour.tourId,
          publicTourId: modal?.props?.record.publicTourId,
          tourName: modal?.props?.record.tour.tourName,
        },
      }));
  }, [modal?.props?.record]);

  const handlerConfirmClick = () => {
    postErrorMessage(
      modal?.props?.tour,
      errorReportData,
      () => {
        dispatch(setModalActive("successMessageSendModal"));
        dispatch(setModalInactive("errorReportModal"));
      },
      () => {
        setErrorMessage("Что-то пошло не так, попробуйте позже");
      }
    );
  };

  return (
    <Dialog
      className="errorReportModal"
      onClose={() => {
        dispatch(setModalInactive("errorReportModal"));
        setErrorReportData(undefined);
        setErrorMessage("");
      }}
      open={isModalActive("errorReportModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"}>Сообщение о проблеме</Typography>
        <StyledTextAreaAutosize
          placeholder="Опишите Вашу проблему"
          onChange={(e) =>
            setErrorReportData((errorReportData) => ({
              ...errorReportData,
              message: e.target.value,
            }))
          }
        />
        {errorMessage && (
          <Typography
            variant={"caption"}
            sx={{ color: redColor, textAlign: "center", mb: "20px" }}
          >
            {errorMessage}
          </Typography>
        )}
        <Stack direction={"row"} justifyContent={"end"}>
          <Button onClick={handlerConfirmClick}>Отправить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorReportModal;
