import { Box, Typography } from "@mui/material";

import CreatorDocumentItem from "./CreatorDocumentItem/CreatorDocumentItem";

import SkeletonCreatorDocumentsList from "./SkeletonCreatorDocumentsList/SkeletonCreatorDocumentsList";
import { CreatorDocuments } from "../../models/userModels/IUserInfo";

type variant = "editInfo" | "displayInfo";

type creatorDocumentsListProps = {
  setFiles?: (value: React.SetStateAction<CreatorDocuments[]>) => void;
  files: CreatorDocuments[];
  variant: "editInfo" | "displayInfo";
  loadingStatus?: Boolean;
};

function CreatorDocumentsList({
  setFiles,
  files,
  variant,
  loadingStatus,
}: creatorDocumentsListProps) {
  const handleDeleteFile = (lastModified: number) => {
    setFiles(files.filter((item) => item.lastModified !== lastModified));
  };

  const handlerDownloadClick = (path: string) => {
    const link = document.createElement("a");
    link.download = path;
    link.href = "./" + path;
    link.click();
  };

  console.log(files);

  const elements =
    files &&
    files.map((file, i) => {
      console.log(file);
      return (
        <CreatorDocumentItem
          handleDeleteFile={(lastModified) => handleDeleteFile(lastModified)}
          handlerDownloadClick={(path) => handlerDownloadClick(path)}
          key={i}
          file={file}
          variant={variant}
        />
      );
    });

  switch (variant) {
    case "editInfo":
      return (
        <Box
          className="creator-documents__wrapper"
          sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          {elements}
        </Box>
      );
    case "displayInfo":
      return (
        <Box className="documents__list-wrapper" sx={{ mt: "30px" }}>
          <Typography variant="h5">Документы</Typography>
          {elements?.length === 0 ? (
            <Box
              className="documents__list-noDocument-text"
              sx={{
                height: "100px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="caption">Еще нет документов</Typography>
            </Box>
          ) : (
            <Box
              className="documents__list"
              sx={{
                display: "flex",
                gap: "10px",
                mt: "10px",
                flexWrap: "wrap",
              }}
            >
              {elements}
            </Box>
          )}
        </Box>
      );
  }
}

export default CreatorDocumentsList;
