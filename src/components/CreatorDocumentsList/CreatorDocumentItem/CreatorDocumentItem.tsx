import { Box, Paper, Typography } from "@mui/material";
import fileIcon from "../../../media/fileIcon.svg";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import deleteIcon from "../../../media/DeleteCreatorDocumentIcon.svg";
import { CreatorDocuments } from "../../../models/userModels/IUserInfo";

type variant = "editInfo" | "displayInfo";

type creatorDocumentItemProps = {
  handleDeleteFile?: (lastModified: number) => void;
  handlerDownloadClick?: (path: string) => void;
  file: CreatorDocuments;
  variant: variant;
};

function CreatorDocumentItem({
  handleDeleteFile,
  handlerDownloadClick,
  file,
  variant,
}: creatorDocumentItemProps) {
  console.log(file);
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
      onClick={() => {
        variant === "editInfo"
          ? handleDeleteFile(file.lastModified)
          : handlerDownloadClick(file.name);
      }}
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
            position: "relative",
          }}
        >
          {variant === "editInfo" && (
            <img
              src={deleteIcon}
              alt="delete button"
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                width: "16px",
              }}
            />
          )}
          <img src={fileIcon} alt="file icon" />
        </Paper>
      </Box>
      <Typography
        variant="caption"
        sx={{
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {file?.name}
      </Typography>
    </Box>
  );
}

export default CreatorDocumentItem;
