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
import { INewPublic } from "../../../models/calendarModels/INewPublic";
import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";

import { postNewPublic } from "../../../API/creatorAPI/postNewPublic";

type NewPublicModalProps = {
  myTours: ITour[];
  newPublic: INewPublic;
  defaultPublic: INewPublic;
  setNewPublic: Dispatch<SetStateAction<INewPublic>>;
};

export default function NewPublicModal({
  myTours,
  newPublic,
  setNewPublic,
  defaultPublic,
}: NewPublicModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find((modal) => modal.id === "newPublicModal");

  const [editedPublic, setEditedPublic] = useState<INewPublic>(defaultPublic);

  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(
    editedPublic.tourId
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setEditedPublic(
      modal?.props?.newPublic
        ? {
            ...defaultPublic,
            tourDate: {
              from: modal?.props?.dateFrom,
              to: modal?.props?.dateTo,
            },
          }
        : newPublic
    );
  }, [modal?.props?.newPublic === true || newPublic]);

  const handlerCloseClick = () => {
    dispatch(setModalInactive("newPublicModal"));
    setEditedPublic(newPublic);
  };

  const autocompleteChanged = (value: string) => {
    myTours.map((tour) => {
      if (tour.tourName === value) {
        setEditedPublic({ ...editedPublic, tourId: tour.tourId });
      } else if (value === null) {
        setEditedPublic({ ...editedPublic, tourId: "" });
      }
    });
  };

  const handleDateChange = (
    type: "from" | "to" | "meetingTime",
    value: Dayjs
  ) => {
    try {
      const stringDate = value ? value.toISOString() : "";
      switch (type) {
        case "from": {
          setEditedPublic({
            ...editedPublic,
            tourDate: { ...editedPublic.tourDate, from: stringDate },
          });
          break;
        }
        case "to": {
          setEditedPublic({
            ...editedPublic,
            tourDate: { ...editedPublic.tourDate, to: stringDate },
          });
          break;
        }
        case "meetingTime": {
          setEditedPublic({
            ...editedPublic,
            meetingTime: stringDate,
          });
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("invalid Data format");
    }
  };

  const handleFieldChange = <T extends any>(key: keyof INewPublic, e: T) => {
    setEditedPublic({ ...editedPublic, [key]: e });
  };

  console.log(newPublic.tourId);

  return (
    <Dialog
      className="newPublicModal"
      onClose={() => {
        dispatch(setModalInactive("newPublicModal"));
        setEditedPublic(newPublic);
        setAutocompleteValue(null);
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
              noOptionsText={"У вас еще нет созданных туров!"}
              id="tourID"
              value={autocompleteValue}
              onChange={(event: any, newValue: string | null) => {
                setAutocompleteValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={myTours.map((tour) => tour.tourName)}
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
                value={dayjs(editedPublic.tourDate.from)}
                ampm={false}
                onChange={(newValue) => {
                  handleDateChange("from", newValue);
                }}
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
                value={dayjs(editedPublic.tourDate.to)}
                ampm={false}
                onChange={(newValue) => handleDateChange("to", newValue)}
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
              value={editedPublic.meetingPoint}
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
                value={dayjs(
                  editedPublic.meetingTime ? editedPublic.meetingTime : ""
                )}
                ampm={false}
                onChange={(newValue) =>
                  handleDateChange("meetingTime", newValue)
                }
                renderInput={(props) => (
                  <TextField
                    color="secondary"
                    {...props}
                    error={
                      (props.error && props.inputProps.value !== "") ||
                      dayjs(editedPublic.tourDate.from) <=
                        dayjs(editedPublic.meetingTime)
                        ? true
                        : false
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
              value={editedPublic.maxPersonNum || ""}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) =>
                handleFieldChange<number>("maxPersonNum", +e.target.value)
              }
              placeholder={"Количество человек"}
            />
            <StyledTextAreaAutosize
              placeholder="Контактная информация"
              sx={{ m: "0", minHeight: "50px" }}
              value={editedPublic.contactInformation}
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
                  value={editedPublic.tourAmount}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) =>
                    handleFieldChange<number>("tourAmount", +e.target.value)
                  }
                  placeholder={"Стоимость"}
                />
              </Box>

              <Box sx={{ flexGrow: "1" }}>
                <Typography variant="caption">
                  Стоимость на платформе: <br />
                  {editedPublic.tourAmount
                    ? (editedPublic.tourAmount * 1.05).toFixed(2)
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
            <Button onClick={handlerCloseClick}>Отменить</Button>
            <Button
              onClick={() => {
                postNewPublic(editedPublic, () => {
                  dispatch(setModalInactive("newPublicModal"));
                });
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
