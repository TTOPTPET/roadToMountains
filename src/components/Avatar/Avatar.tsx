import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import addPhotoIcon from "../../media/plusIcon.svg";

function Avatar({
  photoUrl,
  setUserPhoto,
}: {
  photoUrl: string;
  setUserPhoto: (prop: any) => void;
}) {
  return (
    <Box>
      <Paper
        sx={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          bgcolor: darkTurquoiseColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={photoUrl || addPhotoIcon} alt="add avatar icon" />
        {/* TODO:Нужен обработчик вставки фото с запросом 
							сначала посылается запрос setPhoto на изменение фото, внутрь которого закидывается файл, бэк в ответ присылает url нового фото, который нужно засетить в userInfo с помощью setUserPhoto*/}
      </Paper>
    </Box>
  );
}

export default Avatar;
