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
import { setTouristInfo } from "../../../submitFunctions/touristAPI/setTouristInfo";

function EditTouristInfo() {
  const touristInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ITouristInfo
  );
  let dispatch = useDispatch();

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
                dispatch(setUserInfo({ ...touristInfo, name: e.target.value }))
              }
            />
            <TextField
              placeholder="Номер телефона"
              color="primary"
              value={touristInfo?.phone}
              onChange={(e) =>
                dispatch(setUserInfo({ ...touristInfo, phone: e.target.value }))
              }
            />
            <TextField
              placeholder="Электронная почта"
              color="primary"
              value={touristInfo?.email}
              onChange={(e) =>
                dispatch(setUserInfo({ ...touristInfo, email: e.target.value }))
              }
            />
            <TextField
              placeholder="Регион проживания"
              color="primary"
              value={touristInfo?.dataUser?.region}
              onChange={(e) =>
                dispatch(
                  setUserInfo({
                    ...touristInfo,
                    dataUser: {
                      ...touristInfo?.dataUser,
                      region: e.target.value,
                    },
                  })
                )
              }
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Пол</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={
                  touristInfo?.dataUser?.sex ? touristInfo?.dataUser?.sex : ""
                }
                name="radio-buttons-group"
                onChange={(e) =>
                  dispatch(
                    setUserInfo({
                      ...touristInfo,
                      dataUser: {
                        ...touristInfo?.dataUser,
                        sex: e.target.value as any,
                      },
                    })
                  )
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
        submitFuntion={() => setTouristInfo(touristInfo, () => {})}
        header={"Привет, Турист!"}
        linkTo={"/creatorLk"}
        avatarComponent={
          <Avatar
            photoUrl={touristInfo.photo}
            setUserPhoto={(photoUrl: string) =>
              dispatch(setUserInfo({ ...touristInfo, photo: photoUrl }))
            }
          />
        }
      />
    </>
  );
}

export default EditTouristInfo;
