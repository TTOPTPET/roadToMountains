import { Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as Attention } from "../../../../media/Attention.svg";
import { whiteColor } from "../../../../config/MUI/color/color";
import "./conditionChangedChip.css";

const ConditionChangedChip = () => {
  return (
    <Paper
      color={whiteColor}
      elevation={0}
      sx={{ padding: "4px", width: "max-content", display: "flex" }}
    >
      <Stack
        direction={"row"}
        sx={{ alignItems: "center" }}
        ml={"2px"}
        mr={"4px"}
      >
        <SvgIcon viewBox="0 0 24 24" fontSize="small" sx={{ marginTop: "2px" }}>
          <Attention width={20} height={20} className="yellow-attention" />
        </SvgIcon>
        <Typography variant={"caption"}>Условия изменились</Typography>
      </Stack>
    </Paper>
  );
};

export default ConditionChangedChip;
