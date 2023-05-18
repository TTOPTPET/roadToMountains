import { useState, useEffect } from "react";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { ITour } from "../../../../models/tourCardModel/ITour";
import { SetStateAction, Dispatch } from "react";
import { redColor } from "../../../../config/MUI/color/color";

import { useDispatch } from "react-redux";

import {
  setModalInactive,
  setModalActive,
} from "../../../../redux/Modal/ModalReducer";
import { deletePostedTour } from "../../../../API/creatorAPI/deletePostedTour";

interface IPostedTourItem {
  setErrorMessage: Dispatch<SetStateAction<string>>;
  tour: ITour;
  key: number;
  setCancelAllError: Dispatch<SetStateAction<boolean>>;
  postedTours: ITour[];
  setPostedTours: Dispatch<SetStateAction<ITour[]>>;
}

function PostedTourItem({
  tour,
  setCancelAllError,
  setPostedTours,
  postedTours,
  setErrorMessage,
}: IPostedTourItem) {
  const dispatch = useDispatch();

  const { tourDate, publicTourId } = tour;

  const [cancelError, setCancelError] = useState(
    dayjs(tour.cancelDeadline) <= dayjs(new Date())
  );

  useEffect(() => {
    if (cancelError) {
      setCancelAllError(true);
    }
  }, []);

  const handleDeletePostedTour = () => {
    deletePostedTour(
      tour.publicTourId,
      (value) => {
        setPostedTours &&
          setPostedTours([
            ...postedTours.filter((tour) => tour.publicTourId !== publicTourId),
          ]);

        dispatch(setModalInactive("confirmCancelPostedTourModal"));
        dispatch(
          setModalActive("successCancelPostedTourModal", { multiply: false })
        );
      },
      () => {
        dispatch(setModalInactive("confirmCancelPostedTourModal"));
        setErrorMessage("Ошибка! Попробуйте позже!");
      }
    );
  };

  return (
    <Box className="postedTourItem__wrapper">
      <Paper variant={"postedTourItem"}>
        <Stack
          direction={"row"}
          justifyContent={cancelError ? "space-between" : "flex-start"}
          gap="40px"
        >
          <Typography variant={"caption"}>
            {dayjs(tourDate?.from).format("DD MMMM YYYY") +
              " - " +
              dayjs(tourDate?.to).format("DD MMMM YYYY")}
          </Typography>
          {cancelError && (
            <Typography
              variant="caption"
              sx={{ fontSize: "12px", color: redColor }}
            >
              Время отмены тура истекло
            </Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          gap="17px"
          mt="30px"
        >
          <Button
            sx={{ width: "100%" }}
            disabled={cancelError}
            onClick={handleDeletePostedTour}
          >
            Отменить тур
          </Button>
          <Button
            sx={{ width: "100%" }}
            component={Link}
            to={"/creator/calendar"}
            onClick={() => {
              dispatch(setModalInactive("сancelPostedToursModal"));
              dispatch(setModalInactive("deleteTourModal"));
            }}
          >
            В календарь
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default PostedTourItem;
