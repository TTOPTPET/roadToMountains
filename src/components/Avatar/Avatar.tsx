import { Paper, Box, Avatar as MuiAvatar } from "@mui/material";
import { darkTurquoiseColor } from "../../config/MUI/color/color";
import addPhotoIcon from "../../media/plusIcon.svg";
import editImageIcon from "../../media/iconEditImage.png";
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
    <Box component="label" sx={{ position: "relative" }}>
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
        {photoUrl ? (
          <MuiAvatar
            alt={photoUrl}
            src={photoUrl}
            sx={{ width: "140px", height: "140px" }}
          />
        ) : (
          <img src={addPhotoIcon} alt="add avatar icon" />
        )}

        <input
          id="fileItem"
          type="file"
          hidden
          onChange={handleFileInputChange}
        />
        {photoUrl && (
          <Box
            sx={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              bgcolor: "rgba(0, 0, 0, 0.4)",
              zIndex: 5,
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={editImageIcon} alt="edit avatar icon" />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
export default Avatar;
