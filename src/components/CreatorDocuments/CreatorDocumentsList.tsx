import { Box, Typography } from "@mui/material";
import { ICreatorInfo } from "../../models/userModels/IUserInfo";
import CreatorDocumentItem from "./CreatorDocumentItem/CreatorDocumentItem";

function CreatorDocumentsList(props: ICreatorInfo) {
  const { dataUser } = props;
  const elements =
    props &&
    dataUser &&
    dataUser.documents.map((document, i) => {
      return <CreatorDocumentItem {...document} key={i} />;
    });

  return (
    <Box className="documents__list-wrapper" sx={{ mt: "30px" }}>
      <Typography variant="h5">Документы</Typography>
      {elements?.length === 0 ? (
        <Box
          className="documents__list-noDocument-text"
          sx={{ height: "100px", display: "flex", alignItems: "center" }}
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

export default CreatorDocumentsList;
