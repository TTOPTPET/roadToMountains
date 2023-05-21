import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect, SetStateAction, Dispatch } from "react";

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
import { deleteTour } from "../../../API/creatorAPI/deleteTour";
import SuccessCancelPostedTourModal from "../SuccessCancelPostedTourModal/SuccessCancelPostedTourModal";

interface CancelPostedToursModalProps {
  postedTours: ITour[];
  setPostedTours: Dispatch<SetStateAction<ITour[]>>;
  tourId: string;
  setMyTours: Dispatch<SetStateAction<ITour[]>>;
  myTours: ITour[];
}

function CancelPostedToursModal({
  postedTours,
  setPostedTours,
  tourId,
  setMyTours,
  myTours,
}: CancelPostedToursModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  console.log(tourId);

  const dispatch = useDispatch();

  const [cancelAllError, setCancelAllError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlerBackClick = () => {
    dispatch(setModalInactive("сancelPostedToursModal"));
    dispatch(setModalInactive("deleteTourModal"));
  };

  const cancelAllPostedTours = () => {
    dispatch(
      setModalActive("confirmCancelPostedTourModal", {
        multiply: true,
      })
    );
  };

  const handlerDeleteTourClick = () => {
    deleteTour(tourId, (value) => {
      dispatch(setModalInactive("deleteTourModal"));
      setMyTours([...myTours.filter((tour) => tour.tourId !== tourId)]);
      dispatch(setModalActive("successDeleteTourModal"));
    });
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
          tourId={tourId}
          setMyTours={setMyTours}
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
        maxWidth={postedTours.length > 0 ? "md" : "sm"}
      >
        <DialogContent>
          <Typography
            variant={"h4"}
            sx={{
              mb: postedTours.length > 0 ? "50px" : "20px",
              textAlign: "center",
            }}
          >
            {postedTours.length > 0
              ? "Отмените размещённые туры"
              : "Удалить выбранный тур?"}
          </Typography>

          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            marginTop={postedTours.length > 0 && "50px"}
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
            {postedTours.length > 0 ? (
              <Button disabled={cancelAllError} onClick={cancelAllPostedTours}>
                Отменить все
              </Button>
            ) : (
              <Button onClick={handlerDeleteTourClick}>Удалить тур</Button>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
      <ConfirmCancelPostedTourModal
        setErrorMessage={setErrorMessage}
        postedTours={postedTours}
        setPostedTours={setPostedTours}
        tourId={tourId}
        setMyTours={setMyTours}
      />
      <SuccessCancelPostedTourModal />
    </>
  );
}

export default CancelPostedToursModal;
