import { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

type editUserInfoProps = {
  fields: JSX.Element;
  submitFuntion: () => void;
  header: string;
  linkTo: string;
  AvatarComponent: () => JSX.Element;
};

function EditUserInfo({
  fields,
  submitFuntion,
  header,
  linkTo,
  AvatarComponent,
}: editUserInfoProps) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h3">{header}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "132px",
            gap: "10px",
            mb: "10px",
          }}
        >
          <Button onClick={() => submitFuntion()}>Сохранить</Button>
          <Button component={Link} to={linkTo} sx={{ width: "100%" }}>
            Отменить
          </Button>
        </Box>
      </Box>
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
    </Box>
  );
}

export default EditUserInfo;
