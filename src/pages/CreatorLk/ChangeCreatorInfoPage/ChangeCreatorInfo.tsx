import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link } from "react-router-dom";
import addPhotoIcon from "../../../media/plusIcon.svg";
import fileIcon from "../../../media/fileIcon.svg";
import attachment from "../../../media/attachment.svg";
import {
  darkTurquoiseColor,
  lightTurquoiseColor,
} from "../../../config/MUI/color/color";
import { ICreatorInfo } from "../../../models/userModels/IUserInfo";

function ChangeCreatorInfo() {
  const [fieldSet, setFieldSet] = useState("");
  const [files, setFiles] = useState<FileList>();
  const [userInfo, setUserInfo] = useState<ICreatorInfo>();

  const handleRadioButtonChange = (event: { target: HTMLInputElement }) => {
    setFieldSet(event.target.value);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let files = event.target.files;
      setFiles(files);
    }
  };
  //   setFiles((files) => files.concat(event.target.files[0]));

  const documentsList = (obj: FileList) => {
    return (
      obj &&
      Array.from(obj).map((file) => (
        <Box
          className="document__item-wrapper"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100px",
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
              }}
            >
              <img src={fileIcon} alt="file icon" />
            </Paper>
          </Box>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            {file?.name}
          </Typography>
        </Box>
      ))
    );
  };

  const fields = () => {
    switch (fieldSet) {
      case "OOO":
        return (
          <>
            <TextField
              placeholder="ОГРН"
              color="primary"
              onChange={(e) =>
                setUserInfo((userInfo: ICreatorInfo) => ({
                  ...userInfo,
                  ogrnOOO: e.target.value,
                }))
              }
            />
            <TextField placeholder="ИНН" color="primary" />
            <TextField placeholder="КПП" color="primary" />
            <TextField placeholder="Код ОКАТО" color="primary" />
            <TextField placeholder="ОКВЭД" color="primary" />
            <TextField placeholder="ОКПО" color="primary" />
            <TextField placeholder="Юридический адрес" color="primary" />
          </>
        );
      case "IP":
        return (
          <>
            <TextField placeholder="ОГРНИП" color="primary" />
            <TextField placeholder="ИНН" color="primary" />
            <TextField placeholder="Выписка из ЕГРИП" color="primary" />
            <TextField placeholder="Адрес регистрации" color="primary" />
          </>
        );
      case "SELF":
        return (
          <>
            <TextField placeholder="Серия и номер паспорта" color="primary" />
            <TextField placeholder="ИНН" color="primary" />
            <TextField placeholder="Адрес регистрации" color="primary" />
            <TextField
              placeholder="Налоговый счёт самозанятого"
              color="primary"
            />
          </>
        );
    }
  };

  return (
    <Box sx={{ mt: "95px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h3">Личный кабинет</Typography>
        <Button component={Link} to={"/creatorLk"}>
          Отменить
        </Button>
      </Box>
      <Box sx={{ mt: "50px", display: "flex", columnGap: "22px" }}>
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
            <img src={addPhotoIcon} alt="add avatar icon" />
          </Paper>
        </Box>
        <Box
          sx={{
            width: "700px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <TextField placeholder="Название компании" color="primary" />
          <TextField placeholder="Номер телефона" color="primary" />
          <TextField placeholder="Электронная почта" color="primary" />
          <TextField
            placeholder="Номер в реестре туроператоров"
            color="primary"
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Тип организации
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={handleRadioButtonChange}
            >
              <FormControlLabel value="OOO" control={<Radio />} label="ООО" />
              <FormControlLabel value="IP" control={<Radio />} label="ИП" />
              <FormControlLabel
                value="SELF"
                control={<Radio />}
                label="Физическое лицо (самозанятый)"
              />
            </RadioGroup>
          </FormControl>
          {fields()}
          <Button variant="fileInput" component="label">
            <Typography variant="caption">
              Загрузить файлы размером до 2 Мб
            </Typography>
            <img src={attachment} alt="attachment" />
            <input
              id="fileItem"
              type="file"
              hidden
              multiple
              onChange={handleFileInputChange}
            />
          </Button>
          {documentsList(files)}
        </Box>
      </Box>
    </Box>
  );
}

export default ChangeCreatorInfo;
