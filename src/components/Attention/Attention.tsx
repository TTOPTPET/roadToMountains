import { Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as AttentionIcon } from "../../media/Attention.svg";

export const Attention = () => {
  return (
    <>
      <Paper elevation={5} sx={{ height: "136px" }}>
        <Stack gap={1} direction={"row"}>
          <SvgIcon viewBox="0 0 33.33 33.33" fontSize="large">
            <AttentionIcon />
          </SvgIcon>
          <Typography variant="caption" width={"auto"}>
            Обращаем Ваше внимание, что все <br />
            изменения будут применены только <br />
            к предстоящим записям. Забронированные <br /> туры обслуживаются
            по старому тарифу.
          </Typography>
        </Stack>
      </Paper>
    </>
  );
};
