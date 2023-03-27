import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreatorType,
  IUserInfo,
  strongUserType,
  Sex,
} from "../../../models/userModels/IUserInfo";
import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import Avatar from "../../Avatar/Avatar";
import EditUserInfo from "../EditUserInfo";
import { setTouristInfo } from "../../../submitFunctions/touristAPI/setTouristInfo";

function EditTouristInfo() {
  const touristInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo
  );
  let dispatch = useDispatch();

  return (
    <>
      {touristInfo.type === strongUserType.Tourist && (
        <EditUserInfo
          fields={
            <>
              <TextField
                placeholder="Имя"
                color="primary"
                value={touristInfo?.name}
                onChange={(e) => {
                  dispatch(setUserInfo({ name: e.target.value }));
                  console.log(e.target.value, touristInfo?.name);
                }}
              />
              <TextField
                placeholder="Номер телефона"
                color="primary"
                value={touristInfo?.phone}
                onChange={(e) =>
                  dispatch(setUserInfo({ phone: e.target.value }))
                }
              />
              <TextField
                placeholder="Электронная почта"
                color="primary"
                value={touristInfo?.email}
                onChange={(e) =>
                  dispatch(setUserInfo({ email: e.target.value }))
                }
              />
              <TextField
                placeholder="Регион проживания"
                color="primary"
                value={touristInfo?.dataUser?.region}
                onChange={(e) =>
                  dispatch(setUserInfo({ email: e.target.value }))
                }
              />
              {/* TODO: Здесь RadioButtonsGroup по выбору пола */}
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Пол</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={touristInfo?.dataUser?.sex}
                  name="radio-buttons-group"
                  // onChange={(e) => {
                  //   console.log(e.target.value);
                  //   dispatch(
                  //     setUserInfo({
                  //       dataUser: { creatorType: CreatorType.e.target.value },
                  //     })
                  //   );
                  // }}
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
          submitFuntion={
            setTouristInfo(touristInfo, () => {}) //TODO: Обработать ответ
          }
          // TODO: SubmitFunc - функция, срабатывающаяя на кнопку сохранить
          header={"Личный кабинет"}
          linkTo={"/creatorLk"}
          avatarComponent={
            <Avatar
              photoUrl={touristInfo.photo}
              setUserPhoto={(photoUrl) =>
                dispatch(setUserInfo({ photo: photoUrl }))
              }
            />
          }
        />
      )}
    </>
  );
}

export default EditTouristInfo;
