import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ITouristInfo, Sex } from "../../../models/userModels/IUserInfo";
import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import Avatar from "../../Avatar/Avatar";
import EditUserInfo from "../EditUserInfo";
import { setTouristInfo } from "../../../API/touristAPI/setTouristInfo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFilters } from "../../../API/tourListAPI";
import {
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import EnterMobileCodeModal from "../../Modals/EnterMobileCodeModal/EnterMobileCodeModal";

import InputMask from "react-input-mask";

function EditTouristInfo() {
  const [regions, setRegions] = useState<string[]>([]);
  const touristInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ITouristInfo
  );
  let dispatch = useDispatch();

  useEffect(() => {
    getFilters((value) => setRegions(value.regions), undefined, false);
  }, []);

  const navigate = useNavigate();

  const [editedTouristInfo, setEditedTouristInfo] = useState(touristInfo);

  const autocompleteChanged = (value: string) => {
    setEditedTouristInfo({
      ...editedTouristInfo,
      dataUser: {
        ...editedTouristInfo.dataUser,
        region: value,
      },
    });
  };

  const getPhoneTextField = (): React.ReactNode => {
    //@ts-ignore
    return () => (
      <TextField
        label="Номер телефона"
        color="primary"
        value={editedTouristInfo?.phone}
        error={
          editedTouristInfo?.phone.replace(/[() -+-]/g, "").length !== 11
            ? true
            : false
        }
      />
    );
  };

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              label="Имя"
              color="primary"
              value={editedTouristInfo?.name}
              onChange={(e) =>
                setEditedTouristInfo({
                  ...editedTouristInfo,
                  name: e.target.value,
                })
              }
            />

            <InputMask
              mask={"+7 (999) 999-99-99"}
              maskChar=" "
              value={editedTouristInfo?.phone}
              onChange={(e) => {
                setEditedTouristInfo({
                  ...editedTouristInfo,
                  phone: e.target.value,
                });
              }}
            >
              {getPhoneTextField()}
            </InputMask>
            <TextField
              label="Электронная почта"
              color="primary"
              value={editedTouristInfo?.email}
              error={!re.test(editedTouristInfo?.email)}
              onChange={(e) =>
                setEditedTouristInfo({
                  ...editedTouristInfo,
                  email: e.target.value,
                })
              }
            />
            <Autocomplete
              freeSolo
              disableClearable
              onChange={(e, value) => autocompleteChanged(value)}
              value={editedTouristInfo?.dataUser?.region || ""}
              options={regions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Регион проживания"
                  color="primary"
                />
              )}
            />
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{
                  fontFamily: "Montserrat",
                  fontSize: { lg: "16px", sm: "12px", xs: "10px" },
                }}
              >
                Пол
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={
                  editedTouristInfo?.dataUser?.sex
                    ? editedTouristInfo?.dataUser?.sex
                    : ""
                }
                name="radio-buttons-group"
                onChange={(e) =>
                  setEditedTouristInfo({
                    ...editedTouristInfo,
                    dataUser: {
                      ...editedTouristInfo?.dataUser,
                      sex: e.target.value as any,
                    },
                  })
                }
              >
                <FormControlLabel
                  value={Sex.male}
                  control={<Radio />}
                  label="Мужской"
                />
                <FormControlLabel
                  value={Sex.female}
                  control={<Radio />}
                  label="Женский"
                />
              </RadioGroup>
            </FormControl>
          </>
        }
        submitFuntion={() => {
          setTouristInfo(
            editedTouristInfo,
            () => {
              dispatch(setUserInfo(editedTouristInfo));
              navigate("/tourist/lk");
            },
            () => {
              dispatch(setUserInfo(editedTouristInfo));
              dispatch(setModalActive("enterMobileCodeModal"));
            },
            () => {}
          );
        }}
        header={"Привет, Турист!"}
        linkTo={"/tourist/lk"}
        AvatarComponent={() => (
          <Avatar
            photoUrl={editedTouristInfo.photo as string}
            setUserPhoto={(photoUrl: string) =>
              setEditedTouristInfo({ ...editedTouristInfo, photo: photoUrl })
            }
          />
        )}
        errored={
          editedTouristInfo?.phone.replace(/[() -+-]/g, "").length !== 11 ||
          !re.test(editedTouristInfo?.email)
            ? true
            : false
        }
      />
      <EnterMobileCodeModal
        successCallback={(resp) => {
          dispatch(setUserInfo(editedTouristInfo));
          dispatch(setModalInactive("enterMobileCodeModal"));
          navigate("/tourist/lk");
        }}
      />
    </>
  );
}

export default EditTouristInfo;
