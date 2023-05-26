import { Box, Paper, Typography } from "@mui/material";
import fileIcon from "../../../media/fileIcon.svg";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import deleteIcon from "../../../media/DeleteCreatorDocumentIcon.svg";
import { CreatorDocuments } from "../../../models/userModels/IUserInfo";

type variant = "editInfo" | "displayInfo";

type creatorDocumentItemProps = {
  handleDeleteFile?: (documentPath: string, tempId: string) => void;
  handlerDownloadClick?: (file: CreatorDocuments) => void;
  file: CreatorDocuments;
  variant: variant;
};

function CreatorDocumentItem({
  handleDeleteFile,
  handlerDownloadClick,
  file,
  variant,
}: creatorDocumentItemProps) {
  return (
    <Box
      className="document__item-wrapper"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: { lg: "100px", sm: "75px", xs: "50px" },
        cursor: variant !== "editInfo" && "pointer",
      }}
      onClick={() => {
        variant !== "editInfo" && handlerDownloadClick(file);
      }}
    >
      <Box className="document__item-image-wrapper">
        <Paper
          elevation={0}
          sx={{
            backgroundColor: lightTurquoiseColor,
            borderRadius: { lg: "30px", sm: "25px", xs: "15px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            width: { lg: "100px", sm: "75px", xs: "50px" },
            height: { lg: "100px", sm: "75px", xs: "50px" },
            position: "relative",
          }}
        >
          {variant === "editInfo" && (
            <Box
              component={"img"}
              src={deleteIcon}
              alt="delete button"
              sx={{
                position: "absolute",
                top: { lg: "12px", sm: "10px", xs: "7px" },
                right: { lg: "12px", sm: "10px", xs: "7px" },
                width: { lg: "16px", sm: "12px", xs: "8px" },
                cursor: "pointer",
              }}
              onClick={() => {
                handleDeleteFile(file?.documentPath, file?.tempId);
              }}
            />
          )}
          <Box
            sx={{
              width: { lg: "50px", sm: "35px", xs: "20px" },
            }}
          >
            <img
              src={fileIcon}
              alt="file icon"
              style={{ objectFit: "contain", width: "100%" }}
            />
          </Box>
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
        {file?.documentName}
      </Typography>
    </Box>
  );
}

export default CreatorDocumentItem;
