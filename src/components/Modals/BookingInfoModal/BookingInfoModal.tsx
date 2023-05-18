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

function BookingInfoModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const modal = activeModals.find((modal) => modal.id === "bookingInfoModal");

  const dispatch = useDispatch();

  const index = modal?.props?.index;

  console.log(modal?.props?.bookingItem);

  const defaultinfo = {
    userInfo: {
      photo: "",
      phone: "89206732953",
      email: "quyewtyiuqwe@asd.ru",
      name: "Дмитрий Викторович Пшик",
    },
    bookingId: "Египетские пирамиды",
    tourAmount: 123000,
    bookingDate: {
      from: "03-10-2023",
      to: "03-14-2023",
    },
    touristsInfo: [
      {
        name: "Алексей",
        age: "102",
        sex: "Мужской",
      },
      {
        name: "Алексей",
        age: "54",
        sex: "Мужской",
      },
      {
        name: "Алексей",
        age: "12",
        sex: "Мужской",
      },
    ],
    comment: "я гей",
    living: "Гостиница “Космос”, просп. Мира, 150",
    insurance: "",
  };

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
            {modal?.props?.bookingItem?.tour?.tourName}
          </Typography>
          <Typography variant={"caption"} sx={{ mt: "6px" }}>
            {dayjs(
              modal?.props?.bookingItem?.bookingInfo?.bookingDate?.from
            ).format("D MMMM YYYY") +
              " - " +
              dayjs(
                modal?.props?.bookingItem?.bookingInfo?.bookingDate?.to
              ).format("D MMMM YYYY")}
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
              {modal?.props &&
              modal?.props?.bookingItem?.bookingInfo?.userInfo?.photo ? (
                <MuiAvatar
                  src={
                    baseUrl +
                    "/" +
                    modal?.props?.bookingItem?.bookingInfo?.userInfo?.photo
                  }
                  alt="user avatar"
                  sx={{ width: "70px", height: "70px" }}
                />
              ) : (
                <img src={userPhoto} alt="person icon" />
              )}
            </Paper>

            <Typography variant={"caption"}>
              {modal?.props?.bookingItem?.bookingInfo[index]?.userInfo?.name}
            </Typography>
          </Stack>

          <Typography variant={"caption"}>
            {/* {`+${modal?.props?.bookingInfo?.userInfo?.phone.substring(
              0,
              1
            )}(${modal?.props?.bookingInfo?.userInfo?.phone.substring(
              1,
              4
            )})${modal?.props?.bookingInfo?.userInfo?.phone.substring(
              4,
              7
            )}-${modal?.props?.bookingInfo?.userInfo?.phone.substring(
              7,
              9
            )}-${modal?.props?.bookingInfo?.userInfo?.phone.substring(9, 11)}`} */}
            {modal?.props?.bookingItem?.bookingInfo[index]?.userInfo?.phone}
          </Typography>

          <Typography variant={"caption"}>{`${new Intl.NumberFormat(
            "ru-RU"
          ).format(modal?.props?.bookingItem?.tourAmount)}₽`}</Typography>
        </Stack>

        <Stack direction={"column"} marginTop={"30px"} gap={"10px"}>
          <Typography variant={"h6"}>Проживание</Typography>
          <Typography
            variant={"caption"}
            sx={{
              wordWrap: "initial",
            }}
          >
            {defaultinfo.living ? defaultinfo.living : "Проживание не включено"}
          </Typography>
        </Stack>

        <Stack direction={"column"} marginTop={"30px"} gap={"10px"}>
          <Typography variant={"h6"}>Страхование</Typography>
          <Typography
            variant={"caption"}
            sx={{
              wordWrap: "initial",
            }}
          >
            {defaultinfo.insurance
              ? defaultinfo.insurance
              : "Страхование не включено"}
          </Typography>
        </Stack>

        {modal?.props?.bookingItem?.bookingInfo[index]?.comment && (
          <Stack direction={"column"} marginTop={"30px"} gap={"10px"}>
            <Typography variant={"h6"}>Комментарий к заказу</Typography>
            <Typography
              variant={"caption"}
              sx={{
                wordWrap: "initial",
              }}
            >
              {modal?.props?.bookingItem?.bookingInfo[index]?.comment}
            </Typography>
          </Stack>
        )}

        <Stack direction={"column"} marginTop={"30px"} gap={"10px"}>
          <Typography variant={"h6"}>Информация о туристах</Typography>
          <Stack direction={"column"}>
            {modal?.props?.bookingItem?.bookingInfo[index]?.touristsInfo &&
              modal?.props?.bookingItem?.bookingInfo[index]?.touristsInfo.map(
                (tourist, i) => (
                  <Typography
                    variant={"caption"}
                    sx={{
                      wordWrap: "initial",
                    }}
                  >
                    {i + 1}. {tourist.name}, {tourist.age}
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
