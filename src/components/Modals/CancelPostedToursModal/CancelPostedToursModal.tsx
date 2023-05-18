import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";

import {
  isModalActive,
  setModalInactive,
  setModalActive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import PostedTourItem from "./PostedTourItem/PostedTourItem";
import { ITour } from "../../../models/tourCardModel/ITour";
import { redColor } from "../../../config/MUI/color/color";
import { deletePostedTour } from "../../../API/creatorAPI/deletePostedTour";
import ConfirmCancelPostedTourModal from "../ConfirmCancelPostedTourModal/ConfirmCancelPostedTourModal";

function CancelPostedToursModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find(
    (modal) => modal.id === "сancelPostedToursModal"
  );
  const [postedTours, setPostedTours] = useState<ITour[]>([]);
  const [cancelAllError, setCancelAllError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setPostedTours(modal?.props?.publicTours);
  }, [modal?.props]);

  console.log(postedTours);

  const handlerBackClick = () => {
    dispatch(setModalInactive("сancelPostedToursModal"));
    dispatch(setModalInactive("deleteTourModal"));
  };

  const cancelAllPostedTours = () => {
    dispatch(
      setModalActive("confirmCancelPostedTourModal", {
        multiply: true,
        postedTours,
      })
    );
  };

  const elements =
    postedTours &&
    postedTours.map((tour: ITour, key: number) => {
      return (
        <PostedTourItem
          setErrorMessage={setErrorMessage}
          tour={tour}
          key={key}
          setCancelAllError={setCancelAllError}
          postedTours={postedTours}
          setPostedTours={setPostedTours}
        />
      );
    });

  return (
    <>
      <Dialog
        className="сancelPostedToursModal"
        onClose={() => {
          dispatch(setModalInactive("сancelPostedToursModal"));
          dispatch(setModalInactive("deleteTourModal"));
          setCancelAllError(false);
          setErrorMessage("");
        }}
        open={isModalActive("сancelPostedToursModal", activeModals)}
        fullWidth
        maxWidth={"md"}
      >
        <DialogContent>
          <Typography variant={"h4"} sx={{ mb: "50px", textAlign: "center" }}>
            Отмените размещённые туры
          </Typography>

          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            marginTop={"50px"}
            gap={"10px"}
          >
            {elements}
          </Stack>

          {errorMessage && (
            <Typography
              variant="caption"
              textAlign={"center"}
              sx={{ mt: "30px", color: redColor }}
            >
              {errorMessage}
            </Typography>
          )}

          <Stack
            direction={"row"}
            justifyContent={"center"}
            marginTop={"30px"}
            gap={1}
          >
            <Button onClick={handlerBackClick}>Назад</Button>
            <Button disabled={cancelAllError} onClick={cancelAllPostedTours}>
              Отменить все
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <ConfirmCancelPostedTourModal setErrorMessage={setErrorMessage} />
    </>
  );
}

export default CancelPostedToursModal;
