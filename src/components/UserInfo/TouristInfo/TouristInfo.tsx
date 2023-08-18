import UserInfo from "../UserInfo";
import UserInfoHeader from "../UserInfoHeader/UserInfoHeader";
import { Box, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import {
  ITouristInfo,
  UserType,
  CreatorType,
} from "../../../models/userModels/IUserInfo";

function TouristInfo() {
  const TouristInfo: ITouristInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ITouristInfo
  );

  const { typeUser, name, phone, email, dataUser } = TouristInfo;
  const { sex, region } = dataUser;

  return (
    <UserInfo
      header={
        <>
          <UserInfoHeader
            title={"Привет, Турист!"}
            linkTo="/tourist/lk/editInfo"
            userInfo={TouristInfo}
          />
        </>
      }
      fields={
        <>
          <Box
            className="userInfo__data"
            sx={{
              display: "flex",
              gap: "10px",
              mt: "3px",
            }}
          >
            <Box
              className="userInfo__data-titles"
              sx={{
                width: {
                  lg: "240px",
                  xs: "145px",
                },
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Typography variant="h6">Пол:</Typography>
              <Typography variant="h6">Регион проживания:</Typography>
            </Box>
            <Box
              className="userInfo__data-descr"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              <Typography variant="caption">{sex}</Typography>
              <Typography variant="caption">{region}</Typography>
            </Box>
          </Box>
        </>
      }
    />
  );
}

export default TouristInfo;
