import { Box, Paper, Typography } from "@mui/material";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";

import file from "../../../media/fileIcon.svg";

import { CreatorDocuments } from "../../../models/userModels/IUserInfo";

function CreatorDocumentItem(data: CreatorDocuments) {
  const handlerDownloadClick = (path: string) => {
    const link = document.createElement("a");
    link.download = path;
    link.href = "./" + path;
    link.click();
  };

  return (
    <Box
      className="document__item-wrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100px",
        cursor: "pointer",
      }}
      onClick={() => handlerDownloadClick(data.docUrl)}
    >
      <Box className="document__item-image-wrapper">
        <Paper
          elevation={0}
          sx={{
            backgroundColor: lightTurquoiseColor,
            borderRadius: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100px",
            height: "100px",
          }}
        >
          <img src={file} alt="file icon" />
        </Paper>
      </Box>
      <Typography variant="caption" sx={{ textAlign: "center" }}>
        {data.docName}
      </Typography>
    </Box>
  );
}

export default CreatorDocumentItem;
