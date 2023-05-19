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
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

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

type NewPublicModalProps = {
  myTours: ITour[];
  selectedPublic: IPublicTour;
  setSelectedPublic: Dispatch<SetStateAction<IPublicTour>>;
  setPublicTours: Dispatch<SetStateAction<IPublicTour[]>>;
};

export default function NewPublicModal({
  myTours,
  selectedPublic,
  setSelectedPublic,
  setPublicTours,
}: NewPublicModalProps) {
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

  return (
    <Dialog
      className="newPublicModal"
      onClose={() => {
        dispatch(setModalInactive("newPublicModal"));
        setEditedPublic(undefined);
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
              onChange={(event: any, newValue) =>
                setEditedPublic((editedPublic) => ({
                  ...editedPublic,
                  tourId: newValue.tourId,
                  tour: { tourName: newValue?.tourName },
                }))
              }
              options={myTours}
              getOptionLabel={(option) => option.tourName}
              noOptionsText={"У вас еще нет созданных туров!"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Выбор тура"
                  color="secondary"
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={dayjs(editedPublic?.tourDate?.from)}
                ampm={false}
                onChange={(newValue) =>
                  setEditedPublic((editedPublic) => ({
                    ...editedPublic,
                    tourDate: {
                      ...editedPublic?.tourDate,
                      from:
                        !isNaN(+newValue) && newValue
                          ? newValue?.toISOString()
                          : "",
                    },
                  }))
                }
                renderInput={(props) => (
                  <TextField
                    color="secondary"
                    {...props}
                    error={props.error && props.inputProps.value !== ""}
                    inputProps={{
                      ...props.inputProps,
                      placeholder: "Дата и время начала",
                    }}
                  />
                )}
              />
              <DateTimePicker
                value={dayjs(editedPublic?.tourDate?.to)}
                ampm={false}
                onChange={(newValue) =>
                  setEditedPublic((editedPublic) => ({
                    ...editedPublic,
                    tourDate: {
                      ...editedPublic?.tourDate,
                      to:
                        !isNaN(+newValue) && newValue
                          ? newValue?.toISOString()
                          : "",
                    },
                  }))
                }
                renderInput={(props) => (
                  <TextField
                    color="secondary"
                    {...props}
                    error={props.error && props.inputProps.value !== ""}
                    inputProps={{
                      ...props.inputProps,
                      placeholder: "Дата и время конца",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
            <TextField
              color="secondary"
              value={editedPublic?.meetingPoint || ""}
              onChange={(e) =>
                setEditedPublic({
                  ...editedPublic,
                  meetingPoint: e.target.value,
                })
              }
              placeholder={"Место встречи"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={
                  (editedPublic?.meetingTime &&
                    dayjs(editedPublic?.meetingTime)) ||
                  ""
                }
                ampm={false}
                onChange={(newValue: Dayjs) =>
                  setEditedPublic((editedPublic) => ({
                    ...editedPublic,
                    meetingTime:
                      !isNaN(+newValue) && newValue
                        ? newValue?.toISOString()
                        : "",
                  }))
                }
                renderInput={(props) => (
                  <TextField
                    color="secondary"
                    {...props}
                    error={
                      // (props?.error && props?.inputProps?.value !== "") ||
                      editedPublic?.meetingTime &&
                      Boolean(
                        dayjs(editedPublic?.tourDate?.from) <
                          dayjs(editedPublic?.meetingTime)
                      )
                    }
                    inputProps={{
                      ...props.inputProps,
                      placeholder: "Время встречи",
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
              onChange={(e) =>
                setEditedPublic((editedPublic) => ({
                  ...editedPublic,
                  maxPersonNum: +e.target.value,
                }))
              }
              placeholder={"Количество человек"}
            />
            <StyledTextAreaAutosize
              placeholder="Контактная информация"
              sx={{ m: "0", minHeight: "50px" }}
              value={editedPublic?.contactInformation}
              onChange={(e) =>
                setEditedPublic({
                  ...editedPublic,
                  contactInformation: e.target.value,
                })
              }
            />
            <Stack direction={"row"} gap="14px" alignItems={"center"}>
              <Box>
                <TextField
                  type={"number"}
                  color="secondary"
                  value={editedPublic?.tourAmount || ""}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) =>
                    setEditedPublic((editedPublic) => ({
                      ...editedPublic,
                      tourAmount: +e.target.value,
                    }))
                  }
                  placeholder={"Стоимость"}
                />
              </Box>

              <Box sx={{ flexGrow: "1" }}>
                <Typography variant="caption">
                  Стоимость на платформе: <br />
                  {/* TODO: Считать процент */}
                  {editedPublic?.tourAmount
                    ? (editedPublic?.tourAmount * 1.05).toFixed(2)
                    : "-"}
                </Typography>
              </Box>
            </Stack>

            {editedPublic?.tourDate && (
              <Typography
                variant="caption"
                sx={{ mt: "30px", textAlign: "center" }}
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
                  editPublicTour(editedPublic, () => {
                    dispatch(setModalInactive("newPublicModal"));
                    setPublicTours((publicTours) => {
                      return publicTours.map((tour) => {
                        if (tour.publicTourId === editedPublic.publicTourId) {
                          return editedPublic;
                        }
                        return tour;
                      });
                    });
                    setSelectedPublic(editedPublic);
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
