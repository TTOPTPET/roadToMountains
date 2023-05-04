import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ITouristInfo, Sex } from "../../../models/userModels/IUserInfo";
import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import Avatar from "../../Avatar/Avatar";
import EditUserInfo from "../EditUserInfo";
import { setTouristInfo } from "../../../API/touristAPI/setTouristInfo";
import { useState } from "react";
import cloneDeep from "lodash/cloneDeep";

function EditTouristInfo() {
  const touristInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ITouristInfo
  );
  let dispatch = useDispatch();

  const [editedTouristInfo, setEditedTouristInfo] = useState(
    cloneDeep(touristInfo)
  );

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              placeholder="Имя"
              color="primary"
              value={touristInfo?.name}
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
              value={touristInfo?.phone}
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
              value={touristInfo?.email}
              onChange={(e) =>
                setEditedTouristInfo({
                  ...editedTouristInfo,
                  email: e.target.value,
                })
              }
            />
            <TextField
              placeholder="Регион проживания"
              color="primary"
              value={touristInfo?.dataUser?.region}
              onChange={(e) =>
                setEditedTouristInfo({
                  ...editedTouristInfo,
                  dataUser: {
                    ...editedTouristInfo?.dataUser,
                    region: e.target.value,
                  },
                })
              }
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
                <FormControlLabel
                  value={Sex.other}
                  control={<Radio />}
                  label="Другое"
                />
              </RadioGroup>
            </FormControl>
          </>
        }
        submitFuntion={() => setTouristInfo(editedTouristInfo, () => {})}
        header={"Привет, Турист!"}
        linkTo={"/tourist/lk"}
        avatarComponent={
          <Avatar
            photoUrl={editedTouristInfo.photo}
            setUserPhoto={(photoUrl: string) =>
              setEditedTouristInfo({ ...editedTouristInfo, photo: photoUrl })
            }
          />
        }
      />
    </>
  );
}

export default EditTouristInfo;
