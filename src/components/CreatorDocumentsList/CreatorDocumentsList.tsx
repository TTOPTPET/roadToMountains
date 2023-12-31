import { Box, Typography } from "@mui/material";

import CreatorDocumentItem from "./CreatorDocumentItem/CreatorDocumentItem";

import SkeletonCreatorDocumentsList from "./SkeletonCreatorDocumentsList/SkeletonCreatorDocumentsList";
import { CreatorDocuments } from "../../models/userModels/IUserInfo";
import { baseUrl } from "../../config/config";
import { deleteCreatorFile } from "../../API/creatorAPI/deleteCreatorFile";

type variant = "editInfo" | "displayInfo";

type creatorDocumentsListProps = {
  setFiles?: (value: CreatorDocuments[]) => void;
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
  const handleDeleteFile = (documentPath: string, tempId: string) => {
    if (documentPath) {
      deleteCreatorFile(
        files.find((item) => item.documentPath === documentPath).documentPath,
        () => {
          setFiles(files.filter((item) => item.documentPath !== documentPath));
        }
      );
    } else {
      setFiles(files.filter((item) => item?.tempId !== tempId));
    }
  };

  const handlerDownloadClick = (file: CreatorDocuments) => {
    const link = document.createElement("a");
    if (file.documentPath) {
      link.href = baseUrl + "/" + file.documentPath;
    } else {
      link.href = window.URL.createObjectURL(file.file);
    }
    console.log("fileDownload", { file, link });
    link.download = file.documentName;
    link.click();
  };

  const elements =
    files &&
    files.map((file, i) => {
      return (
        <CreatorDocumentItem
          handleDeleteFile={(documentPath, tempId) =>
            handleDeleteFile(documentPath, tempId)
          }
          handlerDownloadClick={(file) => handlerDownloadClick(file)}
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
          {loadingStatus ? (
            <SkeletonCreatorDocumentsList />
          ) : (
            <>
              <Typography variant="h5">Документы</Typography>{" "}
              {elements?.length === 0 ? (
                <Box
                  className="documents__list-noDocument-text"
                  sx={{
                    height: { lg: "100px", sm: "75px", xs: "50px" },
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
            </>
          )}
        </Box>
      );
  }
}

export default CreatorDocumentsList;
