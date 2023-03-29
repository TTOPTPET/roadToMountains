import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fromModelsToFieldsName } from "../../../config/types";
import {
  CreatorType,
  ICreatorInfo,
} from "../../../models/userModels/IUserInfo";
import { RootState } from "../../../redux/store";
import { setUserInfo } from "../../../redux/UserInfo/UserInfoReducer";
import Avatar from "../../Avatar/Avatar";
import attachment from "../../../media/attachment.svg";
import fileIcon from "../../../media/fileIcon.svg";
import EditUserInfo from "../EditUserInfo";
import { setCreatorInfo } from "../../../submitFunctions/creatorAPI/setCreatorInfo";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import FieldsCreator from "./FieldsCreator/FieldsCreator";

function EditCreatorInfo() {
  const creatorInfo = useSelector(
    (state: RootState) => state.userInfo.userInfo as ICreatorInfo
  );
  let dispatch = useDispatch();

  const [files, setFiles] = useState<FileList>();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      let files = event.target.files;
      setFiles(files);
    }
  };

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
      ))
    );
  };

  return (
    <>
      <EditUserInfo
        fields={
          <>
            <TextField
              placeholder="Имя"
              color="primary"
              value={creatorInfo?.name}
              onChange={(e) => {
                dispatch(setUserInfo({ name: e.target.value }));
                console.log(e.target.value, creatorInfo?.name);
              }}
            />
            <TextField
              placeholder="Телефон"
              color="primary"
              value={creatorInfo?.phone}
              onChange={(e) => dispatch(setUserInfo({ phone: e.target.value }))}
            />
            <TextField
              placeholder="Электронная почта"
              color="primary"
              value={creatorInfo?.email}
              onChange={(e) => dispatch(setUserInfo({ email: e.target.value }))}
            />
            {/* TODO: Здесь RadioButtonsGroup по выбору типа организации */}
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Тип организации
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={creatorInfo?.dataUser.creatorType}
                name="radio-buttons-group"
                onChange={(e) => {
                  console.log(e.target.value);
                  dispatch(
                    setUserInfo({
                      ...creatorInfo,
                      dataUser: {
                        ...creatorInfo.dataUser,
                        creatorType: e.target.value as any,
                      },
                    })
                  );
                }}
              >
                <FormControlLabel
                  value={CreatorType.OOO}
                  control={<Radio />}
                  label="ООО"
                />
                <FormControlLabel
                  value={CreatorType.IP}
                  control={<Radio />}
                  label="ИП"
                />
                <FormControlLabel
                  value={CreatorType.SELF}
                  control={<Radio />}
                  label="Физическое лицо (самозанятый)"
                />
              </RadioGroup>
            </FormControl>
            <FieldsCreator
              creatorInfo={creatorInfo}
              setCreatorInfo={(field: string, value: any) =>
                dispatch(
                  setUserInfo({
                    dataUser: { fieldsCreator: { [field]: value } },
                  })
                )
              }
            />
            {/* TODO: А здесь вывод документов */}
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
            <Box sx={{ display: "flex", gap: "10px" }}>
              {documentsList(files)}
            </Box>
          </>
        }
        submitFuntion={
          setCreatorInfo(creatorInfo, () => {}) //TODO: Обработать ответ
        }
        // TODO: SubmitFunc - функция, срабатывающаяя на кнопку сохранить
        header={"Личный кабинет"}
        linkTo={"/creatorLk"}
        avatarComponent={
          <Avatar
            photoUrl={creatorInfo.photo}
            setUserPhoto={(photoUrl) =>
              dispatch(setUserInfo({ photo: photoUrl }))
            }
          />
        }
      />
    </>
  );
}

export default EditCreatorInfo;
