import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type editUserInfoProps = {
  fields: JSX.Element;
  submitFuntion: Promise<void>;
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
        <Button component={Link} to={linkTo}>
          Отменить
        </Button>
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
        {/* TODO: Здесь кнопка сохранения с submitFuntion */}
      </Box>
    </Box>
  );
}

export default EditUserInfo;
