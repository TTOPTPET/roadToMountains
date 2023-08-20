import { Paper, Stack, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as Attention } from "../../../../../media/Attention.svg";
import { ReactComponent as AttentionRed } from "../../../../../media/Attention.svg";
import { whiteColor } from "../../../../../config/MUI/color/color";
import "./BaseChip.css";


export enum TypeIconSetForChip  {
  Attention = "Attention",
  AttentionRed = "AttentionRed"


}


function setIconChip(setIcon: TypeIconSetForChip) {
  switch (setIcon){
    case TypeIconSetForChip.Attention:
      return <Attention width={20} height={20} className={"yellow-attention"}/>
    case TypeIconSetForChip.AttentionRed:
      return <AttentionRed width={20} height={20}/>
  }
}


const BaseChip = (
    {setIcon, textInput} : {setIcon: TypeIconSetForChip, textInput: string}
) => {
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
          {setIconChip(setIcon)}
        </SvgIcon>
        <Typography variant={"caption"}>{textInput}</Typography>
      </Stack>
    </Paper>
  );
};

export default BaseChip;
