import { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setUserInfo } from "../../redux/UserInfo/UserInfoReducer";
import { getUserInfo } from "../../submitFunctions/commonAPI";

type editUserInfoProps = {
  fields: JSX.Element;
  submitFuntion: () => void;
  header: string;
  linkTo: string;
  avatarComponent: JSX.Element;
};

function EditUserInfo({
  fields,
  submitFuntion,
  header,
  linkTo,
  avatarComponent,
}: editUserInfoProps) {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    Object.keys(userInfo.dataUser) &&
      getUserInfo(
        (value) => {
          dispatch(setUserInfo(value));
          // setLoadingStatus(false);
        },
        undefined,
        true
      );
  }, []);

  return (
    <Box sx={{ mt: "95px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h3">{header}</Typography>
        <Box>
          <Button component={Link} to={linkTo}>
            Отменить
          </Button>
          <Button onClick={() => submitFuntion()}>Сохранить</Button>
        </Box>
      </Box>
      <Box sx={{ mt: "50px", display: "flex", columnGap: "22px" }}>
        <Box>{avatarComponent}</Box>
        <Box
          sx={{
            width: "700px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {fields}
        </Box>
      </Box>
    </Box>
  );
}

export default EditUserInfo;
