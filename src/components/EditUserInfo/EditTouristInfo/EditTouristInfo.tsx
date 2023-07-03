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

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              placeholder="Имя"
              color="primary"
              value={editedTouristInfo?.name}
              onChange={(e) =>
                setEditedTouristInfo({
                  ...editedTouristInfo,
                  name: e.target.value,
                })
              }
            />
            <TextField
              placeholder="Номер телефона"
              color="primary"
              value={editedTouristInfo?.phone}
              onChange={(e) =>
                setEditedTouristInfo({
                  ...editedTouristInfo,
                  phone: e.target.value,
                })
              }
            />
            <TextField
              placeholder="Электронная почта"
              color="primary"
              value={editedTouristInfo?.email}
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
                  placeholder="Регион проживания"
                  color="primary"
                />
              )}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Пол</FormLabel>
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
