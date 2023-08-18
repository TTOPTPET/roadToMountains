import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Paper,
  Avatar as MuiAvatar,
  Box,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import dayjs from "dayjs";
import { baseUrl } from "../../../config/config";

import userPhoto from "../../../media/userPhoto.svg";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";

type BookingInfoModalProps = {
  selectedBooking: IPublicTour;
};

function BookingInfoModal({ selectedBooking }: BookingInfoModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const modal = activeModals.find((modal) => modal.id === "bookingInfoModal");

  const dispatch = useDispatch();

  const index = modal?.props?.index;

  const handlerBackClick = () => {
    dispatch(setModalInactive("bookingInfoModal"));
  };

  const handlerConfirmClick = () => {
    dispatch(setModalInactive("bookingInfoModal"));
  };

  return (
    <Dialog
      className="bookingInfoModal"
      onClose={() => dispatch(setModalInactive("bookingInfoModal"))}
      open={isModalActive("bookingInfoModal", activeModals)}
      fullWidth
      maxWidth={"md"}
    >
      <DialogContent sx={{ m: "0 auto", minWidth: "561px", maxWidth: "800px" }}>
        <Typography variant={"h4"} sx={{ mb: "30px", textAlign: "center" }}>
          Информация о бронировании
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={"10px"}
        >
          <Typography variant={"h5"}>
            {selectedBooking
              ? selectedBooking?.tour?.tourName
              : "Название тура"}
          </Typography>
          <Typography variant={"caption"} sx={{ mt: "6px" }}>
            {selectedBooking.bookingInfo &&
            selectedBooking?.bookingInfo[index]?.bookingDate?.from
              ? dayjs(
                  selectedBooking?.bookingInfo[index]?.bookingDate?.from
                ).format("D MMMM YYYY") +
                " - " +
                dayjs(
                  selectedBooking?.bookingInfo[index]?.bookingDate?.to
                ).format("D MMMM YYYY")
              : "Дата начала - Дата конца"}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          gap={"80px"}
          alignItems={"center"}
          sx={{ mt: "20px" }}
        >
          <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
            <Paper
              variant="avatarBg"
              className="tourInfo__creator-avatar"
              sx={{
                width: "50px",
                height: "50px",
              }}
            >
              <img src={userPhoto} alt="person icon" />
            </Paper>

            <Typography variant={"caption"}>
              {selectedBooking?.bookingInfo[index]?.userInfo?.name
                ? selectedBooking?.bookingInfo[index]?.userInfo?.name
                : "Пользователь не указан"}
            </Typography>
          </Stack>

          <Typography variant={"caption"}>
            {selectedBooking &&
            selectedBooking?.bookingInfo[index]?.userInfo?.phone
              ? `${selectedBooking?.bookingInfo[index]?.userInfo?.phone}`
              : "Номер телефона"}
          </Typography>

          <Typography variant={"caption"}>
            {selectedBooking && selectedBooking?.bookingInfo[index]?.tourAmount
              ? `${new Intl.NumberFormat("ru-RU").format(
                  selectedBooking?.bookingInfo[index]?.tourAmount / 100
                )}₽`
              : "Стоимость тура"}
          </Typography>
        </Stack>

        {selectedBooking && selectedBooking?.bookingInfo[index]?.comment && (
          <Stack direction={"column"} marginTop={"30px"} gap={"10px"}>
            <Typography variant={"h6"}>Комментарий к заказу</Typography>
            <Typography
              variant={"caption"}
              sx={{
                wordWrap: "break-word",
              }}
            >
              {selectedBooking?.bookingInfo[index]?.comment}
            </Typography>
          </Stack>
        )}

        <Stack direction={"column"} marginTop={"30px"} gap={"10px"}>
          <Typography variant={"h6"}>Информация о туристах</Typography>
          <Stack direction={"column"}>
            {selectedBooking &&
              selectedBooking?.bookingInfo[index]?.touristsInfo &&
              selectedBooking?.bookingInfo[index]?.touristsInfo.map(
                (tourist, i) => (
                  <Typography
                    variant={"caption"}
                    sx={{
                      wordWrap: "initial",
                    }}
                  >
                    {i + 1}. {tourist.name}, {checkAge(tourist.age)},{" "}
                    {tourist.sex}
                  </Typography>
                )
              )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default BookingInfoModal;

const checkAge = (stringAge: string) => {
  const age =
    String(stringAge).length > 2
      ? Number(String(stringAge).slice(-2))
      : Number(String(stringAge));
  const lastSymbol = Number(String(stringAge).slice(-1));
  if (
    (age >= 5 && age <= 20) ||
    (lastSymbol >= 5 && lastSymbol <= 9) ||
    lastSymbol === 0
  ) {
    return `${stringAge} лет`;
  } else if (lastSymbol >= 2 && lastSymbol <= 4) {
    return `${stringAge} года`;
  } else if (lastSymbol === 1) {
    return `${stringAge} год`;
  } else {
    return stringAge;
  }
};
