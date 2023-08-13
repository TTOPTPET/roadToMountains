import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";

import { SetStateAction, Dispatch, useState, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import dayjs, { Dayjs } from "dayjs";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

import { ITour } from "../../../models/tourCardModel/ITour";
import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";

import { postNewPublic } from "../../../API/creatorAPI/postNewPublic";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";
import { editPublicTour } from "../../../API/creatorAPI/editPublicTour";
import { redColor } from "../../../config/MUI/color/color";

type NewPublicModalProps = {
  myTours: ITour[];
  selectedPublic: IPublicTour;
  setSelectedPublic: Dispatch<SetStateAction<IPublicTour>>;
  setPublicTours: Dispatch<SetStateAction<IPublicTour[]>>;
};

type NewPublicErrorsNoDate = {
  [key in keyof Omit<
    IPublicTour,
    | "publicTourId"
    | "publicTourProfit"
    | "tourAmountWithCommission"
    | "bookingId"
    | "personNum"
    | "bookingNumber"
    | "cancelDeadline"
    | "updateDeadline"
    | "bookingInfo"
    | "tour"
    | "tourDate"
    | "contactInformation"
  >]: boolean;
};

type NewPublicErrors = NewPublicErrorsNoDate & {
  tourDateFrom: boolean;
  tourDateTo: boolean;
};

const newPublicErrorsDefault: NewPublicErrors = {
  tourId: undefined,
  meetingPoint: undefined,
  meetingTime: undefined,
  tourAmount: undefined,
  maxPersonNum: undefined,
  tourDateFrom: undefined,
  tourDateTo: undefined,
};

export default function NewPublicModal({
  myTours,
  selectedPublic,
  setSelectedPublic,
  setPublicTours,
}: NewPublicModalProps) {
  const [newPublicInputError, setNewPublicInputError] =
    useState<NewPublicErrors>(newPublicErrorsDefault);

  const newPublicInputValidation = (
    type: keyof NewPublicErrors,
    value: string
  ): boolean => {
    switch (type) {
      case "tourId":
        return value ? false : true;
      case "meetingPoint":
        return value ? false : true;
      case "maxPersonNum":
        return value ? false : true;
      case "tourAmount":
        return value && Number(value) >= 1 ? false : true;
      case "meetingTime":
        return value &&
          dayjs(value).isBefore(dayjs(editedPublic?.tourDate?.from))
          ? false
          : true;

      case "tourDateFrom":
        return value &&
          dayjs(value).isAfter(dayjs()) &&
          dayjs(editedPublic?.tourDate?.to).isAfter(dayjs(value))
          ? false
          : true;

      case "tourDateTo":
        return value &&
          dayjs(value).isAfter(dayjs()) &&
          dayjs(value).isAfter(dayjs(editedPublic?.tourDate?.from))
          ? false
          : true;

      default:
        return false;
    }
  };

  const handlerNewPublicErrorChange = (
    key: keyof NewPublicErrors,
    error: boolean
  ) => {
    setNewPublicInputError((CurNewPublicInputError) => ({
      ...CurNewPublicInputError,
      [key]: error,
    }));
  };

  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const modal = activeModals.find((modal) => modal.id === "newPublicModal");

  const dispatch = useDispatch();

  const [editedPublic, setEditedPublic] = useState<IPublicTour>(undefined);

  useEffect(() => {
    if (isModalActive("newPublicModal", activeModals)) {
      if (modal?.props?.newPublic) {
        setEditedPublic((editedPublic) => ({
          ...editedPublic,
          tourDate: modal.props.tourDate,
        }));
      } else {
        setEditedPublic(selectedPublic);
      }
    }
  }, [activeModals]);

  useEffect(() => {
    handlerNewPublicErrorChange(
      "tourDateFrom",
      newPublicInputValidation("tourDateFrom", editedPublic?.tourDate?.from)
    );
    handlerNewPublicErrorChange(
      "tourDateTo",
      newPublicInputValidation("tourDateTo", editedPublic?.tourDate?.to)
    );
  }, [editedPublic]);

  return (
    <Dialog
      className="newPublicModal"
      onClose={() => {
        dispatch(setModalInactive("newPublicModal"));
        setEditedPublic(undefined);
        setNewPublicInputError(newPublicErrorsDefault);
      }}
      open={isModalActive("newPublicModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent sx={{ p: "20px" }}>
        <Box>
          <Typography variant={"h4"} sx={{ mb: "30px", textAlign: "center" }}>
            {modal?.props?.newPublic ? "Разместить тур" : "Редактировать тур"}
          </Typography>
          <Stack direction={"column"} gap={"15px"}>
            <Autocomplete
              id="tourID"
              value={
                myTours.find((tour) => tour?.tourId === editedPublic?.tourId) ||
                null
              }
              onChange={(event: any, newValue) => {
                setEditedPublic((editedPublic) => ({
                  ...editedPublic,
                  tourId: newValue?.tourId,
                  tour: { tourName: newValue?.tourName },
                }));
                handlerNewPublicErrorChange(
                  "tourId",
                  newPublicInputValidation("tourId", newValue?.tourId)
                );
                console.log({ tourId: newValue?.tourId });
              }}
              options={myTours}
              getOptionLabel={(option) => option.tourName}
              noOptionsText={"У вас еще нет созданных туров!"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Выбор тура"
                  color="secondary"
                  error={newPublicInputError.tourId}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Дата и время начала"
                value={dayjs(editedPublic?.tourDate?.from)}
                ampm={false}
                onChange={(newValue) => {
                  setEditedPublic((editedPublic) => ({
                    ...editedPublic,
                    tourDate: {
                      ...editedPublic?.tourDate,
                      from:
                        !isNaN(+newValue) && newValue
                          ? newValue?.toISOString()
                          : "",
                    },
                  }));
                }}
                renderInput={(props) => (
                  <TextField
                    color="secondary"
                    {...props}
                    error={newPublicInputError.tourDateFrom}
                    inputProps={{
                      ...props.inputProps,
                      placeholder: "",
                    }}
                  />
                )}
              />
              <DateTimePicker
                label="Дата и время конца"
                value={dayjs(editedPublic?.tourDate?.to)}
                ampm={false}
                onChange={(newValue) => {
                  setEditedPublic((editedPublic) => ({
                    ...editedPublic,
                    tourDate: {
                      ...editedPublic?.tourDate,
                      to:
                        !isNaN(+newValue) && newValue
                          ? newValue?.toISOString()
                          : "",
                    },
                  }));
                }}
                renderInput={(props) => (
                  <TextField
                    color="secondary"
                    {...props}
                    error={newPublicInputError.tourDateTo}
                    inputProps={{
                      ...props.inputProps,
                      placeholder: "",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              color="secondary"
              value={editedPublic?.meetingPoint || ""}
              error={newPublicInputError.meetingPoint}
              onChange={(e) => {
                setEditedPublic({
                  ...editedPublic,
                  meetingPoint: e.target.value,
                });
                handlerNewPublicErrorChange(
                  "meetingPoint",
                  newPublicInputValidation("meetingPoint", e.target.value)
                );
              }}
              label={"Место встречи"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Время встречи"
                value={
                  (editedPublic?.meetingTime &&
                    dayjs(editedPublic?.meetingTime)) ||
                  ""
                }
                ampm={false}
                onChange={(newValue: Dayjs) => {
                  setEditedPublic((editedPublic) => ({
                    ...editedPublic,
                    meetingTime:
                      !isNaN(+newValue) && newValue
                        ? newValue?.toISOString()
                        : "",
                  }));
                  handlerNewPublicErrorChange(
                    "meetingTime",
                    newPublicInputValidation("meetingTime", String(newValue))
                  );
                }}
                renderInput={(props) => (
                  <TextField
                    color="secondary"
                    {...props}
                    error={newPublicInputError.meetingTime}
                    inputProps={{
                      ...props.inputProps,
                      placeholder: "",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              type={"number"}
              color="secondary"
              value={editedPublic?.maxPersonNum || ""}
              InputProps={{ inputProps: { min: 0 } }}
              error={newPublicInputError.maxPersonNum}
              onChange={(e) => {
                setEditedPublic((editedPublic) => ({
                  ...editedPublic,
                  maxPersonNum: +e.target.value,
                }));
                handlerNewPublicErrorChange(
                  "maxPersonNum",
                  newPublicInputValidation("maxPersonNum", e.target.value)
                );
              }}
              label={"Количество человек"}
            />
            <StyledTextAreaAutosize
              placeholder="Контактная информация"
              sx={{ m: "0", minHeight: "50px" }}
              value={editedPublic?.contactInformation}
              onChange={(e) => {
                setEditedPublic({
                  ...editedPublic,
                  contactInformation: e.target.value,
                });
              }}
            />
            <Stack direction={"row"} gap="14px" alignItems={"center"}>
              <Box>
                <TextField
                  type={"number"}
                  color="secondary"
                  error={newPublicInputError.tourAmount}
                  value={editedPublic?.tourAmount || ""}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => {
                    setEditedPublic((editedPublic) => ({
                      ...editedPublic,
                      tourAmount: +e.target.value,
                    }));
                    handlerNewPublicErrorChange(
                      "tourAmount",
                      newPublicInputValidation("tourAmount", e.target.value)
                    );
                  }}
                  label={"Стоимость"}
                />
              </Box>

              <Box sx={{ flexGrow: "1" }}>
                <Typography variant="caption">
                  Стоимость на платформе: <br />
                  {editedPublic?.tourAmount
                    ? (editedPublic?.tourAmount * 1.03).toFixed(2)
                    : "-"}
                </Typography>
              </Box>
            </Stack>
            {Number(editedPublic?.tourAmount) < 1 &&
            editedPublic?.tourAmount ? (
              <Typography
                variant="caption"
                sx={{ color: redColor, mt: "10px", textAlign: "center" }}
              >
                Минимальная стоимость - 1 рубль
              </Typography>
            ) : null}

            {editedPublic?.tourDate && (
              <Typography
                variant="caption"
                sx={{
                  mt:
                    Number(editedPublic?.tourAmount) < 1 &&
                    editedPublic?.tourAmount
                      ? "0px"
                      : "30px",
                  textAlign: "center",
                }}
              >
                Вы можете редактировать тур до{" "}
                {dayjs(editedPublic?.tourDate?.from)
                  .add(-1, "day")
                  .format("D MMMM YYYY")}
              </Typography>
            )}
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"center"}
            marginTop={"20px"}
            gap={"10px"}
          >
            <Button
              onClick={() => {
                dispatch(setModalInactive("newPublicModal"));
                setEditedPublic(undefined);
              }}
            >
              Отменить
            </Button>
            <Button
              disabled={
                modal?.props?.newPublic
                  ? Object.values(newPublicInputError).some(
                      (value) => value !== false
                    )
                  : Object.values(newPublicInputError).some(
                      (value) => value === true
                    )
              }
              onClick={() => {
                if (modal?.props?.newPublic) {
                  postNewPublic(editedPublic, (resp) => {
                    dispatch(setModalInactive("newPublicModal"));
                    setPublicTours((publicTours) =>
                      publicTours.concat({
                        ...editedPublic,
                        publicTourId: resp?.publicTourId,
                      })
                    );
                    setSelectedPublic({
                      ...editedPublic,
                      publicTourId: resp?.publicTourId,
                      cancelDeadline: resp?.cancelDeadline,
                      updateDeadline: resp?.updateDeadline,
                      tourAmountWithCommission: resp?.tourAmountWithCommission,
                    });
                    setEditedPublic(undefined);
                  });
                } else {
                  editPublicTour(editedPublic, (resp) => {
                    dispatch(setModalInactive("newPublicModal"));
                    setPublicTours((publicTours) => {
                      return publicTours.map((tour) => {
                        if (tour.publicTourId === editedPublic.publicTourId) {
                          return editedPublic;
                        }
                        return tour;
                      });
                    });
                    setSelectedPublic({
                      ...editedPublic,
                      publicTourId: resp?.publicTourId,
                      cancelDeadline: resp?.cancelDeadline,
                      updateDeadline: resp?.updateDeadline,
                      tourAmountWithCommission: resp?.tourAmountWithCommission,
                    });
                    setEditedPublic(undefined);
                  });
                }
              }}
            >
              {modal?.props?.newPublic
                ? "Разместить тур"
                : "Сохранить изменения"}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
