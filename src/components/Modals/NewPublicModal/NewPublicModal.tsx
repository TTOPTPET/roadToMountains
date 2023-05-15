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
  setNewPublic: Dispatch<SetStateAction<INewPublic>>;
};

export default function NewPublicModal({
  myTours,
  newPublic,
  setNewPublic,
}: NewPublicModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const [editedNewPublic, setEditedNewPublic] = useState<INewPublic>(newPublic);

  useEffect(() => {
    setEditedNewPublic(newPublic);
  }, [newPublic]);

  const handlerCloseClick = () => {
    dispatch(setModalInactive("newPublicModal"));
    setEditedNewPublic(newPublic);
  };

  const autocompleteChanged = (value: string) => {
    myTours.map((tour) => {
      if (tour.tourName === value) {
        setEditedNewPublic({ ...editedNewPublic, tourId: tour.tourId });
      } else if (value === null) {
        setEditedNewPublic({ ...editedNewPublic, tourId: "" });
      }
    });
  };

  const handleDateChange = (type: "from" | "to", value: Dayjs) => {
    try {
      const stringDate = value ? value.toISOString() : "";
      switch (type) {
        case "from": {
          setEditedNewPublic({
            ...editedNewPublic,
            tourDate: { ...editedNewPublic.tourDate, from: stringDate },
          });
          break;
        }
        case "to": {
          setEditedNewPublic({
            ...editedNewPublic,
            tourDate: { ...editedNewPublic.tourDate, to: stringDate },
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
    setEditedNewPublic({ ...editedNewPublic, [key]: e });
  };

  console.log(newPublic);

  return (
    <Dialog
      className="newPublicModal"
      onClose={() => {
        dispatch(setModalInactive("newPublicModal"));
        setEditedNewPublic(newPublic);
      }}
      open={isModalActive("newPublicModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent sx={{ p: "20px" }}>
        <Box>
          <Typography variant={"h4"} sx={{ mb: "30px", textAlign: "center" }}>
            Разместить тур
          </Typography>

          <Stack direction={"column"} gap={"15px"}>
            <Autocomplete
              noOptionsText={"У вас еще нет созданных туров!"}
              id="tourID"
              onChange={(e, value) => autocompleteChanged(value)}
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
                value={dayjs(editedNewPublic.tourDate.from)}
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
                value={dayjs(editedNewPublic.tourDate.to)}
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
              onChange={(e) =>
                setEditedNewPublic({
                  ...editedNewPublic,
                  meetingPoint: e.target.value,
                })
              }
              placeholder={"Место встречи"}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={dayjs(editedNewPublic.meetingTime)}
                ampm={false}
                onChange={(newValue) =>
                  setEditedNewPublic({
                    ...editedNewPublic,
                    meetingTime:
                      !isNaN(+newValue) && newValue
                        ? newValue?.toISOString()
                        : "",
                  })
                }
                renderInput={(props) => (
                  <TextField
                    color="secondary"
                    {...props}
                    error={
                      (props.error && props.inputProps.value !== "") ||
                      dayjs(editedNewPublic.tourDate.from) <=
                        dayjs(editedNewPublic.meetingTime)
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
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) =>
                handleFieldChange<number>("maxPersonNum", +e.target.value)
              }
              placeholder={"Количество человек"}
            />
            <StyledTextAreaAutosize
              placeholder="Контактная информация"
              sx={{ m: "0", minHeight: "50px" }}
              onChange={(e) =>
                setEditedNewPublic({
                  ...editedNewPublic,
                  contactInformation: e.target.value,
                })
              }
            />
            <Stack direction={"row"} gap="14px" alignItems={"center"}>
              <Box>
                <TextField
                  type={"number"}
                  color="secondary"
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
                  {editedNewPublic.tourAmount
                    ? editedNewPublic.tourAmount * 1.05
                    : "-"}
                </Typography>
              </Box>
            </Stack>

            <Typography
              variant="caption"
              sx={{ mt: "30px", textAlign: "center" }}
            >
              Вы можете редактировать тур до 10 марта 2023
            </Typography>
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
                postNewPublic(editedNewPublic);
              }}
            >
              Разместить тур
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
