import { Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { useState, Dispatch, SetStateAction } from "react";
import { redColor, whiteColor } from "../../../config/MUI/color/color";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";

import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { useDispatch } from "react-redux";
import TouristOrder from "./TouristOrder/TouristOrder";
import ConfirmCancelPostedTourModal from "../../Modals/ConfirmCancelPostedTourModal/ConfirmCancelPostedTourModal";
import SuccessCancelPostedTourModal from "../../Modals/SuccessCancelPostedTourModal/SuccessCancelPostedTourModal";

type Props = {
  selectedPublic: IPublicTour;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setPublicTours?: Dispatch<SetStateAction<IPublicTour[]>>;
  setSelectedPublic?: Dispatch<SetStateAction<IPublicTour>>;
};

export default function CalendarSidebar({
  selectedPublic,
  setErrorMessage,
  errorMessage,
  setPublicTours,
  setSelectedPublic,
}: Props) {
  const dispatch = useDispatch();

  console.log(selectedPublic);

  return (
    <Box
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      overflow={"hidden"}
    >
      <Typography variant={"h5"} sx={{ mb: 3, mt: 1 }} flexGrow={0}>
        {selectedPublic?.tour?.tourName || "Название тура"}
      </Typography>
      <Stack direction={"column"} gap={1} display={"flex"} flexGrow={3}>
        <Typography variant={"caption"}>
          {selectedPublic?.tourDate?.from && selectedPublic?.tourDate?.to
            ? dayjs(selectedPublic?.tourDate?.from).format("D MMMM YYYY") +
              " - " +
              dayjs(selectedPublic?.tourDate?.to).format("D MMMM YYYY")
            : "Дата начала - Дата конца"}
        </Typography>
        <Typography variant={"caption"}>
          {(selectedPublic?.personNum || 0) + " человек"}
        </Typography>
        <Stack direction={"column"}>
          <Typography variant={"caption"}>Стоимость:</Typography>
          <Typography variant={"caption"} fontWeight={"700"}>
            {selectedPublic?.tourAmount / 100 || 0}₽
          </Typography>
        </Stack>

        <Stack direction={"column"}>
          <Typography variant={"caption"}>
            Стоимость c комиссией платформы:
          </Typography>
          <Typography variant={"caption"} fontWeight={"700"}>
            {selectedPublic?.tourAmountWithCommission / 100 || 0}₽
          </Typography>
        </Stack>
        <Stack
          direction={"column"}
          gap={1}
          alignSelf={"end"}
          alignItems={"flex-end"}
          flexShrink={2}
        >
          <Button
            disabled={
              !selectedPublic ||
              Object.keys(selectedPublic).length === 0 ||
              dayjs(selectedPublic?.updateDeadline) <= dayjs(new Date())
            }
            onClick={() => dispatch(setModalActive("newPublicModal"))}
          >
            Редактировать
          </Button>
          <Stack direction={"column"}>
            {selectedPublic &&
              dayjs(selectedPublic?.updateDeadline) <= dayjs(new Date()) && (
                <Typography
                  variant={"caption"}
                  align={"right"}
                  sx={{ color: redColor }}
                >
                  Время редактирования истекло
                </Typography>
              )}
            <Typography variant={"caption"} align={"right"}>
              до{" "}
              {selectedPublic?.updateDeadline
                ? dayjs(selectedPublic?.updateDeadline)
                    .add(-3, "day")
                    .format("D MMMM YYYY")
                : "Дата конца ред."}
            </Typography>
          </Stack>
          <Button
            disabled={
              !selectedPublic ||
              Object.keys(selectedPublic).length === 0 ||
              dayjs(selectedPublic?.cancelDeadline) <= dayjs(new Date())
            }
            onClick={() =>
              dispatch(
                setModalActive("confirmCancelPostedTourModal", {
                  multiply: false,
                })
              )
            }
          >
            Отменить тур
          </Button>
          <Stack direction={"column"}>
            {selectedPublic &&
              dayjs(selectedPublic?.cancelDeadline) <= dayjs(new Date()) && (
                <Typography
                  variant={"caption"}
                  align={"right"}
                  sx={{ color: redColor }}
                >
                  Время отмены тура истекло
                </Typography>
              )}
            <Typography variant={"caption"} align={"right"}>
              до{" "}
              {selectedPublic?.cancelDeadline
                ? dayjs(selectedPublic?.cancelDeadline)
                    .add(-1, "day")
                    .format("D MMMM YYYY")
                : "Дата конца отмены"}
            </Typography>
          </Stack>
        </Stack>
        {errorMessage && (
          <Typography
            variant="caption"
            textAlign={"center"}
            sx={{ color: redColor }}
          >
            {errorMessage}
          </Typography>
        )}
        <Typography variant={"h6"}>
          Заказы{" ("}
          {selectedPublic?.bookingInfo ? selectedPublic?.bookingInfo.length : 0}
          {")"}
        </Typography>
        <Stack
          direction={"column"}
          gap={1}
          overflow={"scroll"}
          sx={{ "&::-webkit-scrollbar": { width: "0" } }}
          flexBasis={"1vh"}
          flexShrink={3}
          flexGrow={4}
        >
          {selectedPublic?.bookingInfo &&
            selectedPublic?.bookingInfo.map((booking, index) => (
              <TouristOrder
                key={index}
                index={index}
                bookingInfo={booking}
                selectedPublic={selectedPublic}
              />
            ))}
        </Stack>

        <Typography variant={"h6"}>Доход</Typography>
        <Box sx={{ mb: "2px" }}>
          <Paper
            sx={{ backgroundColor: whiteColor, borderRadius: 6, padding: 3 }}
          >
            <Typography variant={"button"} align={"center"}>
              {selectedPublic?.publicTourProfit / 100 || 0}₽
            </Typography>
          </Paper>
        </Box>
        <ConfirmCancelPostedTourModal
          setErrorMessage={setErrorMessage}
          setPublicTours={setPublicTours}
          setSelectedPublic={setSelectedPublic}
          publicTourId={selectedPublic?.publicTourId}
        />
        <SuccessCancelPostedTourModal />
      </Stack>
    </Box>
  );
}
