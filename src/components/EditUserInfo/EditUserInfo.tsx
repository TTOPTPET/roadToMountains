import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { UserType } from "../../models/userModels/IUserInfo";
import ChangePasswordModal from "../Modals/ChangePasswordModal/ChangePasswordModal";

type editUserInfoProps = {
  fields: JSX.Element;
  submitFuntion: () => void;
  header: string;
  linkTo: string;
  AvatarComponent: () => JSX.Element;
  errored?: boolean;
};

function EditUserInfo({
  fields,
  submitFuntion,
  header,
  linkTo,
  AvatarComponent,
  errored,
}: editUserInfoProps) {
  const theme = useTheme();

  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const moreThanSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant={lessThanSmall ? "h4" : "h3"}>{header}</Typography>
        {moreThanSmall && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { lg: "10px", sm: "5px" },
              mb: "10px",
            }}
          >
            <Button onClick={() => submitFuntion()} disabled={errored}>
              Сохранить
            </Button>
            <Button component={Link} to={linkTo} sx={{ width: "100%" }}>
              Отменить
            </Button>
          </Box>
        )}
      </Box>
      {userInfo.typeUser === UserType.creator ? (
        <Box sx={{ mt: "10px", display: "flex", columnGap: "22px" }}>
          <Box>
            <AvatarComponent />
          </Box>
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
      ) : (
        <Box
          sx={{
            mt: moreThanSmall ? "" : "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {fields}
        </Box>
      )}
      {!moreThanSmall && (
        <Box
          sx={{
            width: "212px",
            m: "0 auto",
            mt: "10px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Button onClick={() => submitFuntion()} sx={{ width: "101px" }}>
            Сохранить
          </Button>
          <Button component={Link} to={linkTo} sx={{ width: "101px" }}>
            Отменить
          </Button>
        </Box>
      )}
      <ChangePasswordModal />
    </Box>
  );
}

export default EditUserInfo;
