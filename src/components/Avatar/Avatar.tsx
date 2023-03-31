import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import addPhotoIcon from "../../media/plusIcon.svg";
import { postUserAvatar } from "../../submitFunctions/commonAPI";

type avatarProps = {
  photoUrl: string;
  setUserPhoto: (prop: any) => void;
};

function Avatar({ photoUrl, setUserPhoto }: avatarProps) {
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      // const { name, lastModified, size } = file;
      // TODO: проверить размер файла
      postUserAvatar(
        file,
        (url) => setUserPhoto(url),
        () => {},
        true
      );
    }
    event.target.value = null;
  };

  return (
    <Box component="label">
      <Paper
        sx={{
          width: "140px",
          height: "140px",
          borderRadius: "50%",
          bgcolor: darkTurquoiseColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={photoUrl || addPhotoIcon}
          alt="add avatar icon"
          style={{ width: "100%" }}
        />
        <input
          id="fileItem"
          type="file"
          hidden
          multiple
          onChange={handleFileInputChange}
        />
        {/* TODO:Нужен обработчик вставки фото с запросом 
							сначала посылается запрос setPhoto на изменение фото, внутрь которого закидывается файл, бэк в ответ присылает url нового фото, который нужно засетить в userInfo с помощью setUserPhoto*/}
      </Paper>
    </Box>
  );
}
export default Avatar;
